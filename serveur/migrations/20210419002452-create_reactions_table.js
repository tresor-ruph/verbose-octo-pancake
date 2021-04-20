'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Reactions", {

      reactionId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,

      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      audienceNumber: {
        type: Sequelize.INTEGER,
        allowNull: true,

      },
      waitingTime: {
        type: Sequelize.INTEGER,
        allowNull: false,

      },
      data: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      // eventId: Sequelize.INTEGER(11),

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Reactions")

  }
};
