<template>
    <div>
        <!-- header -->
        <!-- <mt-header fixed title="数据中心" :style="{'background':colorDataStr}"></mt-header> -->
        <!-- dataCenter -->
        <div class="dataCenterStopMain" v-if="!dataCenterStatus">
            <img src="@/assets/images/stopImg.png" alt="建设中">
            <h3>数据中心正在建设中</h3>
            <p>敬请期待</p>
        </div>
        <div class="dataCenterMain" v-if="dataCenterStatus">
            <!-- 选择产品 -->
            <div
                class="selectProMain"
                :style="{'background':colorDataStr}"
                @click="popupVisibleStatus()"
            >
                <span>请先选择产品</span>
                <em>
                    {{proVal}}
                    <img src="@/assets/images/arrRightWriteIcon.png" alt="右箭头">
                </em>
                <select @change="changeProduct(proVal)" v-model="proVal">
                    <option
                        :value="val.productName"
                        v-for="(val,index) in renderData.listProduct"
                        :key="index"
                    >{{val.productName}}</option>
                </select>
            </div>
            <!-- 选择分类 -->
            <div class="slide">
                <div
                    @click="changeSlide(item)"
                    v-for="(item,index) in slideData"
                    :key="item.name"
                    :class="['classifyItem',{'classifyItem-active':item.state}]"
                    :style="{'background':colorData[index]}"
                >
                    <p>{{item.con}}</p>
                    <span>{{item.name}}</span>
                </div>
            </div>
            <!-- 日/月切换 -->
            <!--  -->
            <div class="dmTabMain" :style="{'border-color':colorDataStr,'background':colorDataStr}">
                <!-- <span class="active">日</span>
                <span>月</span>-->
                <span
                    @click="switchDayMonClass(item)"
                    :class="{'active': !item.isActive}"
                    v-for="item in sunAndMoonSwitch"
                    :key="item.name"
                >{{item.name}}</span>
            </div>
            <!-- 折线图 -->
            <div class="chartMain" ref="pieEcharts" id="chartMain">
                <div id="myChart0" style="width:100% !important;height:220px"></div>
            </div>
            <!-- 统计 -->
            <div class="statisticalMain">
                <!-- 团队 -->
                <div class="statisticalItem" v-show="reallyIndex == 1">
                    <div class="flex">
                        <div class="line_right">
                            <p>0</p>
                            <h3>新增总数</h3>
                        </div>
                        <div class="line_right">
                            <p>0</p>
                            <h3>团队新增</h3>
                        </div>
                        <div>
                            <p>0</p>
                            <h3>直营新增</h3>
                        </div>
                    </div>
                </div>
                <!-- 终端 -->
                <div class="statisticalItem" v-show="reallyIndex == 2">
                    <div class="flex">
                        <div class="line_right">
                            <p>0</p>
                            <h3>新增总数</h3>
                        </div>
                        <div class="line_right">
                            <p>0</p>
                            <h3>团队新增</h3>
                        </div>
                        <div>
                            <p>0</p>
                            <h3>直营新增</h3>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="line_right">
                            <p>0</p>
                            <h3>新增激活</h3>
                        </div>
                        <div class="line_right">
                            <p>0</p>
                            <h3>团队新增</h3>
                        </div>
                        <div>
                            <p>0</p>
                            <h3>直营激活</h3>
                        </div>
                    </div>
                    <p>终端总激活数量0个</p>
                </div>
                <!-- 商户 -->
                <div class="statisticalItem" v-show="reallyIndex == 0">
                    <div class="flex">
                        <div class="line_right">
                            <p>0</p>
                            <h3>新增总数</h3>
                        </div>
                        <div class="line_right">
                            <p>0</p>
                            <h3>团队新增</h3>
                        </div>
                        <div>
                            <p>0</p>
                            <h3>直营新增</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="interval"></div> -->
        <!-- 我的收益 -->
        <div v-if="dataCenterStatus" class="myEarningMain">
            <div class="myEarningTitleMain">
                <span>交易/收益</span>
                <em>
                    {{wayVal}}
                    <img src="@/assets/images/arrRightIcon.png" alt="右箭头">
                </em>
                <select name id v-model="wayVal">
                    <option
                        :value="val.name"
                        v-for="(val,index) in wayList"
                        :key="index"
                    >{{val.name}}</option>
                </select>
            </div>
            <div class="myEarningBox">
                <div class="myEarningTop">
                    <span>共交易0笔，合计(万元)</span>
                    <div
                        class="flex"
                        :style="{'border-color':colorDataStr,'background':colorDataStr}"
                    >
                        <em class="active">日</em>
                        <em>月</em>
                    </div>
                </div>
                <div class="myEarningMoney">
                    <h3>0.00</h3>
                    <p>环比增长0%</p>
                </div>
                <div class="myEarningChart">
                    <div id="myChart1" style="width:100% !important;height:220px"></div>
                </div>
                <div class="myEarningStatisticalMain flex">
                    <div class="line_right">
                        <p>0.00</p>
                        <h3>团队合计(万元)</h3>
                    </div>
                    <div>
                        <p>0.00</p>
                        <h3>直营合计(万元)</h3>
                    </div>
                </div>
                <!-- 我的收益 -->
                <div class="myEarningBoxMain">
                    <h3>
                        <span>我的收益</span>
                    </h3>
                    <div class="myEarningBoxFlex flex">
                        <div>
                            <p>0.00</p>
                            <h3>我的收益(元)</h3>
                        </div>
                        <div>
                            <p>--</p>
                            <h3>击败同等级</h3>
                        </div>
                        <div>
                            <p>0%</p>
                            <h3>环比增长</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="height:90px;"></div>
        <Footer></Footer>
    </div>
