const userModel = require('./../domain/Users')


module.exports = {
  fetchAll: async (userRepository) => {
    const response = await userRepository.getAll()
    return response
  },



  fetchOne: async (param, userRepository) => {

    let isHTML = RegExp.prototype.test.bind(/'(<([^>]+)>)'/i)

    if (isHTML(param) || param.length < 3 || param.length > 30) {
      return -1
    }

    const response = await userRepository.getOne(param)
    return response
  },


  create: async (request, userRepository) => {

    let values = Object.values(request.body)
    const validMod = userModel(...values)
    if (validMod.error) {
      return { code: -1, message: validMod.error[0].message }
    }

    const userExist = await userRepository.getOne(values[2])

    if (userExist.length === 0) {
      const response = await userRepository.add(validMod.value)
      return response
    }

    return { message: -1 }
  },


  update: async (request, userRepository) => {

    let values = Object.values(request.body)
    const validMod = userModel(...values)
    if (validMod.error) {
      return { code: -1, message: validMod.error[0].message }
    }

    const userExist = await userRepository.getOne(values[2])
    if (userExist.length === 0) {
      return -1
    }
    const response = await userRepository.update(validMod.value)
    return response



  },


  deleteUser: async (param, userRepository) => {

    let isHTML = RegExp.prototype.test.bind(/'(<([^>]+)>)'/i)

    if (isHTML(param) || param.length < 3 || param.length > 30) {
      return -1
    }

    const response = await userRepository.deleteUser(param)
    return response
  },

}