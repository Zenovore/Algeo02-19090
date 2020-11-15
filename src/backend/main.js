'use strict';

/* *** Imports *** */
// from npm library
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bp = require('body-parser');

// from other js files in this project
const proc = require('./process');
const parsedoc = require('./parsedoc');
const scraper = require('./scraper');

/* *** Global variables *** */
const GFileDir = './src/frontend/public/uploads/'; // path ke tempat upload
let GFilesList = []; // List files objects

// konfigurasi server express baru
const serverConfig = {
  PORT: process.env.TUBES_PORT || '42069',
  IP: process.env.TUBES_IP || '127.0.0.1',
};

// Inisialisasi instance express baru
const app = express();

// setup middleware untuk express
app.use(express.static(path.join(__dirname, '../frontend/')));
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

/**
 * Routing ke API searching
 */
app.get('/search', (req, res) => {
  const query = req.query.q.toLowerCase();

  const hasil = proc.mainProcess(query, GFilesList);

  res.set('Access-Control-Allow-Origin', '*');
  //res.send(query);
  return res.json(hasil);
});

/**
 * Routing ke API pengujian searching
 */
app.get('/test', (req, res) => {
  const query = req.query.q;

  const hasil = proc.testProcess(query);

  res.set('Access-Control-Allow-Origin', '*');
  return res.json(hasil);
});

/**
 * Routing ke API web scaper
 */
app.post('/scraper', async (req, res) => {
  // hayolo tiba2 angkatan 19 dipanggil
  const result = await scraper.extractHTML(
    req.body.url,
    req.body.filter,
    req.body.filterMethod
  );

  console.log(result);
  res.send(result);
});

/**
 * Routing ke start-page
 */
app.get('/', (req, res) => {
  //res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
  res.send('Hi');
});

/**
 * filter file untuk multer
 */
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
    let dir = GFileDir;
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
 * Routing ke API upload file
 */
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
      const fileDir = GFileDir;
      console.log(`Received ${req.files.length} files`);
      console.log(req.files, '\n');

      // masukin file ke list

      req.files.forEach((f) => {
        const parsed = parsedoc.parseDoc(path.join(fileDir, f.filename));
        if (!proc.containsFile(GFilesList, parsed)) GFilesList.push(parsed);
      });

      //return res.redirect('/');
      return res.send(
        'Dah berhasil ya' + '\n<hr/><a href="/">Upload more files</a>'
      );
    } else if (err instanceof multer.MulterError) {
      res.statusCode(500);
      return res.send(err);
    } else if (err) {
      res.statusCode(500);
      return res.send(err);
    }
  });
});

app.listen(serverConfig.PORT, () => {
  console.log(`App running at http://${serverConfig.IP}:${serverConfig.PORT}`);
});
