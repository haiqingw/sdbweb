
<template>
    <div>
        <div class="logo">
            <img src="@/assets/images/logo.png" alt="">
        </div>
        <div class="login-from">
            <el-form :model="formData" :rules="loginRules" ref="loginForm" class="demo-ruleForm">
                <el-form-item prop="phone">
                    <el-input v-model="formData.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <!-- type="password" -->
                    <el-input  v-model="formData.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button :loading="loading" type="primary" @click="clickLogin">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {checkPhone} from '@/utils/verification.js'
    export default {
        data() {
            return {
                loading: false,
                formData: {
                    phone: "13704751958",
                    password: "123456a"
                },
                loginRules: {
                    phone: [
                        { required: true, trigger: 'blur', message: "手机号不能为空" },
                        { required: true, trigger: 'blur', validator: checkPhone },
                    ],
                    password: [
                        { required: true, trigger: 'blur', message: "密码不能为空" }
                    ],
                }
            }
        },
        methods: {
            clickLogin() {
                this.$router.push({ path: '/' })
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        // this.loading = true
                        // this.$store
                        //     .dispatch('Login', this.formData)
                        //     .then((res) => {
                        //         this.$router.push({ path: '/' })
                        //         this.loading = false
                        //     })
                        //     .catch((err) => {
                        //         this.loading = false
                        //     })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            }
        },
        created() {
           
        }
    }
</script>


<style>
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
</style>


