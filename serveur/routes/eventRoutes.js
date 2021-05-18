const { eventController } = require('../controllers');

module.exports = (app) => {

    app.post('/api/createEvent', eventController.createEvent)
    app.get('/api/getEvent/:id', eventController.getEvent)
    app.get('/api/getEventPoll/:id', eventController.getEventPoll)

}