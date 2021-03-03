
module.exports = (app) => {

    const users = require('./userRoutes');

    users(app);
}


