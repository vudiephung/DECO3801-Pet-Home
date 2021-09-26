import express from 'express';
import mongoose from 'mongoose';

import verifyAccess from './middleware/authMiddleware';
import authRouter from './routes/authRoutes';
import adoptionRouter from './routes/adoptionRoutes';

const app = express();

app.set('trust proxy', 'loopback'); // Setup to run on UQ cloud zone

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

mongoose
  .connect('mongodb://127.0.0.1:27017/pet-home-production', {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    // Port 8081 to run on UQ cloud zone
    app.listen(8081, () => {
      console.log('Server is running.');
    });
  });

app.get('/', verifyAccess, (req, res) => {
  res.send('Hello World!');
});

app.use(authRouter);

app.use(adoptionRouter);
