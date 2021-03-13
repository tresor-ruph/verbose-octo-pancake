
const userControllerFactory = require('./userController')
const userController = function(){
    return userControllerFactory()
}
exports.userController= userController()



