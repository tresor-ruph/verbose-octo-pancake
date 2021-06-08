const { slidesController } = require('../controllers');

module.exports = (app) => {
    app.post('/api/slide', slidesController.create)
    app.get('/api/surveyResults/:id', slidesController.getSlides)
}