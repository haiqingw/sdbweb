<template>
    <div>
        <!-- header -->
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
            <span>安全验证</span>
        </div>
        <!-- body -->
        <div class="verificationContainer">
            <h3 class="titleMain">安全验证</h3>
            <p class="subTitleMain">
                为了您的账户安全，
                <br />请输入发送到以下电话号码的验证码：
            </p>
            <p class="phoneMain">
                <b>{{renderData.info.phone}}</b>
            </p>
            <div class="verificationCodeMain">
                <div class="verificationCodeBox flex">
                    <div class="inputCodeItem" :class="code[0]?'active':''">{{code[0]}}</div>
                    <div class="inputCodeItem" :class="code[1]?'active':''">{{code[1]}}</div>
                    <div class="inputCodeItem" :class="code[2]?'active':''">{{code[2]}}</div>
                    <div class="inputCodeItem" :class="code[3]?'active':''">{{code[3]}}</div>
                    <div class="inputCodeItem" :class="code[4]?'active':''">{{code[4]}}</div>
                    <div class="inputCodeItem" :class="code[5]?'active':''">{{code[5]}}</div>
                </div>
                <input v-model="code" maxlength="6" type="tel" autofocus="true" />
            </div>
            <div class="tipMain" @click="showModelTip">没有收到验证码？</div>
            <div class="timerMain">
                请稍后：
                <em @click="getVerify">{{time}}{{time==="重新获取"?'':'s'}}</em>
            </div>
        </div>
    </div>
