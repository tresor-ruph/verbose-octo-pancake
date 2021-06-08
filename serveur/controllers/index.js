
const userControllerFactory = require('./userController')
const eventControllerFactory = require('./eventController')
const pollControllerFactory = require('./pollController')
const questionControllerFactory = require('./questionController')
const optionControllerFactory = require('./optionController')
const reactionControllerFactory = require('./reactionController')
const surveyResultControllerFactory = require('./surveyResultController')
const rankingControllerFactory = require('./rankingController')
const slidesControllerFactory = require('./slidesController')


const surveyResultController =surveyResultControllerFactory()
const eventController = eventControllerFactory()
const userController = userControllerFactory()
const pollController = pollControllerFactory()
const questionController = questionControllerFactory()
const optionController = optionControllerFactory()
const reactionController = reactionControllerFactory()
const rankingController = rankingControllerFactory()
const slidesController =slidesControllerFactory()

module.exports= {userController, eventController, pollController, questionController, optionController,reactionController, surveyResultController, rankingController,slidesController}



