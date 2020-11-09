'use strict';

/* TODO:
 * [ ] comments
 */

/**
 * Vektor dari object kata-kata
 * @class Vector
 */
class Vector {
  /**
   * Contructor untuk vektor
   * @param {object} obj - object kata-kata untuk diubah menjadi vektor
   */
  constructor(obj) {
    let vals = [];
    let keys = [];

    // Memasukkan key dan value ke ke masing-masing array
    for (const key in obj) {
      vals.push(obj[key]);
      keys.push(key);
    }

    // Ngeset atribut/member vektor
    this.val = vals;
    this.obj = obj;
    this.key = keys;
  }

  /**
   * Mengubah vektor yang memanggil menjadi mirip dengan vQuery
   * (keys pada array keys dan member obj, lalu mencocokkan array values
   * dengan keys baru)
   * @param {object} vQuery - Vektor patokan
   * @returns {void}
   */
  toQueryKeys(vQuery) {
    let newObj = {};
    let keys = [];
    let vals = [];

    // Iterasi setiap key di dalam object vQuery
    for (const key in vQuery.obj) {
      // Memasukkan key ke array keys
      keys.push(key);
      // Kalau key ada di object vektor document, tinggal copy aja dari sana
      if (key in this.obj) {
        newObj[key] = this.obj[key];
        vals.push(this.obj[key]);
      } else {
        // Kalo ga ada, masukin aja 0
        newObj[key] = 0;
        vals.push(0);
      }
    }

    // Ngubah atribut/member vektor
    this.obj = newObj;
    this.key = keys;
    this.val = vals;
  }

  /**
   * Melakukan perkalian dot vektor dengan asumsi panjang array val v2 sama
   * dengan panjang array val v1, yang digunakan adalah panjang array val v1.
   * @param {object} v1 - vektor pertama yang ingin dikalikan
   * @param {object} v2 - vektor kedua yang ingin dikalikan
   * @returns {number} hasil perkalian dot v1 dan v2
   */
  static dotProd(v1, v2) {
    let dot = 0;
    for (let i = 0; i < v1.vals.length; ++i) dot += v1.vals[i] * v2.vals[i];

    return dot;
  }
}

/*** Untuk Pengujian ***/
/*
const query = require('./query');
let vecQuery = new Vector(
  query.toObj('Korupsi besar atau kecil tetap saja korupsi.')
);
let vecDoc = new Vector(
  query.toObj(
    'Menteri olahraga meminta maaf atas perbuatan korupsi. Menteri tersebut terlibat korupsi anggaran. Meminta-minta komisi termasuk korupsi. Korupsi sudah mandarah daging di Indonesia. Korupsi sudah menjadi budaya.'
  ),
  vecQuery
);

vecDoc.toQueryKeys(vecQuery);
console.log({ vecDoc: vecDoc, vecQuery: vecQuery });
*/

exports.Vector = Vector;
