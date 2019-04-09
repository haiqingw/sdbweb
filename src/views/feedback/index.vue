<template>
    <div>
        <!-- header -->
        <!-- <mt-header fixed title="意见反馈">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header> -->
         <div class="return">
            <img
                src="@/assets/images/return.png" alt="" 
                @click="$router.go(-1)"/>
            <span>意见反馈</span>
        </div>
        <!-- body -->
        <div class="feedbackMain">
            <div class="feedbackTopMain">
                <h3>客服热线：{{customerservicetelephone}}</h3>
                <p>（周一到周五9:30-17:30）</p>
            </div>
            <div class="interval"></div>
            <div class="feedbackSubMain">
                <h3>留言反馈</h3>
                <div>
                    <textarea placeholder="请在此留下您宝贵的意见!" v-model="queryData.feedback.content"></textarea>
                </div>
                <div>
                    <input type="text" placeholder="请留下您的联系方式，方便我们与您联系！">
                </div>
            </div>
            <div class="submitBtnMain">
                <mt-button type="primary" size="large" @click="submitFn">确定提交</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
import { servicePhone, feedbackFn } from "@/api/modify";
import response from "@/assets/js/response.js";
export default {
    data() {
        return {
            customerservicetelephone: "***********",
            queryData: {
                phone: {
                    requestType: "system",
                    requestKeywords: "getsystem",
                    platformID: this.$store.state.user.pid,
                    type: "customerservicetelephone"
                },
                feedback: {
                    requestType: "personal",
                    requestKeywords: "feedback",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                }
            }
        };
    },
    methods: {
        customerPhone() {
            servicePhone(this.queryData.phone).then(res => {
                if (res.data.responseStatus === 1) {
                    this.customerservicetelephone = res.data.content;
                }
            });
        },
        submitFn() {
            if (
                this.queryData.feedback.content == "" ||
                this.queryData.feedback.content == undefined
            ) {
                Toast("请填写反馈内容后提交");
                return;
            }
            feedbackFn(this.queryData.feedback).then(res => {
                if (res.data.responseStatus === 1) {
                    Toast({message:"提交成功,感谢您的反馈！",duration:1000});
                    setTimeout(() => {
                        this.$router.go(-1);
                    }, 1000);
                }else{
                    Toast(response[res.data.responseStatus]);
                }
            });
        }
    },
    created() {
        this.customerPhone();
    }
};
</script>
<style lang="scss">
.feedbackMain {
    padding-top: 40px;
}
.feedbackTopMain {
    h3 {
        font-size: 18px;
        text-align: center;
        padding-top: 20px;
    }
    p {
        font-size: 12px;
        text-align: center;
        line-height: 30px;
        padding-bottom: 10px;
    }
}
.feedbackSubMain {
    padding: 0 15px;
    h3 {
        font-size: 14px;
        line-height: 40px;
    }
    div {
        box-shadow: 0 0 3px #ccc;
        margin-bottom: 15px;
        padding: 0 10px;
        &:first-of-type {
            padding: 10px;
        }
        textarea {
            width: 100%;
            height: 100px;
            line-height: 30px;
            font-size: 14px;
        }
        input {
            height: 50px;
            line-height: 50px;
            border: none;
            background: none;
            font-size: 14px;
            width: 100%;
            display: block;
        }
    }
}
.submitBtnMain {
    padding: 15px;
    button {
        font-size: 14px;
    }
}
</style>
