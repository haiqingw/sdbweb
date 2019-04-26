
<template>
    <div class="myMerchantsTotalPuponMain">
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)">
            <span>二级</span>
        </div>
        <div class="myMerchantsTotalPuponBodyMain">
            <div class="block">
                <el-date-picker
                    v-model="queryData.agent.dates"
                    type="month"
                    placeholder="请选择日期"
                    @change="changeMonth"
                ></el-date-picker>
            </div>
            <!-- <div class="myMerchantsTotalPuponItem flex line_bottom">
                    <span>
                        <img src="@/assets/images/agentTotalNumIcon.png" alt="服务商人数"> 服务商人数
                    </span>
                    <em>
                        <b>100</b>人
                    </em>
            </div>-->
            <!-- <div class="myMerchantsTotalPuponItem flex line_bottom">
                    <span>
                        <img src="@/assets/images/agentTotalActiveIcon.png" alt="激活台数"> 激活台数
                    </span>
                    <em>
                        <b>100</b>台
                    </em>
            </div>-->
            <!-- <div class="myMerchantsTotalPuponItem flex">
                    <span>
                        <img src="@/assets/images/agentTotalTradingIcon.png" alt="交易量"> 交易量
                    </span>
                    <em>
                        <b>10000</b>元
                    </em>
            </div>-->
            <div class="interval"></div>
            <!-- 一级代理 -->
            <h3 class="agentTotalTitleH3 line_bottom">二级代理（{{renderData.agent.agentNum}}）</h3>
            <div class="agentTotalMain flex">
                <div>
                    <h3>激活台数(台)</h3>
                    <p>{{renderData.agent.activeNum}}</p>
                </div>
                <div>
                    <h3>交易量(元)</h3>
                    <p>{{renderData.agent.tradeTotal}}</p>
                </div>
            </div>
            <div class="interval"></div>
            <!-- 二级代理 -->
            <!-- <h3 class="agentTotalTitleH3 line_bottom">二级代理</h3>
                <div class="agentTotalMain flex">
                    <div>
                        <h3>激活台数(台)</h3>
                        <p>100</p>
                    </div>
                    <div>
                        <h3>交易量(元)</h3>
                        <p>100000000</p>
                    </div>
                </div>
            <div class="interval"></div>-->
            <!-- 三级代理 -->
            <!-- <h3 class="agentTotalTitleH3 line_bottom">三级代理</h3>
                <div class="agentTotalMain flex">
                    <div>
                        <h3>激活台数(台)</h3>
                        <p>100</p>
                    </div>
                    <div>
                        <h3>交易量(元)</h3>
                        <p>100000000</p>
                    </div>
                </div>
            <div class="interval"></div>-->
        </div>
    </div>
</template>

<script>
import { getServer } from "@/api/index";
import { parseTime, timeFormate } from "@/utils/index";
import { Indicator, Toast } from "mint-ui";
export default {
    data() {
        return {
            queryData: {
                agent: {
                    requestType: "agentdata",
                    requestKeywords: "agentTwo",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    dates: timeFormate(new Date()).substring(0, 7)
                }
            },
            renderData: {
                agent: {}
            }
        };
    },
    methods: {
        agent() {
            Indicator.open();
            getServer(this.queryData.agent).then(res => {
                Indicator.close();
                if (res.data.responseStatus === 1) {
                    this.renderData.agent = res.data.data;
                }
            });
        },
        changeMonth() {
            this.renderData.agent = {};
            this.queryData.agent.dates = parseTime(this.queryData.agent.dates).substring(0, 7)
            this.agent();
        }
    },
    created() {
        this.agent();
    }
};
</script>


<style lang="scss">
.mint-indicator-wrapper {
    z-index: 99999;
}
.mint-indicator-mask {
    z-index: 9999;
    opacity: 1;
    // background: #000;
}
.myMerchantsTotalPuponMain {
    background: #fff;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 999;
}
.myMerchantsTotalPuponHeaderMain {
    overflow: hidden;
    line-height: 40px;
    padding: 0 15px;
    font-size: 14px;
    background: #089cfe;
    color: #fff;
    em {
        float: left;
    }
    a {
        float: right;
        border-radius: 5px;
        display: block;
        width: 50px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        box-sizing: border-box;
        font-size: 12px;
        margin-top: 6.5px;
        background: #fff;
    }
}
.myMerchantsTotalPuponBodyMain {
    padding: 0 15px;
    margin-top: 0.8rem;
}
.myMerchantsTotalPuponItem {
    justify-content: space-between;
    line-height: 50px;
    span {
        img {
            width: 16px;
            height: 16px;
            position: relative;
            top: -2px;
            display: inline-block;
            margin-right: 2px;
        }
        font-size: 14px;
    }
    em {
        b {
            color: #f33;
            padding-right: 2px;
            font-weight: bold;
        }
        font-size: 16px;
    }
}
.agentTotalTitleH3 {
    font-size: 16px;
    font-weight: bold;
    line-height: 40px;
}
.agentTotalMain {
    justify-content: space-around;
    padding: 8px 0 12px;
    div {
        width: 100%;
        text-align: left;
        font-size: 14px;
        h3 {
            line-height: 30px;
        }
        p {
            padding-top: 5px;
            font-size: 18px;
            font-weight: bold;
        }
    }
}
</style>

