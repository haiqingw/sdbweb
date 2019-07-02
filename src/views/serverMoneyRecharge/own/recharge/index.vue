<template>
    <div class="serverMoneyRechargeOwnRecharge">
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
            <span>业务员续费</span>
        </div>
        <div class="content">
            <div class="top">
                <span>请选择续费时长</span>
                <a>充值记录</a>
            </div>
            <div class="list">
                <ul>
                    <li>
                        <div class="left">
                            <span>77天</span>
                            <em>¥1000.00</em>
                        </div>
                        <div class="right">
                            <van-radio-group v-model="radio">
                                <van-radio name="2"></van-radio>
                            </van-radio-group>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            radio: "1",
            queryData: {

            },
            renderData: {

            },
        };
    }
};
</script>

<style>
.serverMoneyRechargeOwnRecharge .content {
    margin-top: 1rem;
}
.serverMoneyRechargeOwnRecharge .content .top {
    font-size: 0.26rem;
    padding: 0 0.2rem;
    overflow: hidden;
    line-height: 0.3rem;
    margin-bottom: 0.3rem;
}
.serverMoneyRechargeOwnRecharge .content .top span {
    float: left;
}
.serverMoneyRechargeOwnRecharge .content .top a {
    float: right;
}
.serverMoneyRechargeOwnRecharge .content .list {
    font-size: 0.3rem;
    padding: 0 0.2rem;
}
.serverMoneyRechargeOwnRecharge .content .list ul li {
    border: 1px solid #ccc;
    line-height: 0.8rem;
    padding: 0 0.2rem;
    border-radius: 0.1rem;
    margin-bottom: 0.2rem;
    overflow: hidden;
}
.serverMoneyRechargeOwnRecharge .content .list ul li .left {
    float: left;
}
.serverMoneyRechargeOwnRecharge .content .list ul li .left em {
    color: #cc0033;
    margin-left: 0.1rem;
    font-weight: 700;
}
.serverMoneyRechargeOwnRecharge .content .list ul li .right {
    float: right;
    border-left: 1px dashed #f1f1f1;
    padding-left: .2rem;
}
</style>


