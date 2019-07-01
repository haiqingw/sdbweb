<template>
    <div>
        <!-- 头部 -->
        <div class="mineHeaderMain">
            <h3>个人中心</h3>
            <div class="mineHeaderBox">
                <router-link to="/settings" class="mineNoticeButton">
                    <img src="@/assets/images/settingCenterIcon.png" alt="设置中心" />
                </router-link>
                <!-- <i></i> -->
                <div class="mineHeaderHeader">
                    <span>
                        <img src="@/assets/images/logoSmallImg.jpg" alt="头像" />
                    </span>
                    <p>
                        {{ renderData.info.busname }}
                        <em
                            v-if="renderData.info.level == 2 "
                        >{{renderData.info.nickname}}</em>
                    </p>
                    <p>{{ renderData.info.phone }}</p>
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
                        <p>待解冻</p>
                    </router-link>
                </div>
            </div>
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
        <div class="mine-banner" v-if="isShowAdvertisementStatus">
            <van-swipe :autoplay="3000">
                <van-swipe-item>
                    <!-- <img :src="item.picUrl" @click="bannerDetailTap(item.id)" alt="banner"> -->
                    <img src="@/assets/images/mine-banner.jpg" alt />
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- 常用菜单 -->
        <div class="mineCommonMenuBox">
            <h3 class="mineTitle">常用菜单</h3>
            <div class="mineCommonMenuList">
                <a href="javascript:;" @click="judgeRealNameAuth('certificationComplete')">
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
                <!-- <router-link to="/organization">
        <router-link to="/organization" v-if="renderData.info.level == 2">
          <img src="@/assets/images/InvitedRecordIcon.png" alt="组织架构" />
          <p>组织架构</p>
                </router-link>-->
                <router-link to="/helpCenter">
                    <img src="@/assets/images/helpCenterIcon.png" alt="帮助中心" />
                    <p>帮助中心</p>
                </router-link>
                <router-link to="/about">
                    <img src="@/assets/images/aboutIcon.png" alt="关于我们" />
                    <p>关于我们</p>
                </router-link>
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
            isServerMoneyState: false,
            isShowAdvertisementStatus: null,
            rechargeType: null,
            renderData: {
                thaw: "",
                listOneData: {},
                info: {}
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
                }
            }
        };
    },
    components: {
        Footer
    },
    methods: {
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
            Indicator.open();
            getServer(this.queryData.checkcerData).then(res => {
                Indicator.close();
                if (res.data.responseStatus === 1) {
                    getServer(this.queryData.checkbankcardData).then(res => {
                        if (res.data.responseStatus === 1) {
                            Indicator.close();
                            if (
                                this.isServerMoneyState &&
                                this.rechargeType == 1
                            ) {
                                //跳转到公司续费页面
                                alert("公司")
                            } else if (
                                this.isServerMoneyState &&
                                this.rechargeType == 2
                            ) {
                                //跳转到自己续费页面
                                alert("自己")
                            } else {
                                this.$router.push({
                                    name: url
                                });
                            }
                        } else {
                            Indicator.close();
                            this.$router.push({
                                name: "certificationNext"
                            });
                        }
                    });
                } else {
                    this.$router.push({
                        name: "certification"
                    });
                }
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
                    if (res.data.data.level == "2") {
                        this.isServerMoneyStateFunc();
                    } else {
                        this.isServerMoneyState = false;
                        this.rechargeType = 0;
                    }
                }
            });
        }
    },
    created() {
        this.listOne();
        this.thaw();
        this.info();
        this.isShowAdvertisement();
    }
};
</script>
<style lang="scss">
.mine-banner {
    padding: 0 15px 20px;
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
    padding-bottom: 1.4rem;
    background: #fff;
    width: 100%;
    background: url("../../assets/images/mineHeaderImg.jpg") no-repeat center
        center;
    background-size: 100% 100%;
    padding: 0 15px 20px;
    box-sizing: border-box;
    > h3 {
        line-height: 50px;
        font-size: 16px;
        color: #333;
        text-align: center;
    }
}
.mineHeaderBox {
    width: 100%;
    margin: 0 auto;
    background: #fff;
    padding: 15px;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 0 0 20px #ccc;
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
    &:first-of-type {
        padding-top: 10px;
    }
    &:last-of-type {
        padding-bottom: 15px;
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
    > div {
        width: 100%;
        text-align: center;
        font-size: 14px;
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
    // padding-top: 10px;
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
    padding: 0 0 10px;
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
        color: #333;
        text-align: left;
        font-weight: bold;
        line-height: 22px;
        padding-left: 75px;
        &:first-of-type {
            padding-top: 8px;
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
</style>
