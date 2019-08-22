<template>
    <div class="rank">
        <section class="subPageSection">
            <!-- 头部 -->
            <div class="rankHeaderMain">
                <a href="javascript:;" class="rankHeaderLeftBtn" @click="$router.go(-1)"></a>
                排行榜
                <a href="javascript:;" class="rankHeaderRightBtn">{{selectItem}}</a>
                <select v-model="selectItem" name id @change="changeSelect($event)">
                    <option
                        v-for="item in selectList"
                        :key="item.id"
                        :value="item.title"
                    >{{item.title}}</option>
                </select>
            </div>
            <!-- 折线图 -->
            <div class="scroll-list-wrap">
                <cube-scroll
                    ref="scroll"
                    :data="renderData.list"
                    @pulling-down="onPullingDown"
                    @pulling-up="onPullingUp"
                    :options="options"
                >
                    <div class="chartsMain">
                        <div class="chartsMain-choice">
                            <h2 v-if="changeState">
                                激活对比
                                <em>单位：个</em>
                            </h2>
                            <h2 v-else>
                                收益对比
                                <em>单位：元</em>
                            </h2>
                            <div class="rank-choice">
                                <el-select v-model="byProduct.value" @change="changeSelectProduct">
                                    <el-option
                                        v-for="item in byProduct.options"
                                        :key="item.proid"
                                        :label="item.proname"
                                        :value="item.proid"
                                    ></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="chartMain">
                            <div id="myChart0" style="width:100% !important;height:220px"></div>
                        </div>
                    </div>

                    <!-- 前三甲 -->
                    <div class="YRankHeaderMain">
                        <div>
                            <img src="@/assets/images/twoIcon.png" alt="第二名" />
                            <div v-if="isTheFirstThreeData && renderData.list.length >= 2">
                                <p>
                                    <span>{{renderData.theFirstThree[1].busName}}</span>
                                    <span>{{renderData.theFirstThree[1].phone}}</span>
                                </p>
                                <em v-if="changeState">激活{{renderData.theFirstThree[1].money}}个</em>
                                <em v-else>收益{{renderData.theFirstThree[1].money}}元</em>
                            </div>
                            <div v-else>
                                <em>暂无</em>
                            </div>
                            <!-- <em>激活</em> -->
                        </div>
                        <div>
                            <img src="@/assets/images/oneIcon.png" alt="第一名" />
                            <div v-if="isTheFirstThreeData && renderData.list.length >= 1">
                                <p>
                                    <span>{{renderData.theFirstThree[0].busName}}</span>
                                    <span>{{renderData.theFirstThree[0].phone}}</span>
                                    <em v-if="changeState">激活{{renderData.theFirstThree[0].money}}个</em>
                                    <em v-else>收益{{renderData.theFirstThree[0].money}}元</em>
                                </p>
                            </div>
                            <div v-else>
                                <em>暂无</em>
                            </div>
                            <b class="leftArrBg">
                                <img src="@/assets/images/leftArrBg.png" />
                            </b>
                            <b class="rightArrBg">
                                <img src="@/assets/images/rightArrBg.png" />
                            </b>
                        </div>
                        <div>
                            <img src="@/assets/images/threeIcon.png" alt="第三名" />
                            <div v-if="isTheFirstThreeData && renderData.list.length >= 3">
                                <p>
                                    <span>{{renderData.theFirstThree[2].busName}}</span>
                                    <span>{{renderData.theFirstThree[2].phone}}</span>
                                </p>
                                <em v-if="changeState">激活{{renderData.theFirstThree[2].money}}个</em>
                                <em v-else>收益{{renderData.theFirstThree[2].money}}元</em>
                            </div>
                            <div v-else>
                                <em>暂无</em>
                            </div>
                        </div>
                    </div>
                    <!-- 排行列表 -->
                    <div class="YRankListMain" v-if="isData">
                        <div>
                            <b>排行</b>
                            <em>姓名</em>
                            <span v-if="changeState">激活(个)</span>
                            <span v-else>收益(元)</span>
                        </div>
                        <ul class="YRankListUl">
                            <li
                                class="line_bottom"
                                v-for="(item, index) in renderData.list"
                                :key="index"
                            >
                                <b>{{item.rank}}</b>
                                <em>{{item.busName}}({{item.phone}})</em>
                                <span>{{item.money}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="no-data" v-else>
                        <img src="@/assets/images/no-data.png" alt />
                    </div>
                </cube-scroll>
            </div>
        </section>
        <!-- 个人排行榜 -->
        <div class="myRankDiv" v-if="isData">
            <b>{{renderData.own.rank}}</b>
            <em>{{renderData.own.busName}}({{renderData.own.phone}})</em>
            <span>{{renderData.own.money}}</span>
        </div>
    </div>
</template>
<script>
import { getServer } from "@/api/index";
import response from "@/assets/js/response.js";
import { Indicator } from "mint-ui";
export default {
    data() {
        return {
            byProduct: {
                options: [],
                value: ""
            },
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
            changeState: true,
            isData: true,
            isTheFirstThreeData: true,
            selectItem: "",
            monthData: ["12月", "1月", "2月", "3月", "4月", "5月"],
            moneyData: [0, 0, 0, 0, 0, 0],
            selectList: [
                {
                    id: 1,
                    title: "当月激活"
                },
                {
                    id: 2,
                    title: "当月收益"
                }
            ],
            queryData: {
                list: {
                    requestType: "datamanage",
                    requestKeywords: "actranking",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    page: 1,
                    limit: 10,
                    productID: ""
                    // types: "" //选填 全部 传All 当月 不传
                },
                chart: {
                    requestType: "datamanage",
                    requestKeywords: "incomeline",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    productID: ""
                },
                own: {
                    requestType: "datamanage",
                    requestKeywords: "perranking",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                },
                productList: {
                    requestType: "Datamanage",
                    requestKeywords: "productlist",
                    // platformID: this.$store.state.user.pid
                    platformID: this.$store.state.user.pid,
                }
            },
            renderData: {
                list: [],
                own: {
                    rank: "0",
                    busName: "**",
                    phone: "*********",
                    money: "0"
                },
                theFirstThree: [
                    {
                        busName: "**"
                    },
                    {
                        busName: "**"
                    },
                    {
                        busName: "**"
                    }
                ]
            }
        };
    },
    methods: {
        scrollTo() {
            this.$refs.scroll.scrollTo(0, 0);
        },
        onPullingDown() {
            // console.log("下拉刷新");
            this.renderData.list = [];
            this.queryData.list.page = 1;
            this.list();
            this.chart();
        },
        // 触发上拉加载
        onPullingUp() {
            this.queryData.list.page++;
            this.list();
        },
        list() {
            Indicator.open();
            getServer(this.queryData.list).then(res => {
                Indicator.close();
                this.isServer = false;
                Indicator.close();
                if (res.data.responseStatus === 1) {
                    this.isData = true;
                    this.isTheFirstThreeData = true;
                    res.data.data.forEach(item => {
                        this.renderData.list.push(item);
                    });
                    // JSON.stringify(this.renderData.list)
                    if( this.renderData.list.length === 1 ) {
                        this.renderData.theFirstThree = this.renderData.list.slice(0, 3);
                    } else if( this.renderData.list.length === 2 ) {
                        this.renderData.theFirstThree = this.renderData.list.slice(0, 2);
                    } else {
                        this.renderData.theFirstThree = this.renderData.list.slice(0, 3);
                    }
                } else if (
                    res.data.responseStatus === 300 &&
                    this.queryData.list.page !== 1
                ) {
                    this.$refs.scroll.forceUpdate();
                } else if (
                    res.data.responseStatus === 300 &&
                    this.queryData.list.page === 1
                ) {
                    this.isData = false;
                    this.isTheFirstThreeData = false;
                    this.ATurnover = "0.00";
                }
            });
            if (this.changeState) {
                // alert("个人激活")
                this.queryData.own.requestKeywords = "peractranking";
            } else {
                // alert("个人收益")
                this.queryData.own.requestKeywords = "perranking";
            }
            getServer(this.queryData.own).then(res => {
                if (res.data.responseStatus === 1) {
                    // alert(JSON.stringify(res.data.data))
                    this.renderData.own = res.data.data[0];
                }
            });
        },
        chart() {
            if (this.changeState) {
                this.queryData.chart.requestKeywords = "activeline";
            } else {
                this.queryData.chart.requestKeywords = "incomeline";
            }
            getServer(this.queryData.chart).then(res => {
                if (res.data.responseStatus === 1) {
                    this.monthData = res.data.dates;
                    this.moneyData = res.data.sums;
                    this.drawLine(this.monthData, this.moneyData);
                } else {
                    this.drawLine(this.monthData, this.moneyData);
                }
            });
        },
        changeSelect(e) {
            this.renderData.list = [];
            this.queryData.list.page = 1;
            // this.drawLine(this.monthData, this.moneyData);
            if (e.target.value === "当月激活") {
                this.changeState = true;
                // alert("激活")
                this.queryData.list.requestKeywords = "actranking";
                this.list();
                this.chart();
                this.scrollTo();
            } else if (e.target.value === "当月收益") {
                this.changeState = false;
                // alert("收益")
                this.queryData.list.requestKeywords = "montranking";
                this.list();
                this.chart();
                this.scrollTo();
            }
        },
        changeSelectProduct() {
            if (this.isData) {
                this.scrollTo();
            }
            this.queryData.list.productID = this.byProduct.value;
            this.queryData.chart.productID = this.byProduct.value;
            this.queryData.own.productID = this.byProduct.value;
            this.renderData.list = [];
            this.queryData.list.page = 1;
            this.list();
            this.chart();
        },
        drawLine(monthData, moneyData) {
            let $selecter = document.getElementById("myChart0");
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init($selecter);
            // 绘制图表
            myChart.setOption({
                tooltip: {},
                xAxis: {
                    type: "category",
                    data: monthData,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#fff"
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#fff",
                            width: 2
                        }
                    }
                },
                yAxis: {
                    show: false,
                    type: "value"
                },
                series: [
                    {
                        data: moneyData,
                        type: "line",
                        itemStyle: {
                            normal: {
                                label: { show: true },
                                color: "#fff",
                                lineStyle: {
                                    color: "#fff"
                                }
                            }
                        }
                    }
                ]
            });
        },
        productlist() {
            getServer(this.queryData.productList).then(res => {
                if (res.data.responseStatus === 1) {
                    this.byProduct.options = res.data.data;
                    this.byProduct.value = res.data.data[0].proname;
                    this.queryData.chart.productID = res.data.data[0].proid;
                    this.queryData.list.productID = res.data.data[0].proid;
                    this.queryData.own.productID = res.data.data[0].proid;
                    this.chart();
                    this.drawLine(this.monthData, this.moneyData);
                    this.list();
                }
            });
        }
    },
    created() {
        // this.drawLine(this.monthData, this.moneyData);
    },
    mounted() {
        this.selectItem = this.selectList[0].title;
        this.productlist();
    }
};
</script>
<style lang="scss">
.chartsMain-choice {
    overflow: hidden;
}
.chartsMain {
    background: #089cfe;
    h2 {
        margin-left: 0.2rem;
        padding-top: 0.23rem;
        text-align: center;
        font-size: 16px;
        color: #fff;
        float: left;
        em {
            font-size: 12px;
            padding-left: 10px;
        }
    }
}
.rank-choice {
    background: none;
    color: #fff;
    width: 3.5rem;
    float: right;
}
.rank-choice .el-input input {
    color: #fff;
}
.rank-choice .el-input--suffix .el-input__inner {
    background: none;
    border: none;
    color: #fff;
}
.rank-choice .el-select .el-input .el-select__caret {
    color: #fff;
}
.rank .no-data {
    margin-top: 1.5rem;
}
.mint-indicator-mask {
    z-index: 99999;
}
.mint-indicator-wrapper {
    z-index: 999999;
}
.rank {
    font-size: 0.3rem;
}
.rank .scroll-list-wrap {
    height: 95%;
    overflow: auto;
    .item {
        padding: 10px 10px;
        &:nth-child(2n + 1) {
            background: #ccc;
        }
    }
}
.subPageSection {
    // padding-bottom: 1000px;
    padding-top: 50px;
    position: fixed;
    // top: 1rem;
    height: 100%;
    width: 100%;
}
.YRankHeaderMain {
    overflow: hidden;
    background: #089cfe;
    padding-top: 3px;
    font-weight: bold;
    // padding: 10px 0 0 0;
    // border-bottom: 5px solid #efefef;
}

