
const userControllerFactory = require('./userController')
const eventControllerFactory = require('./eventController')
const pollControllerFactory = require('./pollController')
const questionControllerFactory = require('./questionController')


const eventController = eventControllerFactory()
const userController = userControllerFactory()
const pollController = pollControllerFactory()
const questionController = questionControllerFactory()

module.exports= {userController, eventController, pollController, questionController}



