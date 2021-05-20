const { eventController } = require('../controllers');

module.exports = (app) => {

    app.post('/api/createEvent', eventController.createEvent)
    app.get('/api/getEvent/:eventCode', eventController.getEvent)
    app.put('/api/updateStatus', eventController.startEvent)

    app.get('/api/getEventPoll/:eventCode/:userId', eventController.getEventPoll)

}