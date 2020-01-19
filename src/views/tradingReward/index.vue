<template>
  <div>
    <!-- header -->
    <div class="return">
      <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
      <span>交易奖励</span>
      <div class="freezeProgressMainProductScreeningMain">
        <span @click="showPicker= true">{{proValue}}</span>
        <!-- <van-field readonly clickable :value="proValue"   right-icon="arrow-down" /> -->
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="renderData.productName"
            title
            :default-index="0"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
      </div>
    </div>
    <!-- freezeProgress -->
    <div class="tradingRewardContainer" style="background:#fff;" v-if="isNoData">
      <cube-scroll
        ref="scroll"
        :data="renderData.list"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp"
        :options="options"
      >
        <div class="no-data-main">
          <img src="@/assets/images/no-data.png" alt="暂无数据" />
        </div>
      </cube-scroll>
    </div>
    <div class="tradingRewardContainer" v-else>
      <cube-scroll
        ref="scroll"
        :data="renderData.list"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp"
        :options="options"
      >
        <!-- 条件规则 -->
        <div class="tradingRewardCondition">
          <!-- <h3>达标奖励条件及说明</h3> -->
          <div class="conditionBox">
            <van-swipe :autoplay="3000" :show-indicators="false">
              <van-swipe-item v-for="(item,index) in renderData.explainData" :key="index">
                <div class="conditonItem">
                  <h3>{{item.name}}</h3>
                  <p>
                    1.机具入网时间起 第
                    <b>{{item.startDays}}</b>个月开始；
                  </p>
                  <p>
                    2.连续
                    <b>{{item.howMonths}}</b>月，每月刷够
                    <b>{{item.AmountMark}}</b>万元，奖励
                    <b>{{item.cashMoney}}</b>元；
                  </p>
                  <p>
                    3.断月：
                    <b>{{item.brokenMonsStatus}}</b>
                  </p>
                </div>
              </van-swipe-item>
            </van-swipe>
          </div>
        </div>
        <!-- 列表 -->
        <div v-if="isNoList">
          <div class="tradingRewardItem" v-for="(item,index) in renderData.list" :key="index">
            <div class="tradingRewardTop">
              <span></span>
              <span></span>
              <h3>客户姓名：{{item.businfo}}</h3>
              <h4>终端编号：{{item.terminalNo}}</h4>
              <h4>入网时间：{{item.netTime}}</h4>
              <h4 v-if="item.audithint">
                当前返现：{{item.audithint.cashMoney}}
                <em
                  :style="{'color' : item.audithint.isAudit==1 ? '#67C23A' : '#F56C6C'}"
                >{{item.audithint.auditNick}}</em>
                <span
                  :style="{'color' : item.audithint.isStatus==1 ? '#67C23A' : '#F56C6C'}"
                >{{item.audithint.statusNick}}</span>
              </h4>
              <!-- <h4>
            交易分润：
            <b>1000.00</b>
              </h4>-->
            </div>
            <div class="tradingRewardSub">
              <div class="tradingRewardBox" :style="{'height':(item.isMore ? 'auto' : '')}">
                <div
                  :class="[interItem.standsStatus == 1 ? 'tradingRewardItemInter complete' : 'tradingRewardItemInter unfinished']"
                  v-for="(interItem,i) in item.standsData"
                  :key="i"
                >
                  <div class="date">
                    <p>{{interItem.standTime.substring(0,4)}}</p>
                    <span>{{interItem.standTime.substring(interItem.standTime.length-2,interItem.standTime.length)}}</span>
                  </div>
                  <div :class="[interItem.standsStatus == 1 ? 'money complete' : 'money']">
                    <h3>达标金额：{{interItem.standsMoney}}万元</h3>
                    <h4>当前已交易：{{interItem.tradeMoney}}万元</h4>
                  </div>
                  <em
                    :class="[interItem.standsStatus == 1 ? 'green' : 'red']"
                  >{{interItem.standNick}}</em>
                </div>
              </div>
              <a
                href="javascript:;"
                class="viewMore"
                v-if="item.standsData.length > 2 && !item.isMore"
                @click="viewMoreTap(item.terminalNo)"
              >
                <img src="@/assets/images/arrIcon.png" alt="展开" />展开全部
              </a>
              <a
                href="javascript:;"
                class="viewMore"
                v-if="item.standsData.length > 2 && item.isMore"
                @click="viewPackupTap(item.terminalNo)"
              >
                <img style="top:-2px;" src="@/assets/images/arrTopIcon.png" alt="收起" />收起全部
              </a>

              <!-- 暂无交易 -->
              <div class="noDataBox" v-if="item.standsData.length == 0">
                <img src="@/assets/images/noDataImg.png" alt="暂无交易" />
                <p>暂无交易数据</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="noDataMain">
            <img src="@/assets/images/InvitedRecordIcon.png" alt="暂无数据" />
            <p>暂无数据</p>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>
