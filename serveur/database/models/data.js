const Sequelize = require('sequelize');
const dbConnection = require('../dbConnection')
module.exports = dbConnection.define("Data", {

  dataId: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,

  },
  votes: {
    type: Sequelize.STRING,
    allowNull: false,
  },
},
)



