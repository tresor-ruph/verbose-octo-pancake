const userService = require('./userServices')
const gestUsersRepo = require('./../contracts/')


module.exports = {
  

    listAll: async () => {
        const response = await userService.fetchAll(gestUsersRepo)
        return response
    },
    getOne: async (request) => {
        const response = await userService.fetchOne(request, gestUsersRepo)
        return response
    },
    deleteUser: async (request) => {
        const response = await userService.deleteUser(request, gestUsersRepo)
        return response
    },
    addUser: async (request) => {
        const response = await userService.create(request, gestUsersRepo)
        return response
    },
    updateUser: async (request) => {
        const response = await userService.update(request, gestUsersRepo)
        return response
    },


}

