const userModel = require('./../domain/Users')


module.exports = {
  fetchAll: async (userRepository) => {
console.log(userRepository)
    const response = await userRepository.getAll()
    return response
  },



  fetchOne: async (param, userRepository) => {

    let isHTML = RegExp.prototype.test.bind(/'(<([^>]+)>)'/i)

    if (isHTML(param) || param.length < 3 || param.length > 30) {
      return { message: "invalid parameter" }
    }

    const response = await userRepository.getOne(param)
    return response
  },


  create: async (request, userRepository) => {

    let values = Object.values(request.body)
    const validMod = userModel(...values)
    if (validMod.error) {
      return validMod.error[0].message
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
      return validMod.error[0].message
    }

    const userExist = await userRepository.getOne(values[2])
    if (userExist.length === 0) {
      return { message: `${values[2]} could not update` }
    }
    const response = await userRepository.update(validMod.value)
    return response



  },


  deleteUser: async (param, userRepository) => {

    let isHTML = RegExp.prototype.test.bind(/'(<([^>]+)>)'/i)

    if (isHTML(param) || param.length < 3 || param.length > 30) {
      return { message: "invalid parameter" }
    }

    const response = await userRepository.deleteUser(param)
    return response
  },

}