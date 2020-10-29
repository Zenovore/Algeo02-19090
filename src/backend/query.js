const sastrawi = require('sastrawijs');

function stemString(string) {
  let stemmed = [];
  const stemmer = new sastrawi.Stemmer();
  const tokenizer = new sastrawi.Tokenizer();

  string = tokenizer.tokenize(string);
  for (word of string) {
    stemmed.push(stemmer.stem(word));
  }

  return stemmed;
}

function toObj(query) {
  let obj = {};
  const stemmedQuery = stemString(query);

  for (const i in stemmedQuery) {
    let word = stemmedQuery[i];
    if (word !== '') {
      obj[word] = word in obj ? obj[word] + 1 : 1;
    }
  }

  return obj;
}

/*
console.log(
  toObj(
    'Saat ini, Perekonomian Indonesia sedang dalam pertumbuhan yang membanggakan.'
  )
);
*/

exports.toObj = toObj;
