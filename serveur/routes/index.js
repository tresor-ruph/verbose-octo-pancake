const users = require('./userRoutes');
const events = require('./eventRoutes')
const polls = require('./PollRoutes')

module.exports = (app) => {

    users(app);
    events(app);
    polls(app)
}


