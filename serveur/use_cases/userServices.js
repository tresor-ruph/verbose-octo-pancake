const userModel = require('./../domain/Users')
const {UsersRepo} = require('../contracts')


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

    const userExist = await UsersRepo.getOneUser(values[2])

    if (userExist.length === 0) {
      const response = await UsersRepo.addUser(validMod.value)
      return response
    }

    return -1
  }


  const update = async (request) => {

    let values = Object.values(request.body)
    const validMod = userModel(...values)
    if (validMod.error) {
      return { code: -1, message: validMod.error[0].message }
    }

    const userExist = await UsersRepo.getOneUser(values[2])
    if (userExist.length === 0) {
      return -1
    }
    const response = await UsersRepo.updateUser(validMod.value)
    return response



  }


  const deleteUser = async (param) => {

    let isHTML = RegExp.prototype.test.bind(/'(<([^>]+)>)'/i)

    if (isHTML(param) || param.length < 3 || param.length > 30) {
      return -1
    }

    const response = await UsersRepo.removeUser(param)
    return response
  }
  return ({ fetchAll, fetchOne, create, update, deleteUser })
}