<template>
    <div class="affiliateTransactions">
        <!-- header -->
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)">
            <span>下属交易</span>
        </div>
        <!-- body -->
        <div class="affiliateTransactionsMain">
            <!-- 按时间筛选 -->
            <div class="affiliateTransactionsHeaderMain">
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
                ></mt-datetime-picker>
                <div class="time-screening">
                    <el-select v-model="productName" placeholder="按产品" @change="byProductChange">
                        <el-option
                            v-for="item in renderData.product"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </div>
                <!-- 快捷筛选 -->
                <div class="quickScreeningNav">
                    <!-- <a class="active" href="javascript:;">昨日</a>
        <a href="javascript:;">当日</a>
        <a href="javascript:;">当月</a>
                    <a href="javascript:;">累计</a>-->
                    <el-radio-group v-model="type" size="medium" @change="clickChange">
                        <!-- :disabled="isUpLoading" -->
                        <el-radio-button label="days" :disabled="isServer">当日</el-radio-button>
                        <el-radio-button label="yesterday" :disabled="isServer">昨日</el-radio-button>
                        <el-radio-button label="mons" :disabled="isServer">当月</el-radio-button>
                        <el-radio-button label="all" :disabled="isServer">累计</el-radio-button>
                        <el-radio-button label="selectionDate">
                            <em @click="screeningTime">按时间筛选</em>
                        </el-radio-button>
                    </el-radio-group>
                </div>
                <!-- 交易总金额 -->
                <div class="tradingTotalMoneyMain">
                    <h3 v-if="type === 'yesterday'">昨日交易额(元)</h3>
                    <h3 v-if="type === 'days'">当日交易额(元)</h3>
                    <h3 v-if="type === 'selectionDate'">{{ year }}年{{ month }}月{{ date }}交易额(元)</h3>
                    <h3 v-if="type === 'mons'">当月交易额(元)</h3>
                    <h3 v-if="type === 'all'">总交易额(元)</h3>
                    <div>{{ ATurnover }}</div>
                </div>
            </div>
            <!-- <div class="interval"></div> -->
            <!-- 下属交易列表 -->
            <!-- <div class="tradingListMain">
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
            </div>-->
            <!-- v-load-more -->
            <!-- <div class="tradingListMain" v-load-more="loaderMore"> -->
            <!-- <div class="bodyItem" v-for="item in renderData.list" :key="item.id" v-if="isData">
                    <p>{{ item.busname }}({{ item.phone }})</p>
                    <p>交易笔数：{{ item.con }}</p>
                    <p>交易金额：{{ item.money }}</p>
                    <p>产品终端号：{{ item.terminal }}</p>
                </div>
                <div class="no-data" v-else>
                    <img src="@/assets/images/no-data.png" alt>
            </div>-->
            
            <div class="scroll-list-wrap tradingListMain">
                <cube-scroll ref="scroll" 
                    :data="renderData.list"
                    @pulling-down="onPullingDown"
                    @pulling-up="onPullingUp"
                    :options="options"
                    v-if="isData"
                >
                    <div class="bodyItem" v-for="item in renderData.list" :key="item.id" v-if="isData">
                        <p>{{ item.busname }}({{ item.phone }})</p>
                        <p>交易笔数：{{ item.con }}</p>
                        <p>交易金额：{{ item.money }}</p>
                        <p>产品终端号：{{ item.terminal }}</p>
                    </div>
                </cube-scroll>
                <div class="no-data" v-else>
                    <img src="@/assets/images/no-data.png" alt>
                </div>
            </div>
            <!-- </div> -->
        </div>
    </div>
