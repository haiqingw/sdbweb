<template>
    <div>
        <!-- header -->
        <!-- <mt-header fixed title="提现">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button><router-link to="/withdrawalRecord" style="color:#fff;">提现记录</router-link></mt-button>
        </mt-header> -->
        <div class="return">
            <img
                src="@/assets/images/return.png" alt="" 
                @click="$router.go(-1)"
            />
            <span>提现</span>
            <router-link class="withdrawalRecord" to="/withdrawalRecord" style="color:#fff;">提现记录</router-link>
        </div>
        <!-- withdrawal  -->
        <div class="withdrawalMain">
            <div class="withdrawalHeader">
                <div class="withdrawalTip"><img src="../../assets/images/pointLeftIcon.png">左右滑动切换提现方式<img src="../../assets/images/pointRightIcon.png"></div>
                <mt-swipe :auto="0" @change="handleChange">
                    <mt-swipe-item v-for="(item,index) in renderData.balanceList" :key="index">
                        <div class="mtSwipeItem">
                            <h3>{{item.types}}</h3>
                            <p>
                                <i>￥</i>{{item.money}}</p>
                            <div class="flex">
                                <span>
                                    可提现：
                                    <b>{{item.ktx}}</b>
                                </span>
                                <em>
                                    结算方式：{{item.method}}
                                </em>
                            </div>
                            <!-- <a href="javascript:;" @click="allWithdrawal">全部提现</a> -->
                        </div>
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <!-- 提现 -->
            <div class="withdrawalBody">
                <!-- 提现金额 -->
                <div class="withdrawalMoney">
                    <h3 class="withdrawalTitle">提现金额</h3>
                    <div class="line_bottom">
                        <input @blur="inpVerification" v-model="queryData.cashWithdrawal.money" type="tel" placeholder="请输入提现金额">
                    </div>
                </div>
                <!-- 提现账户信息 -->
                <div class="withdrawalAccount">
                    <h3 class="withdrawalTitle">账户信息</h3>
                    <p class="line_bottom">收款姓名：{{$store.state.user.uname}}</p>
                    <p>收款银行卡：{{renderData.bankInfo.bankName}}(尾号{{renderData.bankInfo.cardNum}})</p>
                </div>
                <!-- 提现提示信息 -->
                <div class="withdrawalTipInfo">
                    <h3 class="withdrawalTitle">注意事项</h3>
                    <div>
                        <!-- <p>1.单笔提现最高{{renderData.drawInfo.maxm}}，最低{{renderData.drawInfo.mixm}}元，每笔手续费{{renderData.drawInfo.pou}}元；</p> -->
                        <p>1.达标金额0.00元</p>
                        <p>2.到账时间：{{renderData.drawInfo.start}}-{{renderData.drawInfo.endt}}(工作日)；</p>
                        <p>3.提现银行卡可以在'我的'中更换;</p>
                        <p>4.结算方式为{{renderData.mattersNeedingAttention.methed}}。</p>
                        <p>5.提现税收为{{renderData.drawInfo.tax}}。</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 确认提现 -->
        <div class="footerBtnMain">
            <mt-button type="primary" @click="confirmCashWithdrawal">确认提现</mt-button>
        </div>
    </div>
