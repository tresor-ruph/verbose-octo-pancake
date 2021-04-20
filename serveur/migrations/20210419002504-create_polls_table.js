'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Polls", {
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
        allowNull: true,

      },
      // eventId: Sequelize.INTEGER(11),

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Polls")

  }
};
