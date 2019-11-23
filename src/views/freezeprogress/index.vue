<template>
    <div>
        <!-- header -->
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
            <span>预期达标奖励</span>
            <div class="freezeProgressMainProductScreeningMain">
                <span @click="showPicker= true">{{proValue}}</span>
                <!-- <van-field readonly clickable :value="proValue"   right-icon="arrow-down" /> -->
                <van-popup v-model="showPicker" position="bottom">
                    <van-picker
                        show-toolbar
                        :columns="renderData.productName"
                        title
                        :default-index="0"
                        @cancel="showPicker = false"
                        @confirm="onConfirm"
                    />
                </van-popup>
            </div>
        </div>
        <!-- freezeProgress -->
        <div class="freezeProgressMain">
            <div class="freezeProgressHeader">
                <img src="../../assets/images/freezeProgressHeaderImg.jpg" />
                <div class="freezeProgressHeaderBox">
                    {{ renderData.thaw }}
                    <span>达标奖励(元)</span>
                </div>
            </div>
            <div class="freezeProgressBody">
                <!-- 说明  -->
                <div class="freezeProgressTip">
                    <div class="freezeProgressTipTitle">
                        达标奖励条件及说明
                        <span></span>
                    </div>
                    <div class="freezeProgressTipText">
                        <span>1.达标后，自动转入到余额，即可提现；</span>
                        <span>2.满足以下条件即可获得达标奖励；</span>
                        <span>3.未完成，达标金额将从达标奖励中扣除。</span>
                    </div>
                </div>
                <!-- 列表  -->
                <div class="freezeProgressListView">
                    <div
                        v-for="item in freezeData"
                        :key="item.terminal"
                        :class="[item.isThaw != '已过期' ? 'completed' : '' , 'freezeProgressListItem']"
                    >
                        <!-- completed -->
                        <!-- 盒子  -->
                        <div :class="[item.isThaw !='已过期' ? '' : 'expired' , 'freezeProgressBox']">
                            <!-- expired -->
                            <!-- 三角 -->
                            <div class="leftArrIcon"></div>
                            <!--  解冻状态  -->
                            <img
                                class="img1"
                                v-if="item.isThaw == '已解冻'"
                                src="../../assets/images/completedIcon.png"
                            />
                            <img
                                class="img2"
                                v-if="item.isThaw == '已过期'"
                                src="../../assets/images/completedIcon2.png"
                            />
                            <!-- <img v-if="item.isThaw == '待解冻'" src="../../assets/images/expiredIcon.png" /> -->
                            <!--  解冻金额与剩余时间  -->
                            <div class="moneyAndTime">
                                <div class="line_right">
                                    <div>
                                        {{ item.thawMoney }}
                                        <span>元</span>
                                    </div>
                                    <span>达标奖励</span>
                                </div>
                                <div v-if="item.isThaw == '待解冻'">
                                    <div>
                                        {{ item.surplus }}
                                        <span>天</span>
                                    </div>
                                    <span>剩余天数</span>
                                </div>
                                <div v-if="item.isThaw == '已过期'">
                                    <span
                                        style="padding-top:14px; font-weight:bold;"
                                    >{{ item.isThaw }}</span>
                                </div>
                            </div>
                            <!-- 条件与当前刷卡金额  -->
                            <div class="conditionsAndSum">
                                <span class="line_top">姓名：{{ item.busname }}</span>
                                <span>终端号：{{ item.terminal }}</span>
                                <span>满足条件：{{ item.conditions }}</span>
                                <span>当前刷卡：{{ item.nowTotalMoney }}</span>
                                <!-- <span class="completedItemTipInfo">{{ item.thawMoney }}元已转入余额!</span>
                                <span class="expiredItemTipInfo">{{ item.thawMoney }}元已从待解冻金额中扣除！</span>-->
                            </div>
                        </div>
                    </div>
                    <!-- 未激活机器状态  -->
                    <!-- <div class="noPosDataStatus" v-if="noPosDataStatus">
                        <img src="../../assets/images/noPosDataIcon.png">
                        <span>您还没有领取机器，立即去领取</span>
                        <router-link to="/mall">机具商城</router-link>
                    </div>-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getServer } from "@/api/index";
import { Indicator, Toast } from "mint-ui";
import response from "@/assets/js/response.js";

