<template>
    <div>
        <!-- header -->
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)">
            <span>待解冻</span>
        </div>
        <!-- freezeProgress -->
        <div class="freezeProgressMain">
            <div class="freezeProgressHeader">
                <img src="../../assets/images/freezeProgressHeaderImg.jpg">
                <div class="freezeProgressHeaderBox">
                    {{ $route.params.money }}
                    <span>待解冻金额(元)</span>
                </div>
            </div>
            <div class="freezeProgressBody">
                <!-- 说明  -->
                <div class="freezeProgressTip">
                    <div class="freezeProgressTipTitle">
                        解冻条件及说明
                        <span></span>
                    </div>
                    <div class="freezeProgressTipText">
                        <span>1.解冻后，自动转入到余额，即可提现；</span>
                        <span>2.满足以下条件即可解冻相应金额；</span>
                        <span>3.未完成，解冻金额将从待解冻金额中扣除。</span>
                    </div>
                </div>
                <!-- 列表  -->
                <div class="freezeProgressListView">
                    <div
                        v-for="item in freezeData"
                        v-bind:key="item.surplus"
                        :class="[item.isThaw == '已解冻' ? 'completed' : '' , 'freezeProgressListItem']"
                    >
                        <!-- completed -->
                        <!-- 盒子  -->
                        <div :class="[item.isThaw=='已过期' ? 'expired' : '' , 'freezeProgressBox']">
                            <!-- expired -->
                            <!-- 三角 -->
                            <div class="leftArrIcon"></div>
                            <!--  解冻状态  -->
                            <img
                                v-if="item.isThaw == '已解冻'"
                                src="../../assets/images/completedIcon.png"
                            >
                            <img
                                v-if="item.isThaw == '已过期'"
                                src="../../assets/images/expiredIcon.png"
                            >
                            <!--  解冻金额与剩余时间  -->
                            <div class="moneyAndTime">
                                <div class="line_right">
                                    <div>
                                        {{ item.thawMoney }}
                                        <span>元</span>
                                    </div>
                                    <span>解冻金额</span>
                                </div>
                                <div v-if="item.isThaw == '待解冻'">
                                    <div>
                                        {{ item.surplus }}
                                        <span>天</span>
                                    </div>
                                    <span>剩余天数</span>
                                </div>
                                <div v-if="item.isThaw != '待解冻'">
                                    <span style="padding-top:14px; font-weight:bold;">
                                        {{
                                        item.isThaw
                                        }}
                                    </span>
                                </div>
                            </div>
                            <!-- 条件与当前刷卡金额  -->
                            <div class="conditionsAndSum">
                                <span class="line_top">满足条件：{{ item.conditions }}</span>
                                <span>当前刷卡：{{ item.nowTotalMoney }}</span>
                                <span class="completedItemTipInfo">{{ item.thawMoney }}元已转入余额!</span>
                                <span class="expiredItemTipInfo">{{ item.thawMoney }}元已从待解冻金额中扣除！</span>
                            </div>
                        </div>
                    </div>
                    <!-- 未激活机器状态  -->
                    <div class="noPosDataStatus" v-if="noPosDataStatus">
                        <img src="../../assets/images/noPosDataIcon.png">
                        <span>您还没有领取机器，立即去领取</span>
                        <router-link to="/mall">机具商城</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getServer } from "@/api/index";
