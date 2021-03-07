const gestUsersRepo = require('./UserRepository')
const model = require('./../infrastructure/orm/models');

module.exports = {

    getAll: async () => {
        const response = await gestUsersRepo.getAllUsers(model.User)
        return response
    },
    getOne: async (request) => {
        const response = await gestUsersRepo.getOneUser(request,model.User)
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
    deleteUser: async (request) => {
        const response = await gestUsersRepo.removeUser(request,model.User)
        return response
    },





}