export default {
    data() {
        return {
            isTerminalData: true,
            proValue: "",
            searchValue: "",
            showPicker: false,
            showTimePicker: false,
            noPosDataStatus: false,
            freezeData: {},
            queryData: {
                relogin: {
                    requestType: "buslogin",
                    requestKeywords: "relogin",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    openid: this.$store.state.user.opid
                },
                logout: {
                    requestType: "personal",
                    requestKeywords: "launchland",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                },
                freezeData: {
                    requestType: "thaw",
                    requestKeywords: "thawlist",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    // platformID: "199",
                    // userID: "d77e68596c15c53c2a33ad143739902d",
                    // userPhone: "MsTjUf2wNpjoErywNezjgcylOaDmElO0O0Om",
                    productID: ""
                },
                thaw: {
                    requestType: "thaw",
                    requestKeywords: "thawmoney",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                    // platformID: "199",
                    // userID: "d77e68596c15c53c2a33ad143739902d",
                    // userPhone: "MsTjUf2wNpjoErywNezjgcylOaDmElO0O0Om"
                },
                product: {
                    requestType: "agent",
                    requestKeywords: "product",
                    platformID: this.$store.state.user.pid
                    // platformID: "199"
                }
            },
            renderData: {
                thaw: "",
                list: [],
                productName: []
            }
        };
    },
    methods: {
        relogin() {
            // alert(this.queryData.relogin.openid)
            getServer(this.queryData.relogin).then(res => {
                if (res.data.responseStatus === 1) {
                    if (res.data.status === 1) {
                        this.product();
                    } else if (res.data.status === 2) {
                        Toast("您的账号已被他人登陆");
                        setTimeout(() => {
                            this.$store
                                .dispatch("LogOut", this.queryData.logout)
                                .then(() => {
                                    // location.reload();
                                    setTimeout(() => {
                                        this.$router.push({
                                            // path: "/loginoid",
                                            path: "/loginoid",
                                            query: {
                                                plat: this.$store.state.user
                                                    .plat
                                            }
                                        });
                                    }, 500);
                                });
                        }, 1000);
                    }
                }
            });
        },
        onConfirm(value, index) {
            this.proValue = value;
            this.renderData.product.forEach(item => {
                if (this.proValue === item.name) {
                    this.queryData.freezeData.productID = item.id;
                    this.queryData.thaw.productID = item.id;
                }
            });
            this.getfreezeListFn();
            this.thaw();
            this.showPicker = false;
        },
        product() {
            getServer(this.queryData.product)
                .then(res => {
                    if (res.data.responseStatus === 1) {
                        this.renderData.product = res.data.data;
                        this.renderData.product.forEach(item => {
                            this.renderData.productName.push(item.name);
                        });
                        this.proValue = res.data.data[0].name;
                        this.queryData.freezeData.productID =
                            res.data.data[0].id;
                        this.queryData.thaw.productID = res.data.data[0].id;
                    }
                })
                .then(() => {
                    this.getfreezeListFn();
                    this.thaw();
                });
        },
        getfreezeListFn() {
            Indicator.open();
            getServer(this.queryData.freezeData).then(res => {
                console.log(res);
                Indicator.close();
                //   console.log(res)
                if (res.data.responseStatus === 1) {
                    this.noPosDataStatus = false;
                    this.freezeData = res.data.data;
                } else {
                    this.freezeData = res.data.data;
                    this.noPosDataStatus = true;
                }
            });
        },
        thaw() {
            getServer(this.queryData.thaw).then(res => {
                this.renderData.thaw = res.data.thawMoney;
            });
        }
    },
    created() {
        this.relogin();
    }
};
</script>
<style lang="scss" scoped>
.freezeProgressMain {
    //   padding-top: 40px;
    margin-top: 0.8rem;
}
.freezeProgressMainProductScreeningMain {
    position: fixed;
    top: 0;
    right: 0.2rem;
    width: 2.3rem;
    background: none;
    // overflow: hidden;
    span {
        width: 2rem;
        overflow: hidden;
        display: block;
        height: 0.8rem;
        position: absolute;
        right: 5px;
        top: 0;
        font-size: 0.28rem;
        padding-right: 10px;
        text-align: center;
        &::after {
            content: "";
            display: block;
            width: 8px;
            height: 8px;
            border-right: 2px solid #fff;
            border-bottom: 2px solid #fff;
            position: absolute;
            right: 3px;
            top: 50%;
            margin-top: -5px;
            transform: rotate(-45deg);
        }
    }
}
.freezeProgressMainProductScreeningMain .van-cell {
    background: none;
    border: none;
    padding: 0;
    line-height: 0.8rem;
    overflow: hidden;
    height: 0.8rem;
}
.freezeProgressMainProductScreeningMain .van-field__body {
    border: none;
    background: none;
    opacity: 0;
    position: relative;
    z-index: 9999;
}
.freezeProgressMainProductScreeningMain .van-cell__value {
    height: 0.8rem;
    overflow: hidden;
    border: none;
    background: none;
}
.freezeProgressMainProductScreeningMain .van-field__control,
.van-field__right-icon {
    color: #fff;
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
.freezeProgressBox > .img1 {
    width: 120px;
    height: 120px;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 999;
    opacity: 0.6;
    margin: -60px 0 0 -60px;
}
.freezeProgressBox > .img2 {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 0.2rem;
    bottom: 0.2rem;
    z-index: 999;
    opacity: 0.6;
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
    line-height: 0.4rem;
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
