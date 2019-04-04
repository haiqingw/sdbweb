<template>
    <div>
        <!-- header -->
        <mt-header fixed title="提现">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button slot="right"><router-link to="/withdrawalRecord" style="color:#fff;">提现记录</router-link></mt-button>
        </mt-header>
        <!-- withdrawal -->
        <div class="withdrawalMain">
            <div class="withdrawalHeader">
                <div class="withdrawalTip"><img src="../../assets/images/pointLeftIcon.png">左右滑动切换提现方式<img src="../../assets/images/pointRightIcon.png"></div>
                <mt-swipe @change="handleChange" :auto="0">
                    <mt-swipe-item>
                        <div class="mtSwipeItem">
                            <h3>交易分润</h3>
                            <p>
                                <i>￥</i>10.00</p>
                            <div class="flex">
                                <span>
                                    可提现：
                                    <b>9.00</b>
                                </span>
                                <em>
                                    结算方式：秒结
                                </em>
                            </div>
                            <a href="javascript:;">全部提现</a>
                        </div>
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <div class="mtSwipeItem">
                            <h3>激活返现</h3>
                            <p>
                                <i>￥</i>88.00</p>
                            <div class="flex">
                                <span>
                                    可提现：
                                    <b>9.00</b>
                                </span>
                                <em>
                                    结算方式：秒结
                                </em>
                            </div>
                            <a href="javascript:;">全部提现</a>
                        </div>
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <div class="mtSwipeItem">
                            <h3>招商奖励</h3>
                            <p>
                                <i>￥</i>99.00</p>
                            <div class="flex">
                                <span>
                                    可提现：
                                    <b>9.00</b>
                                </span>
                                <em>
                                    结算方式：秒结
                                </em>
                            </div>
                            <a href="javascript:;">全部提现</a>
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
                        <input type="tel" placeholder="请输入提现金额">
                    </div>
                </div>
                <!-- 提现账户信息 -->
                <div class="withdrawalAccount">
                    <h3 class="withdrawalTitle">账户信息</h3>
                    <p class="line_bottom">收款姓名：任勇强</p>
                    <p>收款银行卡：中国建设银行(尾号7057)</p>
                </div>
                <!-- 提现提示信息 -->
                <div class="withdrawalTipInfo">
                    <h3 class="withdrawalTitle">注意事项</h3>
                    <div>
                        <p>提示信息</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 确认提现 -->
        <div class="footerBtnMain">
            <mt-button type="primary">确认提现</mt-button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    methods: {
        handleChange(index) {
            console.log(index);
        }
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
.mtSwipeItem {
    background: #0096fe;
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
