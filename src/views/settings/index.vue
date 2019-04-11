


<template>
    <div class="settings">
        <div class="return">
            <img src="@/assets/images/return.png" alt="" @click="$router.go(-1)" />
            <span>设置中心</span>
        </div>
        <div class="settings-list">
            <ul>
                <router-link to="/changePhoneNumber" tag="li" class="line_bottom">
                    <img src="@/assets/images/settingPhoneIcon.png" alt="更换手机号">
                    <span>更换手机号</span>
                    <i></i>
                </router-link>
                <router-link to="/changeCard" tag="li" class="line_bottom">
                    <img src="@/assets/images/settingBankCardIcon.png" alt="更换结算卡">
                    <span>更换结算卡</span>
                    <i></i>
                </router-link>
                <li class="line_bottom">
                    <img src="@/assets/images/mineAddressIcon.png" alt="收货地址管理">
                    <span>收货地址管理</span>
                    <i></i>
                </li>
                <router-link to="/changePassword" tag="li" class="line_bottom">
                    <img src="@/assets/images/settingPasswordIcon.png" alt="修改密码">
                    <span>修改密码</span>
                    <i></i>
                </router-link>
                <router-link to="/feedback" tag="li" class="line_bottom">
                        <img src="@/assets/images/settingFeedbackIcon.png" alt="意见反馈">
                        <span>意见反馈</span>
                        <i></i>
                </router-link>
                <li @click="logout" class="line_bottom">
                    <img src="@/assets/images/exitIcon.png" alt="退出登录">
                    <span>退出登录</span>
                    <i></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import response from "@/assets/js/response.js";
import { MessageBox, Toast } from "mint-ui";
import { getServer } from "@/api/index";
export default {
    data() {
        return {
            test: {}
        };
    },
    methods: {
        logout() {
            MessageBox.confirm("您确定要退出吗?", "退出")
                .then(action => {
                    this.$store.dispatch("LogOut").then(() => {
                        location.reload();
                    });
                })
                .catch(() => {});
        }
    }
};
</script>


<style>
.settings-list {
    margin-top: 1rem;
}
.settings-list ul {
    padding: 0 0.2rem;
}
.settings-list ul li {
    font-size: 0.26rem;
    overflow: hidden;
    line-height: 0.7rem;
    padding: 0.1rem 0;
    color: #000;
}
.settings-list ul li img {
    width: 20px;
    height: 20px;
    float: left;
    margin-right: 0.15rem;
    margin-top:0.145rem;
}
.settings-list ul li a {
    color: #333;
}
.settings-list ul li span {
    float: left;
}
.settings-list ul li i {
    float: right;
    width: 0.2rem;
    height: 0.2rem;
    background: url(../../assets/images/settings-ico.png) no-repeat;
    background-size: 100%;
    margin-top: 0.22rem;
}
</style>


