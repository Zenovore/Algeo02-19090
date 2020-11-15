'use strict';
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const axios = require('axios');

/*
const websites = {
  urbandictionary: 'urbandictionary.com',
};
*/

const extractHTML = (url, acceptedTags, acceptedId, acceptedClass) => {
  let extracted = '';
  axios
    .get(url)
    .then((res) => {
      // Kalau berhasil melakukan request dan mendapatkan HTML-nya dari situs
      const dom = new JSDOM(res.data);

      dom.window.document.querySelectorAll(acceptedTags).forEach((el) => {
        switch (el.tagName) {
          case 'H1':
          case 'H2':
          case 'H3':
          case 'H4':
          case 'H5':
          case 'H6':
            extracted += el.textContent + '\n';
            break;
          default:
            extracted += el.textContent + ' ';
        }

        console.log(extracted);
      });

      //console.log(extracted);
    })
    .catch((e) => {
      // kalau ada kesalahan
      console.error(e);
    });
};

/*
extractHTML(
  'https://megapolitan.kompas.com/read/2020/11/15/13142361/langgar-protokol-kesehatan-rizieq-shihab-dan-fpi-didenda-rp-50-juta',
  'p, h1, h2, h3, h4, h5, h6',
  'a',
  'a'
);
*/

extractHTML(
  'https://www.scrapingbee.com/blog/web-scraping-javascript/',
  'p, h1, h2, h3, h4, h5, h6',
  'a',
  'a'
);
