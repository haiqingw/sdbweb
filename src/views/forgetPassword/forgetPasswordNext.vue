<template>
    <div>
        <!-- header -->
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)">
            <span>忘记密码</span>
        </div>
        <!-- body -->
        <div class="certificationMain">
            <h3>请重新编辑您的密码</h3>
            <p>建议您的新密码以简单记忆为标准</p>
            <div class="itemTopTextMain">
                <p>密码</p>
                <div class="line_bottom">
                    <input type="password" placeholder="请输入您的新密码" ref="newPassword">
                </div>
            </div>
            <div class="itemTopTextMain">
                <p>确认密码</p>
                <div class="line_bottom">
                    <input
                        type="password"
                        placeholder="请再次输入您的密码"
                        v-model="queryData.newPasswordParam.newpass"
                    >
                </div>
            </div>
            <div class="submitBtnMain">
                <mt-button type="primary" size="large" @click="submitFn">确认提交</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
import { getServer } from "@/api/index";
import response from "@/assets/js/response.js";
import { checkPassWord } from "@/utils/verification";
export default {
    data() {
        return {
            flag: false,
            queryData: {
                newPasswordParam: {
                    requestType: "operating",
                    requestKeywords: "forget"
                }
            }
        };
    },
    methods: {
        submitFn() {
            this.queryData.newPasswordParam.phone = this.$route.params.phoneNumber;
            var $newPassword = this.$refs.newPassword.value;
            if ($newPassword == "" || $newPassword == undefined) {
                Toast({
                    message: "请输入新密码",
                    duration: 1000
                });
            } else if (
                this.queryData.newPasswordParam.newpass == "" ||
                this.queryData.newPasswordParam.newpass == undefined
            ) {
                Toast({
                    message: "请再次输入密码",
                    duration: 1000
                });
            } else if (
                $newPassword != this.queryData.newPasswordParam.newpass
            ) {
                Toast({
                    message: "两次密码不一致",
                    duration: 1000
                });
            } else if (!checkPassWord($newPassword)) {
                Toast({
                    message: "必须为字母加数字且长度不小于6位",
                    duration: 1000
                });
            } else {
                this.flag = true;
            }
            //执行结果
            if (this.flag) {
                console.log(this.queryData.newPasswordParam);
                getServer(this.queryData.newPasswordParam).then(res => {
                    if (res.data.responseStatus === 1) {
                        Toast({
                            message: "重置成功",
                            duration: 1000
                        });
                        setTimeout(() => {
                            // this.$router.push({ name: "login" });
                            this.$router.push({
                                // path: "/loginoid",
                                path: "/loginoid",
                                query: {
                                    plat: this.$store.state.user.plat
                                }
                            });
                        }, 1000);
                    } else {
                        Toast({
                            message: response[res.data.responseStatus],
                            duration: 1000
                        });
                    }
                });
            }
        }
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
    }
}
.submitBtnMain {
    padding-top: 40px;
}
</style>
