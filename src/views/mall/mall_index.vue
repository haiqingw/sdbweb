<template>
    <div>
       <!-- banner -->
       <div class="posMallHeader">
           <mt-swipe :auto="4000">
                 <mt-swipe-item> <img src="@/assets/images/posMallBannerImg.png" /></mt-swipe-item>
                 <mt-swipe-item> <img src="@/assets/images/posMallBannerImg.png" /></mt-swipe-item>
                 <mt-swipe-item> <img src="@/assets/images/posMallBannerImg.png" /></mt-swipe-item>
           </mt-swipe>
        </div>
        <!-- 热门产品 -->
        <div class="posMallHotProduct">
            <h3>热门产品</h3>
            <div class="hotProductView">
                <img src="@/assets/images/hotPorPic.jpg" alt="POS机">
                <div>
                    <p class="ellipsis">[点佰趣]银惠通</p>
                    <p>费率：0.55%+3</p>
                    <p>300人已领取</p>
                    <a href="javascript:;">免费领取</a>
                </div>
            </div>
        </div>
        <div class="interval"></div>
        <!-- 批量进货 入口 开始 -->
        <a class="stockChannelImg" href="javascript:;">
            <img src="@/assets/images/stockChannelImg.png" alt="批量进货通道">
        </a>
        <!-- 批量进货 入口 结束 -->
        <div class="interval"></div>
        <!-- POS列表 -->
        <div class="posMallBody">
            <h3>其他优质POS机</h3>
            <div class="posMallListMain" style="display:none;">
                <div class="posMallListItem">
                    <img src="@/assets/images/hotPorPic.jpg" alt="POS机">
                    <p class="ellipsis">[点佰趣]银惠通</p>
                    <p>费率：0.55%+3</p>
                    <p>300人已领取</p>
                    <a href="javascript:;">免费领取</a>
                </div>
                <div class="posMallListItem">
                    <img src="@/assets/images/hotPorPic.jpg" alt="POS机">
                    <p class="ellipsis">[点佰趣]银惠通</p>
                    <p>费率：0.55%+3</p>
                    <p>300人已领取</p>
                    <a href="javascript:;">免费领取</a>
                </div>
                <div class="posMallListItem">
                    <img src="@/assets/images/hotPorPic.jpg" alt="POS机">
                    <p class="ellipsis">[点佰趣]银惠通</p>
                    <p>费率：0.55%+3</p>
                    <p>300人已领取</p>
                    <a href="javascript:;">免费领取</a>
                </div>
                <div class="posMallListItem">
                    <img src="@/assets/images/hotPorPic.jpg" alt="POS机">
                    <p class="ellipsis">[点佰趣]银惠通</p>
                    <p>费率：0.55%+3</p>
                    <p>300人已领取</p>
                    <a href="javascript:;">免费领取</a>
                </div>
            </div>
            <!-- 暂无数据 -->
            <div class="posMallNoDateMain">
                <img src="@/assets/images/uploadIcon.png" alt="上架">
                <p>其他产品正在上架中</p>
            </div>
        </div>   
    </div>
</template>
<script>
export default {
  mounted(){
    //   console.log(this.$refs.bannerImg.offsetHeight);
  }  
}
</script>
<style scoped>
   .posMallHeader{
   padding:15px 15px 10px;
   height:12.2rem;
}
.posMallHotProduct{
  padding:15px;
}
.posMallHotProduct>h3{
  line-height:30px;
  height:30px;
  font-size:18px;
  color:#111d35;
}
.hotProductView{
  overflow:hidden;
  padding-top:7px;
}
.hotProductView>img{
  width:90px;
  height:90px;
  float:left;
  border:1px solid #f1f1f1;
  box-sizing:border-box;
}
.hotProductView>div{
  padding-left:105px;
  box-sizing:border-box;
  position: relative;
}
.hotProductView>div p{
  line-height: 30px;
  font-size:16px;
}
.hotProductView>div p:first-of-type{
  font-weight:bold;
}
.hotProductView>div p:last-of-type{
  font-size:12px;
  color:#333;
}
.hotProductView>div a{
  background:#f33;
  color:#fff;
  font-size:12px;
  padding:0 10px;
  display:block;
  height:30px;
  line-height:30px;
  border-radius:30px;
  width:80px;
  position: absolute;
  right:0;
  bottom:0;
  text-align:center;
}
.posMallBody{
  padding:15px;
}
.posMallBody>h3{
  line-height:30px;
  height:30px;
  font-size:18px;
  color:#111d35;
}
.posMallListMain{
  padding:10px 2px 0;
  overflow: hidden;
}
.posMallListMain>div{
  width:48%;
  float:left;
  padding:5px;
  box-sizing:border-box;
  box-shadow:0 0 3px #ccc;
  margin-bottom:10px;
}
.posMallListMain>div:nth-of-type(2n){
  float:right;
}
.posMallListMain>div p{
  line-height:24px;
  line-height:26px;
  font-size:16px;
}
.posMallListMain>div p:first-of-type{
  font-weight:bold;
  padding-top:5px;
}
.posMallListMain>div p:last-of-type{
  color:#333;
  font-size:14px;
  line-height:20px;
}
.posMallListMain>div a{
  background: #f33;
  color: #fff;
  font-size: 12px;
  display: block;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin-top:5px;
}
.posMallNoDateMain{
  text-align:center;
  padding-top:20%;
}
.posMallNoDateMain>img{
  width:70px;
  height:70px;
}
.posMallNoDateMain>p{
  font-size:16px;
  color:#ccc;
  padding-top:15px;
}
</style>

