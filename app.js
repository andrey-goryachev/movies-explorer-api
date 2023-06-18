const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');
const { handleErrors } = require('./errors/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DB_ADDRESS, PORT } = require('./utils/consts');
const { limiter } = require('./middlewares/limiter');

mongoose.connect(DB_ADDRESS, { autoIndex: true });
const app = express();

app.use(limiter);
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Приложение запущено, порт ${PORT}`);
});
