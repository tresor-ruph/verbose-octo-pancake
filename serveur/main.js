const express = require('express');

const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const dbConnection = require('./infrastructure/orm/dbConnection')
const routes = require('./frameworks/web/routes')

const app = express();
dbConnection.authenticate().then(()=> {
  console.log('connection succesfull');
})
dotenv.config();
app.use('/api', routes())

app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api/test', (req, res) => res.send('hello world !'));

app.listen(process.env.PORT, () => {
  console.log(`your server is running on port ${process.env.PORT}`);
});

module.exports = app;
