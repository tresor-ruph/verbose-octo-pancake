
const { audienceController } = require('../controllers');

module.exports = (app) => {

    app.get('/api/audience/:ip/:eventId', audienceController.getParticipant)
    app.post('/api/addPart', audienceController.addParticipant)
    app.put('/api/updateIndex', audienceController.updateIndex)


}