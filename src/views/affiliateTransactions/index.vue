<template>
  <div>
    <!-- header -->
    <div class="return">
      <img src="@/assets/images/return.png" alt="" @click="$router.go(-1)" />
      <span>下属交易</span>
    </div>
    <!-- body -->
    <div class="affiliateTransactionsMain">
      <!-- 按时间筛选 -->
      <div class="affiliateTransactionsHeaderMain">
        <div class="selector selectYear" @click="selectYear">
          <!-- <div class="show_year">
          <p v-if="!isClicked">请选择日期筛选</p>
          <p v-if="isClicked">{{ year }}年{{ month }}月{{ date }}日</p>
        </div> -->
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
          @cancel="handleCancel"
        >
        </mt-datetime-picker>
        <!-- 快捷筛选 -->
        <div class="quickScreeningNav">
          <!-- <a class="active" href="javascript:;">昨日</a>
        <a href="javascript:;">当日</a>
        <a href="javascript:;">当月</a>
        <a href="javascript:;">累计</a> -->
          <el-radio-group v-model="type" size="medium" @change="clickChange">
            <el-radio-button :disabled="isUpLoading" label="yesterday"
              >昨日</el-radio-button
            >
            <el-radio-button :disabled="isUpLoading" label="days"
              >当日</el-radio-button
            >
            <el-radio-button :disabled="isUpLoading" label="mons"
              >当月</el-radio-button
            >
            <el-radio-button :disabled="isUpLoading" label="all"
              >累计</el-radio-button
            >
            <el-radio-button label="selectionDate">
              <em @click="screeningTime">按时间筛选</em>
            </el-radio-button>
          </el-radio-group>
        </div>
        <!-- 交易总金额 -->
        <div class="tradingTotalMoneyMain">
          <h3 v-if="type === 'yesterday'">昨日交易额(元)</h3>
          <h3 v-if="type === 'days'">当日交易额(元)</h3>
          <h3 v-if="type === 'selectionDate'">
            {{ year }}年{{ month }}月{{ date }}交易额(元)
          </h3>
          <h3 v-if="type === 'mons'">当月交易额(元)</h3>
          <h3 v-if="type === 'all'">总交易额(元)</h3>
          <div>
            {{ ATurnover }}
          </div>
        </div>
      </div>

      <!-- <div class="interval"></div> -->

      <!-- 下属交易列表 -->

      <div class="tradingListMain">
        <van-pull-refresh
          v-model="isDownLoading"
          @refresh="onDownRefresh"
          v-if="isData"
        >
          <van-list
            v-model="isUpLoading"
            :finished="upFinished"
            finished-text="没有更多了"
            @load="onLoadList"
            :offset="offset"
          >
            <div
              class="bodyItem"
              v-for="item in renderData.oldList"
              :key="item.id"
            >
              <p>{{ item.busname }}({{ item.phone }})</p>
              <p>交易笔数：{{ item.con }}</p>
              <p>交易金额：{{ item.money }}</p>
              <p>产品终端号：{{ item.terminal }}</p>
            </div>
          </van-list>
        </van-pull-refresh>
        <div class="no-data" v-else>
          <img src="@/assets/images/no-data.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getServer } from "@/api/index";
