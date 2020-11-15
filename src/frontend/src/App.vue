<template>
  <div class="section">
    <div class="container">
      <h1 style = " font-size: 100%;">Search It</h1>
      <uploadedFile />

      <search />

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

  method: {
    showSearch() {
      this.search = true; this.scraper = false; this.about = false;
    },
    showAbout() {
      this.search = false; this.scraper = false; this.about = true;
    },
    showScraper() {
      this.search = false; this.scraper = true; this.about = false;
    }
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
</style>
