'use strict';
/* *** Imports *** */
// npm libraries
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const axios = require('axios');

/**
 * Fungsi untuk melakukan ekstraksi HTML dari suatu situs yang diberikan oleh
 * URL
 * @param {String} url - alamat ke situs yang ingin di-scrape
 * @param {String} filter - penyaring berdasarkan tag, nama class, atau id
 * @param {String} filterMethod - metode penyaringan, tag, class, atau id
 * @Returns String isi dokumen HTML dari situs yg dituju yang sudah discrap dan
 * digabungkan
 */
exports.extractHTML = async (url, filter, filterMethod) => {
  let retVal = '';
  try {
    const body = await axios.get(url);

    // Kalau berhasil melakukan request dan mendapatkan HTML-nya dari situs
    const dom = new JSDOM(body.data);

    // Mengoptimalisasikan filter
    filter = filter.split(',');
    switch (filterMethod) {
      /* tag
       * id
       * class */
      case 'id':
        for (const i in filter) filter[i] = `#${filter[i].trim()}`; // menambhkan # jika difilter berdasarkan id
        break;
      case 'class':
        for (const i in filter) filter[i] = `.${filter[i].trim()}`; // menambhkan . jika difilter berdasarkan class
        break;
    }
    filter = filter.join(',');

    // mengambil dan menggabungkan isi dokumen
    dom.window.document.querySelectorAll(filter).forEach((e) => {
      retVal += e.textContent + '\n';
    });

    //console.log(retVal);
    return retVal;
  } catch (e) {
    // jika ada kesalahan saat konek
    console.error(e);
  }
};
