const Sequelize = require('sequelize');
const dbConnection = require('../dbConnection')
module.exports = dbConnection.define("Questions", {

    questionId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,

    },
    order: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    question: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    image : {
        type: Sequelize.STRING,
        allowNull: true,
    },
    answer : {
        type: Sequelize.INTEGER,
        allowNull: false, 
    },
 
 
},

)



