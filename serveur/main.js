const dependencies = require('./dependency')
const dbConnection = require('./infrastructure/orm/dbConnection');

const app = dependencies.express();
dbConnection.authenticate().then(() => {
  console.log('connection succesfull');
})
dependencies.dotenv.config();

app.use(dependencies.bodyParser.json({ limit: "50mb" }));
app.use(dependencies.bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
const apiRoutes = require('./frameworks/web/routes')(app,dependencies)

app.use(dependencies.express.static(dependencies.path.join(__dirname, 'build')));
app.get('/', (req, res) => {
  res.sendFile(dependencies.path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`your server is running on port ${process.env.PORT}`);
});

module.exports = app;
