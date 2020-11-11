'use strict';

// import module
let fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
let DocList = [];

/**
 * Extract konten (body) dari HTML
 * @param {string} - dokumen HTML yang dibaca
 * @returns {string} - Body dari HTML tanpa <...>
 */
const extractHTML = (val) => {
  const acceptedTags = 'p, h1, h2, h3, h4, h5, h6';
  const dom = new JSDOM(val);
  let content1 = '';
  dom.window.document.querySelectorAll(acceptedTags).forEach((el) => {
    content1 += el.textContent;
  });

  return content1;
};

/**
 * Membuat ocument object dari nama file dan konten file
 * @param {string} - path ke file
 * @param {string} - isi file
 * @returns {object} -  Document objet dari file
 */
const createDoc = (name, konten) => {
  return {
    fileName: name,
    konten: konten,
  };
};

/**
 * Memparse dokumen dari .txt maupun .html (asynchronous)
 * @param {string} - path ke file
 * @returns {object} - Object doc {fileName: , konten: }
 */
const parseDoc = (filePath) => {
  // data adalah isi dari file
  let doc = {};
  let data = fs.readFileSync(filePath, { encoding: 'utf8' });
  let fileName = filePath.replace(/^.*[\\\/]/, '');
  if (fileName.split('.').pop() === 'txt') {
    doc = createDoc(fileName, data);
  } else {
    // Extract HTML kalo extensionnya HTML
    data = extractHTML(data);
    doc = createDoc(fileName, data);
  }
  return doc;
};

/**
 * Memparse semua file txt dan html pada sebuah directory
 * Jalanin setiap mau search
 * @param {string} - folder directory file-file
 * @returns {object[]} - list berisi object tiap file dokumen
 */
const readAllDoc = (fileDir) => {
  let filelist = fs.readdirSync(fileDir);
  for (let i = 0; i < filelist.length; i++) {
    DocList.push(parseDoc(fileDir + filelist[i]));
  }
  return DocList;
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

// var array1 = [1,0,0,1];
// var array2 = [1,0,0,0];

// var p = cosineSim(array1,array2);

// console.log(p);

//console.log(parseDoc('../../test/Lipsum.html'));
//console.log(parseDoc('../../test/Kuis1.txt'));
console.log(readAllDoc('../../test/'));

//exports.parseDoc = parseDoc;
