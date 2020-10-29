'use strict';

/**
 * Imports
 */
const express = require('express');
const vector = require('./vector');
const query = require('./query');

// konfigurasi server express baru
const serverConfig = {
  PORT: process.env.TUBES_PORT || '8080',
  IP: process.env.TUBES_IP || '127.0.0.1',
};

// Inisialisasi instance express baru
const app = express();

/**
 * Routing untuk memberikan query
 */
app.get('/search', (req, res) => {
  const obj = query.toObj(req.query.q);
  let vec = new vector.Vector(obj);
  console.log({ val: vec.val, key: vec.key });
  res.json(vec.obj);
});

/**
 * Routing ke start-page
 */
app.get('/', (req, res) => {
  if (req.query.name) {
    res.send(`Hello, ${req.query.name}`);
  } else {
    res.send('Hello, World!');
  }
});

/**
 * Nge-start instance express
 */
app.listen(serverConfig.PORT, () => {
  console.log(`App running at http://${serverConfig.IP}:${serverConfig.PORT}`);
});
