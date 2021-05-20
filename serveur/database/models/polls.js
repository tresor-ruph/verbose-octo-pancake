const Sequelize = require('sequelize');
const dbConnection = require('../dbConnection')
module.exports =   dbConnection.define("Polls", {
   
    pollId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,

    },
    defaultResultLayout: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    waitingTime: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    Mode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
     
    questionIndex: {
      type: Sequelize.INTEGER,
      allowNull: true,
  }
  },

  )



