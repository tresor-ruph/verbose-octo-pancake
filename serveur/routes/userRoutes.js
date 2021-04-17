
const { userController } = require('../controllers');
module.exports = (app) => {

    app.get('/api/allusers', userController.listAllUsers)
    app.get('/api/user/:username', userController.getUser)
    app.delete('/api/user/:username', userController.deleteUser)
    app.put('/api/user', userController.updateUser)
    app.get('/api/Login/:user', userController.userLogin)
    app.post('/api/Signin', userController.createUser)
    app.get('/api/confirmEmail/:id', userController.confirmEmail)
    app.get('/api/resendLink/:obj',userController.resendLink )
    app.get('/api/resetpassword/:email',userController.resetPassword)
    app.put('/api/password', userController.updatePassword)
    app.get('/api/verifLink/:id', userController.redirectPassword)


    


}