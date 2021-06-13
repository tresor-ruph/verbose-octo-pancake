const Sequelize = require('sequelize');
const dbConnection = require('../dbConnection')
module.exports = dbConnection.define("Reactions", {

    reactionId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,

    },

    audienceNumber: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },

    waitingTime: {
        type: Sequelize.INTEGER,
        allowNull: true,

    },

},

)



