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
                <input type="text" readonly="readonly" :value="realName">
            </div>
            <div class="iconInputItem line_bottom">
                <img src="@/assets/images/creditCardIcon.png" alt="银行卡号">
                <input type="tel" placeholder="请输入银行卡号" v-model="queryData.bankNameData.cardNum" @blur="getBankName">
            </div>
            <div class="iconInputItem line_bottom">
                <img src="@/assets/images/bankIcon.png" alt="所属银行">
                <input type="text" readonly="readonly" :value="bankName" placeholder="所属银行" ref="refBankName">
            </div>
            <div class="iconInputItem line_bottom">
                <img src="@/assets/images/phoneIcon.png" alt="银行预留手机号">
                <input type="tel" maxlength="11" placeholder="请输入银行预留手机号" v-model="queryData.modifyData.phone">
            </div>
            <div class="submitBtnMain">
                <mt-button type="primary" size="large" @click="submitModify">确定提交</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
import { realName, bankName, modifyBankCard } from "@/api/modify";
import response from "@/assets/js/response.js";
export default {
    data() {
        return {
            realName: "",
            bankName: "",
            queryData: {
                realnameData: {
                    requestType: "personal",
                    requestKeywords: "getcerti",
                    userID: this.$store.state.user.uid,
                    platformID: this.$store.state.user.pid,
                    userPhone: this.$store.state.user.uphone
                },
                bankNameData: {
                    requestType: "operating",
                    requestKeywords: "checkcards"
                },
                modifyData: {
                    requestType: "operating",
                    requestKeywords: "addbankcard",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                }
            }
        };
    },
    methods: {
        // 获取真实姓名
        getRealName() {
            realName(this.queryData.realnameData).then(res => {
                if (res.data.responseStatus === 1) {
                    this.realName = res.data.data.name;
                }
            });
        },
        // 获取所属行
        getBankName() {
            bankName(this.queryData.bankNameData).then(res => {
                if (res.data.responseStatus === 1) {
                    if (res.data.bankName == "未知") {
                        Toast({
                            message: "不能识别的银行卡号，请重新输入",
                            duration: 2000
                        });
                    } else {
                        this.bankName = res.data.bankName;
                    }
                } else {
                    Toast(response[res.data.responseStatus]);
                }
            });
        },
        //更换结算卡
        submitModify() {
            if (this.queryData.bankNameData.cardNum == "" || this.queryData.bankNameData.cardNum == undefined) {
                Toast({
                    message: "请输入银行卡号",
                    duration: 2000
                });
                return;
            }
            if (this.queryData.modifyData.phone == "" || this.queryData.modifyData.phone == undefined) {
                Toast({
                    message: "请输入银行预留手机号",
                    duration: 2000
                });
                return;
            }
            this.queryData.modifyData.bankName = this.$refs.refBankName.value; 
            console.log(this.queryData.modifyData);
            modifyBankCard(this.queryData.modifyData).then(res => {
                if (res.data.responseStatus === 1) {
                    Toast({
                        message: "修改成功",
                        duration: 2000
                    });
                    setTimeout(() => {
                       $router.go(-1);
                    }, 1000);
                }
            });
        }
    },
    created() {
        this.getRealName();
    }
};
</script>
<style lang="scss">
.tipMain {
    line-height: 30px;
    background: #f1f1f1;
    font-size: 12px;
    padding: 40px 10px 0;
    img {
        width: 20px;
        height: 20px;
        float: left;
        margin-top: 4px;
        margin-right: 5px;
    }
}
.changeCardMain {
    padding: 0 15px;
}
.iconInputItem {
    height: 50px;
    img {
        width: 30px;
        height: 30px;
        float: left;
        margin-top: 10px;
        margin-right: 5px;
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
