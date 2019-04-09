<template>
  <div>
    <!-- header -->
    <div class="return">
      <img src="@/assets/images/return.png" alt="" @click="$route.go(-1)" />
      <span>下属交易</span>
    </div>
    <!-- body -->
    <div class="affiliateTransactionsMain">
      <!-- 按时间筛选 -->
      <div class="selector selectYear" @click="selectYear">
        <div class="show_year">
          <p v-if="!isClicked">请选择日期筛选</p>
          <p v-if="isClicked">{{ year }}年{{ month }}月{{ date }}日</p>
        </div>
      </div>
      <mt-datetime-picker
        v-model="dateValue"
        type="date"
        ref="datePicker"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        :endDate="new Date()"
        @confirm="handleConfirm"
      >
      </mt-datetime-picker>
      <!-- 快捷筛选 -->
      <div class="quickScreeningNav flex">
        <a class="active" href="javascript:;">昨日</a>
        <a href="javascript:;">当日</a>
        <a href="javascript:;">当月</a>
        <a href="javascript:;">累计</a>
      </div>
      <!-- 交易总金额 -->
      <div class="tradingTotalMoneyMain">
        <h3>总交易额(元)</h3>
        <div>
          10000.00
        </div>
      </div>
      <div class="interval"></div>
      <!-- 下属交易列表 -->

      <div class="tradingListMain">
        <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
          <van-list
            v-model="isUpLoading"
            :finished="upFinished"
            finished-text="没有更多了"
            @load="onLoadList"
            :offset="offset"
          >
            <div class="bodyItem">
              <p>任勇强(13296905340)</p>
              <p>交易笔数：1</p>
              <p>交易金额：39990.00</p>
              <p>产品终端号：231234564568744</p>
            </div>
            <div class="bodyItem">
              <p>任勇强(13296905340)</p>
              <p>交易笔数：1</p>
              <p>交易金额：39990.00</p>
              <p>产品终端号：231234564568744</p>
            </div>
            <div class="bodyItem">
              <p>任勇强(13296905340)</p>
              <p>交易笔数：1</p>
              <p>交易金额：39990.00</p>
              <p>产品终端号：231234564568744</p>
            </div>
            <div class="bodyItem">
              <p>任勇强(13296905340)</p>
              <p>交易笔数：1</p>
              <p>交易金额：39990.00</p>
              <p>产品终端号：231234564568744</p>
            </div>
            <div class="bodyItem">
              <p>任勇强(13296905340)</p>
              <p>交易笔数：1</p>
              <p>交易金额：39990.00</p>
              <p>产品终端号：231234564568744</p>
            </div>
            <div class="bodyItem">
              <p>任勇强(13296905340)</p>
              <p>交易笔数：1</p>
              <p>交易金额：39990.00</p>
              <p>产品终端号：231234564568744</p>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pickerValue: "按时间筛选",
      year: "",
      dateValue: "",
      isClicked: false,
      isDownLoading: false, //下拉刷新
      isUpLoading: false, //上拉加载
      upFinished: false, //上拉加载完毕
      offset: 10, //滚动条与底部距离小于 offset 时触发load事件
      isData: true
    };
  },
  methods: {
    selectYear() {
      this.$refs.datePicker.open();
    },
    handleConfirm(value) {
      console.log(value);
      this.year = value.getFullYear();
      this.month = value.getMonth() + 1;
      this.date = value.getDate();
      this.isClicked = true;
    }
  }
};
</script>
<style lang="scss">
.affiliateTransactionsMain {
  padding-top: 40px;
}
.selector {
  font-size: 14px;
  background: #089cfe;
  height: 40px;
  text-align: left;
  line-height: 40px;
  padding: 0 10px;
  border-bottom: 1px solid #fff;
  color: #fff;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  left: 0;
  top: 40px;
  z-index: 999;
}
.tradingTotalMoneyMain {
  background: #089cfe;
  padding: 10px;
  color: #fff;
  position: fixed;
  width: 100%;
  left: 0;
  top: 80px;
  box-sizing: border-box;
  z-index: 9999;
  h3 {
    font-size: 14px;
    padding-top: 10px;
  }
  div {
    font-size: 50px;
    font-weight: bold;
  }
}
.quickScreeningNav {
  justify-content: space-around;
  height: 40px;
  position: fixed;
  right: 0;
  top: 40px;
  line-height: 40px;
  z-index: 9999;
  a {
    font-size: 12px;
    display: block;
    margin: 0 10px;
    color: #fff;
    border: 1px solid #fff;
    height: 26px;
    line-height: 26px;
    box-sizing: border-box;
    margin-top: 7px;
    padding: 0 5px;
    &.active {
      background: #fff;
      color: #089cfe;
    }
  }
}
.bodyItem {
  padding: 5px 10px;
  overflow: hidden;
  border-bottom: 5px solid #f1f1f1;
}
.bodyItem > p {
  display: block;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  color: #333;
}
.bodyItem > p:nth-of-type(1) {
  font-weight: bold;
}
.bodyItem > p:nth-of-type(3) {
  color: #f33;
}
.tradingListMain {
  padding-top: 155px;
}
</style>
