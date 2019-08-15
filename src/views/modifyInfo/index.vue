<template>
    <div>
        <!-- header -->
        <div class="return">
            <router-link to="/mine">
                <img src="@/assets/images/return.png" alt />
            </router-link>
            <span>修改个人信息</span>
        </div>
        <!-- body -->
        <div class="certificationMain">
            <h3>修改个人信息</h3>
            <p>为有效保障您的资金安全，请填写与您身份证一致的信息，否则提现会失败！</p>
            <div class="itemTopTextMain">
                <p>真实姓名</p>
                <div class="line_bottom">
                    <input
                        type="text"
                        placeholder="请填写您本人的真实姓名"
                        v-model="queryData.realNameCer.name"
                    />
                </div>
            </div>
            <div class="itemTopTextMain">
                <p>身份证号</p>
                <div class="line_bottom">
                    <input
                        type="text"
                        placeholder="请填写您本人的身份证号"
                        v-model="queryData.realNameCer.idcard"
                    />
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
import { getServer } from "@/api/index";
import response from "@/assets/js/response.js";
export default {
    data() {
        return {
            queryData: {
                realNameCer: {
                    requestType: "operating",
                    requestKeywords: "realnameauth",
                    userID: this.$store.state.user.uid,
                    platformID: this.$store.state.user.pid,
                    userPhone: this.$store.state.user.uphone
                },
                info: {}
            }
        };
    },
    methods: {
        //提交数据
        submitModification() {
            let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
            if (
                this.queryData.realNameCer.name == "" ||
                this.queryData.realNameCer.name == undefined
            ) {
                Toast("请输入您的真实姓名");
                return;
            }
            if (
                this.queryData.realNameCer.idcard == "" ||
                this.queryData.realNameCer.idcard == undefined
            ) {
                Toast("请输入您的身份证号");
                return;
            }
            if (!reg.test(this.queryData.realNameCer.idcard)) {
                Toast("身份证号格式不规范");
                return;
            }
            sessionStorage.setItem(
                "modifyName",
                JSON.stringify(this.queryData.realNameCer.name)
            );
            sessionStorage.setItem(
                "modifyidcard",
                JSON.stringify(this.queryData.realNameCer.idcard)
            );
            this.$router.push({
                name: "smsVerification",
                params: { state: "modify" }
            });
        }
    },
    created() {}
};
</script>
<style lang="scss">
.certificationMain {
    padding: 40px 20px 15px;
    > h3 {
        font-size: 26px;
        line-height: 60px;
        color: #333;
        padding-top: 20px;
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
    padding-top: 20px;
    > p {
        font-size: 14px;
        line-height: 20px;
        font-weight: bold;
    }
    > div {
        height: 50px;
        line-height: 50px;
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
</style>
