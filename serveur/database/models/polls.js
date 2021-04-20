const Sequelize = require('sequelize');
const dbConnection = require('../dbConnection')
module.exports =   dbConnection.define("Polls", {
   
    pollId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,

    },
    defaultLayout: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    waitingTime: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    resultFormat: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    questions: {
      type: Sequelize.STRING,
    }
  },

  )



