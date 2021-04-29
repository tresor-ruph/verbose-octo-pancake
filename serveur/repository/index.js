const usersRepository = require('./UserRepository')
const eventsRepository = require('./EventRepository')
const pollsRepository = require('./PollRepository')
const questionsRepository = require('./QuestionRespository')

const UsersRepo = usersRepository()
const EventRepo = eventsRepository()
const PollRepo = pollsRepository()
const QuestionRepo = questionsRepository()

module.exports = { UsersRepo, EventRepo,PollRepo,QuestionRepo }

