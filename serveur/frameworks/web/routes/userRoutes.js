
 const Controller = require('../../../controllers/users');

module.exports = (app, dependencies) => {
    // const router = dependencies.express.Router();
    // const userController = Controller(dependencies)
    app.get('/api/allusers', Controller.getAll)
    app.get('/api/user/:id', Controller.getOne)
    app.delete('/api/user/:id', Controller.deleteOne)

    app.post('/api/user', Controller.createOne)
    app.put('/api/user', Controller.updateOne)

}

