'use strict';

/* *** Bentuk object untuk document *** */
/* doc = {
 *  filename : Val, // dari awal
 *  konten : Val, // dari awal
 *  vektor : Val, // ditambah di tengah
 *  similarity : Val, // ditambah di tengah
 * },
 *
 * untuk menyimpan kata-kata pada query, akan digunakan suatu list of
 * strings
 * queryWords = [Q1, Q2, Q3, ...]
 */

const sastrawi = require('sastrawijs');
const stopwords = require('./stopwords');

const stopwordsID = stopwords.stopwordsID;
const stopwordsEN = stopwords.stopwordsEN;

/**
 * Fungsi untuk membersikan string dari punctuation dan merapihkan kata-kata
 * (menge-stem).
 * @param {string} - string yang ingin di-stem
 * @returns {string} Array yang tiap elemen adalah kata dari string yang
 * sudah di-stem
 */
const stemString = (string) => {
  // Inisialisasi stemmer, tokenizer, dan array untuk menampung strings
  let stemmed = [];
  const stemmer = new sastrawi.Stemmer();
  const tokenizer = new sastrawi.Tokenizer();

  // Mengubah string menjadi tokens lalu menge-stem-nya
  string = tokenizer.tokenize(string);
  for (const word of string) {
    stemmed.push(stemmer.stem(word));
  }

  return stemmed.join(' ');
};

/**
 * Fungsi untuk membersikan string dari stopwords dalam bahasa Indonesia
 * @param {string} - string yang ingin di-stopword
 * @returns {string} string yang stopwordnya sudah dibuang jauh jauh.
 */
const removeStopwords = (string) => {
  let hasil = [];
  let count = 0
  let kata = string.split(' ');
  for (let j=0;j<kata.length;j++){
    let stopword = kata[j].split('.').join('')
    if (!stopwordsID.includes(stopword)) {
      count++;
    }
  }
  for (let i = 0; i < kata.length; i++) {
    let katabersih = kata[i].split('.').join('');
    if (!stopwordsID.includes(katabersih)|| count==0) {
      hasil.push(katabersih);
    }
  }
  return hasil.join(' ');
};

/**
 * Fungsi untuk mengubah menjadi javascript object.
 * Javascript object memiliki kata dalam string sebagai key dan
 * jumlah kemunculan kata dalam string sebaga value.
 * @param {string} query - String yang ingin diubah menjadi javascript object.
 * @returns {object} Object JS berisi pasangan string dan kemunculannya pada query.
 */
const toObj = (query) => {
  let obj = {};

  // Masukan kata-kata ke object
  query = query.split(' ');
  for (const i in query) {
    let word = query[i];
    // Kalo belom ada di obj jadi 1, kalo udh ada ditambah 1
    obj[word] = word in obj ? obj[word] + 1 : 1;
  }

  return obj;
};


/**
 * Fungsi untuk menge-sort similarity dari object-object dokumen pada suatu list
 * of objects. Property similarity akan disort secara descending dari besar
 * ke kecil.
 * @param {object[]} - list of objects yang akan di-sort similarity-nya
 * @returns void
 */
const sortSimilaritiesDsc = (arrObj) => {
  arrObj.sort((a, b) => b.similarity - a.similarity);
};

/**
 * TODO: comments
 */
const createQueryWordList = (query) => {
  return query.split(' ');
};

/**
 * TODO: comments
 */
const cleanString = (str) => {
  str = stemString(str);
  str = removeStopwords(str);

  return str;
};

/**
 * Menghitung cosine similarity dari query dan dokumen
 * Asumsi panjang vektor Q dan D sama
 * @param {vector} Q - vektor Query
 * @param {vector} D - vektor Dokumen
 * @returns {float} - similarity
 */
const cosineSim = (Q, D) => {
  let dotproduct = 0; // Q . D
  let mQ = 0; // ||Q||
  let mD = 0; // ||D||
  for (i = 0; i < Q.length; i++) {
    dotproduct += Q[i] * D[i];
    mQ += Q[i] * Q[i];
    mD += D[i] * D[i];
  }
  mQ = Math.sqrt(mQ);
  mD = Math.sqrt(mD);
  let similarity = dotproduct / (mQ * mQ); // rumus cosine sim
  return similarity;
};

/**
 * 
 * 
 */
const toVector = (obj) =>{
  let list = Object.values(obj);
  return list;
}
