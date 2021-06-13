const Sequelize = require('sequelize');
const dbConnection = require('../dbConnection')
module.exports = dbConnection.define("Polls", {

  pollId: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,

  },
  defaultResultLayout: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  timer: {
    type:Sequelize.BOOLEAN,
    allowNull: false,
  },
  waitingTime: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  resultInPercent: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  questionIndex: {
    type: Sequelize.INTEGER,
    allowNull: true,
  }
},

)



