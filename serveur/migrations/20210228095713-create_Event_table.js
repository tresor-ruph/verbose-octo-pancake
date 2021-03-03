'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Events", {
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
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
  return queryInterface.dropTable("Events")
  }
};
