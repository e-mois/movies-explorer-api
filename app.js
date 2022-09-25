require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const movieRouter = require('./routes/movieRoutes');
const { auth } = require('./middlewares/auth');
const getErrorMessage = require('./middlewares/getErrorMessage');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsMW = require('./middlewares/cors');
const NotFound = require('./errors/NotFound');
const { loginValidator, createUserValidator } = require('./middlewares/validation');
const { createUser, login } = require('./controllers/users');
const { errors } = require('celebrate');

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect(process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());

app.use(corsMW);

app.post('/signup', createUserValidator, createUser);
app.post('/signin', loginValidator, login);

app.use(auth);
app.use('/users', userRouter);
app.use('/movies', movieRouter);
app.use('*', (res, req, next) => {
  next(new NotFound('Страница не найдена'));
});
app.use(errorLogger);

app.use(errors());

app.use(getErrorMessage);

app.listen(PORT);
