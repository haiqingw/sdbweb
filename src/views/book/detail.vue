<template>
  <div>
    <div class="return">
      <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
      <span>详情</span>
    </div>
    <!-- body -->
    <div class="bookDetailContainer">
        <!-- banner图 -->
        <div class="detailBannerMain">
            <img :src="renderData.content.imgPath" alt="banner">
        </div>
        <!-- 标题，价格，可预定 -->
        <div class="detailInfoMain">
            <h3>{{renderData.content.title}}</h3>
            <p>押金：{{renderData.content.totalPrice}}</p>
            <p>可预定台数：<b>{{renderData.content.commoditySets}}</b>台</p>
        </div>
        <div class="detailpaddingCentent">
            <!-- tip信息 -->
            <div class="detailTipMain line_top">
                <span>
                    <img src="@/assets/images/brandIcon.png" alt="品牌">
                    支付牌照
                </span>
                <span>
                    <img src="@/assets/images/rateIcon.png" alt="费率">
                    安全可靠
                </span>
            </div>
            <!-- 图文详情 -->
            <div class="detailContentMain line_top">
                <h3 class="title">商品详情</h3>
                <div class="detailCententBox" v-html="renderData.content.remark">
                   
                </div>
            </div>
        </div>
        <!-- 底部按钮 -->
        <div class="detailFooterBtnMain line_top">
            <a href="tel:110" class="phone">
                <img src="images/customerServiceIcon.png" alt="客服">
            </a>
            <div>
                <a href="javascript:;" class="buyBtn">点击预约</a>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import { getServer } from "@/api/index";
import response from "@/assets/js/response.js";
import {Indicator, Toast } from "mint-ui";

export default {
  data() {
    return {
      queryData: {
        relogin: {
          requestType: "buslogin",
          requestKeywords: "relogin",
          platformID: this.$store.state.user.pid,
          userID: this.$store.state.user.uid,
          userPhone: this.$store.state.user.uphone,
          openid: this.$store.state.user.opid
        },
        logout: {
          requestType: "personal",
          requestKeywords: "shoplists",
          platformID: this.$store.state.user.pid,
          userID: this.$store.state.user.uid,
          userPhone: this.$store.state.user.uphone
        },
        bookDetail: {
          requestType: "onlinedes",
          requestKeywords: "details",
          id:this.$route.params.id
        }
      },
      renderData: {
        content:"" 
      }
    };
  },
  methods: {
    relogin() {
      // alert(this.queryData.relogin.openid)
      getServer(this.queryData.relogin).then(res => {
        if (res.data.responseStatus === 1) {
          if (res.data.status === 1) {
            this.aboutFn();
          } else if (res.data.status === 2) {
            Toast("您的账号已被他人登陆");
            setTimeout(() => {
              this.$store.dispatch("LogOut", this.queryData.logout).then(() => {
                // location.reload();
                setTimeout(() => {
                  this.$router.push({
                    // path: "/loginoid",
                    path: "/loginoid",
                    query: {
                      plat: this.$store.state.user.plat
                    }
                  });
                }, 500);
              });
            }, 1000);
          }
        }
      });
    },
    getBookDetail() {
      Indicator.open();
      getServer(this.queryData.bookDetail).then(res => {
        if (res.data.responseStatus === 1) { 
            var datas = res.data.data;
            this.renderData.content = datas; 
            Indicator.close();
        }else{
             Indicator.close();
        }
      });
    },
  },
  created() {
    this.relogin();
    this.getBookDetail();
  }
};
</script>
<style lang="scss">
.bookDetailContainer{
    padding-top:0.8rem;
    font-size:0.3rem;
}
.detailpaddingCentent {
  padding: 0 15px;
}
.detailInfoMain {
  text-align: center;
  padding-bottom: 20px;
}
.detailInfoMain h3 {
  font-size: 18px;
  line-height: 30px;
  padding-bottom: 5px;
}
.detailInfoMain p {
  font-size: 14px;
  line-height: 20px;
}
.detailInfoMain p b {
  font-size: 20px;
  padding-right: 6px;
  color: #FF9933;
}
.detailTipMain {
  overflow: hidden;
  padding: 12px 0 10px;
}
.detailTipMain span {
  display: block;
  width: 50%;
  float: left;
  font-size: 14px;
  text-align: center;
}
.detailTipMain span img {
  width: 20px;
  height: 20px;
  display: inline-block;
  position: relative;
  top: -1px;
  margin-right: 2px;
}
.detailContentMain {
  padding-top: 10px;
}
.detailContentMain h3.title {
  font-size: 18px;
  line-height: 40px;
}
.detailContentMain .detailCententBox {
  text-align: justify;
  font-size: 14px;
  line-height: 24px;
  padding-bottom: 60px;
  min-height: 300px;
}
.detailFooterBtnMain {
  height: 50px;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  overflow: hidden;
}
.detailFooterBtnMain a.phone {
  width: 50px;
  height: 40px;
  float: left;
  display: block;
  text-align: center;
  padding-top: 10px;
}
.detailFooterBtnMain a.phone img {
  width: 30px;
  height: 30px;
  display: block;
  margin: 0 auto;
}
.detailFooterBtnMain div {
  padding-left: 50px;
}
.detailFooterBtnMain div a {
  display: block;
  width: 100%;
  height: 50px;
  background: #409efe;
  text-align: center;
  font-size: 16px;
  line-height: 50px;
  color: #fff;
}
</style>
