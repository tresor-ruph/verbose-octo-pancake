
const {UserController} = require('../../../controllers/users/index');
const userController = require('../../../controllers/users/userController');

module.exports = (app) => {
   console.log(userController)
    app.get('api/users', UserController);
}

