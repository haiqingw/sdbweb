<template>
    <div>
        <!-- header -->
        <!-- <mt-header fixed title="更换手机号">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header> -->
        <div class="return">
            <img
                src="@/assets/images/return.png" alt="" 
                @click="$router.go(-1)"/>
            <span>更换手机号</span>
        </div>
        <!-- body -->
        <div class="changePhoneMain">
            <img src="@/assets/images/phoneImg.jpg" alt="phoneImg">
            <h3>更换成功</h3>
            <p>请使用新手机号进行登录</p>
            <div class="submitBtnMain">
                <mt-button type="primary" size="large">我知道了</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    methods: {}
};
</script>
<style lang="scss">
.changePhoneMain {
    padding-top: 40px;
    > img {
        width: 70px;
        height: 70px;
        display: block;
        margin: 70px auto 15px;
    }
    h3 {
        font-size: 20px;
        text-align: center;
    }
    p{
        font-size:14px;
        text-align:center;
        padding-top:10px;
        letter-spacing:2px;
    }
}
.submitBtnMain {
    padding: 30px 100px;
    .mint-button-text {
        font-size: 16px;
    }
}
</style>
