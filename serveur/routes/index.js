const users = require('./userRoutes');
const events = require('./eventRoutes')

module.exports = (app) => {

    users(app);
    events(app)
}


