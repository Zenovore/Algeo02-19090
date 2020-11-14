<template>
  <div class="section">
    <div class="container">

      <search />
      <uploadedFile />

    </div>
  </div>
</template>

<script>
import search from './components/searchResult.vue'
import uploadedFile from './uploadedFile.vue'

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
