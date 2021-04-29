const userService = require('./userServices')
const eventService = require('./eventServices')
const pollService = require('./pollServices')
const questionService = require('./questionServices')

const userServices = userService()
const eventServices = eventService()
const pollServices = pollService()
const questionServices = questionService()


module.exports= {userServices, eventServices, pollServices, questionServices}
