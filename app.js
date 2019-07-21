import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import config from './config/database';
import cors from 'cors';
import bodyParser from 'body-parser';
 
const app = express();

app.use(cors());
app.options('*', cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
const routes = require('./routes/routes.js');
app.use("/", routes);

app.get('/', function(req, res) {
  res.send('Page under importruction.');
});

mongoose.connect(config.database, { useNewUrlParser: true });

app.listen(8081, () => {
  console.log('Server is listening on: ' + 8081);
});

module.exports = app;