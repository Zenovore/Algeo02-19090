'use strict';
const sastrawi = require('sastrawijs');

/**
 * Fungsi untuk membersikan string dari punctuation dan merapihkan kata-kata
 * (menge-stem).
 * @param {string} - string yang ingin di-stem
 * @returns {string[]} - Array yang tiap elemen adalah kata dari string yang
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

  return stemmed;
};

/**
 * Fungsi untuk mengubah menjadi javascript object.
 * Javascript object memiliki kata dalam string sebagai key dan
 * jumlah kemunculan kata dalam string sebaga value.
 * @param {string} query - String yang ingin diubah menjadi javascript object.
 * @returns {object} Object JS berisi string dan kemunculannya pada query.
 */
const toObj = (query) => {
  let obj = {};
  // Nge-stem string dulu
  const stemmedQuery = stemString(query);

  // Masukan kata-kata ke object
  for (const i in stemmedQuery) {
    let word = stemmedQuery[i];
    // Kalo belom ada di obj jadi 1, kalo udh ada ditambah 1
    obj[word] = word in obj ? obj[word] + 1 : 1;
  }

  return obj;
};

exports.toObj = toObj;
