const users = require('./userRoutes');
const events = require('./eventRoutes')
const polls = require('./PollRoutes')
const question = require('./questions')
const option = require('./optionsRoutes')
const reactions = require('./reactions')

module.exports = (app) => {

    users(app);
    events(app);
    polls(app);
    question(app)
    option(app)
    reactions(app)
}


