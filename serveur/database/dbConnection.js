const Sequelize = require("sequelize");
const dotenv = require('dotenv');

dotenv.config();

const dbPort = process.env.MYSQL_ADDON_PORT ? parseInt(process.env.MYSQL_ADDON_PORT, 10) : 3306;

const dbConnection = new Sequelize(
  process.env.MYSQL_ADDON_DB,
  process.env.MYSQL_ADDON_USER,
  process.env.MYSQL_ADDON_PASSWORD,
  {
    host: process.env.MYSQL_ADDON_HOST,
    port: dbPort,
    dialect: 'mysql',
    logging: false,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 }
  }
);

dbConnection.sync()
  .then(() => { console.log("All tables synced"); })
  .catch((err) => { console.error("Error syncing tables:", err); });

module.exports = dbConnection;
