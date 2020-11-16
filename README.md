# Algeo02-19090
Tubes 2 Aljabar Linear dan Geometri IF2123

## Table of contents
* [General info](#general-info)
* [Dependencies](#dependencies)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)
* [Kelompok](#kelompok)

## General info<a href="general-info"></a>
Hampir semua dari kita pernah menggunakan search engine, seperti google, bing
dan yahoo! search. Setiap hari, bahkan untuk sesuatu yang sederhana kita
menggunakan mesin pencarian Tapi, pernahkah kalian membayangkan bagaimana cara
search engine tersebut mendapatkan semua dokumen kita berdasarkan apa yang
ingin kita cari?  Sebagaimana yang telah diajarkan di dalam kuliah pada materi
vector di ruang Euclidean, temu-balik informasi (information retrieval)
merupakan proses menemukan kembali (retrieval) informasi yang relevan terhadap
kebutuhan pengguna dari suatu kumpulan informasi secara otomatis. Biasanya,
sistem temu balik informasi ini digunakan untuk mencari informasi pada
informasi yang tidak terstruktur, seperti laman web atau dokumen.

Ide utama dari sistem temu balik informasi adalah mengubah search query menjadi
ruang vektor Setiap dokumen maupun query dinyatakan sebagai vektor w = (w1,
w2,..., wn) di dalam Rn, dimana nilai wi dapat menyatakan jumlah kemunculan
kata tersebut dalam dokumen (term frequency). Penentuan dokumen mana yang
relevan dengan search query dipandang sebagai pengukuran kesamaan (similarity
measure) antara query dengan dokumen. Semakin sama suatu vektor dokumen dengan
vektor query, semakin relevan dokumen tersebut dengan query. Kesamaan tersebut
dapat diukur dengan cosine similarity

## Dependencies<a href="dependencies"></a>
* Node.js
    * Express.js
    * Sastrawijs
    * jsdom
    * multer
    * vue-cli
    * vue
    * axios
    * eslint
    * esling-plugin-vue
    * core-js
    * bulma

## Screenshots<a href="screenshots"></a>
Terlampir di laporan Bab IV

## Setup<a href="setup"></a>
1. Buka terminal
1. Lakukan `git clone git@github.com:zenovore/Algeo02-19090` atau `git clone
   https://github.com/zenovore/Algeo02-19090`
1. Pindah ke direktori *project* ini
1. Jalankan `npm install`
1. Jalankan `npm start`
1. Buka terminal baru lalu pindah ke direktori *project* ini
1. Install `serve` dengan `npm install -g serve`
1. lakukan `cd src/frontend`
1. jalankan `npm run build && serve dist`
1. Buka `http://localhost:5000/` di peramban

## Code Examples
Terlampir di laporan Bab IV

## Features<a href="features"></a>
Upcoming features
* Mendapatkan urutan dokumen sesuai dengan relevansinya
* Menampilkan tabel jumlah kemunculan sesuai dengan Term yang dicari
* Mengupload dokumen milik sendiri dan mengetahui relevansi kata yang diingini

## Status<a href="status"></a>
Project is: ***complete***

## Inspiration<a href="inspiration"></a>
Credits:
* Vue.js documentations
* Vue.js tutorials
* axios tutorials
* Node.js tutorials
* Express.js tutorials

## Kelompok<a href="kelompok"></a>

| Nama | NIM | Kerjaan |
|------|-----|---------|
| Alexander | 13519090 | Mekanisme penggunggahan dokumen & *styling* |
| Alvin Wilta | 13519163 | Persamaan cosine & tabel |
| Josep Marcello | 13519164 | *Web-scraper* & menghubungkan search dari *backend* ke *frontend* |
