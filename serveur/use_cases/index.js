const userService = require('./userServices')
const userModel = require('./../domain/Users')

module.exports = {
    listAll: async (userRepository) => {
        const response = await userService.fetchAll(userRepository)
        return response
    },
    getOne: async (request, userRepository) => {
        const response = await userService.fetchOne(request, userRepository)
        return response
    },
    deleteUser: async (request, userRepository) => {
        const response = await userService.deleteUser(request, userRepository)
        return response
    },
    addUser: async (request, userRepository) => {
        const response = await userService.create(request, userRepository,userModel)
        return response
    },
    updateUser: async (request, userRepository) => {
        const response = await userService.update(request, userRepository)
        return response
    },


}

