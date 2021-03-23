const users = require('./userRoutes');

module.exports = (app) => {

    users(app);
}


