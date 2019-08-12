<template>
    <div>
        <!-- header -->
        <!-- <mt-header fixed title="提现">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button><router-link to="/withdrawalRecord" style="color:#fff;">提现记录</router-link></mt-button>
        </mt-header>-->
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
            <span>提现</span>
            <router-link class="withdrawalRecord" to="/withdrawalRecord" style="color:#fff;">提现记录</router-link>
        </div>
        <!-- withdrawal  -->
        <div class="withdrawalMain">
            <div class="withdrawalHeader">
                <div class="withdrawalTip">
                    <img src="../../assets/images/pointLeftIcon.png" />左右滑动切换提现方式
                    <img src="../../assets/images/pointRightIcon.png" />
                </div>
                <mt-swipe :auto="0" @change="handleChange">
                    <mt-swipe-item v-for="(item,index) in renderData.balanceList" :key="index">
                        <div class="mtSwipeItem">
                            <h3>{{item.types}}</h3>
                            <p>
                                <i>￥</i>
                                {{item.ktx}}
                            </p>
                            <div class="flex">
                                <span>
                                    总余额：
                                    <b>{{item.money}}</b>
                                </span>
                                <em>结算方式：{{item.method}}</em>
                            </div>
                            <a
                                href="javascript:;"
                                v-if="isBinding"
                                @click="allWithdrawal(item.ktx)"
                            >全部提现</a>
                        </div>
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <!-- 提现 -->
            <div class="withdrawalBody" v-if="isBinding">
                <!-- 提现金额 -->
                <div class="withdrawalMoney">
                    <h3 class="withdrawalTitle">提现金额</h3>
                    <div class="line_bottom">
                        <input
                            @blur="inpVerification"
                            v-model="queryData.cashWithdrawal.money"
                            type="tel"
                            placeholder="请输入提现金额"
                        />
                    </div>
                </div>
                <!-- 提现账户信息 -->
                <div class="withdrawalAccount">
                    <h3 class="withdrawalTitle">账户信息</h3>
                    <p class="line_bottom">收款姓名：{{renderData.bankInfo.names}}</p>
                    <p>收款银行卡：{{renderData.bankInfo.bankName}}(尾号{{renderData.bankInfo.cardNum}})</p>
                </div>
                <div class="interval"></div>
                <!-- 提现提示信息 -->
                <div class="withdrawalTipInfo">
                    <h3 class="withdrawalTitle">注意事项</h3>
                    <div>
                        <!-- <p>1.单笔提现最高{{renderData.drawInfo.maxm}}，最低{{renderData.drawInfo.mixm}}元，每笔手续费{{renderData.drawInfo.pou}}元；</p> -->
                        <p>1.达标金额{{renderData.drawInfo.drawMoney}}元</p>
                        <p>2.到账时间：{{renderData.drawInfo.start}}-{{renderData.drawInfo.endt}}(工作日)；</p>
                        <p>3.提现银行卡可以在'我的'中更换;</p>
                        <!-- <p>4.结算方式为{{renderData.mattersNeedingAttention.methed}}。</p> -->
                        <p>4.提现税收为{{renderData.drawInfo.tax}}。</p>
                        <!-- <p>5.提现税收为{{renderData.drawInfo.tax}}。</p> -->
                    </div>
                </div>
            </div>
        </div>
        <!-- 确认提现 -->
        <div class="footerBtnMain">
            <!-- <mt-button type="primary" @click="confirmCashWithdrawal">{{confirm}}</mt-button> -->
            <mt-button type="primary" @click="confirmCashWithdrawalCode">{{confirm}}</mt-button>
        </div>
    </div>
