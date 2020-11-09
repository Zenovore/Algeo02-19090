ADT:
   <!-- - [ ] Vector.js (coba riset lagi ttg OOP di JS) => Bareng-bareng -->
Backend:
   - [x] main.js => handle routing
   - [O] query.js => handle query, documents, ngitung similarities
      - [x] Upload => mengupload file ke local.
      - [x] Stemming => ngestem string (Josep)
      - [x] removeStopwords => menghapus stopwords (Alex)
      - [x] toObj => mengubah string menjadi JS object (Alex)
      - [ ] toVec => mengubah JS objek menjadi vektor (Alex)
      - [ ] docSimilarities => menghitung similarities dari vector (Alvin)
      - [x] Sort => mengurutkan dokumen sesuai dengan similarities (Josep)
   - [x] parseDocs.js (Alvin)
      - [x] extractHTML => strip HTML jadi text
      - [x] parseDoc => Mengubah .txt dan .html menjadi object (Alvin)
   - Optional:
      - [ ] Web scraper
Frontend:
   - [O] index.html
   - [O] style.css
   - [O] index.js
      - [ ] Vue, bareng-bareng
      - [ ] createTable (bikin tabel dari vektor2)
