<template>
    <div>
        <!-- header -->
        <div class="return">
            <router-link to="/mine"><img src="@/assets/images/return.png" alt="" /></router-link>
            <span>实名认证</span>
        </div>
        <!-- body -->
        <div class="certificationCompleteMain">
            <img src="@/assets/images/cerSuccessIcon.png" alt="认证成功">
            <h3>恭喜您，您已通过认证</h3>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods:{

    }
}
</script>
<style lang="scss">
   .certificationCompleteMain{
       text-align:center;
       padding-top:40px;
       img{
           display: block;
           width:70px;
           height:70px;
           margin:40% auto 0;
       }
       h3{
           font-size:18px;
           font-weight:bold;
           line-height:50px;
           color:#333;
           padding-top:20px;
       }
   } 
</style>