import { Indicator } from "mint-ui";
import response from "@/assets/js/response.js";
export default {
    data() {
        return {
            noPosDataStatus: false,
            freezeData: {},
            queryData: {
                requestType: "thaw",
                requestKeywords: "thawlist",
                platformID: this.$store.state.user.pid,
                userID: this.$store.state.user.uid,
                userPhone: this.$store.state.user.uphone
            }
        };
    },
    methods: {
        getfreezeListFn() {
            Indicator.open();
            getServer(this.queryData).then(res => {
                Indicator.close();
                //   console.log(res)
                if (res.data.responseStatus === 1) {
                    this.noPosDataStatus = false;
                    this.freezeData = res.data.data;
                } else {
                    this.noPosDataStatus = true;
                }
            });
        }
    },
    created() {
        this.getfreezeListFn();
    }
};
</script>
<style lang="scss">
.freezeProgressMain {
    //   padding-top: 40px;
    margin-top: 0.8rem;
}
.freezeProgressHeader {
    position: relative;
    font-size: 14px;
}
.freezeProgressHeader img {
    width: 100%;
}
.freezeProgressHeaderBox {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    text-align: center;
    font-size: 60px;
    color: #fff;
    padding-top: 16%;
    box-sizing: border-box;
    font-family: "myWebFont";
    font-weight: bold;
}
.freezeProgressHeaderBox > span {
    font-size: 16px;
    display: block;
}
.freezeProgressTipTitle {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    line-height: 40px;
}
.freezeProgressTipTitle > span {
    display: block;
    width: 60px;
    height: 2px;
    background: #577eff;
    margin: 0 auto;
}
.freezeProgressTipText {
    padding: 15px 35px 0;
}
.freezeProgressTipText > span {
    font-size: 14px;
    color: #333;
    display: block;
    line-height: 30px;
}
.freezeProgressListView {
    padding: 10px 30px 30px;
}
.freezeProgressListView > div.freezeProgressListItem:last-of-type {
    padding-bottom: 0;
}
.freezeProgressListItem {
    border-left: 2px #ccc dashed;
    padding-left: 30px;
    position: relative;
    padding-bottom: 20px;
}
.freezeProgressListItem::before {
    background: #ccc;
    content: "";
    display: block;
    width: 12px;
    height: 12px;
    position: absolute;
    left: -7px;
    top: 10px;
    border-radius: 50%;
}
.freezeProgressBox {
    border: 1px solid #ccc;
    border-radius: 5px;
    position: relative;
    padding: 15px 0 0;
}
.freezeProgressBox > img {
    width: 120px;
    height: 120px;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 999;
    opacity: 0.6;
    margin: -60px 0 0 -60px;
}
.leftArrIcon {
    width: 10px;
    height: 10px;
    border-left: 1px solid #ccc;
    border-top: 1px solid #ccc;
    background: #fff;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    position: absolute;
    left: -6px;
    top: 10px;
}
.moneyAndTime {
    overflow: hidden;
}
.moneyAndTime > div {
    width: 50%;
    float: left;
    text-align: center;
}
.moneyAndTime > div > div {
    line-height: 20px;
    font-size: 20px;
    color: #f33;
    font-weight: bold;
}
.moneyAndTime > div > div span {
    font-size: 14px;
    color: #333;
}
.moneyAndTime > div > span {
    font-size: 14px;
    display: block;
    line-height: 14px;
    padding-top: 5px;
    color: #333;
}
.conditionsAndSum {
    padding: 10px 15px;
}
.conditionsAndSum > span {
    font-size: 14px;
    display: block;
}
.conditionsAndSum > span:first-of-type {
    margin-top: 5px;
    padding-top: 10px;
}
.conditionsAndSum span.completedItemTipInfo {
    display: none;
}
.conditionsAndSum span.expiredItemTipInfo {
    display: none;
}
.noPosDataStatus {
    text-align: center;
}
.noPosDataStatus > img {
    width: 140px;
    height: 140px;
    display: block;
    margin: 0 auto;
}
.noPosDataStatus > span {
    font-size: 16px;
    line-height: 40px;
    display: block;
    padding-top: 15px;
}
.noPosDataStatus > a {
    height: 40px;
    line-height: 40px;
    text-align: center;
    width: 60%;
    margin: 10px auto 0;
    background: none;
    color: #577eff;
    font-size: 16px;
    border: 1px solid #577eff;
    border-radius: 40px;
    display: block;
}
/* 三种状态  进行中不变*/
/* 已完成 */
.freezeProgressListItem.completed {
    border-left: 2px solid #577eff;
}
.freezeProgressListItem.completed::before {
    background: #577eff;
}
.freezeProgressListItem.completed::after {
    background: rgba(87, 126, 255, 0.4);
    content: "";
    display: block;
    width: 18px;
    height: 18px;
    position: absolute;
    left: -10px;
    top: 7px;
    border-radius: 50%;
}
.freezeProgressListItem.completed .completedItemTipInfo {
    display: block;
    font-size: 14px;
    color: #f33;
}
.freezeProgressListItem.completed .freezeProgressBox {
    border-color: #577eff;
}
.freezeProgressListItem.completed .leftArrIcon {
    border-color: #577eff;
}
/* 已过期 */
.freezeProgressListItem .expired {
    color: #999;
}
.freezeProgressListItem .expired .moneyAndTime > div > span {
    color: #999;
}
.freezeProgressListItem .expired .moneyAndTime > div > div {
    color: #999;
}
.freezeProgressListItem .expired .moneyAndTime > div > div span {
    color: #999;
}
.freezeProgressListItem .expired .expiredItemTipInfo {
    display: block;
}
</style>
