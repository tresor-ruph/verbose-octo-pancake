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
      validMod.value.accountStatus = 'waiting'
      validMod.value.userRole = 'client'
      const response = await UsersRepo.addUser(validMod.value)
      const token = await tokenManager.encode(response)
      const link = `http://localhost:8000/api/confirmEmail/${token}`
      // const link = `https://verbose-octo-pancake.herokuapp.com/api/confirmEmail/${token}`
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
      if (response.length === 0) {
        values.password = passWordManager.hashPassword(values.password)
        values.accountStatus = 'social'
        values.userRole = 'client'
        const response = await UsersRepo.addUser(values)
        const token = await tokenManager.encode(response[0].dataValues.id)
      

      }
    } else {

      response = await UsersRepo.getOneUser(values.em_usname)
      if (response.length === 0) {
        return 0
      }

      if (!passWordManager.comparePassword(values.password, response[0].dataValues.password)) {
        return ({ code: -2 })
      }
      if (response[0].dataValues.Accountstatus == 'waiting') {
        const token = await tokenManager.encode(response[0].dataValues)
        return { id: response[0].dataValues.userId, token, code: -1 }
      }
    }
    const token = await tokenManager.encode(response[0].dataValues.userId)
    return { user: response, token }

  }


  const update = async (request) => {
  

    let token = tokenManager.decode(request)

    if (token.error) {
      return "access_D"
    }
    console.log(request.body)

    if ((request.body.username.length < 3 && request.body.username.length > 30) || (request.body.username.length < 10)) {
      return { code: -1, message: 'incorrect parameters' }

    }
    console.log(token)
    const getOneUser = await UsersRepo.getOneUser(token.data)

    if (getOneUser.length === 0) {
      return 0
    }

    const response = await UsersRepo.updateUser(token.data,request.body)
    return response

  }

  const updatePassword = async (request) => {
  
  
    const getOneUser = await UsersRepo.getOneUser(request.body.id)

    if (getOneUser.length === 0) {
      return 0
    }

    if (request.body.from_settings) {
      if (!passWordManager.comparePassword(request.body.oldPassword, getOneUser[0].dataValues.password)) {
        return ({ code: -2 })
      }
    }

    request.body.password = passWordManager.hashPassword(request.body.password)
    const response = await UsersRepo.updatePassword(request.body.password,request.body.id)
    return response


  }

  const confirm = async (request) => {

    let value = (request.params.id)

    let valid = tokenManager.simpleCheck(value)
    if (valid.error) {
      return -1
    }
    const response = await UsersRepo.confirmUser(valid.data)
    return response

  }

  const sendLink = async (request) => {

    const param = JSON.parse(request.params.obj)
    const username = param.userName
    const email = param.email
    const link = `http://localhost:8000/api/confirmEmail/${param.token}`
    // const link = `https://verbose-octo-pancake.herokuapp.com/api/confirmEmail/${param.token}`
    mail.send(email, link, username)
  }

  const reset = async (request) => {
    response = await UsersRepo.getOneUser(request.params.email)
    if (response.length === 0) {
      return -1
    }
    const token = await tokenManager.encode(response[0].dataValues.userId, Math.floor(Date.now() / 1000) + (2 * 60))
    let link = `http://localhost:3000/resetpassword/${token}`
    // let link = `https://verbose-pancake-4fb37.web.app/resetpassword/${token}`
    mail.send(request.params.email, link, "", true)

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
  const redirectPassword = async (req) => {
    let response = tokenManager.simpleCheck(req.params.id)
    if (response.error) {
      return -1
    }
    return response.data
  }

  return ({ fetchAll, fetchOne, create, login, update, deleteUser, redirectPassword, confirm, updatePassword, sendLink, reset })
}