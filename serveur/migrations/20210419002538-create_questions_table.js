'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Questions", {
      questionId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,

      },
      question: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      answers: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      // pollId: Sequelize.INTEGER(11),

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE

    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Questions")

  }
};
