const Sequelize = require('sequelize');
const dbConnection = require('./../dbConnection')
module.exports =   dbConnection.define("User", {
   
    userId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,

    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Accountstatus: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    imageUrl:{
      type: Sequelize.STRING,
      allowNull: true,
    }
  },

  )



