/* *** Bentuk object untuk document *** */
/* doc = {
 *  filename : Val, // dari awal
 *  konten : Val, // dari awal
 *  kontenOriginal: Val, // dari awal
 *  vektor : Val, // ditambah di tengah
 *  similarity : Val, // ditambah di tengah
 *  firstSentence : Val, // ditambah di tengah
 * },
 *
 * untuk menyimpan kata-kata pada query, akan digunakan suatu list of
 * strings
 * queryWords = [Q1, Q2, Q3, ...]
 */

const sastrawi = require('sastrawijs');
const stopwords = require('./stopwords');
const parsedoc = require('./parsedoc');

const stopwordsID = stopwords.stopwordsID;

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
  str.trim();

  return str;
};

/**
 * Fungsi untuk menghapus escape character: \n, \t, \r, serta whitespace (\s)
 * berlebihan.
 * @params {String} str - string yang ingin dibersihkan
 * @Returns {String} str yang sudah dibersihkan
 */
const removeEscapeChr = (str) => {
  const escapeChrRE = /(\n|\r|\t)/g;
  const whitespaceRE = /\s\s+/g;
  str = str.replace(escapeChrRE, ' ');
  str = str.replace(whitespaceRE, ' ');
  return str;
};

/**
 * TODO: comment
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
    retObj[key] = key in docObj ? docObj[key] : 0;
  }

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
  const pemisah = '.';
  const charCount = 100;

  let existsPeriod = false;
  let i = 0;
  for (; i < str.length && !existsPeriod; ++i) {
    const chr = str[i];
    if (chr === pemisah) {
      existsPeriod = true;
    }
  }

  if (str.length <= charCount && !existsPeriod) return str;
  else if (!existsPeriod || i > charCount)
    return `${str.slice(0, charCount)}...`;
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

  for (i = 0; i < Q.length; i++) {
    mQ += Q[i] * Q[i];
    mD += D[i] * D[i];
  }

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
 * TODO: comment
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
 */
exports.testProcess = (query) => {
  /* *** SETUP UNTUK TESTING *** */
  const filePath = 'test/';
  const docs = parsedoc.readAllDoc(filePath);
  /* *** END SETUP *** */
  termDictionary = [];

  query = cleanString(query);
  addToTermDict(query);

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
  return docs;
};

/**
 * Fungsi proses yang digunakan untuk menguji algoritma pencarian
 * @params {string} query - query search
 * @params {object[]} docs - berisi object dokumen
 */
exports.mainProcess = (query, docs) => {
  termDictionary = [];

  query = cleanString(query);
  addToTermDict(query);

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
  return docs;
};