</template>
<script>
import {getServer} from '@/api/index'
import { Toast, MessageBox } from 'mint-ui'
import response from '@/assets/js/response.js'
export default {
    data() {
        return {
            renderData: {
                balanceList: [],
                drawInfo: {},
                bankInfo: {},
                mattersNeedingAttention: {}
            },
            queryData: {
                balanceList: {
                    requestType: 'spendinginto',
                    requestKeywords: 'cashbalance', 
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                },
                cashWithdrawal: {
                    requestType: 'spendinginto',
                    requestKeywords:'drawcash', 
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    money: "",
                    payType: ""
                },
                drawInfo: {
                    requestType: 'personal', 
                    requestKeywords: 'getdrawpou', 
                    platformID: this.$store.state.user.pid, 
                    userID: this.$store.state.user.uid, 
                    userPhone: this.$store.state.user.uphone
                },
                bankInfo: {
                    requestType: 'personal', 
                    requestKeywords: 'getbankcard', 
                    platformID: this.$store.state.user.pid, 
                    userID: this.$store.state.user.uid, 
                    userPhone: this.$store.state.user.uphone
                },
                mattersNeedingAttention: {
                    requestType: 'personal', 
                    requestKeywords: 'getassets', 
                    platformID: this.$store.state.user.pid, 
                    userID: this.$store.state.user.uid, 
                    userPhone: this.$store.state.user.uphone
                }
            }
        };
    },
    methods: {
        handleChange(index) {
            this.renderData.balanceList.forEach ( (item,i) => {
                if( index == i ) {
                    this.queryData.cashWithdrawal.payType = item.t
                }   
            })
        },
        balanceList () {
            getServer(this.queryData.balanceList).then( res => {
                if( res.data.responseStatus === 1 ) {
                    this.renderData.balanceList = res.data.data
                    this.queryData.cashWithdrawal.payType = res.data.data[0].t
                }
            })
        },
        drawInfo () {
            getServer(this.queryData.drawInfo).then( res => {
                if( res.data.responseStatus === 1 ) {
                    this.renderData.drawInfo = res.data
                    // console.log(this.renderData.drawInfo)
                }
            })
        },
        bankInfo() {
            getServer(this.queryData.bankInfo).then( res => {
                if( res.data.responseStatus === 1 ) {
                    this.renderData.bankInfo = res.data.bankcard
                    this.renderData.bankInfo.cardNum = this.renderData.bankInfo.cardNum.substring(this.renderData.bankInfo.cardNum.length-4)
                    // console.log(this.renderData.bankInfo)
                }
            })
        },
        mattersNeedingAttention () {
            getServer(this.queryData.mattersNeedingAttention).then( res => {
                if( res.data.responseStatus === 1 ) {
                    this.renderData.mattersNeedingAttention = res.data.data
                    // console.log(this.renderData.mattersNeedingAttention)
                }
            })
        },
        allWithdrawal() {
            console.log("全部提现")
        },
        confirmCashWithdrawal() {
            const reg =  /^[0-9]+\.?[0-9]*$/;
            if( this.queryData.cashWithdrawal.money.trim() == "" ) {
                Toast('请输入提现金额')
                return
            } 
            if( reg.test( this.queryData.cashWithdrawal.money ) > this.renderData.mattersNeedingAttention.ktx )  {
                Toast('可提现金额不足')
                return
            } 
            if(  parseFloat(this.queryData.cashWithdrawal.money)  < parseFloat(this.renderData.drawInfo.mixm) ) {
                Toast("单笔最低提现" + this.renderData.drawInfo.mixm + "元")
                return
            }
            if( parseFloat(this.queryData.cashWithdrawal.money) > parseFloat(this.renderData.drawInfo.maxm) ) {
                Toast("单笔最高提现" + this.renderData.drawInfo.maxm + "元")
                return
            }
            if( reg.test( this.queryData.cashWithdrawal.money ) ) {
                MessageBox.confirm("你确定要提现吗?", "提现")
                .then(action => {
                    getServer(this.queryData.cashWithdrawal).then( res => {
                        console.log(res)
                        if( res.data.responseStatus === 1 ) {
                            Toast('提现成功')
                        } else {
                           Toast( response[res.data.responseStatus] )
                        }
                    })
                })
                .catch(() => {});
            }
        },
        inpVerification () {
            this.queryData.cashWithdrawal.money = this.queryData.cashWithdrawal.money.replace(/[^\d.]/g, "");
            //必须保证第一个为数字而不是.
            this.queryData.cashWithdrawal.money = this.queryData.cashWithdrawal.money.replace(/^\./g, "");
            //保证只有出现一个.而没有多个.
            this.queryData.cashWithdrawal.money = this.queryData.cashWithdrawal.money.replace(/\.{2,}/g, ".");
            //保证.只出现一次，而不能出现两次以上
            this.queryData.cashWithdrawal.money = this.queryData.cashWithdrawal.money.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
            //只保留2位小数
            this.queryData.cashWithdrawal.money = this.queryData.cashWithdrawal.money.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
        }
    },
    created () {
        this.balanceList()
        this.drawInfo()
        this.bankInfo()
        this.mattersNeedingAttention()
    }
};
</script>
<style lang="scss">
.withdrawalMain {
    padding:40px 0;
}
.withdrawalTip {
    text-align: center;
    font-size: 14px;
    line-height: 40px;
    color: #f33;
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
.mint-swipe-item.is-active .mtSwipeItem{
  background: #0096fe;  
} 
.mtSwipeItem {
    // background: #0096fe;
    background:#ccc;
    padding: 12px 15px 15px;
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
.withdrawalTipInfo div {
    font-size: 14px;
    padding:10px 15px 0;
    line-height:24px;
    text-align:justify;
}
.footerBtnMain{
    position: fixed;
    width:100%;
    left:0;
    bottom:0;
    button{
        width:100%;
        display: block;
        border-radius:0;
    }
}
</style>
