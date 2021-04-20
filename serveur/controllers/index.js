
const userControllerFactory = require('./userController')
const eventControllerFactory = require('./eventController')

const eventController = eventControllerFactory()
const userController = userControllerFactory()

module.exports= {userController, eventController}



