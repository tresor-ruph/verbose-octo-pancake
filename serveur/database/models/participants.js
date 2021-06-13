const Sequelize = require('sequelize');
const dbConnection = require('../dbConnection')
module.exports = dbConnection.define("Audience", {


    audAddress: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    pseudo: {
        type: Sequelize.STRING,
        allowNull: true,

    },
    questionIndex: {
        type: Sequelize.INTEGER,
        allowNull: false,

    }

},

)



