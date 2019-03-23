<template>
    <div>
        <!-- nav -->
        <div class="myOrderNavMain flex line_bottom">
            <a href="javascript:;" class="active">
                全部
            </a>
            <a href="javascript:;">
                待发货 
            </a>
            <a href="javascript:;">
                已发货 
            </a>
            <a href="javascript:;">
                待评价 
            </a>
            <a href="javascript:;">
                已完成 
            </a>
        </div>
        <!-- 列表 -->
        <div class="myOrderListMain">
             
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
   .myOrderNavMain{
       justify-content:space-around;
       a{
           display:block;
           width:100%;
           height:40px;
           line-height:40px;
           text-align:center;
           font-size:14px;
       }
   } 
</style>