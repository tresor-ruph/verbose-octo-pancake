const users = require('./userRoutes');
const events = require('./eventRoutes')
const polls = require('./PollRoutes')
const question = require('./questions')

module.exports = (app) => {

    users(app);
    events(app);
    polls(app);
    question(app)
}


