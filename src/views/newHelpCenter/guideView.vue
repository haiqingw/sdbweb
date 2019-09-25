<template>
  <div class="guideViewContainer">
    <div class="return">
        <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
        <span>帮助中心</span>
    </div>
    <div class="guideViewMain">
      新手引导
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
     return {

     }
  })
}
</script>
<style lang="less">

</style>
