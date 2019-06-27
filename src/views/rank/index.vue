<template>
    <div>
        <section class="subPageSection">
            <!-- 头部 -->
            <div class="rankHeaderMain">
                <a href="javascript:;" class="rankHeaderLeftBtn" @click="$router.go(-1)"></a>
                排行榜
                <a href="javascript:;" class="rankHeaderRightBtn">激活</a>
                <select name="" id="" @change="changeSelect">
                    <option value="激活">激活</option>
                    <option value="代理商">代理商</option>
                    <option value="当月收益">当月收益</option>
                </select>
            </div>
            <!-- 折线图 -->
            <div class="chartsMain">
                <h2>往月收益对比<em>单位：元</em></h2>
                <div class="chartMain">
                    <div id='myChart0' style='width:100% !important;height:220px'></div>
                </div>
            </div>
            <!-- 前三甲 -->
            <div class="YRankHeaderMain">
                <div>
                    <img src="@/assets/images/twoIcon.png" alt="第二名">
                    <p>
                        <span>清晨五点半</span>
                        <span>132****5340</span>
                    </p>
                    <em>激活2个</em>
                </div>
                <div>
                    <img src="@/assets/images/oneIcon.png" alt="第一名">
                    <p>
                        <span>清晨五点半</span>
                        <span>132****5340</span>
                    </p>
                    <em>激活2个</em>
                    <b class="leftArrBg">
                        <img src="@/assets/images/leftArrBg.png">
                    </b>
                    <b class="rightArrBg">
                        <img src="@/assets/images/rightArrBg.png">
                    </b>
                </div>
                <div>
                    <img src="@/assets/images/threeIcon.png" alt="第三名">
                    <p>
                        <span>清晨五点半</span>
                        <span>132****5340</span>
                    </p>
                    <em>激活2个</em>
                </div>
            </div>
            <!-- 排行列表 -->
            <div class="YRankListMain">
                <div>
                    <b>排行</b>
                    <em>姓名</em>
                    <span>激活(个)</span>
                </div>
                <ul class="YRankListUl">
                    <li class="line_bottom">
                        <b>4</b>
                        <em>郝佳(132****5340)</em>
                        <span>100</span>
                    </li>
                    <li class="line_bottom">
                        <b>4</b>
                        <em>郝佳(132****5340)</em>
                        <span>100</span>
                    </li>
                    <li class="line_bottom">
                        <b>4</b>
                        <em>郝佳(132****5340)</em>
                        <span>100</span>
                    </li>
                    <li class="line_bottom">
                        <b>4</b>
                        <em>郝佳(132****5340)</em>
                        <span>100</span>
                    </li>
                    <li class="line_bottom">
                        <b>4</b>
                        <em>郝佳(132****5340)</em>
                        <span>100</span>
                    </li>
                    <li class="line_bottom">
                        <b>4</b>
                        <em>郝佳(132****5340)</em>
                        <span>100</span>
                    </li>
                    <li class="line_bottom">
                        <b>4</b>
                        <em>郝佳(132****5340)</em>
                        <span>100</span>
                    </li>
                    <li class="line_bottom">
                        <b>4</b>
                        <em>郝佳(132****5340)</em>
                        <span>100</span>
                    </li>
                    <li class="line_bottom">
                        <b>4</b>
                        <em>郝佳(132****5340)</em>
                        <span>100</span>
                    </li>
                    <li class="line_bottom">
                        <b>4</b>
                        <em>郝佳(132****5340)</em>
                        <span>100</span>
                    </li>
                    <li class="line_bottom">
                        <b>4</b>
                        <em>郝佳(132****5340)</em>
                        <span>100</span>
                    </li>
                    <li class="line_bottom">
                        <b>4</b>
                        <em>郝佳(132****5340)</em>
                        <span>100</span>
                    </li>
                    <li class="line_bottom">
                        <b>4</b>
                        <em>郝佳(132****5340)</em>
                        <span>100</span>
                    </li>
                    <li class="line_bottom">
                        <b>4</b>
                        <em>郝佳(132****5340)</em>
                        <span>100</span>
                    </li>
                    <li class="line_bottom">
                        <b>4</b>
                        <em>郝佳(132****5340)</em>
                        <span>100</span>
                    </li>
                </ul>
            </div>
            <!-- 个人排行榜 -->
            <div class="myRankDiv">
                <b>15</b>
                <em>任勇强(13296905340)</em>
                <span>10</span>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    data() {
        return {
            monthData: ["12月", "1月", "2月", "3月", "4月", "5月"],
            moneyData: [324, 234, 532, 234, 435, 100]
        };
    },
    methods: {
        changeSelect() {
            this.drawLine(this.monthData, this.moneyData);
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
                                    color:"#fff" 
                                }
                            }
                        }
                    }
                ]
            });
        }
    },
    created() {
        // this.drawLine(this.monthData, this.moneyData);
    },
    mounted() {
        this.drawLine(this.monthData, this.moneyData);
    }
};
</script>
<style lang="scss">
.subPageSection {
    padding-bottom: 50px;
    padding-top: 50px;
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
    width: 100%;
    height: 50px;
    line-height: 50px;
    left: 0;
    bottom: 0;
    box-shadow: 0 0 3px #ccc;
    background: #fff;
    font-size: 16px;
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
.chartsMain{
    background:#089cfe;
    h2{
        text-align:center;
        font-size:16px;
        color:#fff;
        em{
            font-size:12px;
            padding-left:10px;
        }
    }
}
</style>