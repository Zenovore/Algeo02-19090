'use strict';

const express = require('express');
const vector = require('./vector');
const query = require('./query');

const app = express();

const config = {
  PORT: process.env.TUBES_PORT || '8080',
  IP: process.env.TUBES_IP || '127.0.0.1',
};

app.get('/search', (req, res) => {
  const obj = query.toObj(req.query.q);
  let vec = new vector.Vector(obj);
  console.log(vec._key);
  console.log(vec._val);
  res.json(vec._dict);
});

app.get('/', (req, res) => {
  if (req.query.name) {
    res.send(`Hello, ${req.query.name}`);
  } else {
    res.send('Hello, World!');
  }
});

app.listen(config.PORT, () => {
  console.log(`App running at http://${config.IP}:${config.PORT}`);
});
