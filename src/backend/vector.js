'use script';

/* TODO:
 * [ ] comments
 */

class Vector {
  _val = [];
  _key = [];
  _obj = {};

  constructor(obj) {
    let fromObj = [];
    let keys = [];

    for (const val in obj) {
      fromObj.push(obj[val]);
      keys.push(val);
    }

    this._val = fromObj;
    this._dict = obj;
    this._key = keys;
  }

  get obj() {
    return this._dict;
  }

  get arr() {
    return this._arr;
  }
}

exports.Vector = Vector;
