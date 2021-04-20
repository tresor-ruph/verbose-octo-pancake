const Sequelize = require('sequelize');
const dbConnection = require('../dbConnection')
module.exports = dbConnection.define("Reactions", {

    reactionId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,

    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    audienceNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    waitingTime: {
        type: Sequelize.INTEGER,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,

    },
    data: {
        type: Sequelize.STRING,
        allowNull: false,
    },
},

)



