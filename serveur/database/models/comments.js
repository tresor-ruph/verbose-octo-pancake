const Sequelize = require('sequelize');
const dbConnection = require('../dbConnection')
module.exports = dbConnection.define("Comments", {

    participantId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,

    },
    comment: {
        type: Sequelize.STRING,
        allowNull: false,
    },
},

)



