<template>
    <div>
        <!-- header -->
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)">
            <span>忘记密码</span>
        </div>
        <!-- body -->
        <div class="certificationMain">
            <h3>请输入您注册时的手机号码</h3>
            <p>按步骤操作即可找回密码</p>
            <div class="itemTopTextMain">
                <p>手机号</p>
                <div class="line_bottom">
                    <input type="text" placeholder="请输入手机号" v-model="queryData.forgetParam.phone">
                </div>
            </div>
            <div class="itemTopTextMain">
                <p>验证码</p>
                <div class="line_bottom">
                    <input
                        type="text"
                        placeholder="请输入验证码"
                        v-model="queryData.forgetParam.verificationCode"
                        maxlength="4"
                    >
                    <a
                        href="javascript:;"
                        @click="getVerificationCode"
                        :class="{ active: isSend }"
                    >{{ verificationCodeText }}</a>
                </div>
            </div>
            <div class="submitBtnMain">
                <mt-button type="primary" size="large" @click="goToNext">下一步</mt-button>
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
            isSend: false,
            verificationCodeText: "获取验证码",
            sendtp: true, //发送状态
            Verify: "",
            flag: false,
            queryData: {
                forgetParam: {
                    requestType: "operating",
                    requestKeywords: "sendmsg",
                    type: "forget"
                }
            }
        };
    },
    methods: {
        goToNext() {
            if (
                this.queryData.forgetParam.phone == "" ||
                this.queryData.forgetParam.phone == undefined
            ) {
                Toast({
                    message: "请输入手机号",
                    duration: 1000
                });
            } else if (
                !/^1(3|4|5|6|7|8)\d{9}$/.test(this.queryData.forgetParam.phone)
            ) {
                Toast({
                    message: "手机号格式不正确",
                    duration: 1000
                });
            } else if (
                this.queryData.forgetParam.verificationCode == "" ||
                this.queryData.forgetParam.verificationCode == undefined
            ) {
                Toast({
                    message: "请输入验证码",
                    duration: 1000
                });
            } else {
                this.flag = true;
            }
            // 执行结果
            if (this.flag) {
                if (
                    this.queryData.forgetParam.verificationCode == this.Verify
                ) {
                    this.$router.push({
                        name: "forgetPasswordNext",
                        params: {
                            phoneNumber: this.queryData.forgetParam.phone
                        }
                    });
                } else {
                    this.isSend = false;
                    this.verificationCodeText = "获取验证码";
                    this.sendtp = true;
                    Toast({
                        message: "验证码输入有误！",
                        duration: 1000
                    });
                }
            }
        },
        getVerificationCode() {
            if( this.isSend ) return
            if (
                this.queryData.forgetParam.phone == "" ||
                this.queryData.forgetParam.phone == undefined
            ) {
                Toast({
                    message: "请输入手机号",
                    duration: 1000
                });
            } else if (
                !/^1(3|4|5|6|7|8)\d{9}$/.test(this.queryData.forgetParam.phone)
            ) {
                Toast({
                    message: "手机号格式不正确",
                    duration: 1000
                });
            } else {
                var time = 120;
                this.isSend = true;
                this.verificationCodeText = "验证码发送中";
                getServer(this.queryData.forgetParam).then(res => {
                    if (res.data.responseStatus === 1) {
                        this.Verify = res.data.code;
                        var inter = setInterval(() => {
                            time--;
                            this.verificationCodeText = time + "s后重新获取";
                            if (time < 0) {
                                clearInterval(inter);
                                this.isSend = false;
                                this.verificationCodeText = "获取验证码";
                                this.sendtp = true;
                            }
                        }, 1000);
                    } else {
                        this.isSend = false;
                        this.verificationCodeText = "获取验证码";
                        this.sendtp = true;
                        Toast({
                            message: response[res.data.responseStatus],
                            duration: 1000
                        });
                    }
                });
            }
        }
    },
    mounted() {
        // setInterval()
    }
};
</script>
<style lang="scss">
.certificationMain {
    padding: 40px 20px 15px;
    > h3 {
        font-size: 22px;
        line-height: 50px;
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
        position: relative;
        input {
            border: none;
            background: none;
            font-size: 16px;
            display: block;
            width: 100%;
        }
        a {
            font-size: 16px;
            position: absolute;
            display: block;
            line-height: 50px;
            position: absolute;
            right: 0;
            top: 0;
            color: #26a2ff;
            padding: 0 10px;
            &.active {
                color: #ccc;
            }
        }
    }
}
.submitBtnMain {
    padding-top: 40px;
}
</style>
