const Sequelize = require('sequelize');
const dbConnection = require('../dbConnection')
module.exports = dbConnection.define("Slides", {

    slideId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,

    },
    link: {
        type: Sequelize.STRING,
        allowNull: false,
    },
   
},

)



