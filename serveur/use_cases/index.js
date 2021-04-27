const userService = require('./userServices')
const eventService = require('./eventServices')
const pollService = require('./pollServices')


const userServices = userService()
const eventServices = eventService()
const pollServices = pollService()


module.exports= {userServices, eventServices, pollServices}
