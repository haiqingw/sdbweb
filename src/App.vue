<template>
  <div id="app">
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

</style>
