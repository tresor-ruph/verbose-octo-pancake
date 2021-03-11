
const userControllerFactory = require('./userController')

module.exports = {

    getAll: (req, res) => {
        const userList = userControllerFactory.listAllUsers()
        userList.then(result => {
            res.send(JSON.stringify(result, null, 2))
        })
    },

    getOne: (req, res) => {
        const request = req.params.username;
        const user = userControllerFactory.getUser(request)
        user.then(result => {
            res.send(JSON.stringify(result, null, 2))
        })
    },

    deleteOne: (req, res) => {
        const request = req.params.username;
        const user = userControllerFactory.deleteUser(request)
        user.then(result => {
            res.send(JSON.stringify(result))
        })
    },

    createOne: (req, res) => {
        const request = req;
        const user = userControllerFactory.createUser(request)
        user.then(result => {
            res.send(JSON.stringify(result))
        })
    },

    updateOne: (req, res) => {
        const request = req;
        const user = userControllerFactory.updateUser(request)
        user.then(result => {
            res.send(JSON.stringify(result))

        })
    },

}