</template>
<script>
import { getServer } from "@/api/index";
import { Toast, MessageBox } from "mint-ui";
import response from "@/assets/js/response.js";
export default {
    data() {
        return {
            confirm: "确认提现",
            isBinding: true,
            confirmCashWithdrawalCodeStatus: false,
            confirmCashWithdrawalCodeNum: "",
            confirmCashWithdrawalCodeMax: 4,
            renderData: {
                balanceList: [],
                drawInfo: {},
                bankInfo: {},
                mattersNeedingAttention: {},
                confirmCashWithdrawalCode: {
                    code: ""
                }
            },
            queryData: {
                confirmCashWithdrawalCode: {},
                balanceList: {
                    requestType: "spendinginto",
                    requestKeywords: "cashbalance",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                },
                cashWithdrawal: {
                    requestType: "spendinginto",
                    requestKeywords: "drawcash",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    money: "",
                    payType: ""
                },
                drawInfo: {
                    requestType: "personal",
                    requestKeywords: "drawinfo",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    payType: ""
                },
                bankInfo: {
                    requestType: "personal",
                    requestKeywords: "getbankcard",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                },
                mattersNeedingAttention: {
                    requestType: "personal",
                    requestKeywords: "getassets",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                }
            }
        };
    },
    inject: ["reload"],
    methods: {
        handleChange(index) {
            this.renderData.balanceList.forEach((item, i) => {
                if (index == i) {
                    this.queryData.cashWithdrawal.payType = item.t;
                    this.queryData.drawInfo.payType = item.t;
                    this.renderData.mattersNeedingAttention.ktx = item.ktx;
                }
            });
            this.drawInfo();
        },
        balanceList() {
            getServer(this.queryData.balanceList)
                .then(res => {
                    if (res.data.responseStatus === 1) {
                        this.renderData.balanceList = res.data.data;
                        this.renderData.balanceList = this.renderData.balanceList.filter(
                            item => item.t == "1"
                        );
                        this.queryData.cashWithdrawal.payType =
                            res.data.data[0].t;
                        this.queryData.drawInfo.payType = res.data.data[0].t;
                        // this.$set(this.queryData.drawInfo, 'payType', res.data.data[0].t)
                        // this.queryData.drawInfo.payType = Object.assign({}, res.data.data[0].t)
                        this.renderData.mattersNeedingAttention.ktx =
                            res.data.data[0].ktx;
                    }
                })
                .then(res => {
                    this.drawInfo();
                });
        },
        drawInfo() {
            getServer(this.queryData.drawInfo).then(res => {
                if (res.data.responseStatus === 1) {
                    this.renderData.drawInfo = res.data;
                    // console.log(this.renderData.drawInfo)
                }
            });
        },
        bankInfo() {
            getServer(this.queryData.bankInfo).then(res => {
                if (res.data.responseStatus === 1) {
                    this.isBinding = true;
                    this.confirm = "确认提现";
                    this.renderData.bankInfo = res.data.bankcard;
                    this.renderData.bankInfo.cardNum = this.renderData.bankInfo.cardNum.substring(
                        this.renderData.bankInfo.cardNum.length - 4
                    );
                    // console.log(this.renderData.bankInfo)
                } else if (res.data.responseStatus === 202) {
                    this.isBinding = false;
                    this.confirm = "绑定银行卡";
                    Toast(response[res.data.responseStatus]);
                }
            });
        },
        mattersNeedingAttention() {
            getServer(this.queryData.mattersNeedingAttention).then(res => {
                if (res.data.responseStatus === 1) {
                    this.renderData.mattersNeedingAttention = res.data.data;
                    // console.log(this.renderData.mattersNeedingAttention)
                }
            });
        },
        allWithdrawal(money) {
            // console.log("全部提现")
            if (parseFloat(money) == 0) {
                Toast("暂无可提现金额");
                this.queryData.cashWithdrawal.money = "";
            } else {
                this.queryData.cashWithdrawal.money = money;
            }
        },
        confirmCashWithdrawal() {
            if (this.confirm === "确认提现") {
                getServer(this.queryData.balanceList)
                    .then(res => {
                        if (res.data.responseStatus === 1) {
                            this.renderData.mattersNeedingAttention.ktx =
                                res.data.data[0].ktx;
                        }
                    })
                    .then(res => {
                        const reg = /^[0-9]+\.?[0-9]*$/;
                        this.queryData.cashWithdrawal.money = String(
                            this.queryData.cashWithdrawal.money
                        );
                        if (this.queryData.cashWithdrawal.money.trim() == "") {
                            Toast("请输入提现金额");
                            return;
                        }
                        if (
                            parseFloat(this.queryData.cashWithdrawal.money) >
                            parseFloat(
                                this.renderData.mattersNeedingAttention.ktx
                            )
                        ) {
                            Toast("可提现金额不足");
                            return;
                        }
                        if (
                            parseFloat(this.queryData.cashWithdrawal.money) <
                            parseFloat(this.renderData.drawInfo.mixm)
                        ) {
                            Toast(
                                "单笔最低提现" +
                                    this.renderData.drawInfo.mixm +
                                    "元"
                            );
                            return;
                        }
                        if (
                            parseFloat(this.queryData.cashWithdrawal.money) >
                            parseFloat(this.renderData.drawInfo.maxm)
                        ) {
                            Toast(
                                "单笔最高提现" +
                                    this.renderData.drawInfo.maxm +
                                    "元"
                            );
                            return;
                        }
                        if (reg.test(this.queryData.cashWithdrawal.money)) {
                            MessageBox.confirm("你确定要提现吗?", "提现")
                                .then(action => {
                                    getServer(
                                        this.queryData.cashWithdrawal
                                    ).then(res => {
                                        // console.log(res)
                                        if (res.data.responseStatus === 1) {
                                            Toast("提现成功");
                                            setTimeout(() => {
                                                this.$router.push("/");
                                            }, 300);
                                        } else {
                                            // alert(res.data.responseStatus)
                                            Toast(
                                                response[
                                                    res.data.responseStatus
                                                ]
                                            );
                                        }
                                    });
                                })
                                .catch(() => {
                                    // this.reload()
                                });
                        }
                    });
            } else if (this.confirm === "绑定银行卡") {
                this.$router.push("/changeCard");
            }
        },
        confirmCashWithdrawalCode() {
            alert("提现");
            getServer(this.queryData.confirmCashWithdrawalCode).then(res => {
                if (res.data.responseStatus === 1) {
                    this.confirmCashWithdrawalCodeStatus = true
                } else {
                    Toast(response[res.data.responseStatus]);
                }
            });
        },
        inpVerification() {
            this.queryData.cashWithdrawal.money = this.queryData.cashWithdrawal.money.replace(
                /[^\d.]/g,
                ""
            );
            //必须保证第一个为数字而不是.
            this.queryData.cashWithdrawal.money = this.queryData.cashWithdrawal.money.replace(
                /^\./g,
                ""
            );
            //保证只有出现一个.而没有多个.
            this.queryData.cashWithdrawal.money = this.queryData.cashWithdrawal.money.replace(
                /\.{2,}/g,
                "."
            );
            //保证.只出现一次，而不能出现两次以上
            this.queryData.cashWithdrawal.money = this.queryData.cashWithdrawal.money
                .replace(".", "$#$")
                .replace(/\./g, "")
                .replace("$#$", ".");
            //只保留2位小数
            this.queryData.cashWithdrawal.money = this.queryData.cashWithdrawal.money.replace(
                /^(\-)*(\d+)\.(\d\d).*$/,
                "$1$2.$3"
            );
        },
        changeCode() {
            if( parseInt(this.confirmCashWithdrawalCodeNum.length) >= parseInt(this.confirmCashWithdrawalCodeMax) ) {
                this.confirmCashWithdrawalCodeStatus = false
                if( parseInt(this.renderData.confirmCashWithdrawalCode) !== parseInt(this.confirmCashWithdrawalCodeNum) ) {
                    Toast("验证码输入有误！")
                }
            }
        }
    },
    created() {
        this.bankInfo();
        this.mattersNeedingAttention();
        this.balanceList();
        // this.drawInfo()
    }
    // beforeUpdate() {
    //     this.balanceList()
    //     this.drawInfo()
    // },
    // updated() {
    //     this.balanceList()
    //     this.drawInfo()
    // }
};
</script>
<style lang="scss">
.withdrawalMain {
    padding: 40px 0;
}
.withdrawalTip {
    text-align: center;
    font-size: 14px;
    line-height: 40px;
    color: #f33;
    padding-top: 0.12rem;
    img {
        width: 20px;
        height: 20px;
        margin: 0 10px;
        display: inline-block;
        position: relative;
        top: -2px;
    }
}
.withdrawalHeader {
    padding: 0 15px 15px;
    height: 168px;
}
.mint-swipe-item.is-active .mtSwipeItem {
    background: #0096fe;
}
.mtSwipeItem {
    // background: #0096fe;
    background: #ccc;
    padding: 0.3rem 0.3rem 0.33rem;
    position: relative;
    border-radius: 5px;
    h3 {
        line-height: 30px;
        font-size: 16px;
        color: #fff;
    }
    p {
        font-size: 30px;
        color: #fff;
        font-weight: bold;
        padding-top: 2px;
        i {
            font-size: 14px;
        }
    }
    a {
        display: block;
        width: 100px;
        height: 35px;
        line-height: 35px;
        overflow: hidden;
        text-align: center;
        background: #fff;
        color: #0096fe;
        border-radius: 30px;
        position: absolute;
        right: 15px;
        top: 30px;
        font-size: 14px;
        z-index: 999;
    }
    div {
        font-size: 14px;
        color: #fff;
        padding-top: 7px;
        justify-content: space-between;
    }
}
.mint-swipe-indicators {
    display: none;
}
.withdrawalTitle {
    line-height: 30px;
    // background: #f1f1f1;
    background: #fff;
    padding: 0 15px;
    color: #333;
    font-size: 14px;
}
.withdrawalMoney > div {
    background: url("../../assets/images/iconMoney.png") no-repeat 10px center;
    background-size: 30px 30px;
    height: 50px;
    padding: 0 15px 0 45px;
    input {
        height: 50px;
        line-height: 50px;
        width: 100%;
        background: none;
        border: none;
        font-size: 20px;
        font-weight: bold;
        display: block;
    }
}
.withdrawalAccount > p {
    font-size: 14px;
    line-height: 40px;
    padding: 0 15px;
}
.withdrawalTipInfo {
    padding-top: 10px;
}
.withdrawalTipInfo div {
    font-size: 14px;
    padding: 10px 15px 0;
    line-height: 24px;
    text-align: justify;
}
.footerBtnMain {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    button {
        width: 100%;
        display: block;
        border-radius: 0;
    }
}
</style>
