<template>
    <div class="serverMoneyRechargeCompany">
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
            <span>公司续费</span>
        </div>
        <div class="content">
            <h3>您所在的公司服务费已到期</h3>
            <div class="img">
                <img src="@/assets/images/pauseImg.jpg" alt />
            </div>
            <p>公司续费后方可以正常使用</p>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style>
.serverMoneyRechargeCompany {
    font-size: 0.3rem;
    text-align: center;
    background: #fff;
}
.serverMoneyRechargeCompany .content {
    margin-top: 1rem;
}
.serverMoneyRechargeCompany .content h3 {
    color: #FFCC33;
    line-height: 1rem;
}
.serverMoneyRechargeCompany .content .img {
    margin-top: 1.4rem;
}
.serverMoneyRechargeCompany .content p {
    margin-top: 2rem;
}
</style>


