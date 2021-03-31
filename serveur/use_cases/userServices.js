const userModel = require('./../domain/Users')
const { UsersRepo } = require('../repository')
const tokenManager = require('../security/AccessTokenManager')
const passWordManager = require('../security/passwordManager')
const mail = require(('../helper/nodemailer/nodemailer'))

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
      const response = await UsersRepo.addUser(validMod.value)
      const token = await tokenManager.encode(response)
      const link=`http://localhost:8000/api/confirmEmail/${token},${response}`
      mail.send(validMod.value.email,link, validMod.value.username )
      return { token: token, id: response }

    }

    return 0
  }

  const login = async (request) => {
    let values = JSON.parse(request.params.user)
    const response = await UsersRepo.getOneUser(values.em_usname)
    if (response.length === 0) {
      return 0
    }
    if (response[0].dataValues.Accountstatus == 'waiting') {
      return -1
    }
    if (!passWordManager.comparePassword(values.password, response[0].dataValues.password)) {
      return ({ code: 'invalid' })
    }
    const token = await tokenManager.encode(response[0].dataValues)
    console.log(response[0].dataValues.UserId)
    return {id: response[0].dataValues.UserId, token }
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

    const userExist = await UsersRepo.getOneUser(values[2])

    if (userExist.length === 0) {
      return 0
    }
    const response = await UsersRepo.updateUser(validMod.value)
    return response

  }

  const confirm = async (request) => {

    let value = (request.params.id)
    arr = value.split(',')
    console.log(arr)
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
 
    const username= param.userName
    const email = param.email
    const link=`http://localhost:8000/api/confirmEmail/${param.token},${param.userId}`

    console.log(username)
    

    mail.send(email,link,username )
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
  return ({ fetchAll, fetchOne, create, login, update, deleteUser, confirm, sendLink })
}