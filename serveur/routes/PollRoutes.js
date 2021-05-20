const { pollController } = require('../controllers');

module.exports = (app) => {
    app.post('/api/createPoll', pollController.createPoll)
    app.put('/api/questionCount', pollController.questionIndex)

}