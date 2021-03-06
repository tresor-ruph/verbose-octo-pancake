const express = require('express');
const cors = require('cors')
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const dbConnection = require('./database/dbConnection');

const app = express();
app.use(cors())
dbConnection.authenticate().then(() => {
  console.log('connection succesfull');
}).catch(err=>console.log(err))
dotenv.config();
// dbConnection.sync({force: true})
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

const apiRoutes = require('./routes')(app)

app.listen(process.env.PORT, () => {
  console.log(`your server is running on port ${process.env.PORT}`);
});

module.exports = app;





