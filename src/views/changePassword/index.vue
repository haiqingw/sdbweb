<template>
    <div>
        <!-- header -->
        <mt-header fixed title="修改密码">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <!-- body -->
        <div class="changePasswordMain">
            <div class="iconInputItem line_bottom">
                <img src="@/assets/images/minePassWordIcon.png" alt="旧密码">
                <input type="password" placeholder="请输入旧密码">
            </div>
            <div class="iconInputItem line_bottom">
                <img src="@/assets/images/minePassWordIcon.png" alt="新密码">
                <input type="password" placeholder="请输入新密码">
            </div>
            <div class="iconInputItem line_bottom">
                <img src="@/assets/images/minePassWordIcon.png" alt="新密码">
                <input type="password" placeholder="请再次输入新密码">
            </div>
            <div class="submitBtnMain">
                <mt-button type="primary" size="large">确定提交</mt-button>
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
.changePasswordMain{
    padding:40px 15px;
}
.iconInputItem {
    height: 50px;
    img {
        width: 26px;
        height: 26px;
        float: left;
        margin-top:10px;
        margin-right:7px;
    }
    input {
        height: 50px;
        border: none;
        background: none;
        font-size: 14px;
        padding-right: 10px;
        display: block;
        width: 80%;
    }
}
.submitBtnMain {
    padding: 30px 0;
    .mint-button-text {
        font-size: 16px;
    }
}
</style>