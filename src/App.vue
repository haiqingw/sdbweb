<template>
  <div id="app">
    <img src="./assets/logo.png">
    <mt-button>按钮</mt-button>
    <router-view/>
  </div>
</template>

<script>
import {fetchList} from '@/api/test'
export default {
  name: 'App',
  data() {
    return {

    }
  },
  methods: {
    test() {
      fetchList().then( res => {
        console.log(res)
      })
    }
  },
  created() {
    this.test()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
