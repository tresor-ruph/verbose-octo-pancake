const model = require('./../infrastructure/orm/models');
const gestUsersRepo = require('./UserRepository')

module.exports = {
    getAll: async () => {
        const response = await gestUsersRepo.getAllUsers(model.User)
        return response
    },
    getOne: async (param) => {
        const response = await gestUsersRepo.getOneUser(param,model.User)
        return response
    },
    add :async (request) => {
        const response = await gestUsersRepo.addUser(request,model.User)
        return response
    },
    update: async (request) => {
        const response = await gestUsersRepo.updateUser(request,model.User)
        return response
    }, 
    deleteUser: async (param) => {
        const response = await gestUsersRepo.removeUser(param,model.User)
        return response
    },





}
