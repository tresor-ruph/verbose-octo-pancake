const Sequelize = require('sequelize');
const dbConnection = require('../dbConnection')
module.exports = dbConnection.define("Options", {

    optionId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,

    },
    order: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    optionText: {
        type: Sequelize.STRING,
        allowNull: false,
    }, 
},

)



