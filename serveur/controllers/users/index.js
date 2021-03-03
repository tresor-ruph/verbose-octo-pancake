
const userControllerFactory = require('./userController')
const userRepository = require('./../../contracts')

// module.exports ={
//     UserController: ()=> {
//         userControllerFactory(userRepository)
//     }
// }

const userController = userController.listAllUsers(userRepository)

