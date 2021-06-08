const usersRepository = require('./UserRepository')
const eventsRepository = require('./EventRepository')
const pollsRepository = require('./PollRepository')
const questionsRepository = require('./QuestionRespository')
const optionsRepository = require('./OptionRepository')
const reactionsRepository = require('./ReactionRepository')
const SurveyResultRepository = require('./SurveyResultRepository')
const RankingRepository = require('./RankingRepository')
const SlidesRepository = require('./SlidesRepository')


const UsersRepo = usersRepository()
const EventRepo = eventsRepository()
const PollRepo = pollsRepository()
const QuestionRepo = questionsRepository()
const OptionRepo =optionsRepository()
const ReactionRepo = reactionsRepository()
const SurveyResultRepo = SurveyResultRepository()
const RankingRepo = RankingRepository()
const slidesRepo= SlidesRepository()

module.exports = { UsersRepo, EventRepo,PollRepo,QuestionRepo,OptionRepo,ReactionRepo, SurveyResultRepo, RankingRepo,slidesRepo }