</template>
<script>
import Footer from "@/components/footerNav/footer";

import { getServer } from "@/api/index";
import { Indicator, Toast } from "mint-ui";
// import func from '../../../vue-temp/vue-editor-bridge';
export default {
    data() {
        let vm = this;
        return {
            sunAndMoonSwitch: [
                {
                    name: "日",
                    isActive: false,
                    dateType: "days"
                },
                {
                    name: "月",
                    isActive: true,
                    dateType: "mons"
                }
            ],
            slideIndex: "",
            slideData: [
                {
                    name: "终端",
                    state: false,
                    slideTerm: "",
                    con: "0",
                    types: "term"
                },
                {
                    name: "团队",
                    state: true,
                    slideAgen: "",
                    con: "0",
                    types: "agen"
                },
                {
                    name: "商户",
                    state: false,
                    slideTeam: "",
                    con: "0",
                    types: "team"
                }
            ],
            colorDataStr: "#ffd274",
            dataCenterStatus: true,
            colorData: ["#6eb6ff", "#ff6638", "#f3b32d"],
            realIndex1: 0,
            monthData: ["12月", "1月", "2月", "3月", "4月", "5月"],
            moneyData: [0, 0, 0, 0, 0, 0],
            drawColumnMonthData: [],
            drawColumnmoneyData: [],
            reallyIndex: 0,
            wayList: [
                {
                    id: 1,
                    name: "全部"
                },
                {
                    id: 2,
                    name: "交易"
                },
                {
                    id: 3,
                    name: "激活"
                }
            ],
            proVal: "",
            wayVal: "",
            queryData: {
                slideSum: {
                    // 切换
                    requestType: "datacenter",
                    requestKeywords: "statistical",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    productID: "",
                    types: "agen" //（team 商户 agen 代理 term 终端）
                },
                brokenLineDiagram: {
                    // 折线图
                    requestType: "datacenter",
                    requestKeywords: "curve",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    dateType: "mons", //（days 日 mons 月）,
                    productID: "",
                    types: "agen"
                },
                listProduct: {
                    // 终端列表
                    requestType: "personal",
                    requestKeywords: "agentproduct",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                }
            },
            renderData: {
                listProduct: [],
                brokenLineDiagram: []
            }
        };
    },
    components: {
        Footer
    },
    mounted() {
        this.drawLine("myChart0", this.monthData, this.moneyData);
        this.drawColumn("myChart1", this.monthData, this.moneyData);
        // var that = this;
        // var mySwiper = new Swiper(".swiper-container", {
        //     slidesPerView: 3,
        //     spaceBetween: 30,
        //     centeredSlides: true,
        //     loop: true,
        //     slideToClickedSlide: true,
        //     on: {
        //         slideChangeTransitionEnd: function() {
        //             that.reallyIndex = this.realIndex;
        //             if (that.reallyIndex == 0) {
        //                 that.queryData.slideSum.types = "agen";
        //                 setTimeout(() => {
        //                     that.$set(that.renderData, "slideAgen", 1);
        //                 }, 300);
        //             } else if (that.reallyIndex == 1) {
        //                 that.queryData.slideSum.types = "team";
        //                 setTimeout(() => {
        //                     that.$set(that.renderData, "slideTeam", 2);
        //                 }, 300);
        //             } else if (that.reallyIndex == 2) {
        //                 that.queryData.slideSum.types = "term";
        //                 setTimeout(() => {
        //                     that.$set(that.renderData, "slideTerm", 3);
        //                 }, 300);
        //             }
        //             //console.log(that.colorData[this.realIndex])
        //             that.colorDataStr = that.colorData[that.reallyIndex];
        //             that.drawLine("myChart0", that.monthData, that.moneyData);
        //             that.drawColumn("myChart1", that.monthData, that.moneyData);
        //         }
        //     }
        // });
        // this.drawLine("myChart0", this.monthData, this.moneyData);
        // this.drawColumn("myChart1", this.monthData, this.moneyData);
    },
    computed: {},
    methods: {
        switchDayMonClass(obj) {
            this.sunAndMoonSwitch.forEach(item => {
                item.isActive = false;
            });
            obj.isActive = true;
            this.queryData.brokenLineDiagram.dateType = obj.dateType;
            this.brokenLineDiagram();
        },
        changeSlide(obj) {
            this.slideData.forEach(item => {
                item.state = false;
            });
            obj.state = true;
            this.queryData.brokenLineDiagram.types = obj.types;
            this.brokenLineDiagram();
        },
        // 折线图
        drawLine(selecter, monthData, moneyData) {
            let $selecter = document.getElementById(selecter);
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
                            color: this.colorData[this.reallyIndex]
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: this.colorData[this.reallyIndex],
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
                                color: this.colorData[this.reallyIndex],
                                lineStyle: {
                                    color: this.colorData[this.reallyIndex]
                                }
                            }
                        }
                    }
                ]
            });
        },
        // 柱状图
        drawColumn(selecter, monthData, moneyData) {
            let $selecter = document.getElementById(selecter);
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
                            color: this.colorData[this.reallyIndex]
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: this.colorData[this.reallyIndex],
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
                        type: "bar",
                        itemStyle: {
                            normal: {
                                label: { show: true },
                                color: this.colorData[this.reallyIndex]
                            }
                        }
                    }
                ]
            });
        },
        popupVisibleStatus() {
            this.popupVisible = !this.popupVisible;
        },
        listProduct() {
            getServer(this.queryData.listProduct)
                .then(res => {
                    if (res.data.responseStatus === 1) {
                        this.renderData.listProduct = res.data.data;
                        this.proVal = res.data.data[0].productName;
                        this.queryData.slideSum.productID = res.data.data[0].id;
                        this.queryData.brokenLineDiagram.productID =
                            res.data.data[0].id;
                    }
                })
                .then(() => {
                    this.slideTeam();
                    this.slideAgen();
                    this.slideTerm();
                    this.brokenLineDiagram();
                });
        },
        changeProduct(name) {
            let newArr = this.renderData.listProduct.filter(
                item => item.productName == name
            );
            this.queryData.slideSum.productID = newArr[0].id;
            this.queryData.brokenLineDiagram.productID = newArr[0].id;
            this.slideTeam();
            this.slideAgen();
            this.slideTerm();
            this.brokenLineDiagram();
        },
        slideTeam() {
            this.queryData.slideSum.types = "team";
            getServer(this.queryData.slideSum).then(res => {
                if (res.data.responseStatus === 1) {
                    this.slideData[1].con = res.data.con;
                } else {
                }
            });
        },
        slideAgen() {
            this.queryData.slideSum.types = "agen";
            getServer(this.queryData.slideSum).then(res => {
                if (res.data.responseStatus === 1) {
                    this.slideData[0].con = res.data.con;
                } else {
                }
            });
        },
        slideTerm() {
            this.queryData.slideSum.types = "tear";
            getServer(this.queryData.slideSum).then(res => {
                if (res.data.responseStatus === 1) {
                    this.slideData[2].con = res.data.con;
                } else {
                }
            });
        },
        brokenLineDiagram() {
            getServer(this.queryData.brokenLineDiagram).then(res => {
                // alert(JSON.stringify(res.data.responseStatus));
                alert(JSON.stringify(res.data.data));
                if (res.data.responseStatus === 1) {
                    if (res.data.data === null) {
                        this.moneyData = [0, 0, 0, 0, 0];
                        this.monthData = [0, 0, 0, 0, 0];
                    } else {
                        this.moneyData = [];
                        this.monthData = [];
                        for (var i in res.data.data) {
                            this.moneyData.push(res.data.data[i].con);
                            this.monthData.push(res.data.data[i].dates);
                        }
                    }
                    this.drawLine("myChart0", this.monthData, this.moneyData);
                }
            });
        }
    },
    created() {
        this.listProduct(); 
        this.wayVal = this.wayList[0].name;
        // this.moneyData = [0, 0, 0, 0, 0, 0];
    }
};
</script>
<style lang="scss">
.slide {
    display: flex;
    .classifyItem-active {
        opacity: 0.2;
    }
}
.swiper-slide {
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    transition: 300ms;
}
.dataCenterMain {
    padding: 55px 15px 15px;
}
.dataCenterBox {
    box-shadow: 0 0 5px #ccc;
    margin-bottom: 20px;
    padding-top: 10px;
    border-radius: 5px;
    padding-bottom: 15px;
}
.dataCenterBox > h3 {
    height: 40px;
    line-height: 40px;
    text-align: center;
    span {
        font-size: 20px;
        position: relative;
        display: block;
        width: 90px;
        margin: 0 auto;
        color: #404040;
        &::before {
            content: "";
            display: block;
            width: 40px;
            height: 2px;
            background: #a8a8a8;
            position: absolute;
            left: -50px;
            top: 50%;
            margin-top: -1px;
        }
        &::after {
            content: "";
            display: block;
            width: 40px;
            height: 2px;
            background: #a8a8a8;
            position: absolute;
            right: -50px;
            top: 50%;
            margin-top: -1px;
        }
    }
}
.dataCenterItem {
    padding-top: 10px;
    position: relative;
    z-index: 9999;
    div {
        font-size: 14px;
        text-align: center;
        width: 100%;
        padding-bottom: 22px;
        color: #797979;
        h3 {
            font-size: 24px;
        }
        p {
            font-size: 12px;
        }
    }
}
.chartMain {
    width: 100%;
    box-sizing: border-box;
    margin-top: -35px;
}
.dataCenterStopMain {
    padding-top: 45%;
    text-align: center;
    img {
        width: 3.5rem;
        display: block;
        margin: 0 auto;
    }
    h3 {
        font-size: 16px;
        line-height: 40px;
        padding: 0.5rem 0 0;
        font-weight: 400;
    }
    p {
        font-size: 14px;
    }
}
.selectProMain {
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    position: relative;
    padding: 0 10px;
    // background:rgb(255, 102, 56);
    color: #fff;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    font-weight: bold;
    width: 100%;
    box-sizing: border-box;
    // border-top:1px solid #fff;
    span {
        float: left;
        font-size: 16px;
    }
    em {
        float: right;
        font-size: 16px;
        img {
            width: 14px;
            height: 14px;
            display: inline-block;
            position: relative;
            top: -1px;
            margin-left: 2px;
        }
    }
    select {
        position: absolute;
        right: 0;
        height: 40px;
        top: 0;
        font-size: 14px;
        opacity: 0;
    }
}
.selectClassifyMain {
    padding: 15px 0;
}
.classifyItem {
    display: block;
    width: 33%;
    height: 81px;
    background: #f1f1f1;
    border-radius: 50%;
    font-size: 20px;
    text-align: center;
    line-height: 30px;
    transition: all 0.2s;
    color: #fff;
    font-weight: bold;
    padding-top: 19px;
    // box-sizing: border-box;
    border-width: 5px;
    border-style: solid;

    p {
        font-size: 24px;
    }
}
.swiper-slide:not(.swiper-slide-active) {
    transform: scale(0.7);
}
.dmTabMain {
    width: 100px;
    overflow: hidden;
    border: 1px solid #f1f1f1;
    border-radius: 5px;
    margin: 15px auto 30px;
    span {
        display: block;
        width: 50px;
        float: left;
        font-size: 16px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        &.active {
            background: #fff;
            color: #333;
        }
    }
}
.statisticalItem {
    > div {
        justify-content: space-around;
        div {
            font-size: 14px;
            text-align: center;
            width: 100%;
            margin-bottom: 15px;
            padding: 5px 0;
            p {
                font-size: 16px;
            }
            h3 {
                font-size: 14px;
                padding-top: 10px;
            }
        }
    }
    > p {
        text-align: center;
        font-size: 14px;
        padding: 5px 0 10px;
    }
}
.myEarningMain {
    padding: 15px;
}
.myEarningTitleMain {
    font-size: 14px;
    overflow: hidden;
    line-height: 30px;
    position: relative;
    span {
        float: left;
        font-size: 20px;
    }
    em {
        float: right;
        font-size: 16px;
        img {
            width: 14px;
            height: 14px;
            position: relative;
            top: -1px;
            margin-left: 2px;
            display: inline-block;
        }
    }
    select {
        position: absolute;
        right: 0;
        top: 0;
        height: 30px;
        z-index: 999;
        opacity: 0;
        font-size: 16px;
    }
}
.myEarningTop {
    position: relative;
    overflow: hidden;
    line-height: 30px;
    padding: 10px 0;
    > span {
        font-size: 14px;
        float: left;
    }
    div {
        width: 70px;
        height: 30px;
        border-radius: 5px;
        overflow: hidden;
        border: 1px solid #f1f1f1;
        float: right;
        em {
            display: block;
            width: 100%;
            font-size: 14px;
            text-align: center;
            color: #fff;
            line-height: 30px;
            &.active {
                background: #fff;
                color: #333;
            }
        }
    }
}
.myEarningMoney {
    h3 {
        font-size: 34px;
        padding-bottom: 10px;
    }
    p {
        font-size: 14px;
        color: #666;
    }
}
.myEarningStatisticalMain {
    justify-content: space-around;
    div {
        width: 100%;
        font-size: 14px;
        text-align: center;
        p {
            font-size: 16px;
        }
        h3 {
            font-size: 14px;
            padding-top: 10px;
        }
    }
}
.myEarningBoxMain {
    position: relative;
    > h3 {
        font-size: 18px;
        text-align: center;
        line-height: 40px;
        padding-top: 20px;
        span {
            background: #fff;
            position: relative;
            z-index: 999;
            padding: 0 20px;
        }
        &:before {
            content: "";
            width: 100%;
            position: absolute;
            display: block;
            left: 0;
            top: 39px;
            height: 1px;
            background: #ccc;
        }
    }
}
.myEarningBoxFlex {
    justify-content: space-around;
    div {
        width: 100%;
        font-size: 14px;
        text-align: center;
        p {
            font-size: 16px;
        }
        h3 {
            font-size: 14px;
            padding-top: 10px;
        }
    }
}
</style>
