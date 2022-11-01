require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const user = require('./routes/users');
const card = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const cors = require('./middlewares/cors');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-error');
const { loginValidation, createUserValidation } = require('./middlewares/user-celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);

app.use(auth);

app.use('/users', user);
app.use('/cards', card);
app.use('*', (req, res, next) => {
  next(new NotFoundError('«Запрашиваемый путь не найден»'));
});

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  // console.log(`Содержание ошибки: ${err}`);
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`backend запущен на: ${PORT} порту`);
});
