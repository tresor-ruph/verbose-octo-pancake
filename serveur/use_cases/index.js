const userService = require('./userServices')
const eventService = require('./eventServices')


const userServices = userService()
const eventServices = eventService()

module.exports= {userServices, eventServices}
