
const User = require('./user')
const Event = require('./event')
User.hasMany(Event, { as: "Events", foreignKey: "eventId" })
Event.belongsTo(User, { as: "User", foreignKey: "eventId" })

module.exports = {
    User
}