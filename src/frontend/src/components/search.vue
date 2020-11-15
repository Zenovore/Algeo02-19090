<template>
  <div class="search-bar">
    <form action="/" method="get" v-on:submit.prevent="submitQuery">
      <input type="text" placeholder="Type query here..." id="q" name="q" v-model="searchStr"/>
      <!-- Kalo bisa pake nerd font aja biar jadi ikon search itu -->
        <button type="submit">
          <i class ="fas fa-search"></i>    
        </button>

    </form>
  </div>

  <div v-if="isSearched">
    <div class="search-result" v-for="doc in docs" v-bind:key="doc">
      <div v-if="doc.similarity != 0">
        <a class="doc-title"  target="_blank" v-bind:href="`/uploads/${doc.fileName}`">{{ doc.fileName }}</a>
        <div class="doc-word-length"> {{ doc.kontenOriginal.length }} </div>
        <div class="doc-similarity">{{ `${doc.similarity.toPrecision(4) * 100}%` }}</div>
        <div class="doc-first-sentence">{{ doc.firstSentence }}</div>
      </div>
    </div>
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
      for (let i = 0; i < this.docs.length; ++i) {
        this.docs.pop();
      }

      const axios = require('axios');
      this.isSearched = false;

      console.log(`Searched for: ${this.searchQuery}`);

      const headers = { 'method': 'GET' }

      axios.get(`http://localhost:42069/search?q=${this.searchQuery}`, { headers })
        .then(response => {
          this.docs = response.data;
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
.searc-result {
  text-align: right;
}
</style>
