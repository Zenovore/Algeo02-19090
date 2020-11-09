'use strict';

/**
 * Imports
 */
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});



const filterfile = function(req, file, cb) {
  // Accept txt or html only
  if (!file.originalname.match(/\.(txt|html)$/i)) {
      req.fileValidationError  = 'Punten ka, file .txt atau html aja ya';
      return cb(new Error('Punten ka, file .txt atau html aja ya'), false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      let dir = "./uploads";
      if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
      }
      cb(null,dir)
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
      cb(null, file.originalname);
  }
})

let upload = multer({storage : storage,fileFilter : filterfile}).array('files',10);
app.post("/upload", (req,res)=>{
  upload(req,res, (err) =>{
      if (req.fileValidationError){
          return res.send(req.fileValidationError);
      }
      else if (req.files){
          console.log(req.files);
          return res.send('Dah berhasil ya'+'\n<hr/><a href="./">Upload more files</a>');
      }
      else if (err instanceof multer.MulterError) {
          return res.send(err);
      }
      else if (err) {
          return res.send(err);
      }
  })
});

app.listen(serverConfig.PORT, () => {
  console.log(`App running at http://${serverConfig.IP}:${serverConfig.PORT}`);
});
