// import module
var http = require('http');
var fs = require('fs');
const { runInThisContext } = require('vm');
const filepath = ''; // file location (habis difilter)
const namafile = ''; // file name

// buat variabel global list

http.createServer(function (req, res) { // harus ga sih ini
    function Doc(name, konten, vektor, similarity) {
        this.filename = name;
        this.konten = konten;
        this.vektor = vektor;
        this.similarity = similarity;
    }

    function extractHTML(val) {
        var span = document.createElement('span');
        span.innetHTML = val;
        return span.textContent || span.innerText;
    }

    fs.readFile(filepath, "utf8", function read(err, data) {
        if (err) {
            throw err;
        }
        if (filename.split('.').pop() == "txt") {
            doc = Doc(namafile,data,"","");
        } else {

        }
        
    })
}).listen(8080);