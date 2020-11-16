'use strict';
/* *** Bentuk object untuk document *** */
/* doc = {
 *  filename : Val, // dari awal, nama file
 *  konten : Val, // dari awal, isi dokumen yang udah di-stem dan diapus stopwords-nya
 *  kontenOriginal: Val, // dari awal, isi dokumen asli
 *  vektor : Val, // ditambah di tengah, vektor dari dokumen
 *  similarity : Val, // ditambah di tengah, hasil cosine similarity
 *  firstSentence : Val, // ditambah di tengah, kalimat pertama tiap dokumen
 * },
 *
 * untuk menyimpan kata-kata pada query, akan digunakan suatu list of
 * strings
 * queryWords = [Q1, Q2, Q3, ...]
 */

/* *** Imports *** */
// npm library
const sastrawi = require('sastrawijs');
const stopwords = require('./stopwords');
const parsedoc = require('./parsedoc');

// other js files in this project
const stopwordsID = stopwords.stopwordsID;

/* *** global variables *** */
let termDictionary = [];

/**
 * Fungsi untuk membersikan string dari punctuation dan merapihkan kata-kata
 * (menge-stem).
 * @param {string} string - string yang ingin di-stem
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
 * @param {string} string - string yang ingin di-stopword
 * @returns {string} string yang stopwordnya sudah dibuang jauh jauh.
 */
const removeStopwords = (string) => {
  let hasil = [];
  let count = 0;
  let kata = string.split(' ');

  // Ngitung kata bukan stopword (bersih)
  for (let j = 0; j < kata.length && !count; j++) {
    let stopword = kata[j].split('.').join('');
    if (!stopwordsID.includes(stopword)) {
      // Kata tidak ada di stopword
      count++;
    }
  }

  // Masukin kata yg buka stopwrod ke hasil
  for (let i = 0; i < kata.length; i++) {
    let katabersih = kata[i].split('.').join('');
    if (!stopwordsID.includes(katabersih) || count == 0) {
      hasil.push(katabersih);
    }
  }

  return hasil.join(' ');
};

/**
 * Fungsi yang menggabungkan stemming dan penghapusan stopwords
 * @params {string} str - string yang ingin dibershikan
 * @Returns {string} - str yang sudah dibershikan
 */
const cleanString = (str) => {
  str = stemString(str);
  str = removeStopwords(str);
  str.trim(); // Biar ga ada spasi di blkg atau di depan

  return str;
};

/**
 * Fungsi untuk menghapus escape character: \n, \t, \r, serta whitespace (\s)
 * berlebihan.
 * @params {String} str - string yang ingin dibersihkan
 * @Returns {String} str yang sudah dibersihkan
 */
const removeEscapeChr = (str) => {
  const escapeChrRE = /(\n|\r|\t)/g; // RE untuk karakter \n, \t, \r
  const whitespaceRE = /\s\s+/g; // RE untuk spasi yg muncul lebih dari satu kali
  str = str.replace(escapeChrRE, ' ');
  str = str.replace(whitespaceRE, ' ');
  return str;
};

/**
 * Fungsi untuk menambahkan kata-kata pada str ke dalam database (dalam hal
 * ini, adalah variabel global termDictionary)
 * @param {String} str - string yang kata-katanya ingin ditambahkan ke databse
 */
const addToTermDict = (str) => {
  str = str.split(' ');
  str.forEach((word) => {
    if (!termDictionary.includes(word)) termDictionary.push(word);
  });
};

/**
 * Fungsi untuk mengubah menjadi javascript object.
 * Javascript object memiliki kata dalam string sebagai key dan
 * jumlah kemunculan kata dalam string sebaga value.
 * @param {string} query - String yang ingin diubah menjadi javascript object.
 * @returns {object} - Object JS berisi pasangan string dan kemunculannya pada query.
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
 * Membuat object dokumen yang key-nya dari kata-kata pada query dan valuenya
 * adalah jumlah kemunculan kata-kata pada konten dokumen
 * @params {string} docContent - konten dokumen
 * @params {string[]} queryWordList - list kata-kata pada dokumen
 * @Returns {object} - sesuai pada deskripsi fungsi
 */
