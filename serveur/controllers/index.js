
const userControllerFactory = require('./userController')
const eventControllerFactory = require('./eventController')
const pollControllerFactory = require('./pollController')

const eventController = eventControllerFactory()
const userController = userControllerFactory()
const pollController = pollControllerFactory()

module.exports= {userController, eventController, pollController}



