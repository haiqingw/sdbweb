<template>
  <div>
    <!-- header -->
    <div class="return">
      <img src="@/assets/images/return.png" alt="" @click="$router.go(-1)" />
      <span>申请代理</span>
    </div>
    <!-- body -->
    <div class="applyAgentBodyMain">
       申请代理 
       申请代理 
       申请代理 
       申请代理 
       申请代理 
       申请代理 
       申请代理 
       申请代理 
       申请代理 
       申请代理 
       <div class="applyAgentBottomMain">
           <a href="javascript:;">
              立即申请成为代理 
           </a>
       </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    };
  },
  methods: {}
};
</script>
<style lang="scss">
.applyAgentBodyMain{
    padding:50px 15px 60px;
    font-size:14px; 
    text-align:justify;
    line-height:24px;
}
.applyAgentBottomMain{
    padding:10px;
    position: fixed;
    width:100%;
    box-sizing:border-box;
    left:0;
    bottom:0;
    a{
        display: block;
        width:100%;
        height:40px;
        background:#26a2ff;
        line-height:40px;
        text-align:center;
        font-size:14px;
        color:#fff;
    }
}
</style>
