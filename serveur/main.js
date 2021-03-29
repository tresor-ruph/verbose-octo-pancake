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
})
dotenv.config();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
const apiRoutes = require('./routes')(app)

// app.use(express.static(path.join(__dirname, 'build')));
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(8000, () => {
  console.log(`your server is running on port ${8000}`);
});

module.exports = app;
