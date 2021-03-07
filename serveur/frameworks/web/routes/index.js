
module.exports = (app, dependencies) => {

    const users = require('./userRoutes');

    users(app, dependencies);
}


