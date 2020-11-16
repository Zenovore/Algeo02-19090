<template>
{{ docs }}
{{ query }}
{{ isSearched }}
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
  name: 'tableQuery',
  props: {
    isSearched: {        
      type: Boolean,
      required: true,
    },
    docs: {        
      type: Array,
      required: true,
    },
    query: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      // docs: [],
      queryVec: [],
      // query: qW,
      tabelal: [],
      // isSearched: false,
    };
  },

  computed: {
  },

  methods: {
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
    isSearched() {
      console.log('membuat tabel...')
      this.jadiMatriks();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.searc-result {
  text-align: right;
}
.tableQuery {
    border-style: solid;
    border-color: black;
}
</style>