<template>
    <div>
        <!-- header -->
        <mt-header fixed title="更换结算卡">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <!-- body -->
        <div class="tipMain">
            <img src="@/assets/images/tipIcon.png" alt="提示"> 请添加本人储蓄卡信息，认真填写核对
        </div>
        <div class="changeCardMain">

            <div class="iconInputItem line_bottom">
                <img src="@/assets/images/realNameIcon.png" alt="真实姓名">
                <input type="text" readonly="readonly" value="张宇">
            </div>
            <div class="iconInputItem line_bottom">
                <img src="@/assets/images/creditCardIcon.png" alt="银行卡号">
                <input type="tel" placeholder="请输入银行卡号">
            </div>
            <div class="iconInputItem line_bottom">
                <img src="@/assets/images/bankIcon.png" alt="所属银行">
                <input type="text" readonly="readonly" value="建设银行">
            </div>
            <div class="iconInputItem line_bottom">
                <img src="@/assets/images/phoneIcon.png" alt="银行预留手机号">
                <input type="tel" maxlength="11" placeholder="请输入银行预留手机号">
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
.tipMain {
    line-height: 30px;
    background: #f1f1f1;
    font-size: 12px;
    padding:40px 10px 0;
    img {
        width: 20px;
        height: 20px;
        float: left;
        margin-top: 4px;
        margin-right: 5px;
    }
}
.changeCardMain {
    padding:0 15px;
}
.iconInputItem {
    height: 50px;
    img{
        width:30px;
        height:30px;
        float: left;
        margin-top:10px;
        margin-right:5px;
    }
    input {
        height: 50px;
        border: none;
        background: none;
        font-size: 14px;
        padding-right: 10px;
        display: block;
        width:80%;
    }
}
.submitBtnMain {
    padding: 30px 0;
    .mint-button-text {
        font-size: 16px;
    }
}
</style>
