const Sequelize = require('sequelize');
const dbConnection = require('./../dbConnection')
module.exports =   dbConnection.define("Event", {
   
    eventId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,

    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    avgScore: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    audNum: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },

  )



