const userModel = require('./../domain/Users')
const { UsersRepo } = require('../contracts')
const tokenManager = require('../security/AccessTokenManager')
const passWordManager = require('../security/passwordManager')

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
      return response

    }

    return 0
  }

  const login = async (request) => {

    let values = request.body
    const response = await UsersRepo.getOneUser(values.em_usname)

    if (response.length === 0) {
      return 0
    }
    if (!passWordManager.comparePassword(values.password, response[0].dataValues.password)) {
      return ({ code: 'invalid' })
    }
    const token = await tokenManager.encode(response[0].dataValues)
    return token
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
  return ({ fetchAll, fetchOne, create, login, update, deleteUser })
}