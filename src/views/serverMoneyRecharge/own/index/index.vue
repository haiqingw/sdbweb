<template>
    <div class="serverMoneyRechargeOwn">
        <span @click="$router.push('/serverMoneyRechargeOwnRecharge')">立即续费</span>
        <em>充值记录</em>
    </div>
</template>

<script>
export default {
    data() {
        return {
            renderData: {
                info: {

                }
            },
            queryData: {
                info: {

                }
            }
        }
    },
    methods: {
        info() {

        }
    }, 
    created() {

    }
}
</script>

<style>
    .serverMoneyRechargeOwn {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: url(../../../../assets/images/SPOSrenewBriefImg.jpg) no-repeat;
        background-size: 100%;
        font-size: .28rem;
        color: #fff;
        text-align: center;
        padding-top: 95%;
        box-sizing: border-box;
    }
    .serverMoneyRechargeOwn span {
        color: #3300CC;
        border-radius: .1rem;
        padding: .1rem .2rem;
        background: #fff;
    }
    .serverMoneyRechargeOwn em {
        display: block;
        margin-top: .3rem;
    }
</style>