.YRankHeaderMain > div {
    width: 33.333333333%;
    float: left;
    background: #fff;
    padding: 20px 0 10px;
    border-top: 20px solid #089cfe;
    text-align: center;
    position: relative;
}

.YRankHeaderMain > div b {
    width: 6px;
    height: 98px;
    position: absolute;
    top: 0;
    z-index: 9;
}

b.leftArrBg {
    left: -6px;
}

b.rightArrBg {
    right: -6px;
}

.YRankHeaderMain > div:nth-of-type(2) {
    border-color: #fff;
    padding-top: 5px;
    padding-bottom: 25px;
    border-radius: 5px 5px 0 0;
}

.YRankHeaderMain > div > img {
    width: 50px;
    display: block;
    margin: 0 auto 15px;
}

.YRankHeaderMain > div p {
    font-size: 12px;
    line-height: 20px;
}

.YRankHeaderMain > div p span {
    display: block;
    padding: 0 10px;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.YRankHeaderMain > div em {
    display: block;
    font-size: 14px;
    color: #f33;
}

// .YRankListUl {
//     position: absolute;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     top: 289px;
//     overflow-x: hidden;
// }
.YRankListMain {
    padding-bottom: 0.2rem;
}
.YRankListMain > div {
    background: #f1f1f1;
}
.YRankListMain > div,
.YRankListUl li {
    overflow: hidden;
    font-size: 14px;
    line-height: 40px;
}

.YRankListMain div > b,
.YRankListUl li > b {
    display: block;
    float: left;
    width: 25%;
    text-align: center;
}

.YRankListMain div > em,
.YRankListUl li > em {
    display: block;
    float: left;
    width: 50%;
    text-align: center;
}

.YRankListMain div > span,
.YRankListUl li > span {
    display: block;
    float: left;
    width: 25%;
    text-align: center;
}

.YRankListUl li > span {
    color: #f33;
}
.myRankDiv {
    position: fixed;
    z-index: 99;
    width: 100%;
    height: 50px;
    line-height: 50px;
    left: 0;
    bottom: 0rem;
    box-shadow: 0 0 3px #ccc;
    background: #fff;
    font-size: 16px;
    opacity: 1;
    b {
        display: block;
        float: left;
        width: 25%;
        text-align: center;
    }
    em {
        display: block;
        float: left;
        width: 50%;
        text-align: center;
    }
    span {
        display: block;
        float: left;
        width: 25%;
        text-align: center;
        color: #f33;
        font-weight: bold;
    }
}
.rankHeaderMain {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    background: #089cfe;
    color: #fff;
    z-index: 999;
    a.rankHeaderLeftBtn {
        display: block;
        width: 75px;
        height: 50px;
        position: absolute;
        left: 0;
        top: 0;
        text-indent: 15px;
        color: #fff;
        &::before {
            content: "";
            display: block;
            width: 10px;
            height: 10px;
            border-left: 2px solid #fff;
            border-bottom: 2px solid #fff;
            transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
            position: absolute;
            left: 15px;
            top: 50%;
            margin: -6px 0 0 0;
        }
    }
    a.rankHeaderRightBtn {
        display: block;
        height: 50px;
        position: absolute;
        right: 0;
        top: 0;
        text-indent: 15px;
        color: #fff;
        padding-right: 32px;
        &::before {
            content: "";
            display: block;
            width: 8px;
            height: 8px;
            border-left: 2px solid #fff;
            border-bottom: 2px solid #fff;
            transform: rotate(-45deg);
            -webkit-transform: rotate(-45deg);
            position: absolute;
            right: 15px;
            top: 50%;
            margin: -7px 0 0 0;
        }
    }
    select {
        position: absolute;
        right: 0;
        top: 0;
        height: 50px;
        width: 100px;
        z-index: 999;
        opacity: 0;
    }
}
</style>