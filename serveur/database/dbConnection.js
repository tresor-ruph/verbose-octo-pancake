const Sequelize = require("sequelize");
const dotenv = require('dotenv');


  dotenv.config()
  const dbConnection = new Sequelize(
    process.env.MYSQL_ADDON_DB,
    process.env.MYSQL_ADDON_USER,
    process.env.MYSQL_ADDON_PASSWORD,
    {
      host: process.env.MYSQL_ADDON_HOST,
      dialect: 'mysql',

      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }

    });

    module.exports= dbConnection