const createDocQueryObj = (docContent, wordList) => {
  const docObj = toObj(docContent);
  const retObj = {};

  for (const key of wordList) {
    // kalau 'key' ada di dokumen, maka banyaknya akan disalin ke dalam object,
    // jika tidak maka akan disalin nilai 0
    retObj[key] =
      key in docObj && !retObj.hasOwnProperty(key) ? docObj[key] : 0;
  }

  //console.log(retObj);
  return retObj;
};

/**
 * Fungsi untuk menge-sort similarity dari object-object dokumen pada suatu list
 * of objects. Property similarity akan disort secara descending dari besar
 * ke kecil.
 * @param {object[]} arrObj - list of objects yang akan di-sort similarity-nya
 * @returns void
 */
const sortSimilaritiesDsc = (arrObj) => {
  arrObj.sort((a, b) => b.similarity - a.similarity);
};

/**
 * Fungsi untuk membuat kalimat pertama dari suatu string
 * @param {String} str - string yang ingin dibuat jadi kalimat pertama
 * @Returns String kalimat pertama dari str
 */
const makeFirstSentence = (str) => {
  const period = '.';
  const charCount = 100;

  let existsPeriod = false;
  let i = 0;
  for (; i < str.length && !existsPeriod; ++i) {
    const chr = str[i];
    if (chr === period) {
      existsPeriod = true;
    }
  }

  // Banyak karakter tidak sampai charCount dan tidak ada period
  if (str.length <= charCount && !existsPeriod) return str;
  // banyak karakter melebihi charCount atau ada priod
  else if (!existsPeriod || i > charCount)
    // potong lalu tambahkan elipsis
    return `${str.slice(0, charCount)}...`;
  // ada period dan banyak karakter kurang dari charCount
  else return str.slice(0, i);
};

/**
 * Melakukan perkalian dot vektor dengan asumsi panjang array val v2 sama
 * dengan panjang array val v1, yang digunakan adalah panjang array val v1.
 * @param {object} v1 - vektor pertama yang ingin dikalikan
 * @param {object} v2 - vektor kedua yang ingin dikalikan
 * @returns {number} hasil perkalian dot v1 dan v2
 */
const countDotProd = (v1, v2) => {
  let dot = 0;
  for (let i = 0; i < v1.length; ++i) dot += v1[i] * v2[i];

  return dot;
};

/**
 * Menghitung cosine similarity dari query dan dokumen
 * Asumsi panjang vektor Q dan D sama
 * @param {vector} Q - vektor Query
 * @param {vector} D - vektor Dokumen
 * @returns {float} - similarity
 */
const cosineSim = (Q, D) => {
  //let dotproduct = 0; // Q . D
  const dotproduct = countDotProd(Q, D); // Q . D
  let mQ = 0; // ||Q||
  let mD = 0; // ||D||

  // mencari hasil penjumlahan kuadrat tiap elemen di Q dan D
  for (let i = 0; i < Q.length; i++) {
    mQ += Q[i] * Q[i];
    mD += D[i] * D[i];
  }

  // menghitung panjang vetkor Q dan D
  mQ = Math.sqrt(mQ);
  mD = Math.sqrt(mD);

  //console.log({ dotproduct: dotproduct, mQ: mQ, mD: mD });
  return dotproduct / (mQ * mD); // rumus cosine sim
};

/**
 * Fungsi untuk mengubah suatu object menjadi vektornya berdasarkan
 * @param {Object} obj - object yang ingin diubah menjadi vektor
 * @returns vektor dari object
 *
 * @example toVector({'ekonomi': 1, 'korupsi': 2}) === [1, 2]
 */
const toVector = (obj) => {
  let list = Object.values(obj);
  return list;
};

