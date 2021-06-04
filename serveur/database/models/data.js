const Sequelize = require('sequelize');
const dbConnection = require('../dbConnection')
module.exports = dbConnection.define("Data", {

  votes: {
    type: Sequelize.STRING,
    allowNull: false,
  },
},
)



