const users = require('./userRoutes');
const events = require('./eventRoutes')
const polls = require('./PollRoutes')
const question = require('./questions')
const option = require('./optionsRoutes')
const reactions = require('./reactions')
const surveyResult = require('./surveyResults')
const ranking = require('./rankingRoutes')
const slides = require('./slidesRoute')
const audience = require('./audience')

module.exports = (app) => {

    users(app);
    events(app);
    polls(app);
    question(app)
    option(app)
    reactions(app)
    surveyResult(app)
    ranking(app)
    audience(app)
    
}


