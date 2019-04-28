<template>
    <div>
        <!-- header -->
        <!-- <mt-header fixed title="更换手机号">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header> -->
        <div class="return">
            <img
                src="@/assets/images/return.png" alt="" 
                @click="$router.go(-1)"/>
            <span>更换手机号</span>
        </div>
        <!-- body -->
        <div class="changePhoneMain">
            <img src="@/assets/images/phoneImg.jpg" alt="phoneImg">
            <h3>132****5340</h3>
            <div class="changePhoneFormMain">
               <div class="inputItem line_bottom">
                 <em>新手机号</em>  
                 <div>
                     <input type="tel" maxlength="11" placeholder="请输入新手机号">
                 </div>  
               </div> 
               <div class="inputItem line_bottom">
                 <em>验证码</em>  
                 <div>
                     <input type="tel" maxlength="6" placeholder="请输入验证码">
                     <a href="javascript:;">获取验证码</a>
                 </div>  
               </div>
               <div class="submitBtnMain">
                   <mt-button type="primary" size="large">确定提交</mt-button>
               </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    methods: {

    }
};
</script>
<style lang="scss">
 .changePhoneMain{
     padding-top:40px;
     >img{
         width:70px;
         height:70px;
         display: block;
         margin:50px auto 15px;
     }
     h3{
         font-size:20px;
         text-align:center;
     }
 }
 .changePhoneFormMain{
     padding:30px 15px 15px;
 }
 .inputItem{
     overflow: hidden;
     padding:0 15px;
     em{
         display: block;
         width:70px;
         height:50px;
         line-height:50px;
         float: left;
         font-size:16px;
     }
     div{
         padding-left:80px;
         height:50px;
         position: relative;
         input{
             height:50px;
             border:none;
             background:none;
             font-size:16px;
             display: block;
         }
         a{
             font-size:14px;
             color:#26a2ff;
             position: absolute;
             right:0;
             top:0;
             display: block;
             line-height:50px;
             &.active{
                 color:#ccc;
             }
         }
     }
 }
 .submitBtnMain{
     padding:30px 0;
     .mint-button-text{
         font-size:16px;
     }
 }
</style>
