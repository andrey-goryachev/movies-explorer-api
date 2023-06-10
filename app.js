const express = require('express');

const PORT = 3000;
const app = express();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Приложение запущено, порт ${PORT}`);
});