export default {
  data() {
    return {
      type: "yesterday",
      isDownLoading: false, //下拉刷新
      isUpLoading: false, //上拉加载
      upFinished: false, //上拉加载完毕
      offset: 10, //滚动条与底部距离小于 offset 时触发load事件
      isData: true,
      pickerValue: "按时间筛选",
      year: "",
      month: "",
      date: "",
      dateValue: "",
      isClicked: false,
      ATurnover: "0.00",
      queryData: {
        list: {
          requestType: "funds",
          requestKeywords: "merchandise",
          platformID: this.$store.state.user.pid,
          userID: this.$store.state.user.uid,
          userPhone: this.$store.state.user.uphone,
          page: 0,
          types: "yesterday"
          // dates: ''
          // limit: 10
        }
      },
      renderData: {
        list: [],
        oldList: []
      }
    };
  },
  methods: {
    screeningTime() {
      this.clickChange();
    },
    clickChange() {
      if (this.type === "selectionDate") {
        this.selectYear();
      } else {
        delete this.queryData.list.dates;
        this.isClicked = false;
        this.queryData.list.types = this.type;
        this.upFinished = false;
        this.isData = true;
        this.queryData.list.page = 0;
        this.renderData.oldList = [];
        this.onLoadList();
      }
    },
    onLoadList() {
      this.queryData.list.page++;
      this.isUpLoading = true;
      // console.log(this.queryData.list.page)
      this.list();
    },
    onDownRefresh() {
      this.queryData.list.page = 1;
      this.renderData.oldList = [];
      this.isDownLoading = true;
      this.list();
    },
    selectYear() {
      this.$refs.datePicker.open();
    },
    handleCancel() {
      this.queryData.list.types = "selectionDate";
      // this.type = this.queryData.list.types
    },
    handleConfirm(value) {
      this.year = value.getFullYear();
      this.month = value.getMonth() + 1;
      this.date = value.getDate();
      this.isClicked = true;
      this.queryData.list.dates =
        this.year + "-" + this.month + "-" + this.date;
      this.queryData.list.types = "days";
      this.upFinished = false;
      this.isData = true;
      this.queryData.list.page = 0;
      this.renderData.oldList = [];
      this.onLoadList();
    },
    list() {
      getServer(this.queryData.list).then(res => {
        if (res.data.responseStatus === 1) {
          this.ATurnover = res.data.sum;
          this.isData = true;
          this.renderData.list = res.data.data;
          this.renderData.list.forEach(item => {
            this.renderData.oldList.push(item);
          });
          this.isDownLoading = false;
          this.isUpLoading = false;
        } else if (
          res.data.responseStatus === 300 &&
          this.queryData.list.page !== 1
        ) {
          this.upFinished = true;
          this.isUpLoading = false;
        } else if (
          res.data.responseStatus === 300 &&
          this.queryData.list.page === 1
        ) {
          this.upFinished = false;
          this.isUpLoading = false;
          this.isData = false;
          this.ATurnover = "0";
        }
      });
    }
  }
};
</script>
<style lang="scss">
.affiliateTransactionsHeaderMain {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: #089cfe;
  z-index: 999;
}
.quickScreeningNav {
  width: 100%;
  padding-top:0.25rem;
}
.affiliateTransactionsMain .quickScreeningNav .el-radio-group {
  overflow: hidden;
  display: block;
  text-align: center;
}
.affiliateTransactionsMain .quickScreeningNav .el-radio-group .el-radio-button {
  margin: 0 0.1rem;
}
.affiliateTransactionsMain
  .quickScreeningNav
  .el-radio-group
  .el-radio-button
  span {
  padding: 0.15rem 0.2rem 0.1rem;
  border-radius: 0;
  background-color: transparent;
  border: 1px solid #fff;
  color: #fff;
  line-height: 0.2rem;
  width: 100%;
  height: 100%;
  display: block;
}
.affiliateTransactionsMain
  .quickScreeningNav
  .el-radio-group
  .el-radio-button.is-active
  span {
  background: #fff;
  color: #089cfe;
}
.affiliateTransactionsMain {
  // padding-top: 40px;
  //   margin-top: .8rem;
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
  // position: fixed;
  width: 100%;
  box-sizing: border-box;
  // left: 0;
  // top: 0.8rem;
  // z-index: 999;
}
.tradingTotalMoneyMain {
  background: #089cfe;
  //   padding: 10px;
  padding: 0.1rem 0.5rem;
  color: #fff;
  // position: fixed;
  width: 100%;
  // left: 0;
  // top: 1.5rem;
  box-sizing: border-box;
  // z-index: 9999;
  h3 {
    // font-size: 14px;
    font-size: .26rem;
    margin-top: .1rem;
  }
  div {
    font-size: 1rem;
    font-weight: bold;
    padding: 0.1rem 0;
  }
}
.quickScreeningNav {
  // justify-content: space-around;
//   height: 40px;
  // position: fixed;
  // right: 0;
  // top: 1rem;
//   line-height: 40px;
  // z-index: 9999;
//   height: .4rem;
//   line-height: .4rem;
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
  //   padding-top: 155px;
  padding-top: 3.8rem;
}
</style>
