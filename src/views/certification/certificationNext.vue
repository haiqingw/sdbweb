<template>
    <div>
        <!-- header -->
        <div class="return">
            <router-link to="/mine"><img src="@/assets/images/return.png" alt="" /></router-link>
            <span>实名认证</span>
        </div>
        <!-- body -->
        <div class="certificationMain">
            <h3>绑定结算卡</h3>
            <p>为有效保障您的资金安全，请填写与您身份证一致的信息，否则不会通过审核！</p>
            <div class="itemTopTextMain">
                <p>真实姓名</p>
                <div class="line_bottom">
                    <input type="text" placeholder="真实姓名" :value="realName" readonly="readonly">
                </div>
            </div>
            <div class="itemTopTextMain">
                <p>银行卡号</p>
                <div class="line_bottom">
                    <input type="text" placeholder="请填写银行卡号" v-model="queryData.bindCardCer.cardNum" @blur="getBankName">
                </div>
            </div>
            <div class="itemTopTextMain">
                <p>所属银行</p>
                <div class="line_bottom">
                    <input type="text" placeholder="所属银行" readonly="readonly" ref="bankName" :value="bankName">
                </div>
            </div>
            <div class="itemTopTextMain">
                <p>银行预留手机号</p>
                <div class="line_bottom">
                    <input type="tel" placeholder="请输入银行预留手机号" maxlength="11" v-model="queryData.bindCardCer.phone">
                </div>
            </div>
            <div class="submitBtnMain">
                <mt-button type="primary" size="large" @click="submitModification">确认提交</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
import {
    isBindBankCardApi,
    realNameApi,
    bankName,
    bindBankCardApi
} from "@/api/certification";
import response from "@/assets/js/response.js";
export default {
    data() {
        return {
            realName: "",
            bankName: "",
            queryData: {
                isBindBankCard: {
                    requestType: "operating",
                    requestKeywords: "checkbankcard",
                    userID: this.$store.state.user.uid,
                    platformID: this.$store.state.user.pid,
                    userPhone: this.$store.state.user.uphone
                },
                realName: {
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
                bindCardCer: {
                    requestType: "operating",
                    requestKeywords: "addbankcard",
                    userID: this.$store.state.user.uid,
                    platformID: this.$store.state.user.pid,
                    userPhone: this.$store.state.user.uphone
                }
            }
        };
    },
    methods: {
        //判断是否绑卡
        isBindCard() {
            isBindBankCardApi(this.queryData.isBindBankCard).then(res => {
                if (res.data.responseStatus === 1) {
                    this.$router.push({ name: "certificationComplete" });
                }
            });
        },
        //获取真实姓名
        getRealName() {
            realNameApi(this.queryData.realName).then(res => {
                if (res.data.responseStatus === 1) {
                    this.realName = res.data.data.name;
                }
            });
        },
        //获取开户行
        getBankName() {
            this.queryData.bankNameData.cardNum = this.queryData.bindCardCer.cardNum;
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
        //绑定银行卡
        submitModification() {
            let phoneReg = /^1(1|2|3|4|5|6|7|8|9)\d{9}$/;
            if (
                this.queryData.bindCardCer.cardNum == "" ||
                this.queryData.bindCardCer.cardNum == undefined
            ) {
                Toast("请输入银行卡号");
                return;
            }
            if (
                this.queryData.bindCardCer.phone == "" ||
                this.queryData.bindCardCer.phone == undefined
            ) {
                Toast("请输入银行预留手机号");
                return;
            }
            if (!phoneReg.test(this.queryData.bindCardCer.phone)) {
                Toast("手机号输入格式不正确");
                return;
            }
            if (
                this.$refs.bankName.value == "未知" ||
                this.$refs.bankName.value == ""
            ) {
                Toast("请重新确认银行卡号是否正确");
            } else {
                this.queryData.bindCardCer.bankName = this.$refs.bankName.value;
            }
            // 提交数据
            bindBankCardApi(this.queryData.bindCardCer).then(res => {
                if (res.data.responseStatus === 1) {
                    this.$router.push({ name: "certificationComplete" });
                } else {
                    Toast(response[res.data.responseStatus]);
                }
            });
        }
    },
    created() {
        this.isBindCard();
        this.getRealName();
    }
};
</script>
<style lang="scss">
.certificationMain {
    padding: 40px 20px 15px;
    > h3 {
        font-size: 26px;
        line-height: 60px;
        color: #333;
        padding-top: 35px;
    }
    > p {
        font-size: 14px;
        text-align: justify;
        line-height: 22px;
        color: #666;
    }
    > div:first-of-type {
        padding-top: 40px;
    }
}
.itemTopTextMain {
    padding-top: 30px;
    > p {
        font-size: 14px;
        line-height: 20px;
        font-weight: bold;
    }
    > div {
        height: 60px;
        line-height: 60px;
        input {
            border: none;
            background: none;
            font-size: 16px;
            display: block;
            width: 100%;
        }
    }
}
.submitBtnMain {
    padding-top: 40px;
}
</style>>
