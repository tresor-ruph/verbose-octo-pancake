
const userControllerFactory = require('./userController')
const userRepository = require('./../../contracts')


module.exports = {
    getAll: (userRepository, (req, res) => {
        const userList = userControllerFactory.listAllUsers(userRepository)
        userList.then(result => {
            res.send(JSON.stringify(result, null, 2))

        })

    }),
    getOne: (userRepository, (req, res) => {
        const request = req;
        const user = userControllerFactory.getUser(request, userRepository)
        user.then(result => {

            res.send(JSON.stringify(result, null, 2))

        })
    }),
    deleteOne: (userRepository, (req, res) => {
        const request = req;
        const user = userControllerFactory.deleteUser(request, userRepository)
        user.then(result => {

            res.send(JSON.stringify(result))

        })
    }),

    createOne: (userRepository, (req, res) => {
        const request = req;
        const user = userControllerFactory.createUser(request, userRepository)
        user.then(result => {
            res.send(JSON.stringify(result))

        })

    }),

    updateOne: (userRepository, (req, res) => {
        const request = req;
        const user = userControllerFactory.updateUser(request, userRepository)
        user.then(result => {
            res.send(JSON.stringify(result))

        })

    })
}