const userModel = require('./../domain/Users')
const { UsersRepo } = require('../repository')
const tokenManager = require('../security/AccessTokenManager')
const passWordManager = require('../security/passwordManager')
const mail = require(('../helper/nodemailer/nodemailer'))
const dotenv = require('dotenv');
dotenv.config();


module.exports = () => {

  const fetchAll = async () => {
    const response = await UsersRepo.getAllUsers()
    return response
  }

  const fetchOne = async (param) => {

    let isHTML = RegExp.prototype.test.bind(/'(<([^>]+)>)'/i)

    if (isHTML(param) || param.length < 3 || param.length > 30) {
      return -1
    }

    const response = await UsersRepo.getOneUser(param)
    return response
  }


  const create = async (request) => {
    let values = Object.values(request.body)
    const validMod = userModel(...values)

    if (validMod.error) {
      return { code: -1, message: validMod.error[0].message }
    }

    const userExist = await UsersRepo.userExist(values[0], values[2])

    if (userExist.length === 0) {

      validMod.value.password = passWordManager.hashPassword(validMod.value.password)
      validMod.value.Accountstatus = 'waiting'
      const response = await UsersRepo.addUser(validMod.value)
      const token = await tokenManager.encode(response)
      const link = `http://localhost:8000/api/confirmEmail/${token},${response}`
      mail.send(validMod.value.email, link, validMod.value.username)
      return { token: token, id: response }

    }

    return 0
  }

  const login = async (request) => {
    let values = JSON.parse(request.params.user)
    let response;
    if (values.social) {
      response = await UsersRepo.getOneUser(values.email, true)
      console.log(response)
      if (response.length === 0) {
        values.password = passWordManager.hashPassword(values.password)
        values.Accountstatus = 'social'
        const response = await UsersRepo.addUser(values)
        const token = await tokenManager.encode(response)
        return { token: token, id: response }

      }
    } else {

      response = await UsersRepo.getOneUser(values.em_usname)
      if (response.length === 0) {
        return 0
      }
      if (response[0].dataValues.Accountstatus == 'waiting') {
        const token = await tokenManager.encode(response[0].dataValues)
        return { id: response[0].dataValues.UserId, token, code:-1 }
      }
      if (!passWordManager.comparePassword(values.password, response[0].dataValues.password)) {
        return ({ code: -2 })
      }
    }
    const token = await tokenManager.encode(response[0].dataValues.UserId)
    return { id: response[0].dataValues.UserId, token }
  }


  const update = async (request) => {
    let token = tokenManager.decode(request)
    if (token.error) {
      return "access_D"
    }
    let values = Object.values(request.body)
    const validMod = userModel(...values)
    if (validMod.error) {
      return { code: -1, message: validMod.error[0].message }
    }
    const getOneUser = await UsersRepo.getOneUser(values[2])
    if (getOneUser.length === 0) {
      return 0
    }
    const response = await UsersRepo.updateUser(validMod.value)
    return response
  }

  const updatePassword= async (request)=>{
    
    console.log(request.body.userId)
    const getOneUser = await UsersRepo.getOneUser(request.body.userId)
    if (getOneUser.length === 0) {
      return 0
    }
    request.body.password = passWordManager.hashPassword(request.body.password)
    const response = await UsersRepo.updatePassword(request)
    return response


  }

  const confirm = async (request) => {

    let value = (request.params.id)
    arr = value.split(',')
    let valid = tokenManager.simpleCheck(arr[0])
    if (valid.error) {
      return -1
    }
    const response = await UsersRepo.confirmUser(arr[1])
    return response

  }

  const sendLink = async (request) => {
    console.log(request.params)
    const param = JSON.parse(request.params.obj)

    const username = param.userName
    const email = param.email
    const link = `http://localhost:8000/api/confirmEmail/${param.token},${param.userId}`

    console.log(username)


    mail.send(email, link, username)
  }

  const reset= async (request)=>{
    response = await UsersRepo.getOneUser(request.params.email)
    console.log(response)
    const token = await tokenManager.encode(response[0].dataValues.UserId)

    // let link =`http://localhost:3000/resetpassword/${token},${response[0].dataValues.UserId}`
    
    let link =`http://localhost:${process.env.PORT}/resetpassword/${token},${response[0].dataValues.UserId}`


     mail.send(request.params.email, link, "",true)

  }


  const deleteUser = async (req) => {
    if (tokenManager.decode(req).error) {
      return "access_D"
    }

    let param = req.params.username
    let isHTML = RegExp.prototype.test.bind(/'(<([^>]+)>)'/i)

    if (isHTML(param) || param.length < 3 || param.length > 30) {
      return { code: -1, message: 'invalid parameter' }
    }

    const response = await UsersRepo.removeUser(param)
    return response
  }
  return ({ fetchAll, fetchOne, create, login, update, deleteUser, confirm,updatePassword, sendLink,reset })
}