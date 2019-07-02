
<template>
    <div class="serverMoneyRechargeOwnList">
         <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
            <span>充值记录</span>
        </div>
        <div class="content">
            <ul>
                <li>
                    <div class="top">
                        <span>业务员充值</span>
                        <em>已支付</em>
                    </div>
                    <div class="center">
                        <div>
                            <em>30<span>天</span></em>
                            <span>购买周期</span>
                        </div>
                        <div>
                            <em>0<span>天</span></em>
                            <span>上次剩余天数</span>
                        </div>
                        <div>
                            <em>29.00<span>元</span></em>
                            <span>支付金额</span>
                        </div>
                    </div>
                    <div class="sum">
                        <span>充值时间：</span>
                        <span>到期时间：</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            queryData: {

            },
            renderData: {
                
            }
        }
    }
}
</script>

<style>
.serverMoneyRechargeOwnList .content {
    margin-top: 1rem;
}
.serverMoneyRechargeOwnList .content ul li {
    padding: .2rem;
    margin-bottom: .2rem;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.serverMoneyRechargeOwnList .content ul li .top {
    overflow: hidden;
    font-size: .26rem;
}
.serverMoneyRechargeOwnList .content ul li .top span {
    float: left;
}
.serverMoneyRechargeOwnList .content ul li .top em {
    float: right;
}
.serverMoneyRechargeOwnList .content ul li .center {
    font-size: .26rem;
    border: 1px solid #ccc;
    padding: .2rem 0;
    border-left: none;
    border-right: none;
    margin: .2rem 0 .1rem;
    display: flex;
    justify-content: space-around;
}
.serverMoneyRechargeOwnList .content ul li .center div {
    border-right: 1px solid #ccc;
    padding: .2rem 0;
    text-align: center;
    width: 33.333%;
}
.serverMoneyRechargeOwnList .content ul li .center div:last-child {
    border: none;
}
.serverMoneyRechargeOwnList .content ul li .center div em {
    color: #CC0000;
    font-size: .46rem;
}
.serverMoneyRechargeOwnList .content ul li .center div em span {
    font-size: .2rem;
    margin-left: .05rem;
}
.serverMoneyRechargeOwnList .content ul li .center div>span {
    display: block;
    font-size: .26rem;
    margin-top: .1rem;
}
.serverMoneyRechargeOwnList .content ul li .sum {
    font-size: .26rem;
    line-height: .4rem;
}
.serverMoneyRechargeOwnList .content ul li .sum  span {
    display: block;
}
</style>


