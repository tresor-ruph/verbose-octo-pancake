const { rankingController } = require('../controllers');

module.exports = (app) => {
    app.post('/api/ranking', rankingController.create)
    app.get('/api/ranks/:id', rankingController.getRanks)
}