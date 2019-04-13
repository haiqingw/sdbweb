<template>
    <div>
        <!-- header -->
        <mt-header fixed title="数据中心"></mt-header>
        <!-- dataCenter -->
        <div class="dataCenterStopMain">
            <img src="@/assets/images/stopImg.png" alt="建设中">
            <h3>数据中心正在建设中</h3>
            <p>敬请期待</p>
        </div>
        <div class="dataCenterMain" v-if = "dataCenterStatus">
            <!-- 收益数据 -->
            <div class="dataCenterBox">
                <h3>
                    <span>收益数据</span>
                </h3>
                <div class="dataCenterItem flex">
                    <div>
                        <h3>0.00</h3>
                        <p>总收益</p>
                    </div>
                    <div>
                        <h3>0.00</h3>
                        <p>我的商户收益</p>
                    </div>
                    <div>
                        <h3>0.00</h3>
                        <p>团队商户收益</p>
                    </div>
                </div>
                <div class="chartMain" ref="pieEcharts" id="chartMain">
                    <div id='myChart0' style='width:100% !important;height:200px'></div>
                </div>
            </div>
            <!-- 商户数据 -->
            <div class="dataCenterBox">
                <h3>
                    <span>商户数据</span>
                </h3>
                <div class="dataCenterItem flex">
                    <div>
                        <h3>0.00</h3>
                        <p>今日新增</p>
                    </div>
                    <div>
                        <h3>0.00</h3>
                        <p>我的商户</p>
                    </div>
                    <div>
                        <h3>0.00</h3>
                        <p>团队商户</p>
                    </div>
                </div>
                <div class="chartMain">
                    <div id='myChart1' style='width:100% !important;height:200px'></div>
                </div>
            </div>
            <!-- 激活数据 -->
            <div class="dataCenterBox">
                <h3>
                    <span>激活数据</span>
                </h3>
                <div class="dataCenterItem flex">
                    <div>
                        <h3>0.00</h3>
                        <p>今日新增</p>
                    </div>
                    <div>
                        <h3>0.00</h3>
                        <p>我的激活</p>
                    </div>
                    <div>
                        <h3>0.00</h3>
                        <p>团队激活</p>
                    </div>
                </div>
                <div class="chartMain">
                    <div id='myChart2' style='width:100% !important;height:200px'></div>
                </div>
            </div>
            <!-- 交易数据 -->
            <div class="dataCenterBox">
                <h3>
                    <span>交易数据</span>
                </h3>
                <div class="dataCenterItem flex">
                    <div>
                        <h3>0.00</h3>
                        <p>今日交易</p>
                    </div>
                    <div>
                        <h3>0.00</h3>
                        <p>我的交易</p>
                    </div>
                    <div>
                        <h3>0.00</h3>
                        <p>团队交易</p>
                    </div>
                </div>
                <div class="chartMain">
                    <div id='myChart3' style='width:100% !important;height:200px'></div>
                </div>
            </div>
            <!-- 团队数据 -->
            <div class="dataCenterBox">
                <h3>
                    <span>团队数据</span>
                </h3>
                <div class="dataCenterItem flex">
                    <div>
                        <h3>0.00</h3>
                        <p>今日新增</p>
                    </div>
                    <div>
                        <h3>0.00</h3>
                        <p>团队总数</p>
                    </div>
                </div>
                <div class="chartMain">
                    <div id='myChart4' style='width:100% !important;height:200px'></div>
                </div>
            </div>

        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Footer from "@/components/footerNav/footer";
export default {
    data() {
        return {
            dataCenterStatus:false,
            monthData: [
                "1月",
                "2月",
                "3月",
                "4月",
                "5月",
                "6月",
                "7月",
                "8月",
                "9月",
                "10月",
                "11月",
                "12月"
            ],
            moneyData: [1, 932, 910, 932, 290, 40, 320, 279, 310, 220, 434, 345]
        };
    },
    components: {
        Footer
    },
    mounted() {
        this.drawLine(
            "myChart0",
            "当年每月收益统计",
            this.monthData,
            this.moneyData
        );
        this.drawLine(
            "myChart1",
            "当年每月商户统计",
            this.monthData,
            this.moneyData
        );
        this.drawLine(
            "myChart2",
            "当年每月激活统计",
            this.monthData,
            this.moneyData
        );
        this.drawLine(
            "myChart3",
            "当年每月交易统计",
            this.monthData,
            this.moneyData
        );
        this.drawLine(
            "myChart4",
            "当年每月团队统计",
            this.monthData,
            this.moneyData
        );
    },
    methods: {
        // 当年收益数据
        drawLine(selecter, title, monthData, moneyData) {
            let $selecter = document.getElementById(selecter);
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init($selecter);
            // 绘制图表
            myChart.setOption({
                title: {
                    text: title,
                    textStyle: { fontSize: 12 },
                    x: "center",
                    y: "bottom"
                },
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
        parentImplement() {
            this.moneyData = [
                2,
                932,
                910,
                932,
                290,
                640,
                320,
                279,
                310,
                220,
                434,
                345
            ];
        }
    },
    created() {
        this.moneyData = [
            1,
            932,
            910,
            932,
            290,
            640,
            320,
            279,
            310,
            220,
            434,
            345
        ];
    }
};
</script>
<style lang="scss">
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
    padding: 0 15px;
    width: 100%;
    box-sizing: border-box;
    margin-top: -35px;
}
.dataCenterStopMain{
    padding-top:45%;
    text-align:center;
    img{
        width:120px;
        display: block;
        margin:0 auto;
    }
    h3{
        font-size:16px;
        line-height:40px;
        padding:20px 0 0;
        font-weight:400;
    }
    p{
        font-size:14px;
    }
}
</style>
