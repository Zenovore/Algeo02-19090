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

export default {
  name: 'App',
  components: {
    search,
    uploadedFile
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
