'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Slides_Event", {
     
      eventId: Sequelize.INTEGER(11),
      slideId: Sequelize.INTEGER(11),

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE

    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Slides_Event")

  }
};
