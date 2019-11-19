<template>
    <div class="mine">
        <!-- 头部 -->
        <div class="mineHeaderMain">
            <h3>
                我的
                <router-link to="/settings" class="mineNoticeButton">
                    <img src="@/assets/images/settingCenterIcon.png" alt="设置中心" />
                </router-link>
            </h3>
            <div class="mineHeaderBox">
                <div class="mineHeaderHeader">
                    <span>
                        <img src="@/assets/images/mineHeaderImg1.jpg" alt="头像" />
                    </span>
                    <p>
                        {{renderData.info.busname}}
                        <em
                            v-if="renderData.info.level == 2 "
                        >{{renderData.info.nickname}}</em>
                    </p>
                    <p>{{renderData.info.phone}}</p>
                    <router-link to="/share" tag="a" class="mineCodeBox">
                        <img src="@/assets/images/m-code.png" alt="推广码" />
                    </router-link>
                </div>

                <div class="mineHeaderBody flex">
                    <div @click="judgeRealNameAuth('withdrawal')">
                        <b>{{ renderData.listOneData.balance }}</b>
                        <p>钱包余额</p>
                    </div>
                    <router-link
                        :to="{
                name: 'freezeprogress',
                params: { money: renderData.thaw }
              }"
                        class="left_line"
                        tag="div"
                    >
                        <b>{{ renderData.thaw }}</b>
                        <p>预期达标奖励</p>
                    </router-link>
                </div>
            </div>
        </div>
        <van-dialog v-model="showDialog" title="明细" show-cancel-button @confirm="confirmWithdrawal">
            <van-cell v-for="item in renderData.totalProfit" :key="item.id" :title="item.name" :value="item.money" />
        </van-dialog>
        <!-- 公司与上级业务员 -->
        <div class="company-info line_bottom">
            <h3>{{ renderData.info.company }}</h3>
            <p>上级业务员：{{ renderData.info.parentName ? renderData.info.parentName : "暂无上级" }}</p>
            <a :href="'tel:'+ renderData.info.parentPhone" v-if="renderData.info.parentPhone">
                <img src="@/assets/images/SphoneIcon.png" alt="一键拨号" />
            </a>
        </div>
        <!-- <div class="mineBodyMain">
            <div class="mineItemBox line_bottom">
                <h3 class="mineTitle">我的订单</h3>
                <div class="flex">
                    <span>订单详情都在这里呢</span>
                    <router-link to="myOrder" class="arrIcon">查看所有订单</router-link>
                </div>
            </div>
        </div>-->
        <!-- <div class="mine-banner" v-if="isShowAdvertisementStatus">
            <van-swipe :autoplay="3000">
                <van-swipe-item>
                    <img :src="item.picUrl" @click="bannerDetailTap(item.id)" alt="banner">
                    <router-link to="/advertisement">
                        <img src="@/assets/images/mine-banner2.jpg" alt />
                    </router-link>
                </van-swipe-item>
            </van-swipe>
        </div>-->
        <!-- 常用菜单 -->
        <div class="mineCommonMenuBox">
            <h3 class="mineTitle">常用菜单</h3>
            <div class="mineCommonMenuList">
                <a
                    href="javascript:;"
                    @click="judgeRealNameAuth(item.jumpPageLink)"
                    v-for="item in renderData.navList"
                    :key="item.jumpPageLink"
                >
                    <img :src="item.iconUrl" alt="实名认证" />
                    <p>{{item.moduleName}}</p>
                </a>
                <!-- <a href="javascript:;" @click="judgeRealNameAuth('certificationComplete')">
                    <img src="@/assets/images/certificationIcon.png" alt="实名认证" />
                    <p>实名认证</p>
                </a>
                <router-link to="/myTerminal" v-if="renderData.info.level == 2 ">
                    <img src="@/assets/images/myTerminalIcon.png" alt="我的终端" />
                    <p>我的终端</p>
                </router-link>
                <router-link to="/affiliateTransactions" v-if="renderData.info.level == 2">
                    <img src="@/assets/images/AffiliateTransactionsIcon.png" alt="下属交易" />
                    <p>下属交易</p>
                </router-link>
                <a href="javascript:;" @click="judgeRealNameAuth('withdrawal')">
                    <img src="@/assets/images/balanceIcon.png" alt="余额/提现" />
                    <p>余额/提现</p>
                </a>
                <router-link to="/financialDetails">
                    <img src="@/assets/images/CapitalSubsidiaryIcon.png" alt="资金明细" />
                    <p>资金明细</p>
                </router-link>
                <router-link to="/helpCenter">
                    <img src="@/assets/images/helpCenterIcon.png" alt="帮助中心" />
                    <p>帮助中心</p>
                </router-link>
                <router-link to="/about">
                    <img src="@/assets/images/aboutIcon.png" alt="关于我们" />
                    <p>关于我们</p>
                </router-link>-->
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Footer from "@/components/footerNav/footer";
import { MessageBox, Indicator, Toast } from "mint-ui";
import response from "@/assets/js/response.js";
import { getServer } from "@/api/index";
export default {
    data() {
        return {
            showDialog: false,
            isServerMoneyState: false,
            isShowAdvertisementStatus: null,
            rechargeType: null,
            renderData: {
                thaw: "",
                listOneData: {},
                info: {},
                navList: [],
                totalProfit: []
            },
            queryData: {
                checkcerData: {
                    requestType: "personal",
                    requestKeywords: "checkcer",
                    userID: this.$store.state.user.uid,
                    platformID: this.$store.state.user.pid,
                    userPhone: this.$store.state.user.uphone
                },
                info: {
                    requestType: "personal",
                    requestKeywords: "getbusinfo",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                },
                checkbankcardData: {
                    requestType: "operating",
                    requestKeywords: "checkbankcard",
                    userID: this.$store.state.user.uid,
                    platformID: this.$store.state.user.pid,
                    userPhone: this.$store.state.user.uphone
                },
                thaw: {
                    requestType: "thaw",
                    requestKeywords: "thawmoney",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                },
                listOne: {
                    requestType: "personal",
                    requestKeywords: "busincome",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                },
                isShowAdvertisement: {
                    requestType: "checke",
                    requestKeywords: "advercheck",
                    platformID: this.$store.state.user.pid
                },
                isServerMoneyState: {
                    requestType: "servicefee",
                    requestKeywords: "checkrertype",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                },
                serverMoneyRecharge: {
                    own: {
                        // 自己
                        requestType: "servicefee",
                        requestKeywords: "rechargenotic",
                        platformID: this.$store.state.user.pid,
                        userID: this.$store.state.user.uid,
                        userPhone: this.$store.state.user.uphone
                    },
                    company: {
                        // 公司
                        requestType: "servicefee",
                        requestKeywords: "checkplatfee",
                        platformID: this.$store.state.user.pid
                    }
                },
                navList: {
                    requestType: "usermodule",
                    requestKeywords: "lists",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    classType: "WD"
                },
                totalProfit: {
                    requestType: 'dynamicmenu',
                    requestKeywords:'balencedetails', 
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                }
            }
        };
    },
    components: {
        Footer
    },
    methods: {
        totalProfit() {
            getServer(this.queryData.totalProfit).then( res => {
                if( res.data.responseStatus === 1 ) {
                    this.renderData.totalProfit = res.data.data
                    // alert(JSON.stringify(this.renderData.totalProfit))
                }
            })
        },
        isServerMoneyStateFunc() {
            getServer(this.queryData.isServerMoneyState).then(res => {
                if (res.data.responseStatus == 1) {
                    this.rechargeType = res.data.rerType;
                    if (res.data.rerType == 1) {
                        // 公司充值
                        getServer(
                            this.queryData.serverMoneyRecharge.company
                        ).then(res => {
                            if (res.data.responseStatus === 1) {
                                this.isServerMoneyState = false;
                            } else {
                                this.isServerMoneyState = true;
                            }
                        });
                    } else if (res.data.rerType == 2) {
                        // 自己充值
                        getServer(this.queryData.serverMoneyRecharge.own).then(
                            res => {
                                if (res.data.status == 1) {
                                    this.isServerMoneyState = false;
                                } else {
                                    this.isServerMoneyState = true;
                                }
                            }
                        );
                    }
                } else {
                    // util.show(util.response[res.data.responseStatus]);
                }
            });
        },
        isShowAdvertisement() {
            getServer(this.queryData.isShowAdvertisement).then(res => {
                if (res.data.responseStatus === 1) {
                    if (res.data.status == 1) {
                        this.isShowAdvertisementStatus = true;
                    } else {
                        this.isShowAdvertisementStatus = false;
                    }
                }
            });
        },
        judgeRealNameAuth(url) {
            if (url === "/certificationComplete" || url === "/withdrawal") {
                Indicator.open();
                getServer(this.queryData.checkcerData).then(res => {
                    Indicator.close();
                    if (res.data.responseStatus === 1) {
                        getServer(this.queryData.checkbankcardData).then(
                            res => {
                                if (res.data.responseStatus === 1) {
                                    Indicator.close();
                                    if (
                                        this.isServerMoneyState &&
                                        this.rechargeType == 1
                                    ) {
                                        //跳转到公司续费页面
                                        // alert("公司")
                                        this.$router.push({
                                            name: "serverMoneyRechargeCompany"
                                        });
                                    } else if (
                                        this.isServerMoneyState &&
                                        this.rechargeType == 2
                                    ) {
                                        //跳转到自己续费页面
                                        // alert("自己")
                                        this.$router.push({
                                            name: "serverMoneyRechargeOwn"
                                        });
                                    } else {
                                        this.$router.push({
                                            path: url
                                        });
                                        // this.$router.push({
                                        //     name: "agreement",
                                        //     params: { state: "add" }
                                        // });
                                    }
                                } else {
                                    Indicator.close();
                                    this.$router.push({
                                        name: "certificationNext"
                                    });
                                }
                            }
                        );
                    } else {
                        // this.$router.push({
                        //     name: "certification"
                        // });
                        this.$router.push({
                            name: "agreement",
                            params: { state: "add" }
                        });
                    }
                });
            } else {
                this.showDialog = true;
                // alert(13);
                // return;
                // this.$router.push({
                //     path: url
                // });
            }
        },
        confirmWithdrawal() {
            this.$router.push({
                path: "/withdrawal"
            });
        },
        listOne() {
            getServer(this.queryData.listOne).then(res => {
                this.renderData.listOneData = res.data;
            });
        },
        thaw() {
            getServer(this.queryData.thaw).then(res => {
                this.renderData.thaw = res.data.thawMoney;
            });
        },
        info() {
            getServer(this.queryData.info).then(res => {
                if (res.data.responseStatus === 1) {
                    this.renderData.info = res.data.data;
                    // if (res.data.data.level == "2") {
                    //     this.isServerMoneyStateFunc();
                    // } else {
                    //     this.isServerMoneyState = false;
                    //     this.rechargeType = 0;
                    // }
                }
            });
        },
        navList() {
            getServer(this.queryData.navList).then(res => {
                if (res.data.responseStatus === 1) {
                    this.renderData.navList = res.data.data;
                } else {
                }
            });
        }
    },
    created() {
        this.listOne();
        this.thaw();
        this.info();
        this.isShowAdvertisement();
        this.navList();
        this.totalProfit()
    }
};
</script>
<style lang="scss">
.van-overlay {
    z-index: 9999999 !important;
}
.van-dialog {
    z-index: 99999999 !important;
}
.mine {
    padding-bottom: 2rem;
}
.mine .company-info {
    font-size: 0.28rem;
    line-height: 0.8rem;
    overflow: hidden;
}
// .mine .company-info span {
//     float: left;
//     width: 50%;
// }
.mine-banner {
    margin-top: 15px;
    padding: 0 15px 5px;
    // padding: 0 .2rem;
    // height: 3rem;
    width: 6rem;
    width: 100%;
    box-sizing: border-box;
    .van-swipe {
        height: 100%;
    }
    img {
        border-radius: 10px;
    }
}
.mineHeaderMain {
    background: #fff;
    width: 100%;
    // background: url("../../assets/images/mineHeaderImg.jpg") no-repeat center
    //     center;
    //
    background-color: #089cfe;
    background-color: #089cfe;
    background-image: url("../../assets/images/mineBgBlueImg.png");
    background-size: 100% 100%;
    box-sizing: border-box;
    > h3 {
        line-height: 40px;
        font-size: 16px;
        color: #fff;
        text-align: center;
        position: relative;
        .mineNoticeButton {
            display: block;
            width: 40px;
            height: 40px;
            position: absolute;
            right: 5px;
            top: 0px;
            z-index: 9999999;
            text-align: center;
            padding-top: 5px;
            box-sizing: border-box;
            img {
                width: 30px;
                height: 30px;
            }
        }
    }
}
.mineHeaderBox {
    width: 100%;
    margin: 0 auto;
    padding: 10px 15px 20px;
    box-sizing: border-box;
    // border-radius: 10px;
    // box-shadow: 0 0 20px #ccc;
    position: relative;

    .mineNoticeBtn {
        display: block;
        width: 30px;
        height: 30px;
        position: absolute;
        right: 10px;
        top: 8px;
        z-index: 9999999;
        i {
            display: block;
            width: 10px;
            height: 10px;
            background: #f33;
            position: absolute;
            right: 1px;
            top: 1px;
            border-radius: 50%;
        }
        width: 100%;
        margin: 0 auto;
        background: #fff;
        padding: 15px 15px 20px;
        box-sizing: border-box;
        border-radius: 10px;
        box-shadow: 0 0 20px #ccc;
        position: relative;
    }
    .mineNoticeButton {
        display: block;
        width: 30px;
        height: 30px;
        position: absolute;
        right: 10px;
        top: 8px;
        z-index: 9999999;
        i {
            display: block;
            width: 10px;
            height: 10px;
            background: #f33;
            position: absolute;
            right: 1px;
            top: 1px;
            border-radius: 50%;
        }
    }
    // > span {
    //   display: block;
    //   width: 70px;
    //   height: 70px;
    //   margin: 0 auto;
    //   overflow: hidden;
    //   border-radius: 50%;
    //   border: 2px solid #f1f1f1;
    //   box-sizing: border-box;
    //   img {
    //     width: 100%;
    //     height: 100%;
    //   }
    // }
    > p {
        font-size: 16px;
        color: #333;
        text-align: left;
        font-weight: bold;
        line-height: 20px;
    }
    // &:first-of-type {
    //     padding-top: 10px;
    // }
    // &:last-of-type {
    //     padding-bottom: 15px;
    // }
    // > span {
    //   display: block;
    //   width: 70px;
    //   height: 70px;
    //   margin: 0 auto;
    //   overflow: hidden;
    //   border-radius: 50%;
    //   border: 2px solid #f1f1f1;
    //   box-sizing: border-box;
    //   img {
    //     width: 100%;
    //     height: 100%;
    //   }
    // }
    > p {
        font-size: 16px;
        color: #333;
        text-align: left;
        font-weight: bold;
        line-height: 20px;
        &:first-of-type {
            padding-top: 10px;
        }
        &:last-of-type {
            padding-bottom: 15px;
        }
        em {
            background: #0096fe;
            color: #fff;
            font-size: 12px;
            padding: 0 5px;
            border-radius: 5px;
            position: relative;
            top: -2px;
            margin-left: 5px;
        }
    }
}
.mineHeaderBody {
    justify-content: space-around;
    padding-top: 20px;
    > div {
        width: 100%;
        text-align: center;
        font-size: 14px;
        color: #fff;
        &:first-of-type {
            border-right: 1px solid #f1f1f1;
        }
        b {
            font-size: 22px;
        }
        p {
            font-size: 12px;
            padding-top: 5px;
        }
    }
}
.mineItemBox {
    padding-bottom: 15px;
}
.mineTitle {
    line-height: 30px;
    padding: 0px 15px 0;
    font-size: 18px;
    color: #333;
}
.mineItemBox > div {
    justify-content: space-between;
    font-size: 14px;
    padding: 0 15px;
    a {
        color: #0096fe;
    }
}
.mineCommonMenuBox {
    padding-top: 10px;
}
.mineCommonMenuList {
    padding: 0 15px;
    overflow: hidden;
    a {
        display: block;
        width: 25%;
        text-align: center;
        float: left;
        padding-top: 15px;
        img {
            width: 30px;
            height: 30px;
            display: block;
            margin: 0 auto;
        }
        p {
            padding-top: 5px;
            font-size: 12px;
            color: #333;
        }
    }
}
.mineHeaderHeader {
    overflow: hidden;
    // padding: 0 0 10px;
    position: relative;
    span {
        float: left;
        display: block;
        width: 60px;
        height: 60px;
        margin: 0 auto;
        overflow: hidden;
        border-radius: 50%;
        border: 2px solid #f1f1f1;
        box-sizing: border-box;
        img {
            width: 100%;
            height: 100%;
        }
    }
    > p {
        font-size: 16px;
        color: #fff;
        text-align: left;
        font-weight: bold;
        line-height: 22px;
        padding-left: 75px;
        &:first-of-type {
            padding-top: 8px;
        }
        em {
            background: #ff5454;
            color: #fff;
            font-size: 12px;
            padding: 0 5px;
            border-radius: 5px;
            position: relative;
            top: -2px;
            margin-left: 5px;
        }
    }
    .mineCodeBox {
        width: 40px;
        height: 40px;
        position: absolute;
        right: 10px;
        top: 50%;
        margin-top: -20px;
    }
}
.company-info {
    padding: 10px 60px 13px 15px;
    position: relative;
    h3 {
        font-size: 0.36rem;
        color: #999;
        line-height: 0.6rem;
        color: #089cfe;
    }
    p {
        line-height: 0.32rem;
    }
    a {
        position: absolute;
        right: 15px;
        top: 50%;
        width: 30px;
        height: 30px;
        margin-top: -15px;
        display: block;
    }
}
</style>
