
const userServices = require('./../../use_cases');
module.exports = {

  listAllUsers: async (dependencies) => {
    const response= await userServices.listAll(dependencies)
    return response
  },
  getUser: async (request,dependencies)=> {
    const response= await userServices.getOne(request,dependencies)
    return response
  },
  deleteUser: async (request,dependencies)=> {
    const response= await userServices.deleteUser(request,dependencies)
    return response
  },
  createUser: async (request,dependencies)=> {
    const response= await userServices.addUser(request,dependencies)
    return response
  },
  updateUser: async (request,dependencies)=> {
    const response= await userServices.updateUser(request,dependencies)
    return response
  },

}

