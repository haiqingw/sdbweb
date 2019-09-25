<template>
    <div class="merchantsTradeContainer">
        <div class="return" style="height:45px; line-height:45px;">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)">
            <span>商户交易</span>
            <a href="javascript:;" class="timeRightBtn" @click="showTimePickerTap()"><em>{{selectedTime}}</em>
                <van-icon name="arrow" />
            </a>
        </div>
        <div class="merchantsTradeMain">
            <!-- 筛选与搜索 -->
            <div class="searchMain">
                <div class="productScreeningMain">
                    <van-field readonly clickable :value="proValue" @click="showPicker = true" right-icon="arrow-down" />
                    <van-popup v-model="showPicker" position="bottom">
                        <van-picker show-toolbar :columns="columns" title="" :default-index="2" @cancel="showPicker = false" @confirm="onConfirm" />
                    </van-popup>
                </div>
                <div class="searchMain">
                    <van-search v-model="searchValue" placeholder="请输入搜索关键词" show-action clearable shape="round" @search="onSearch">
                        <div slot="action" @click="onSearch">搜索</div>
                    </van-search>
                </div>
            </div>
        </div>
        <!-- 列表 -->
        <div class="merchantsListMain">
          <h3>终端号：12312314456</h3>
          <div class="merchantsListBox line_bottom">
            <div>
              <p class="ren-flex-sb">
                <span>交易金额：<b>1000.00元</b></span>
                <em>交易分润：<b>0.1元</b></em>
              </p>
              <p class="gray">
                交易时间：2019-09-25 15:00:00
              </p>
            </div>
          </div>
          <div class="merchantsListBox line_bottom">
            <div>
              <p class="ren-flex-sb">
                <span>交易金额：<b>1000.00元</b></span>
                <em>交易分润：<b>0.1元</b></em>
              </p>
              <p class="gray">
                交易时间：2019-09-25 15:00:00
              </p>
            </div>
          </div>
            <h3>终端号：12312314456</h3>
            <div class="merchantsListBox line_bottom">
              <div>
                <p class="ren-flex-sb">
                  <span>交易金额：<b>1000.00元</b></span>
                  <em>交易分润：<b>0.1元</b></em>
                </p>
                <p class="gray">
                  交易时间：2019-09-25 15:00:00
                </p>
              </div>
            </div>
            <div class="merchantsListBox line_bottom">
              <div>
                <p class="ren-flex-sb">
                  <span>交易金额：<b>1000.00元</b></span>
                  <em>交易分润：<b>0.1元</b></em>
                </p>
                <p class="gray">
                  交易时间：2019-09-25 15:00:00
                </p>
              </div>
            </div>
            <div class="merchantsListBox line_bottom">
              <div>
                <p class="ren-flex-sb">
                  <span>交易金额：<b>1000.00元</b></span>
                  <em>交易分润：<b>0.1元</b></em>
                </p>
                <p class="gray">
                  交易时间：2019-09-25 15:00:00
                </p>
              </div>
            </div>
        </div>
        <!-- 时间 -->
        <van-popup v-model="showTimePicker" position="bottom">
            <van-datetime-picker v-model="currentDate" type="year-month"  :formatter="formatter" title="请选择月份" @confirm = "onTimeConfirm" @cancel = "onTimeCancel"/>
        </van-popup>
    </div>
</template>
<script>
import { Searcha, Picker, DatetimePicker } from "vant";
export default {
    data() {
        return {
            proValue: "鼎刷",
            searchValue: "",
            showPicker: false,
            columns: ["鼎刷", "闪POS", "红POS", "银POS"],
            showTimePicker:false,
            currentDate: new Date(),
            selectedTime:"2019-09"
        };
    },
    components: {},
    methods: {
        onSearch() {},
        onConfirm(value, index) {
            this.proValue = value;
            this.showPicker = false;
        },
        onCancel() {
            this.showPicker = false;
        },
        formatter(type, value) {
            if (type === "year") {
                return `${value}年`;
            } else if (type === "month") {
                return `${value}月`;
            }
            return value;
        },
        showTimePickerTap(){
            this.showTimePicker = true;
        },
        onTimeConfirm(value){

          this.showTimePicker = false;
        },
        onTimeCancel(){
          this.showTimePicker = false;
        }
    }
};
</script>
<style lang="less">
.merchantsTradeContainer {
    .return {
        .timeRightBtn {
            position: absolute;
            right: 10px;
            top: 0;
            color: #fff;
            font-weight: bold;
            i {
                position: relative;
                top: 2px;
                margin-left: 2px;
            }
        }
    }
}
.merchantsTradeMain {
    padding-top:45px;
}
.searchMain {
    overflow: hidden;
    background: #f1f1f1;
    .productScreeningMain {
        width: 30%;
        float: left;
        .van-cell {
            line-height: 34px;
            background: none;
        }
    }
    .searchMain {
        border-left: 1px solid #fff;
        box-sizing: border-box;
        width: 70%;
        float: left;
        .van-cell {
            background: none;
        }
        .van-search {
            background: none !important;
        }
    }
}
.merchantsListMain{
  position:fixed;
  width:100%;
  top:99px;
  left:0;
  right:0;
  overflow:auto;
  h3{
    height:0.6rem;
    line-height:0.6rem;
    font-size:0.28rem;
    background:#089cfe75;
    padding:0 15px;
    color:#fff;
    letter-spacing:2px;
  }
  div.merchantsListBox{
    line-height:30px;
    padding:10px 15px;
    font-size:0.28rem;
    div{
      b{
        color:#f33;
        font-weight:bold;
        font-size:0.32rem;
      }
      p.gray{
        color:#999;
      }
    }
  }
}
</style>
