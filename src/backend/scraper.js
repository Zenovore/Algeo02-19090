'use strict';
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const axios = require('axios');

exports.extractHTML = async (url, filter, filterMethod) => {
  let retVal = '';
  try {
    const body = await axios.get(url);

    // Kalau berhasil melakukan request dan mendapatkan HTML-nya dari situs
    const dom = new JSDOM(body.data);

    filter = filter.split(',');
    switch (filterMethod) {
      /* tag
       * id
       * class */
      case 'id':
        for (const i in filter) filter[i] = `#${filter[i].trim()}`;
        break;
      case 'class':
        for (const i in filter) filter[i] = `.${filter[i].trim()}`;
        break;
    }
    filter = filter.join(',');

    dom.window.document.querySelectorAll(filter).forEach((e) => {
      retVal += e.textContent + '\n';
    });

    //console.log(retVal);
    return retVal;
  } catch (e) {
    console.error(e);
  }
};
