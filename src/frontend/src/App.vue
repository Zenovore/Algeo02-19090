<template>
  <div class="background">
    <div class="section">
      <div class="container">
        <h1 style = " font-size: 500%; font-family: 'Open Sans', sans-serif; padding-bottom:15px">Search-It</h1>
        <button @click="showSearch" class="button is-info is-success">Search</button>
        <button @click="showScraper" class="button is-info is-success">Webscrape</button>
        <button @click="showAbout" class="button is-info is-success">Perihal</button>
        <uploadedFile v-if="search"/>
        <search v-if="search" />
        <webScrape v-if="scraper"/>
        <aboutUs v-if="about"/>
      </div>
    </div>
  </div>
</template>

<script>
import search from './components/search.vue'
import uploadedFile from './components/uploadedFile.vue'
import webScrape from './components/webScrape.vue'
import aboutUs from './components/aboutUs.vue'

export default {
  name: 'App',
  components: {
    search,
    uploadedFile,
    webScrape,
    aboutUs
  },
  data() {
    return {
      search: true,
      scraper: false,
      about: false,
    };
  },

  methods: {
    showSearch() {
      this.search = true;
      this.scraper = false;
      this.about = false;
    },
    showAbout() {
      this.search = false;
      this.scraper = false;
      this.about = true;
    },
    showScraper() {
      this.search = false;
      this.scraper = true;
      this.about = false;
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.background{
  background-color:rgb(248, 194, 145);
}
.button{
  margin:10px 10px 20px 10px;
}
.button.is-success:hover{
  background-color: black;
}
</style>
