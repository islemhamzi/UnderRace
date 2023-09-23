import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';



import { notFoundError, errorHandler } from './middlewares/error-handler.js';




import bodyParser from 'body-parser';
import  carRoutes from './routes/car.js';
import trackRoutes from './routes/track.js';
import caracterRoutes from './routes/caracter.js';
import configurationRoutes from './routes/configuration.js';
import playerRoutes from './routes/player.js';
import authRoutes from './routes/auth.js';
import signupRoutes from './routes/signup.js';

import lobbyRoutes from './routes/lobbie.js';
import JoinLobbyRoutes from './routes/Joinlobby.js';

const app = express();
const port = process.env.PORT || 9090;
const databaseName = 'testest';
const db_url = process.env.DB_URL || `mongodb://127.0.0.1:27017`;

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`${db_url}/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
 // app.use('/img', express.static('public/images'));



app.use('/player',playerRoutes);
app.use('/car',carRoutes);
app.use('/track', trackRoutes);
app.use('/caracter', caracterRoutes);
app.use('/configuration', configurationRoutes);
app.use('/api/auth',authRoutes);
app.use('/signup',signupRoutes);   
app.use('/lobbie',lobbyRoutes);
app.use('/join',JoinLobbyRoutes);
app.use(notFoundError);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});