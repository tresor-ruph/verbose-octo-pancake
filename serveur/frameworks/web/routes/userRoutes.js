
const { userController } = require('../../../controllers/');
module.exports = (app) => {

    app.get('/api/allusers', userController.listAllUsers)
    app.get('/api/user/:username', userController.getUser)
    app.delete('/api/user/:username', userController.deleteUser)
    app.post('/api/user', userController.createUser)
    app.put('/api/user', userController.updateUser)

}