const { eventController } = require('../controllers');

module.exports = (app) => {

    app.post('/api/createEvent', eventController.createEvent)
    app.get('/api/getEvent/:id', eventController.getEvent)
    app.get('/api/eventResults/:id', eventController.getEventResults)
    app.put('/api/updateStatus', eventController.startEvent)
    app.delete('/api/Event/:id', eventController.deleteEvent)

    app.get('/api/getAllQuestions/:eventCode/', eventController.getEventPoll)

}