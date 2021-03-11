
 const userService = require('../use_cases');



module.exports =  {

   listAllUsers : async (req, res) => {
     const response = await userService.listAll()
    return response
  },

   getUser : async (req, res) => {
    const request = req.params.username
    const response = await userService.getOne(request)
    return response
  },

   deleteUser : async (req, res) => {
    const request = req.params.username

    const response = await userService.deleteUser(request)
    return response
  },

   createUser : async (req, res) => {
    const request = req.params.username

    const response = await userService.addUser(request)
    if (response == -1) {

    }
    return response
  },

   updateUser : async (req, res) => {
    const request = req.params.username

    const response = await userService.updateUser(request)
    return response
  }

  
}

