const Sequelize = require('sequelize');
const dbConnection = require('../dbConnection')
module.exports = dbConnection.define("Questions", {

    questionId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,

    },
    question: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    options: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    answers: {
        type: Sequelize.STRING,
        allowNull: true,
    },
 
},

)