</template>
<script>
import { getServer } from "@/api/index";
// import { Style, Button } from 'cube-ui'
// import { loadMore } from "./mixin";
import { Indicator } from 'mint-ui';
export default {
    data() {
        return {
            isServer: false,
            options: {
                pullDownRefresh: {
                    threshold: 90,
                    stop: 40,
                    txt: '刷新成功'
                },                                // 配置下拉刷新 
                pullUpLoad: {
                    threshold: 0,
                    txt: {
                        more: '上拉加载更多',
                        noMore: '没有更多数据'
                    }
                }                                 // 配置上拉加载，若要关闭可直接 pullUpLoad：false
            },
            offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
            shopListArr: [], // 店铺列表数据
            preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
            showBackStatus: false, //显示返回顶部按钮
            showLoading: true, //显示加载动画
            touchend: false, //没有更多数据
            type: "days",
            isData: true,
            pickerValue: "按时间筛选",
            year: "",
            month: "",
            date: "",
            dateValue: "",
            isClicked: false,
            ATurnover: "0.00",
            productName: "",
            queryData: {
                list: {
                    //   requestType: "funds",
                    //   requestKeywords: "merchandise",
                    //   platformID: this.$store.state.user.pid,
                    //   userID: this.$store.state.user.uid,
                    //   userPhone: this.$store.state.user.uphone,
                    //   page: 0,
                    //   types: "days"
                    // dates: ''
                    // limit: 10
                    requestType: "funds",
                    requestKeywords: "transactions",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    page: 1,
                    types: "days",
                    // proid: 17
                    proid: "",
                    limit: 10
                },
                product: {
                    requestType: "agent",
                    requestKeywords: "product",
                    platformID: this.$store.state.user.pid
                }
            },
            renderData: {
                list: [],
                oldList: [],
                product: []
            }
        };
    },
    // mixins: [loadMore],
    methods: {
        onPullingDown() {
            console.log("下拉刷新");
            this.renderData.list = []
            this.queryData.list.page = 1
            this.list()
        },
        // 触发上拉加载
        onPullingUp() {
            // alert(1)
            // console.log("上拉加载");
            // 模拟更新数据
            // setTimeout(() => {
            //     if (Math.random() > 0.5) {
            //         // 如果有新数据
            //         let newPage = [1, 2, 3, 4, 5, 6];
            //         console.log("有新数据");
            //         this.msg = this.msg.concat(newPage);
            //     } else {
            //         // 如果没有新数据
            //         this.$refs.scroll.forceUpdate();
            //     }
            // }, 1000);
            this.queryData.list.page++
            this.list()
           
        },
        screeningTime() {
            this.clickChange();
        },
        clickChange() {
            // console.log(this.type)
            if (this.type === "selectionDate") {
                this.selectYear();
            } else {
                delete this.queryData.list.dates;
                this.isClicked = false;
                this.queryData.list.types = this.type;
                this.upFinished = false;
                this.isData = true;
                this.queryData.list.page = 1;
                this.renderData.list = [];
                this.list();
            }
        },
        selectYear() {
            this.$refs.datePicker.open();
        },
        handleCancel() {
            // this.queryData.list.types = "selectionDate";
            if( this.queryData.list.dates ) {
                this.queryData.list.types = "selectionDate";
            } else {
                this.type = this.queryData.list.types
            }
        },
        handleConfirm(value) {
            this.year = value.getFullYear();
            this.month = value.getMonth() + 1;
            this.date = value.getDate();
            this.isClicked = true;
            this.queryData.list.dates = this.year + "-" + this.month + "-" + this.date;
            this.queryData.list.types = "days";
            this.upFinished = false;
            this.isData = true;
            this.queryData.list.page = 1;
            // this.renderData.oldList = [];
            this.renderData.list = []
            // this.onLoadList();
            this.list()
        },
        list() {
            Indicator.open();
            this.isServer = true
            // alert(this.queryData.list.proid)
            // console.log(this.queryData.list)
            getServer(this.queryData.list).then(res => {
                this.isServer = false
                Indicator.close();
                // console.log(res.data.data.constructor === Array);
                if (res.data.responseStatus === 1) {
                    // console.log(res.data.data.length)
                    // console.log(res.data)
                    this.ATurnover = res.data.sum;
                    this.isData = true;
                    // this.renderData.list = res.data.data;
                    res.data.data.forEach(item => {
                        this.renderData.list.push(item);
                    });
                } else if ( res.data.responseStatus === 300 && this.queryData.list.page !== 1 ) {
                    this.$refs.scroll.forceUpdate();
                } else if ( res.data.responseStatus === 300 && this.queryData.list.page === 1 ) {
                    this.isData = false;
                    this.ATurnover = "0.00"
                }
            });
        },
        productList() {
            getServer(this.queryData.product)
            .then(res => {
                // console.log(res)
                if (res.data.responseStatus === 1) {
                    this.renderData.product = res.data.data;
                    this.productName = res.data.data[0].name;
                    this.queryData.list.proid = res.data.data[0].id;
                }
            })
            .then( () => {
                this.list()
            })
        },
        byProductChange() {
            this.queryData.list.proid = this.productName;
            this.queryData.list.page = 1;
            // this.onLoadList();
            this.renderData.list = []
            this.list()
        }
    },
    created() {
        this.productList()
        // this.list();
    }
};
</script>
<style lang="scss">
.affiliateTransactionsMain {
    font-size: .3rem;
}
.affiliateTransactions .before-trigger {
    font-size: .3rem;
}
.affiliateTransactions .scroll-list-wrap{
        height: 9rem;
        overflow: auto;
        .item{
            padding: 10px 10px;

            &:nth-child(2n+1){
                background: #ccc;
            }
        }
}

.time-screening {
    text-align: center;
    margin-top: 0.8rem;
    overflow: hidden;
    .el-select {
        display: block;
        width: 30%;
        float: right;
    }
    .el-input__inner {
        border: none;
        background: transparent;
        color: #fff;
    }
    .el-select .el-input .el-select__caret {
        color: #fff;
    }
}
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
    padding-top: 0.25rem;
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
    //   height: 40px;
    height: 0.8rem;
    text-align: left;
    height: 0.8rem;
    padding: 0 10px;
    //   border-bottom: 1px solid #fff;
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
        font-size: 0.26rem;
        margin-top: 0.1rem;
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
    margin-top: 4.5rem;
}
</style>
