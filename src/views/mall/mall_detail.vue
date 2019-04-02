<template>
    <div class="mall-detail">
        <!-- header -->
        <mt-header fixed title="标题过长会隐藏后面的内容啊哈哈哈哈">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <!-- banner -->
        <mt-swipe :auto="4000" class="mallDetailBanner">
            <mt-swipe-item v-for="item in renderData.data.imgPath" :key="item"> 
              <img :src="item" />
            </mt-swipe-item>
        </mt-swipe>
        <!-- other -->
        <mt-cell :title="renderData.data.commodityName" label="描述信息"></mt-cell>
        <!--市场价-->
        <div class='pDPriceMain flex'>
            <div>
                <span>￥{{renderData.data.nowPrice}}</span>
            </div>
            <div>
                市场价：{{renderData.data.originalPrice}}
            </div>
        </div>
        <!--优势-->
        <div class='pDadvantageMain flex'>
            <div>
                <span>安全</span> 央行支付牌照
            </div>
            <div>
                <span>包邮</span> 送货到家
            </div>
            <div>
                <span>省心</span> 24小时客服
            </div>
        </div>
        <!--费率、品牌-->
        <div class='rateBrandMain'>
            <div>费率：{{renderData.data.rate}}</div>
            <div>品牌：{{renderData.data.commodityName}}</div>
        </div>
        <div class='interval'></div>
        <!-- 产品介绍 -->
        <div class="advantageEvaluationMain">
            <div class="advantageEvaluationNav flex line_bottom">
                <a href="javascript:;">优势卖点</a>
                <a href="javascript:;" class="active">评价(0)</a>
            </div>
            <div class="advantageEvaluationBox">
               <div class="advantageBox">
                 优势买点
                 优势买点
                 优势买点
                 优势买点
                 优势买点
                 优势买点
                 优势买点
                 优势买点
                 优势买点
                 优势买点
               </div>
               <div class="evaluationBox" style="display:block;">
                  <div class="evaluationTop">
                     <span class="text">综合评分</span>
                     <el-rate
                      v-model="score"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}">
                    </el-rate>
                  </div>

               </div>
            </div>
            <div class="interval"></div>
            <!-- 评价列表 -->
            <div class="evaluationList">
               <div class="evaluationItemBox">
                 <div class="evaluationItemTop flex">
                   <span>郝佳</span>
                   <em>2018.06.01 22:01:22</em>
                 </div>
                 <div class="evalutionItemMiddle">
                    <em></em>
                    <em></em>
                    <em></em>
                    <em></em>
                    <em></em>
                    <span>5.0</span>
                 </div>
                 <div class="evalutionItemSub">
                   这个机器确实好用，费率0.5，居然还是24小时秒居然还是24小时秒到居然还是24小时秒到到
                 </div>
               </div>
            </div>
        </div>
        <!-- 领取按钮 -->
        <div style="height:40px;"></div>
        <div class="mallDetailFooterMain line_top">
           <a href="tel:13296905340">
             <img src="@/assets/images/phoneIconImg.png" alt="一键拨号">
             <p>客服</p>
           </a>
           <div>
             <router-link to="/mall/mall_pay"><a href="javascript:;">立即领取</a></router-link>
           </div>
        </div>
    </div>
</template>
<script>
import {getMall_detailBanner} from '@/api/mall'
export default {
  name:'mallDetail',
  data(){
    return {
      score: 5,
      queryData: {
        banner: {
          requestType: 'listdetail', 
          requestKeywords: 'productdetail', 
          id: this.$route.params.id
        }
      },
      renderData: {
        data: {}
      }
    }
  },
  methods: {
    mall_detailBanner () {
      getMall_detailBanner(this.queryData.banner).then( res => {
        if( res.data.responseStatus === 1 ) {
          this.renderData.data = res.data.data
          if( this.renderData.data.reviewNum.ave == null ) {
            this.score = 5
          } else {
            this.score = this.renderData.data.reviewNum.ave
          }
        }
        console.log(this.renderData.data)
      })
    }
  },
  created () {
    this.mall_detailBanner()
  },
}
</script>
<style lang="scss">
.mall-detail {
  .el-rate {
    float: left;
    padding: .2rem 0;
    span {
      float: left;
      line-height: 18px;
    }
  }
}

