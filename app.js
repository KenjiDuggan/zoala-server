const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/database');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.options('*', cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(function(err, req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
app.set('view engine', 'jade');
require("./routes/routes")(app);

app.get('/', function(req, res) {
  res.send('Page under construction.');
});

mongoose.connect(config.database, { useNewUrlParser: true });

app.listen(8081, () => {
  console.log('Server is listening on: ' + 8081);
});

