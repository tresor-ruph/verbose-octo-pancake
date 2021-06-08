const Sequelize = require('sequelize');
const dbConnection = require('../dbConnection')
module.exports = dbConnection.define("SurveyResult", {

    optionText: {
        type: Sequelize.STRING,
        allowNull: false
    },
    vote: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }, 
},

)



