const usersRepository = require('./UserRepository')
const eventsRepository = require('./EventRepository')

const UsersRepo = usersRepository()
const EventRepo = eventsRepository()

module.exports = { UsersRepo, EventRepo }

