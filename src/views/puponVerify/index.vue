<template>
    <div>
        <!-- 弹窗验证 -->
        <div class="overlazyR" v-if="puponShow"></div>
        <div class="puponVerifyMain" v-if="puponShow">
            <a href="javascript:;" class="closeBtn" @click="closePuponFn">
               <img src="@/assets/images/closeBtnIcon.png" alt="关闭">
            </a>
            <h3>安全验证</h3>
            <div class="bankInfoMain">
                <h4><img src="@/assets/images/rightArrIcon.png"/>任勇强</h4>
                <h4>中国银行(尾号3650)</h4>
            </div>
            <div class="moneyNumMain">
                <em>￥</em>100.00
            </div>
            <div class="pvPhoneBox">
                为了您的资金安全，请输入发送到以下电话号码的验证码：
                <span>132****5340</span>
            </div>
            <div class="pvInputBox">
                <div class="verificationCodeBox flex">
                    <div class="inputCodeItem" :class="code[0]?'active':''">{{code[0]}}</div>
                    <div class="inputCodeItem" :class="code[1]?'active':''">{{code[1]}}</div>
                    <div class="inputCodeItem" :class="code[2]?'active':''">{{code[2]}}</div>
                    <div class="inputCodeItem" :class="code[3]?'active':''">{{code[3]}}</div>
                     <div class="inputCodeItem" :class="code[4]?'active':''">{{code[4]}}</div>
                    <div class="inputCodeItem" :class="code[5]?'active':''">{{code[5]}}</div>
                </div>
                <input v-model="code" maxlength="6" type="tel" autofocus="true">
            </div>
             <div class="tipMain" @click="showModelTip">
                没有收到验证码？
            </div>
            <div class="timerMain">
                请稍后：
                <em @click="getVerify">{{time}}{{time==="重新获取"?'':'s'}}</em>
            </div>
            <div class="confirmWithdrawMain">
                 <a href="javascript:;" :class="btnClassStatus ? 'active' : ''">确认提现</a>
            </div>
        </div>
    </div>
</template>
<script>
import { Dialog } from "vant";
export default {
    data() {
        return {
            puponShow:true,
            code: "",
            time: 60,
            flag: false,
            btnClassStatus:false
        };
    },
    methods: {
        getCode() {
            return this.code;
        },
        showModelTip() {
            Dialog.alert({
                title: "提示",
                message:
                    "短信收不到，请在倒计时结束后点击下方重新获取，或者关闭弹窗重新操作！"
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
        },
        closePuponFn(){
            this.puponShow = false
        }
    },
    watch: {
     code: function() {
            var inputCode = this.code;
            if (inputCode.length == 6) {
              this.btnClassStatus = true  
            }else{
              this.btnClassStatus = false
            }
        }
    },
    created() {
        this.timerFn();
    }
};
</script>
<style lang="scss">
// 弹窗验证
.overlazyR {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
}
.puponVerifyMain {
    position: fixed;
    width: 80%;
    margin-left: -40%;
    top: 10%;
    left: 50%;
    background: #fff;
    padding: 0 0.3rem;
    box-sizing: border-box;
    padding-bottom:0.4rem;
    border-radius:0.1rem;
    .closeBtn{
        width:0.4rem;
        height:0.4rem;
        display: block;
        position:absolute;
        right:0.3rem;
        top:0.3rem;
    }
    > h3 {
        font-size: 0.4rem;
        color: #333;
        padding-top: 0.4rem;
    }
    .pvPhoneBox {
        font-size: 0.28rem;
        line-height: 0.4rem;
        padding-top: 0.3rem;
        span{
            font-weight:bold;
        }
    }
    .inputCodeItem {
        width: 0.6rem;
        height: 0.8rem;
        border-bottom: 0.08rem solid #ccc;
        display: block;
        margin-top: 0.3rem;
        text-align: center;
        line-height: 0.8rem;
        font-size: 0.4rem;
        font-weight: bold;
        &.active {
            border-color: #089cfe;
        }
    }
    .pvInputBox {
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
        .verificationCodeBox{
            justify-content:space-around;
        }
    }
}
.bankInfoMain{
    padding-top:0.3rem;
    h4{
        font-size: 0.28rem;
        line-height: 0.4rem;
        overflow: hidden;
        img{
            width:0.4rem;
            height:0.4rem;
            float:left;
            margin-right:0.1rem;
        }
        &:last-of-type{
            text-indent:0.5rem;
        }
    }
}
.moneyNumMain{
    font-size:0.8rem;
    padding-top:0.32rem;
    text-align:center;
    font-weight:bold;
    em{
        font-size:0.5rem;
    }
}
.tipMain {
    font-size: 0.28rem;
    padding-top: 0.5rem;
}
.timerMain {
    font-size: 0.28rem;
    padding-top: 0.18rem;
    em {
        color: #f33;
    }
}
.confirmWithdrawMain{
    padding-top:0.4rem;
    a{
        height:0.8rem;
        line-height:0.8rem;
        text-align:center;
        font-size:0.32rem;
        border:1px solid #ccc;
        display:block;
        border-radius:0.8rem;
        color:#ccc;
        &.active{
            color:#089cfe;
            border-color:#089cfe;
        }
    }
}
</style>