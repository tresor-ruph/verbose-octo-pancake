
const userControllerFactory = require('./userController')
const eventControllerFactory = require('./eventController')
const pollControllerFactory = require('./pollController')
const questionControllerFactory = require('./questionController')
const optionControllerFactory = require('./optionController')
const reactionControllerFactory = require('./reactionController')

const eventController = eventControllerFactory()
const userController = userControllerFactory()
const pollController = pollControllerFactory()
const questionController = questionControllerFactory()
const optionController = optionControllerFactory()
const reactionController = reactionControllerFactory()
module.exports= {userController, eventController, pollController, questionController, optionController,reactionController}



