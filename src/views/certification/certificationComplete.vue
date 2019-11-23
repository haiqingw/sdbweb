<template>
    <div class="stepFour">
        <div class="return">
            <!-- <img src="@/assets/image/return.png" alt @click="$router.go(-1)" /> -->
            <img src="@/assets/images/return.png" alt @click="$router.push('/mine')" />
            <span>完成实名认证</span>
        </div>
        <div class="content">
            <!-- <div class="stepMain">
                <img src="@/assets/image/step4.jpg" alt />
            </div>-->
            <div class="completeCertificationMain" style="margin-top: 2rem;">
                <img src="@/assets/images/cerSuccessIcon.png" alt="已完成" />
                <h3>您已完成实名认证</h3>
                <van-cell-group>
                    <van-cell title="真实姓名" :value="renderData.info.name" />
                    <van-cell title="身份证号" :value="renderData.info.cardNick" />
                    <!-- <van-cell title="银行卡" :value="renderData.info.bank" /> -->
                </van-cell-group>
                <!-- <div class="submitBtnMain">
                    <router-link to="/">
                        <van-button type="info" size="large">返回首页</van-button>
                    </router-link>
                    <van-button type="default" size="large" @click="again">重新认证</van-button>
                </div>-->
            </div>
        </div>
    </div>
</template>
<script>
import { getServer } from "@/api/index";
import { Toast, Dialog } from "vant";
import wx from "weixin-js-sdk";
export default {
    data() {
        return {
            queryData: {
                info: {
                    requestType: "operating",
                    requestKeywords: "displayrealname",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                },
                relogin: {
                    requestType: "buslogin",
                    requestKeywords: "relogin",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    openid: this.$store.state.user.opid
                },
                logout: {
                    requestType: "personal",
                    requestKeywords: "launchland",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                }
            },
            renderData: {
                info: {}
            }
        };
    },
    methods: {
        /* 
            info => 实名认证信息
            again => 重新认证
        */
        info() {
            getServer(this.queryData.info).then(res => {
                if (res.data.responseStatus === 1) {
                    this.renderData.info = res.data.data;
                } else {
                    Toast(response[res.data.responseStatus]);
                }
            });
        },
        again() {
            Dialog.confirm({
                title: "实名认证",
                message: "您确定要从新实名认证吗？"
            })
                .then(() => {
                    // on confirm
                })
                .catch(() => {
                    // on cancel
                });
        },
        onBrowserBack() {
            // 这里写点击返回键时候的事件
            // 比如判断需求执行back()或者go(-2)或者PopupShow=false隐藏弹框
            wx.closeWindow();
        },
        relogin() {
            // alert(this.queryData.relogin.openid)
            getServer(this.queryData.relogin).then(res => {
                if (res.data.responseStatus === 1) {
                    if (res.data.status === 1) {
                        this.info();
                    } else if (res.data.status === 2) {
                        Toast("您的账号已被他人登陆");
                        setTimeout(() => {
                            this.$store
                                .dispatch("LogOut", this.queryData.logout)
                                .then(() => {
                                    // location.reload();
                                    setTimeout(() => {
                                        this.$router.push({
                                            // path: "/loginoid",
                                            path: "/loginoid",
                                            query: {
                                                plat: this.$store.state.user
                                                    .plat
                                            }
                                        });
                                    }, 500);
                                });
                        }, 1000);
                    }
                }
            });
        }
    },
    mounted() {
        // 按需使用：A→B→C就需要页面一进来的时候，就添加一个历史记录
        window.history.pushState(null, null, document.URL);
        // 给window添加一个popstate事件，拦截返回键，执行this.onBrowserBack事件，addEventListener需要指向一个方法
        window.addEventListener("popstate", this.onBrowserBack, false);
    },
    destroyed() {
        // 当页面销毁必须要移除这个事件，vue不刷新页面，不移除会重复执行这个事件
        window.removeEventListener("popstate", this.onBrowserBack, false);
    },
    created() {
        this.relogin();
    }
};
</script>
<style lang="less">
.stepFour .content {
    padding-top: 0.8rem;
}
.stepMain {
    padding: 0.3rem 0.5rem;
    overflow: hidden;
    img {
        width: 60%;
        display: block;
        float: right;
    }
}
.completeCertificationMain {
    padding: 0 0.2rem;
    img {
        width: 1rem;
        height: 1rem;
        display: block;
        margin: 0.3rem auto;
    }
    h3 {
        text-align: center;
        font-size: 0.32rem;
        padding-bottom: 1rem;
    }
}
.stepFour .submitBtnMain .van-button--large {
    border-radius: 44px;
}
</style>