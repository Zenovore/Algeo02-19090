<template>
  <div class="search-bar">
    <form action="/" method="get" v-on:submit.prevent="submitQuery">
      <div class ="field" style="width:inherit; height:inherit">
        <input class="input" type="text" style="width:60%" placeholder="Type query here..." id="q" name="q" v-model="searchStr"/>       
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

  <tableQuery :isSearched="this.isSearched" :docs="this.docs" :query="this.queryResult"/>

</template>

<script>
import tableQuery from './tableQuery.vue';


export default {
  name: 'search',
  components: {
    tableQuery,
  },
  data() {
    return {
      searchStr: '',
      isSearched: false,
      docs: [],
      queryResult: [],
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
          this.queryResult = searchResult.query;
          this.isSearched = true;
        })
        .catch(err => {
          console.error(err);
        })
    },
  },

  watch: {
    docs() {
      console.log('got new data');
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search-result {
  text-align: left;
  padding: 20px 0px;
}
.input{
  opacity: 70%;
}
</style>
