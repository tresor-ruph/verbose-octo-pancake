const { reactionController } = require('../controllers');

module.exports = (app) => {
    app.post('/api/newReaction', reactionController.newReaction) 
    app.get('/api/reaction/:eventId', reactionController.getReaction)


}