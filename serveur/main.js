const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const dbConnection = require('./infrastructure/orm/dbConnection');

const app = express();
dbConnection.authenticate().then(() => {
  console.log('connection succesfull');
})
dotenv.config();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
const apiRoutes = require('./frameworks/web/routes')(app)

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`your server is running on port ${process.env.PORT}`);
});

module.exports = app;
