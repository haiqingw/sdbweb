<template>
    <div class="adDetailContainer">
        <!--header-->
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)">
            <span>详情</span>
        </div>
        <!-- body -->
        <div class="adDetailBody">
            <div class="adDetailTitle">
                <h3>标题标题标标题标题标题标题标题标题标题标题标题标题标题标题题</h3><time>发布时间：2019-08-13 13:45:00</time>
            </div>
            <div class="adDetailMain">
                正文正文正文正正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文文
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    }
}
</script>
<style lang="scss">
   .adDetailBody{
       padding-top:0.8rem;
   } 
   .adDetailTitle{
       padding:0 0.3rem 0.1rem;
       h3{
           padding:0.2rem 0 0.02rem;
           line-height:0.48rem;
           font-size:0.36rem;
           font-weight:400;
           text-align:justify;
       }
       time{
           font-size:0.24rem;
           color:#333;
           line-height:0.4rem;
           display:block;
       }
   } 
   .adDetailMain{
       padding:0 0.3rem;
       font-size:0.28rem;
       line-height:0.4rem;
       text-align:justify;
   }
</style>