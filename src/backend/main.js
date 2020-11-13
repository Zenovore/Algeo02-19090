'use strict';

/**
 * Imports
 */
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const proc = require('./process');
const parsedoc = require('./parsedoc');

const GFilesList = []; // List files objects

// konfigurasi server express baru
const serverConfig = {
  PORT: process.env.TUBES_PORT || '8080',
  IP: process.env.TUBES_IP || '127.0.0.1',
};

// Inisialisasi instance express baru
const app = express();

app.use(express.static(path.join(__dirname, '../frontend/')));

/**
 * Routing untuk memberikan query search
 */
app.get('/search', (req, res) => {
  const query = req.query.q.toLowerCase();

  proc.mainProcess(query, GFilesList);

  res.send(query);
});

/**
 * Routing untuk menguji searching
 */
app.get('/test', (req, res) => {
  const query = req.query.q;

  proc.testProcess(query);

  res.send(query);
});

/**
 * Routing ke start-page
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const filterfile = function (req, file, cb) {
  // Accept txt or html only
  if (!file.originalname.match(/(txt|html)$/i)) {
    req.fileValidationError = 'Punten ka, file .txt atau html aja ya';
    return cb(new Error('Punten ka, file .txt atau html aja ya'), false);
  }
  cb(null, true);
};

/**
 * Nyiapin storage untuk multer
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dir = './uploads';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

/**
 * Routing untuk nerima upload
 * TODO: Cek bisa ga tiap abis upload file-nya lgsg diproses lalu
 * ditambah ke list */
let upload = multer({ storage: storage, fileFilter: filterfile }).array(
  'files',
  15
);
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (req.files) {
      // File berhasil diterima
      const fileDir = './uploads';
      console.log(`Received ${req.files.length} files`);
      console.log(req.files, '\n');

      // masukin file ke list

      req.files.forEach((f) => {
        GFilesList.push(parsedoc.parseDoc(path.join(fileDir, f.filename)));
      });

      //console.log(GFilesList);

      res.redirect('/');
      //return res.send(
      //'Dah berhasil ya' + '\n<hr/><a href="/">Upload more files</a>'
      //);
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }
  });
});

app.listen(serverConfig.PORT, () => {
  console.log(`App running at http://${serverConfig.IP}:${serverConfig.PORT}`);
});
