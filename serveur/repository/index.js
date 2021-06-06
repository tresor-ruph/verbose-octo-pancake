const usersRepository = require('./UserRepository')
const eventsRepository = require('./EventRepository')
const pollsRepository = require('./PollRepository')
const questionsRepository = require('./QuestionRespository')
const optionsRepository = require('./OptionRepository')
const reactionsRepository = require('./ReactionRepository')

const UsersRepo = usersRepository()
const EventRepo = eventsRepository()
const PollRepo = pollsRepository()
const QuestionRepo = questionsRepository()
const OptionRepo =optionsRepository()
const ReactionRepo = reactionsRepository()

module.exports = { UsersRepo, EventRepo,PollRepo,QuestionRepo,OptionRepo,ReactionRepo }

