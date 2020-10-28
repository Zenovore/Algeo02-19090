'use strict';

const express = require('express');
const app = express();

const config = {
  PORT: process.env.TUBES_PORT || '8080',
  IP: process.env.TUBES_IP || '127.0.0.1',
};

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(config.PORT, () => {
  console.log(`App running at http://${config.IP}:${config.PORT}`);
});
