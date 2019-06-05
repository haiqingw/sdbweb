
<template>
    <div>
        <div class="logo">
            <!-- <img src="@/assets/images/logo.png" alt=""> -->
            <img :src="renderData.merchantInfo.qrcodeLogeUrl" alt>
        </div>
        <div class="login-from">
            <el-form :model="formData" :rules="loginRules" ref="loginForm" class="demo-ruleForm">
                <el-form-item prop="phone">
                    <el-input v-model="formData.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="password" style="margin-bottom:0;">
                    <!-- type="password" -->
                    <el-input v-model="formData.password" placeholder="请输入密码" show-password></el-input>
                </el-form-item>
                <div class="forgetPasswordMain">
                    <router-link to="/forgetPassword">忘记密码</router-link>
                </div>
                <el-form-item>
                    <el-button :loading="loading" type="primary" @click="clickLogin">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { checkPhone } from "@/utils/verification.js";
import { getServer } from "@/api/index";
// import qs from 'qs'
export default {
    data() {
        return {
            code: "",
            loading: false,
            formData: {
                phone: "",
                password: "",
                plat: this.$route.query.plat
            },
            loginRules: {
                phone: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "手机号不能为空"
                    },
                    { required: true, trigger: "blur", validator: checkPhone }
                ],
                password: [
                    { required: true, trigger: "blur", message: "密码不能为空" }
                ]
            },
            queryData: {
                merchantInfo: {
                    requestType: "buslogin",
                    requestKeywords: "getplatinfo",
                    plat: ""
                }
            },
            renderData: {
                merchantInfo: {}
            },
            autoLoginData: {
                plat: this.$route.query.plat,
                code: ""
            }
        };
    },
    methods: {
        clickLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch("Login", this.formData)
                        .then(res => {
                            if (this.$route.query.code) {
                                this.$router.push({
                                    path: "/",
                                    query: { opid: this.code }
                                });
                            } else {
                                this.$router.push({ path: "/" });
                            }
                            this.loading = false;
                        })
                        .catch(err => {
                            this.loading = false;
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        autoLogin() {
            this.$store
                .dispatch("autoLogin", this.autoLoginData)
                .then(res => {
                    this.$router.push({
                        path: "/",
                        query: { opid: this.code }
                    });
                    this.loading = false;
                    this.loginSuccess.openid = this.code;
                })
                .catch(err => {
                    this.loading = false;
                });
        },
        merchantInfo() {
            this.queryData.merchantInfo.plat = this.$route.query.plat;
            // alert(this.$route.query.plat)
            // alert(window.location.href)
            // alert(this.$route.query)
            // alert(this.$route.path)
            getServer(this.queryData.merchantInfo).then(res => {
                if (res.data.responseStatus === 1) {
                    this.renderData.merchantInfo = res.data.data;
                }
            });
        },
        merchantInfoTitle() {
            this.$store
                .dispatch("merchantInfo", this.$route.query.plat)
                .then(res => {})
                .catch(err => {});
        }
    },
    created() {
        this.code = this.$route.query.code;
        this.autoLoginData.code = this.$route.query.code;
        if (this.code) {
            this.autoLogin();
        }
        this.merchantInfo();
        this.merchantInfoTitle();
    }
};
</script>


<style lang = "scss">
.logo {
    margin-bottom: 0.8rem;
}
/* .logo img {
    border-radius: 50%;
} */
.login-from {
    width: 80%;
    margin: 0 auto;
}
.login-from {
    text-align: center;
}
.login-from .el-button--primary {
    width: 100%;
}
.forgetPasswordMain {
    text-align: right;
    line-height: 30px;
    padding-bottom: 8px;
    a {
        font-size: 14px;
        color: #333;
    }
}
</style>


