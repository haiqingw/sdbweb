<template>
    <div>
        <!-- header -->
        <!-- <mt-header fixed title="修改密码">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header> -->
        <div class="return">
            <img
                src="@/assets/images/return.png" alt="" 
                @click="$router.go(-1)"/>
            <span>修改密码</span>
        </div>
        <!-- body -->
        <div class="changePasswordMain">
            <div class="iconInputItem line_bottom">
                <img src="@/assets/images/minePassWordIcon.png" alt="旧密码">
                <input type="password" placeholder="请输入旧密码" v-model="queryData.modifyData.oldpass">
            </div>
            <div class="iconInputItem line_bottom">
                <img src="@/assets/images/minePassWordIcon.png" alt="新密码">
                <input type="password" placeholder="请输入新密码" v-model="queryData.modifyData.newpass">
            </div>
            <div class="iconInputItem line_bottom">
                <img src="@/assets/images/minePassWordIcon.png" alt="新密码">
                <input type="password" placeholder="请再次输入新密码" v-model="queryData.checknewpass">
            </div>
            <div class="submitBtnMain">
                <mt-button type="primary" size="large" @click="submitModification">确定提交</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
import { getServer } from "@/api/index";
import response from "@/assets/js/response.js";
import { checkPassWord } from '@/utils/verification'
export default {
    data() {
        return {
            queryData: {
                modifyData: {
                    requestType: "operating",
                    requestKeywords: "repass",
                    userID: this.$store.state.user.uid,
                    platformID: this.$store.state.user.pid,
                    userPhone: this.$store.state.user.uphone
                }
            }
        };
    },
    methods: {
        submitModification() {
            if (this.queryData.modifyData.oldpass == "" || this.queryData.modifyData.oldpass == undefined) {
                Toast({
                    message: "请输入旧密码",
                    duration: 2000
                });
                return;
            }
            if (this.queryData.modifyData.newpass == "" || this.queryData.modifyData.newpass == undefined) {
                Toast({
                    message: "请输入新密码",
                    duration: 2000
                });
                return;
            }
            if (this.queryData.checknewpass == "" || this.queryData.checknewpass == undefined) {
                Toast({
                    message: "请再次输入新密码",
                    duration: 2000
                });
                return;
            }
            if (this.queryData.checknewpass != this.queryData.modifyData.newpass) {
                Toast({
                    message: "两次输入的密码不一致",
                    duration: 2000
                });
                return;
            }
            if(!checkPassWord(this.queryData.checknewpass)){
              Toast({
                    message: "必须为字母加数字且长度不小于6位",
                    duration: 2000
                });
                return;  
            }
            //确认提交
            getServer(this.queryData.modifyData).then(res => {
                //console.log(response[res.data.responseStatus]);
                if (res.data.responseStatus === 1) {
                    Toast("密码修改成功,请重新登录");
                    setTimeout(() => {
                        this.$store.dispatch("LogOut").then(() => {
                            location.reload();
                        });
                    }, 1000);
                }else{
                    Toast(response[res.data.responseStatus]);
                }
            });
        }
    }
};
</script>
<style lang="scss">
.changePasswordMain {
    padding: 40px 15px;
}
.iconInputItem {
    height: 50px;
    img {
        width: 26px;
        height: 26px;
        float: left;
        margin-top: 10px;
        margin-right: 7px;
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