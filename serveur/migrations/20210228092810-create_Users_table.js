'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  return queryInterface.createTable("Users",{
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
    eventId: Sequelize.INTEGER(11),
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  })
  },

  down: async (queryInterface, Sequelize) => {
   return queryInterface.dropTable("Users")
  }
};
