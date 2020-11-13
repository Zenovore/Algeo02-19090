<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <search/>
</template>

<script>
import search from './components/searchResult.vue'

export default {
  name: 'App',
  components: {
    search
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
