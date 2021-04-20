const { eventController } = require('../controllers');

module.exports = (app) => {

    app.post('/api/createEvent', eventController.createEvent)
    app.get('/api/getEvent/:id', eventController.getEvent)

}