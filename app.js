const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const {
  DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  PORT = 3000,
} = process.env;

const app = express();
mongoose.connect(DB_ADDRESS, { autoIndex: true });

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Приложение запущено, порт ${PORT}`);
});
