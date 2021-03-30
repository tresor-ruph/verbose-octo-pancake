
const { userController } = require('../controllers');
module.exports = (app) => {

    app.get('/api/allusers', userController.listAllUsers)
    app.get('/api/user/:username', userController.getUser)
    app.delete('/api/user/:username', userController.deleteUser)
    app.put('/api/user', userController.updateUser)
    app.get('/api/Login/:user', userController.userLogin)
    app.post('/api/Signin', userController.createUser)


}