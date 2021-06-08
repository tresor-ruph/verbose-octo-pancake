const { surveyResultController } = require('../controllers');

module.exports = (app) => {
    app.post('/api/surveyResults', surveyResultController.create)
}