</template>
<script>
import { Dialog } from "vant";
import { Toast } from "mint-ui";
import { getServer } from "@/api/index";
import response from "@/assets/js/response.js";
export default {
    data() {
        return {
            code: "",
            time: 60,
            flag: false,
            clearIntervalStatus: null,
            queryData: {
                realNameCer: {
                    requestType: "operating",
                    requestKeywords: "realnameauth",
                    userID: this.$store.state.user.uid,
                    platformID: this.$store.state.user.pid,
                    userPhone: this.$store.state.user.uphone,
                    name: "",
                    idcard: ""
                },
                info: {
                    requestType: "personal",
                    requestKeywords: "getbusinfo",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                },
                sendCode: {
                    requestType: "smsmanage",
                    requestKeywords: "realnameauth",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                },
                bindCardCer: {
                    requestType: "operating",
                    requestKeywords: "addbankcard",
                    userID: this.$store.state.user.uid,
                    platformID: this.$store.state.user.pid,
                    userPhone: this.$store.state.user.uphone,
                    cardNum: "",
                    phone: "",
                    bankName: ""
                }
            },
            renderData: {
                code: "",
                info: {
                    phone: ""
                }
            }
        };
    },
    methods: {
        sendCode() {
            clearInterval(this.clearIntervalStatus);
            this.timerFn();
            getServer(this.queryData.sendCode).then(res => {
                if (res.data.responseStatus === 1) {
                    this.renderData.code = res.data.verify;
                } else {
                    Toast(response[res.data.responseStatus]);
                    clearInterval(this.clearIntervalStatus);
                    this.time = "重新获取";
                    this.flag = false;
                }
            });
        },
        submitModification() {
            getServer(this.queryData.realNameCer).then(res => {
                if (res.data.responseStatus === 1) {
                    Toast("实名认证成功");
                    setTimeout(() => {
                        this.$router.push({ name: "certificationNext" });
                    }, 300);
                } else {
                    Toast(response[res.data.responseStatus]);
                }
            });
        },
        submitModificationCer() {
            getServer(this.queryData.bindCardCer).then(res => {
                if (res.data.responseStatus === 1) {
                    this.$router.push({ name: "certificationComplete" });
                } else {
                    Toast(response[res.data.responseStatus]);
                }
            });
        },
        showModelTip() {
            Dialog.alert({
                title: "提示",
                message:
                    "短信收不到，请在倒计时结束后点击下方重新获取，或者返回重新操作！"
            }).then(() => {
                // on close
            });
        },
        timerFn() {
            this.clearIntervalStatus = setInterval(() => {
                if (this.time !== "重新获取") {
                    this.time--;
                }
                if (this.time == 0) {
                    clearInterval(this.clearIntervalStatus);
                    this.time = "重新获取";
                    this.flag = true;
                }
            }, 1000);
        },
        //重新获取验证码
        getVerify() {
            if (this.time == "重新获取") {
                this.sendCode();
                this.flag = true;
                if (this.flag) {
                    this.time = 60;
                    this.timerFn();
                }
            }
            this.flag = false;
        },
        info() {
            getServer(this.queryData.info).then(res => {
                if (res.data.responseStatus === 1) {
                    const reg = /^(\d{3})\d{4}(\d{4})$/;
                    this.renderData.info.phone = res.data.data.phone.replace(
                        reg,
                        "$1****$2"
                    );
                }
            });
        },
        modify() {
            getServer(this.queryData.realNameCer).then(res => {
                if (res.data.responseStatus === 1) {
                    Toast("修改成功");
                    setTimeout(() => {
                        this.$router.push({ name: "mine" });
                    }, 1000);
                } else {
                    Toast(response[res.data.responseStatus]);
                }
            });
        },
        remanufacturePwdFunc() {
            this.$router.push({ name: "setPwd" });
        }
    },
    watch: {
        code: function() {
            if (this.code.length == 6) {
                if (parseInt(this.code) === parseInt(this.renderData.code)) {
                    if (this.$route.params.state === "add") {
                        this.submitModification();
                    } else if (this.$route.params.state === "bindCer") {
                        this.submitModificationCer();
                    } else if (this.$route.params.state === "modify") {
                        this.modify();
                    } else if (this.$route.params.state === "forgetPwd") {
                        this.remanufacturePwdFunc();
                    }
                } else {
                    Toast("验证码有误！");
                }
                // alert("验证码为：" + this.code);
            }
        }
    },
    created() {
        if (this.$route.params.state === "add") {
            this.queryData.realNameCer.name = JSON.parse(
                sessionStorage.getItem("name")
            );
            this.queryData.realNameCer.idcard = JSON.parse(
                sessionStorage.getItem("idcard")
            );
        } else if (this.$route.params.state === "bindCer") {
            this.queryData.bindCardCer.phone = JSON.parse(
                sessionStorage.getItem("phone")
            );
            this.queryData.bindCardCer.cardNum = JSON.parse(
                sessionStorage.getItem("cardNum")
            );
            this.queryData.bindCardCer.bankName = JSON.parse(
                sessionStorage.getItem("bankName")
            );
        } else if (this.$route.params.state === "modify") {
            this.queryData.realNameCer.name = JSON.parse(
                sessionStorage.getItem("modifyName")
            );
            this.queryData.realNameCer.idcard = JSON.parse(
                sessionStorage.getItem("modifyidcard")
            );
        } else if (this.$route.params.state === "forgetPwd") {
        }
        this.info();
        this.sendCode();
    }
};
</script>
<style lang="scss">
.remanufacturePwd {
    position: fixed;
    top: 0.8rem;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 9999;
}
.verificationContainer {
    padding: 30px 20px;
}
.titleMain {
    font-size: 0.48rem;
    color: #333;
    padding-top: 1rem;
}
.subTitleMain {
    font-size: 0.28rem;
    line-height: 0.4rem;
    padding-top: 0.3rem;
}
.phoneMain {
    font-size: 0.4rem;
    font-weight: bold;
    padding-top: 0.1rem;
}
.verificationCodeMain {
    position: relative;
    input {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 999;
        opacity: 0;
    }
}
.inputCodeItem {
    width: 0.8rem;
    height: 0.8rem;
    border-bottom: 0.08rem solid #ccc;
    display: block;
    margin-right: 0.4rem;
    margin-top: 0.4rem;
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.4rem;
    font-weight: bold;
    &.active {
        border-color: #089cfe;
    }
}
.tipMain {
    font-size: 0.28rem;
    padding-top: 0.4rem;
}
.timerMain {
    font-size: 0.28rem;
    padding-top: 0.18rem;
    em {
        color: #f33;
    }
}
</style>