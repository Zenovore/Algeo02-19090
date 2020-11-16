<template>
  <div class="search-bar">
    <form action="/" method="get" v-on:submit.prevent="submitQuery">
      <div class ="field" style="width:inherit; height:inherit;">
        <input class="input" type="text" style="width:60%; opacity=100%" placeholder="Type query here..." id="q" name="q" v-model="searchStr"/>
          <button type="submit" style="width:inherit; height:inherit">
            <span class="icon is-medium">
              <i class ="fas fa-search"></i>
            </span>
          </button>
        <!-- Kalo bisa pake nerd font aja biar jadi ikon search itu -->
      </div>
    </form>
  </div>

  <div v-if="isSearched">
    <div class="search-result" v-for="doc in docs" v-bind:key="doc">
      <div v-if="doc.similarity != 0">
        <a class="doc-title"  target="_blank" v-bind:href="`/uploads/${doc.fileName}`">{{ doc.fileName }}</a>
        <div class="doc-word-length"> {{ doc.kontenOriginal.length }} </div>
        <div class="doc-similarity">{{ `${ doc.similarity.toPrecision(4) * 100}%` }}</div>
        <div class="doc-first-sentence">{{ doc.firstSentence }}</div>
      </div>
    </div>
  </div>

  <div v-if="isSearched">
    <table class="tableQuery">
      <tr v-for="row of tabelal" v-bind:key="row">
          <td v-for="col of row" v-bind:key="col">
              {{ col }}
          </td>
      </tr>
    </table>
  </div>

</template>

<script>
export default {
  name: 'search',
  data() {
    return {
      searchStr: '',
      isSearched: false,
      docs: [],
      query: [],
      tabelal: [],
    };
  },

  computed: {
    searchQuery() {
      const RE = /\s/g;
      return this.searchStr.replace(RE, '+');
    },
  },

  methods: {
    submitQuery() {
      this.docs = [];

      const axios = require('axios');
      this.isSearched = false;

      console.log(`Searched for: ${this.searchQuery}`);

      const headers = { 'method': 'GET' }

      axios.get(`http://localhost:42069/search?q=${this.searchQuery}`, { headers })
        .then(response => {
          const searchResult = response.data;
          this.docs = searchResult.docs;
          this.query = searchResult.query;
          this.isSearched = true;
        })
        .catch(err => {
          console.error(err);
        })
    },
    jadiMatriks() {
        /*
          const queryObj = {
            query: query, // query original (yg dikirim user)
            cleanQuery: cleanQuery, // query yg udh dibersihin (udh di-stem, diapusin stopwords)
            queryWords: queryWords, // list of kata-kata query yang udh dibersihin
            vector: queryVec, // jumlah kemunculan tiap kata pada query yg koresponden dengan kamus kata
          };
        */
      this.tabelal = [];
      let namafile = [];
      namafile.push("Term");
      namafile.push("Query");
      for (let i=0;i<this.docs.length;i++) {
        namafile.push(this.docs[i].fileName);
      }
      this.tabelal.push(namafile);
      console.log('hi');

      //Isi -- baris kedua dst [[isi vektor Term],[isi vektor Query],[isi vektor Doc1],...]
      let isi = [];
      // i adalah indexing kata dalam query
      console.log(this.query.queryWords);
      for (let i=0;i<this.query.queryWords.length;i++) {
        isi = [];
        // j buat indexing vektor di index kbrp yg dipush ke list
        for (let j=0;j<this.docs.length+2;j++) {
          if (j===0) {  //Kolom pertama diisi data dari term
            isi.push(this.query.queryWords[i]);
          } else if (j===1) { //kolom kedua diisi data dari query
            isi.push(this.query.vector[i]);
          } else { //kolom ketiga dan seterusnya diisi data dari dokumen
            isi.push(this.docs[j-2].vector[i]);
          }
        }
        this.tabelal.push(isi);
      }
    },
  },

  watch: {
    docs() {
      console.log('got new data');
    },
    isSearched() {
      console.log('membuat tabel...')
      this.jadiMatriks();
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search-result {
  text-align: left;
  padding: 20px 0px;
}

.tableQuery {
    border-style: solid;
    border-color: black;
}

td {
  padding: 10px 15px;
  border-style: groove;
  border-color: black;
}
/* .input{
  opacity: 70%;
} */
</style>
