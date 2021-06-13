const { questionController } = require('../controllers');

module.exports = (app) => {
    app.post('/api/addQuestions', questionController.addQuestion)
}