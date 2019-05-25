<template>
    <div>
        <!-- header -->
        <mt-header fixed title="数据中心"></mt-header>
        <!-- dataCenter -->
        <div class="dataCenterStopMain" v-if="!dataCenterStatus">
            <img src="@/assets/images/stopImg.png" alt="建设中">
            <h3>数据中心正在建设中</h3>
            <p>敬请期待</p>
        </div>
        <div class="dataCenterMain" v-if="dataCenterStatus">
            <!-- 选择产品 -->
            <div class="selectProMain">
                <span>请先选择产品</span>
                <em>请选择<img src="@/assets/images/arrRightIcon.png" alt="右箭头"></em>
                <select name="">
                    <option value="1">鼎刷</option>
                    <option value="2">闪POS</option>
                </select>
            </div>
            <!-- 选择分类 -->
            <div class="selectClassifyMain">
                <swiper class="swiper-container">
                    <swiper-slide>
                        <div class="classifyItem" :style="{'background':colorData[0]}">
                            <p>0</p>
                            <span>代理</span>
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <div class="classifyItem" :style="{'background':colorData[1]}">
                            <p>0</p>
                            <span>团队</span>
                        </div>
                    </swiper-slide>
                    <swiper-slide>
                        <div class="classifyItem" :style="{'background':colorData[2]}">
                            <p>0</p>
                            <span>终端</span>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
            <!-- 日/月切换 -->
                        <!--  -->
         
            <div class="dmTabMain" :style="{'border-color':colorDataStr,'background':colorDataStr}">
                <span class="active">日</span>
                <span>月</span>
            </div>
            <!-- 折线图 -->
            <div class="chartMain" ref="pieEcharts" id="chartMain">
                <div id='myChart0' style='width:100% !important;height:220px'></div>
            </div>
            <!-- 统计 -->
            <div class="statisticalMain">
                <!-- 团队 -->
                <div class="statisticalItem" style="display:none;">
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
                <div class="statisticalItem">
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
                <div class="statisticalItem" style="display:none;">
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
                <em>全部<img src="@/assets/images/arrRightIcon.png" alt="右箭头"></em>
                <select name="" id="">
                    <option value="1">全部</option>
                    <option value="2">交易</option>
                    <option value="3">激活</option>
                </select>
            </div>
            <div class="myEarningBox">
                <div class="myEarningTop">
                    <span>共交易0笔，合计(万元)</span>
                    <div class="flex">
                        <em class="active">日</em>
                        <em>月</em>
                    </div>
                </div>
                <div class="myEarningMoney">
                    <h3>0.00</h3>
                    <p>环比增长0%</p>
                </div>
                <div class="myEarningChart">
                    <div id='myChart1' style='width:100% !important;height:220px'></div>
                </div>
                <div class="myEarningStatisticalMain flex">
                    <div class="line_right">
                        <p>0.00</p>
                        <h3>团结合计(万元)</h3>
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
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
    data() {
        return {
            colorDataStr: "#ffe8b8",
            dataCenterStatus: false,
            colorData: ["#ffe8b8", "#ff6638", "#6eb6ff"],
            realIndex1: 0,
            monthData: ["12月", "1月", "2月", "3月", "4月", "5月"],
            moneyData: [932, 910, 932, 290, 40, 320]
        };
    },
    components: {
        Footer
    },
    mounted() {
        var that = this;
        var mySwiper = new Swiper(".swiper-container", {
            slidesPerView: 3,
            spaceBetween: 30,
            centeredSlides: true,
            loop: true,
            slideToClickedSlide: true,
            on: {
                slideChangeTransitionEnd: function() {
                    // that.realIndex1 = this.realIndex;
                    // console.log(that.colorData[this.realIndex])
                    // that.colorDataStr = that.colorData[that.realIndex1]
                }
            }
        });
        this.drawLine("myChart0", this.monthData, this.moneyData);
        this.drawColumn("myChart1", this.monthData, this.moneyData);
    },
    methods: {
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
                    data: monthData
                },
                yAxis: {
                    show: false,
                    type: "value"
                },
                series: [
                    {
                        data: moneyData,
                        type: "line",
                        itemStyle: { normal: { label: { show: true } } }
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
                    data: monthData
                },
                yAxis: {
                    show: false,
                    type: "value"
                },
                series: [
                    {
                        data: moneyData,
                        type: "bar",
                        itemStyle: { normal: { label: { show: true } } }
                    }
                ]
            });
        },
        onChange(index) {
            console.log(index);
        }
    },
    created() {
        this.moneyData = [10, 400, 340, 500, 870, 897];
    }
};
</script>
<style lang="scss">
.dataCenterMain {
    padding: 45px 15px 15px;
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
    span {
        float: left;
        font-size: 14px;
    }
    em {
        float: right;
        font-size: 14px;
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
    width: 100px;
    height: 100px;
    background: #f1f1f1;
    border-radius: 50%;
    font-size: 20px;
    text-align: center;
    line-height: 30px;
    transition: all 0.2s;
    color: #fff;
    font-weight: bold;
    padding-top: 19px;
    box-sizing: border-box;
    p {
        font-size: 24px;
    }
}
.swiper-slide:not(.swiper-slide-active) {
    transform: scale(0.7);
    transition: all 0.2s;
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
        img {
            width: 14px;
            height: 14px;
            position: relative;
            top: -1px;
            margin-left: 2px;
            display: inline-block;
        }
    }
    select{
        position: absolute;
        right:0;
        top:0;
        height:30px;
        z-index:999;
        opacity:0;
        font-size:14px;
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
            line-height: 30px;
            &.active {
                background: #6eb6ff;
                color: #fff;
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
