require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const userRouter = require('./routes/userRoutes');
const movieRouter = require('./routes/movieRoutes');
const { auth } = require('./middlewares/auth');
const getErrorMessage = require('./middlewares/getErrorMessage');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const NotFound = require('./errors/NotFound');
const authRouter = require('./routes');
const { BASE_URL_DEV } = require('./utils/devConstants');

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect(process.env.NODE_ENV === 'production' ? process.env.BASE_URL : BASE_URL_DEV, {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());

app.use(cors);

app.use(authRouter);
app.use(auth);
app.use(userRouter);
app.use(movieRouter);
app.use('*', (res, req, next) => {
  next(new NotFound('Страница не найдена'));
});
app.use(errorLogger);

app.use(errors());

app.use(getErrorMessage);

app.listen(PORT);