<script>
import { getServer } from "@/api/index";
import { Indicator, Toast } from "mint-ui";
import response from "@/assets/js/response.js";

export default {
  data() {
    return {
      isTerminalData: true,
      proValue: "",
      searchValue: "",
      showPicker: false,
      showTimePicker: false,
      isNoData: false,
      isNoList: false,
      options: {
        pullDownRefresh: {
          threshold: 90,
          stop: 40,
          txt: "刷新成功"
        }, // 配置下拉刷新
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: "上拉加载更多",
            noMore: "没有更多数据"
          }
        } // 配置上拉加载，若要关闭可直接 pullUpLoad：false
      },
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
          requestKeywords: "launchland",
          platformID: this.$store.state.user.pid,
          userID: this.$store.state.user.uid,
          userPhone: this.$store.state.user.uphone
        },
        explainData: {
          requestType: "tranvolume",
          requestKeywords: "temphint",
          platformID: this.$store.state.user.pid,
          userID: this.$store.state.user.uid,
          userPhone: this.$store.state.user.uphone,
          productID: ""
        },
        freezeData: {
          requestType: "tranvolume",
          requestKeywords: "tranlists",
          platformID: this.$store.state.user.pid,
          userID: this.$store.state.user.uid,
          userPhone: this.$store.state.user.uphone,
          productID: "",
          page: 1,
          limit:2
        },
        product: {
          requestType: "agent",
          requestKeywords: "product",
          platformID: this.$store.state.user.pid
        },
        audithint: {
          requestType: "tranvolume",
          requestKeywords: "audithint",
          platformID: this.$store.state.user.pid,
          userID: this.$store.state.user.uid,
          userPhone: this.$store.state.user.uphone,
          userLevel: "",
          terminal: ""
        }
      },
      renderData: {
        explainData: [],
        list: [],
        productName: []
      }
    };
  },
  methods: {
    relogin() {
      // alert(this.queryData.relogin.openid)
      getServer(this.queryData.relogin).then(res => {
        if (res.data.responseStatus === 1) {
          if (res.data.status === 1) {
            this.product();
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
    onConfirm(value, index) {
      this.renderData.list = [];
      this.renderData.audithint = [];
      this.proValue = value;
      this.renderData.product.forEach(item => {
        if (this.proValue === item.name) {
          this.queryData.freezeData.productID = item.id;
          this.queryData.explainData.productID = item.id;
        }
      });
      this.getExplainData();
      this.getfreezeListFn();
      this.showPicker = false;
    },
    //获取产品分类
    product() {
      getServer(this.queryData.product)
        .then(res => {
          if (res.data.responseStatus === 1) {
            this.renderData.product = res.data.data;
            this.renderData.product.forEach(item => {
              this.renderData.productName.push(item.name);
            });
            this.proValue = res.data.data[0].name;
            this.queryData.explainData.productID = res.data.data[0].id;
            this.queryData.freezeData.productID = res.data.data[0].id;
          }
        })
        .then(() => {
          this.getExplainData();
          this.getfreezeListFn();
        });
    },
    //获取解冻列表
    getfreezeListFn() {
      Indicator.open();
      getServer(this.queryData.freezeData).then(res => {
        Indicator.close();
        if (res.data.responseStatus === 1) {
          this.isNoList = true;
          var datas = res.data.data;
          datas.forEach(item => {
            item.isMore = false;
            this.queryData.audithint.userLevel = item.userLevel;
            this.queryData.audithint.terminal = item.terminalNo;
            this.getAudithintData(datas, item.terminalNo);
          });
        } else if (
          res.data.responseStatus === 300 &&
          this.queryData.freezeData.page !== 1
        ) {
          this.$refs.scroll.forceUpdate();
        } else if (
          res.data.responseStatus === 300 &&
          this.queryData.freezeData.page === 1
        ) {
          this.isNoList = false;
        }
      });
    },
    //获取条件规则
    getExplainData() {
      getServer(this.queryData.explainData).then(res => {
        if (res.data.responseStatus === 1) {
          this.isNoData = false;
          this.renderData.explainData = res.data.data;
        } else {
          this.isNoData = true;
        }
      });
    },
    // 查看全部
    viewMoreTap(terminalNo) {
      var datas = this.renderData.list;
      datas.forEach(item => {
        if (item.terminalNo == terminalNo) {
          item.isMore = true;
        }
      });
    },
    //收起
    viewPackupTap(terminalNo) {
      var datas = this.renderData.list;
      datas.forEach(item => {
        if (item.terminalNo == terminalNo) {
          item.isMore = false;
        }
      });
    },
    getAudithintData(datas, terminalNo) {
      getServer(this.queryData.audithint).then(res => {
        if (res.data.responseStatus === 1) {
          datas.forEach(item => {
            if (item.terminalNo == terminalNo) {
              item.audithint = res.data.data;
            }
          });
          this.renderData.list = datas;
        } else {
        }
      });
    },
    //下拉刷新
    onPullingDown() {
      this.renderData.list = [];
      this.queryData.freezeData.page = 1;
      this.getExplainData();
      this.getfreezeListFn();
    },
    // 上拉加载
    onPullingUp() {
      this.queryData.freezeData.page++;
      this.getfreezeListFn();
    }
  },
  created() {
    this.relogin();
  }
};
</script>
<style lang="scss" scoped>
.freezeProgressMain {
  //   padding-top: 40px;
  margin-top: 0.8rem;
}
.freezeProgressMainProductScreeningMain {
  position: fixed;
  top: 0;
  right: 0.2rem;
  width: 2.3rem;
  background: none;
  // overflow: hidden;
  span {
    width: 2rem;
    overflow: hidden;
    display: block;
    height: 0.8rem;
    position: absolute;
    right: 5px;
    top: 0;
    font-size: 0.28rem;
    padding-right: 10px;
    text-align: center;
    &::after {
      content: "";
      display: block;
      width: 8px;
      height: 8px;
      border-right: 2px solid #fff;
      border-bottom: 2px solid #fff;
      position: absolute;
      right: 3px;
      top: 50%;
      margin-top: -5px;
      transform: rotate(-45deg);
    }
  }
}
.freezeProgressMainProductScreeningMain .van-cell {
  background: none;
  border: none;
  padding: 0;
  line-height: 0.8rem;
  overflow: hidden;
  height: 0.8rem;
}
.freezeProgressMainProductScreeningMain .van-field__body {
  border: none;
  background: none;
  opacity: 0;
  position: relative;
  z-index: 9999;
}
.freezeProgressMainProductScreeningMain .van-cell__value {
  height: 0.8rem;
  overflow: hidden;
  border: none;
  background: none;
}
.freezeProgressMainProductScreeningMain .van-field__control,
.van-field__right-icon {
  color: #fff;
}
.tradingRewardCondition {
  padding-bottom: 15px;
}
.tradingRewardCondition h3 {
  font-size: 16px;
  font-weight: bold;
  line-height: 30px;
  position: relative;
  display: inline-block;
}
.tradingRewardCondition h3:after {
  content: "";
  display: block;
  width: 100%;
  height: 10px;
  background: #409efe;
  border-radius: 10px;
  position: absolute;
  bottom: 3px;
  left: 0;
  opacity: 0.5;
}
.tradingRewardCondition .conditionBox {
  overflow: hidden;
}
.tradingRewardCondition .conditionBox .conditonItem b {
  color: #f33;
  padding: 0 2px;
}
.tradingRewardCondition .conditionBox .conditonItem p {
  font-size: 12px;
  line-height: 24px;
}
.tradingRewardCondition .conditionBox .conditonItem p:first-of-type {
  padding-top: 5px;
}
.tradingRewardContainer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0.8rem;
  bottom: 0;
  background: #f1f1f1;
  padding: 0.2rem 15px 0;
  box-sizing: border-box;
  overflow-x: hidden;
  font-size: 0.3rem;
}
.tradingRewardContainer .tradingRewardItem {
  background: #fff;
  margin-bottom: 15px;
}
.tradingRewardContainer .noDataBox {
  text-align: center;
  padding-top: 40px;
  padding-bottom: 50px;
}
.tradingRewardContainer .noDataBox img {
  width: 50px;
  height: 50px;
  display: block;
  margin: 0 auto;
}
.tradingRewardContainer .noDataBox p {
  font-size: 14px;
  padding-top: 20px;
  font-weight: bold;
}
.tradingRewardTop {
  position: relative;
  border-bottom: 2px dashed #f4f4f4;
  padding: 20px 15px;
  line-height: 26px;
  background: #fff;
  color: #333;
  box-shadow: 0 -5px 5px #f1f1f1;
}
.tradingRewardTop > span {
  display: block;
  width: 20px;
  height: 20px;
  background-color: #f4f4f4;
  border-radius: 50%;
  position: absolute;
  bottom: -11px;
}
.tradingRewardTop > span:first-of-type {
  left: -10px;
}
.tradingRewardTop > span:last-of-type {
  right: -10px;
}
.tradingRewardTop h3 {
  font-size: 18px;
  padding-bottom: 5px;
  font-weight: bold;
}
.tradingRewardTop h4 {
  font-size: 14px;
  line-height: 20px;
  font-weight: bold;
  color: #333;
}
.tradingRewardTop h4 span {
  color: #409efe;
  padding: 0 5px;
  font-weight: bold;
}
.tradingRewardTop h4 em {
  color: #67c23a;
  padding: 0 5px;
  font-weight: bold;
}
.tradingRewardSub {
  padding: 30px 15px 15px;
  box-shadow: 0 5px 5px #f1f1f1;
}
.tradingRewardSub .tradingRewardBox {
  height: 142px;
  overflow: hidden;
}
.tradingRewardSub .tradingRewardItemInter.complete {
  border: 1px solid #67c23a;
}
.tradingRewardSub .tradingRewardItemInter.complete div.date {
  background: #67c23a;
}
.tradingRewardSub .tradingRewardItemInter.unfinished {
  border: 1px solid #f56c6c;
}
.tradingRewardSub .tradingRewardItemInter.unfinished div.date {
  background: #f56c6c;
}

.tradingRewardSub .tradingRewardItemInter {
  overflow: hidden;
  //   border: 1px solid #409efe;
  margin-bottom: 10px;
  position: relative;
}
.tradingRewardSub .tradingRewardItemInter div.date {
  width: 60px;
  height: 60px;
  //   background: #409efe;
  text-align: center;
  font-weight: bold;
  float: left;
  color: #fff;
}
.tradingRewardSub .tradingRewardItemInter div.date p {
  font-size: 16px;
  padding-top: 8px;
  padding-bottom: 3px;
}
.tradingRewardSub .tradingRewardItemInter div.date span {
  display: block;
  font-size: 30px;
  line-height: 30px;
  font-weight: bold;
}
.tradingRewardSub .tradingRewardItemInter div.money {
  float: left;
}
.tradingRewardSub .tradingRewardItemInter div.money h3 {
  line-height: 25px;
  font-size: 18px;
  padding: 10px 10px 0;
  font-weight: bold;
  color: #333;
}
.tradingRewardSub .tradingRewardItemInter div.money h4 {
  line-height: 20px;
  font-size: 14px;
  padding: 0 10px;
  color: #f56c6c;
  font-weight: 400;
}
.tradingRewardSub .tradingRewardItemInter div.money.complete h3 {
  padding-top: 19px;
  font-weight: bold;
  color: #333;
}
.tradingRewardSub .tradingRewardItemInter div.money.complete h4 {
  display: none;
}
.tradingRewardSub .tradingRewardItemInter em {
  position: absolute;
  right: -20px;
  top: 7px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  display: block;
  height: 20px;
  line-height: 20px;
  padding: 0 20px;
  color: #fff;
  font-size: 12px;
}
.tradingRewardSub .tradingRewardItemInter em.green {
  background: #67c23a;
}
.tradingRewardSub .tradingRewardItemInter em.red {
  background: #f56c6c;
}
.tradingRewardSub .viewMore {
  display: block;
  text-align: center;
  font-size: 14px;
  color: #8a8a8a;
  line-height: 20px;
  padding-top: 10px;
}
.tradingRewardSub .viewMore img {
  width: 16px;
  height: 16px;
  display: inline-block;
  position: relative;
  top: -1px;
  margin-right: 2px;
}
.no-data-main {
  padding: 20% 60px 0;
}
</style>
