const Sequelize = require("sequelize");
const dotenv = require('dotenv');


  dotenv.config()
  const dbConnection = new Sequelize(
    "bl67mfnvtkaiutazhidc",
    "bl67mfnvtkaiutazhidc-mysql.services.clever-cloud.com",
    "Xp9EOg0B7aYZrsK8e1nG",
    {
      host: "bl67mfnvtkaiutazhidc-mysql.services.clever-cloud.com",
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






