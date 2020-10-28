'use script';

/* TODO:
 * [ ] Jsdoc comments
 */

module.exports = class Vector {
  #arr = [];
  #dict = {};

  constructor(obj) {
    let fromObj = [];

    for (const val in obj) {
      fromObj.push(obj[val]);
    }

    this.#arr = fromObj;
    this.#dict = obj;
  }
};
