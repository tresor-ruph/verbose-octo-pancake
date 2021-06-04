const Sequelize = require('sequelize');
const dbConnection = require('../dbConnection')
module.exports = dbConnection.define("Ranking", {

    participantId: {
        type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    pseudo: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    rank : {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    points : {
        type: Sequelize.INTEGER,
        allowNull: false, 
    },
 
},

)



