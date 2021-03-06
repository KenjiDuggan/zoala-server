import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import config from './config/database';
import cors from 'cors';
import bodyParser from 'body-parser';
import decode from 'jwt-decode';
import {GoalRouter} from './routes/goal.js';
import {MuscleRouter} from './routes/muscle.js';
import {SleepRouter} from './routes/sleep.js';
import {UserRouter} from './routes/user.js';
import {FoodRouter} from './routes/food.js';
import {CardioRouter} from './routes/cardio.js';
 
const app = express();

app.use(cors());
app.options('*', cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/auth/', UserRouter);
app.use('/api/goal/', GoalRouter);
app.use('/api/muscle/', MuscleRouter);
app.use('/api/cardio/', CardioRouter);
app.use('/api/food/', FoodRouter);
app.use('/api/sleep/', SleepRouter);

app.get('/', function(req, res) {
  res.send('Page under construction.');
});

mongoose.set('useCreateIndex', true);
mongoose.connect(config.database, { useNewUrlParser: true });

app.listen(8081, () => {
  console.log('Server is listening on: ' + 8081);
});