/**
 * Fungsi untuk memeriksa apakah di suatu list dokumen sudah memiliki dokumen
 * dengan **nama** yang sama
 * @param {Array} list - list dokumen yang ingin diperiksa
 * @param {Object} obj - object file yang ingin diperiksa
 * @Returns suatu nilai Boolean, true jika obj ada di list, false jika tidak
 */
exports.containsFile = (list, obj) => {
  for (let i = 0; i < list.length; ++i) {
    const el = list[i];
    if (el.fileName === obj.fileName) {
      return true;
    }
  }

  return false;
};

/* ========== MAIN =========== */
/**
 * Fungsi proses yang digunakan untuk menguji algoritma pencarian
 * @params {string} query - query search
 * @returns - object hasil pemrosesan query dan dokumen
 */
exports.testProcess = (query) => {
  /* *** SETUP UNTUK TESTING *** */
  const filePath = 'test/';
  const docs = parsedoc.readAllDoc(filePath);
  /* *** END SETUP *** */
  termDictionary = [];

  const cleanQuery = cleanString(query);
  const queryWords = cleanQuery.split(' ');
  let queryUniqueWords = [];
  queryWords.forEach((e) => {
    if (!queryUniqueWords.includes(e)) queryUniqueWords.push(e);
  });
  addToTermDict(cleanQuery);

  docs.forEach((el) => {
    el.konten = cleanString(el.kontenOriginal);
    el.firstSentence = makeFirstSentence(removeEscapeChr(el.kontenOriginal));

    addToTermDict(el.konten);
  });

  const queryVec = toVector(createDocQueryObj(query, termDictionary));

  docs.forEach((el) => {
    el.vector = toVector(createDocQueryObj(el.konten, termDictionary));
    el.similarity = cosineSim(queryVec, el.vector);
  });

  sortSimilaritiesDsc(docs);

  console.log(docs);
  const queryObj = {
    query: query, // query original (yg dikirim user)
    cleanQuery: cleanQuery, // query yg udh dibersihin (udh di-stem, diapusin stopwords)
    queryWords: queryWords, // list of kata-kata query yang udh dibersihin
    uniqueWords: queryUniqueWords, // kata-kata unik pada query
    vector: queryVec, // jumlah kemunculan tiap kata pada query yg koresponden dengan kamus kata
  };
  return { docs: docs, query: queryObj };
};

/**
 * Fungsi proses yang digunakan untuk menguji algoritma pencarian
 * @params {string} query - query search
 * @params {object[]} docs - berisi object dokumen
 * @returns object hasil pengolahan pada docs dan query
 */
exports.mainProcess = (query, docs) => {
  termDictionary = [];

  const cleanQuery = cleanString(query);
  const queryWords = cleanQuery.split(' ');
  let queryUniqueWords = [];
  queryWords.forEach((e) => {
    if (!queryUniqueWords.includes(e)) queryUniqueWords.push(e);
  });
  addToTermDict(cleanQuery);

  docs.forEach((el) => {
    el.konten = cleanString(el.kontenOriginal);
    el.firstSentence = makeFirstSentence(removeEscapeChr(el.kontenOriginal));

    addToTermDict(el.konten);
  });

  const queryVec = toVector(createDocQueryObj(cleanQuery, termDictionary));

  docs.forEach((el) => {
    el.vector = toVector(createDocQueryObj(el.konten, termDictionary));
    el.similarity = cosineSim(queryVec, el.vector);
  });

  sortSimilaritiesDsc(docs);

  //console.log(docs);
  const queryObj = {
    query: query, // query original (yg dikirim user)
    cleanQuery: cleanQuery, // query yg udh dibersihin (udh di-stem, diapusin stopwords)
    queryWords: queryWords, // list of kata-kata query yang udh dibersihin
    uniqueWordsList: queryUniqueWords, // kata-kata unik pada query
    uniqueWordsOnly: queryUniqueWords.join(' '),
    vector: queryVec, // jumlah kemunculan tiap kata pada query yg koresponden dengan kamus kata
  };
  console.log(queryObj);

  return { docs: docs, query: queryObj };
};
