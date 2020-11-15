<template>
  <div class="middle">
    <h1 style="text-align:center">
      Our Logo
    </h1>
    <img src="/assets/astagacape.png" style="width:50%; height:auto"/>

      <h1>Author</h1>
      <p>
        Alexander 13519090
        <br> Alvin Wilta 13519163
        <br> Josep Marcello 13519164

      </p>
      <h1>
          <br>
          About Search-It
      </h1>
      <p>
        Search-It merupakan sebuah sistem temu balikinformasi atau search engine yang menggunakan metode pencarian dengan Cosine similarity diantara query dengan dokumen.
      </p>
      <h1>
        <br>
          How To use
      </h1>
      <ol style="text-align:initial; padding-left:20px">
        <li>Buka terminal</li>
        <li>Lakukan `git clone git@github.com:zenovore/Algeo02-19090` atau `git clone
        https://github.com/zenovore/Algeo02-19090`</li>
        <li>Pindah ke direktori *project* ini</li>
        <li>Jalankan `npm install`</li>
        <li>Jalankan `npm start`</li>
        <li>Buka terminal baru lalu pindah ke direktori *project* ini</li>
        <li>Install `serve` dengan `npm install -g serve`</li>
        <li>lakukan `cd src/frontend`</li>
        <li>jalankan `npm run build && serve dist`</li>
        <li>Buka `http://localhost:5000/` di peramban</li>
      </ol>
  </div>
</template>

<script>
export default {
  name: 'aboutUs',
}
</script>

<style scoped>
    h1 {
        font-size: 300%;
        text-align: initial;
    }
    .middle{
        margin: 100px;
        padding: 50px;
        justify-content: center;
    }
    p{
        text-align: initial;
    }

</style>
