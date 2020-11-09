// import module
let fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// Extract konten dari HTML
/**
 * Extract konten (body) dari HTML
 * @param {string} - dokumen HTML yang dibaca
 * @returns {string} - Body dari HTML tanpa <...>
 */
const extractHTML = (val) => { // belum jadi, koreksi ulang
    // let span = document.createElement('span');
    // span.innetHTML = val;
    // return span.textContent || span.innerText;
    const acceptedTags = "p, h1, h2, h3, h4, h5, h6";
    const dom = new JSDOM(val);
    const content = dom.window.document.querySelectorAll(acceptedTags).forEach((el) => {console.log(el.textContent)});

    return content;
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
}

/**
 * Memparse dokumen dari .txt maupun .html
 * @param {string} - path ke file
 * @returns {object} - Object doc {fileName: , konten: }
 */
const parseDoc = (filePath) => {
    // data adalah isi dari file
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            throw err;
        }

        let fileName = filePath.slice(filePath.length-5);
        let doc = {};

        if (fileName.split('.').pop() === "txt") {
            doc = createDoc(filePath, data, [], NaN);
            console.log(doc);
        } else {
            // Extract HTML kalo extensionnya HTML
            console.log('hello world');
            data = extractHTML(data);
            doc = createDoc(filePath, data, [], NaN);
            console.log(doc);
        }
    })
};

console.log(parseDoc('../../test/Lipsum.html'));
// console.log(parseDoc('../../test/Kuis1.txt'));

exports.parseDoc = parseDoc;