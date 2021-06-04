const usersRepository = require('./UserRepository')
const eventsRepository = require('./EventRepository')
const pollsRepository = require('./PollRepository')
const questionsRepository = require('./QuestionRespository')
const optionsRepository = require('./OptionRepository')

const UsersRepo = usersRepository()
const EventRepo = eventsRepository()
const PollRepo = pollsRepository()
const QuestionRepo = questionsRepository()
const OptionRepo =optionsRepository()

module.exports = { UsersRepo, EventRepo,PollRepo,QuestionRepo,OptionRepo }

