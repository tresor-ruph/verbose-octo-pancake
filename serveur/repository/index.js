const usersRepository = require('./UserRepository')
const eventsRepository = require('./EventRepository')
const pollsRepository = require('./PollRepository')

const UsersRepo = usersRepository()
const EventRepo = eventsRepository()
const PollRepo = pollsRepository()

module.exports = { UsersRepo, EventRepo,PollRepo }

