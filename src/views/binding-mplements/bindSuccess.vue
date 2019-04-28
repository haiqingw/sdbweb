<template>
  <div>
    <!-- header -->
    <div class="return">
      <img src="@/assets/images/return.png" alt="" @click="$router.go(-1)" />
      <span>绑定机具</span>
    </div>
    <!-- body -->
    <div class="bindSuccessMain">
        <img src="@/assets/images/successIcon.png" alt="成功">  
        <h3>机具绑定成功</h3>
        <div>
            <h3>机具信息</h3>
            <p>品牌名称：<span>银惠通</span></p>
            <p>产品终端：<span>1231545645645646</span></p>
            <p>支付押金：<em>100.00</em></p>
            <router-link to="/" class="goHome">返回首页</router-link>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss">
.bindSuccessMain{
    >img{
        width:60px;
        height:60px;
        margin:30% auto 0;
        display: block;
    }
    >h3{
        font-size:18px;
        text-align:center;
        padding-top:20px;
        font-weight:400;
    }
    >div{
       padding:50px 20px; 
       >h3{
           font-size:16px;
           padding-bottom:10px;
       }
       p{
           font-size:14px;
           line-height:30px;
       }
    }
}
.goHome{
 display: block;
 width:40%;
 margin:50px auto 0;
 height:30px;
 line-height:30px;
 text-align:center;
 border:1px solid #089cfe;
 border-radius:40px;
 font-size:14px;
 color:#333;
}
</style>
