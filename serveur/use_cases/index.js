const userService = require('./userServices')
const eventService = require('./eventServices')
const pollService = require('./pollServices')
const questionService = require('./questionServices')
const optionService = require('./optionService')
const reactionService = require('./reactionServices')

const userServices = userService()
const eventServices = eventService()
const pollServices = pollService()
const questionServices = questionService()
const optionServices = optionService()
const reactionServices = reactionService()


module.exports= {userServices, eventServices, pollServices, questionServices, optionServices,reactionServices}
