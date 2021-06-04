const userService = require('./userServices')
const eventService = require('./eventServices')
const pollService = require('./pollServices')
const questionService = require('./questionServices')
const optionService = require('./optionService')

const userServices = userService()
const eventServices = eventService()
const pollServices = pollService()
const questionServices = questionService()
const optionServices = optionService()


module.exports= {userServices, eventServices, pollServices, questionServices, optionServices}
