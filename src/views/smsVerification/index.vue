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
                <b>132****5340</b>
            </p>
            <div class="verificationCodeMain">
                <div class="verificationCodeBox flex">
                    <div class="inputCodeItem" :class="code[0]?'active':''">{{code[0]}}</div>
                    <div class="inputCodeItem" :class="code[1]?'active':''">{{code[1]}}</div>
                    <div class="inputCodeItem" :class="code[2]?'active':''">{{code[2]}}</div>
                    <div class="inputCodeItem" :class="code[3]?'active':''">{{code[3]}}</div>
                </div>
                <input v-model="code" maxlength="4" type="tel" autofocus="true" />
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
            queryData: {
                realNameCer: {
                    requestType: "operating",
                    requestKeywords: "realnameauth",
                    userID: this.$store.state.user.uid,
                    platformID: this.$store.state.user.pid,
                    userPhone: this.$store.state.user.uphone,
                    name: "",
                    idcard: ""
                }
            },
            renderData: {
                code: "1111"
            }
        };
    },
    methods: {
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
        getCode() {
            return this.code;
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
            var timer = setInterval(() => {
                this.time--;
                if (this.time == 0) {
                    clearInterval(timer);
                    this.time = "重新获取";
                    this.flag = true;
                }
            }, 1000);
        },
        //重新获取验证码
        getVerify() {
            if (this.flag) {
                this.time = 60;

                this.timerFn();
            }
            this.flag = false;
        }
    },
    watch: {
        code: function() {
            if (this.code.length == 4) {
                if( parseInt(this.code) === parseInt(this.renderData.code) ) {
                    // this.submitModification()
                    alert("验证码正确")
                } else {
                    Toast("验证码有误！")
                }
            }
        }
    },
    created() {
        if (this.$route.params.state === "add") {
            alert(1);
            this.queryData.realNameCer.name = JSON.parse(
                sessionStorage.getItem("name")
            );
            this.queryData.realNameCer.idcard = JSON.parse(
                sessionStorage.getItem("idcard")
            );
        }
        this.timerFn();
    }
};
</script>
<style lang="scss">
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