.mint-cell-wrapper {
    padding: 8px 10px 12px;
    background: none;
}
.mint-cell-text {
    line-height: 24px;
}
.mallDetailBanner {
    height: 7.5rem;
    padding-top: 40px;
}
.pDPriceMain{
  padding:0 10px;
  font-size:16px;
  justify-content:space-between;
}
.pDPriceMain div:first-of-type{
  color:#f33;
}
.pDPriceMain div:first-of-type text{
  font-size:14px;
}
.pDadvantageMain{
  padding:10px;
}
.pDadvantageMain div{
  border:1px solid #c3b091;
  font-size:10px;
  margin-right:10px;
  padding-right:5px;
}
.pDadvantageMain div span{
  background:#c3b091;
  padding:0 5px;
  color:#fff;
}
.rateBrandMain{
  padding:0 10px;
  overflow:hidden;
  margin-bottom:10px;
}
.rateBrandMain>div{
  width:50%;
  float:left;
  padding:10px;
  box-sizing:border-box;
  font-size:14px;
  color:#fff;
}
.rateBrandMain>div:first-of-type{
  background:#577EFF;
}
.rateBrandMain>div:last-of-type{
  background:#0096fe;
}
.advantageEvaluationNav{
  justify-content: space-around;
  box-shadow:0 2px 3px #f1f1f1;
  a{
    display: block;
    width:100%;
    text-align:center;
    font-size:14px;
    height:40px;
    line-height:40px;
    position: relative;
    color:#333;
    &.active{
      color:#0096fe;
      font-weight:bold;
      &::before{
        content:'';
        display: block;
        width:50%;
        height:2px;
        background:#0096fe;
        position: absolute;
        left:50%;
        bottom:0;
        margin-left:-25%;
      }
    }
  }
}
.advantageEvaluationBox{
  >div{
    display:none;  
  }
}
.advantageBox{
  line-height:26px;
  font-size:14px;
  padding:10px;
  text-align:justify;
}
.evaluationTop{
  overflow: hidden;
  line-height:40px;
  padding:12px 15px 10px;
  position: relative;
  span.text{
    float: left;
    display:block;
    width:75px;
    font-size:16px;
    font-weight:bold;
  }
  .scoreBox{
    padding-left:75px;
    justify-content: space-around;
    height:40px;
    em{
      display:block;
      width:25px;
      height:25px;
      margin-top:7px;
      float:left;
      margin-right:7px;
      background:url("../../assets/images/starActiveIcon.png") no-repeat;
      background-size:25px 25px;
    }
  }
  >em{
    font-size:30px;
    position: absolute;
    left: 260px;
    top: 12px;
    color:#ffbe33;
  }
}
.evaluationItemBox{
  padding:5px 10px 10px;
  border-bottom:5px solid #f1f1f1;
}
.evaluationItemTop{
  justify-content: space-between;
  line-height:40px;
  span{
    font-size:14px;
    font-weight:bold;
  }
  em{
    font-size:12px;
  }
}
.evalutionItemMiddle{
  overflow: hidden;
  em{
    display:block;
    width:15px;
    height:15px;
    background:url("../../assets/images/starActiveIcon.png") no-repeat;
    background-size:15px 15px;
    float:left;
    margin-right:5px;
  }
  span{
    float: left;
    margin-left:5px;
    font-size:14px;
    position: relative;
    top:-4px;
    font-size:18px;
  }
}
.evalutionItemSub{
  font-size:14px;
  line-height:20px;
}
.mallDetailFooterMain{
  overflow:hidden;
  width:100%;
  position: fixed;
  left:0;
  bottom:0;
  >a{
    display:block;
    height:40px;
    width:60px;
    float: left;
    text-align:center;
    img{
      width:20px;
      height:20px;
      display:block;
      margin:3px auto;
    }
    p{
      font-size:10px;
      color:#333;
      line-height:10px;
    }
  }
  div{
    padding-left:60px;
    a{
      display:block;
      width:100%;
      height:40px;
      background:#0096fe;
      color:#fff;
      text-align:center;
      line-height:40px;
      font-size:14px;
    }
  }
}
</style>
