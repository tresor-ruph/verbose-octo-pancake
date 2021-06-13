const { optionController } = require('../controllers');

module.exports = (app) => {
    app.post('/api/addOption', optionController.addOption)
}