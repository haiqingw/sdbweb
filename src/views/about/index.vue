<template>
    <div>
        <!-- header -->
        <!-- <mt-header fixed title="关于我们">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>-->
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
            <span>关于我们</span>
        </div>
        <!-- body -->
        <div class="aboutMain">
            <div v-html="contentData"></div>
            <div v-if="isData">
                <div class="no-data">
                    <img src="@/assets/images/no-data.png" alt="暂无数据" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getServer } from "@/api/index";
import response from "@/assets/js/response.js";
import { Toast } from "mint-ui";
export default {
    data() {
        return {
            contentData: "",
            isData: false,
            queryData: {
                about: {
                    requestType: "system",
                    requestKeywords: "getsystem",
                    platformID: this.$store.state.user.pid,
                    type: "appabout"
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
            }
        };
    },
    methods: {
        relogin() {
            // alert(this.queryData.relogin.openid)
            getServer(this.queryData.relogin).then(res => {
                if (res.data.responseStatus === 1) {
                    if (res.data.status === 1) {
                        this.aboutFn();
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
        },
        aboutFn() {
            getServer(this.queryData.about).then(res => {
                console.log(res);
                if (res.data.responseStatus === 1) {
                    this.contentData = res.data.content;
                    if (
                        res.data.content == "<p>暂无数据</p>" ||
                        res.data.content == ""
                    ) {
                        this.contentData = "";
                        this.isData = true;
                    }
                }
            });
        }
    },
    created() {
        this.relogin();
    }
};
</script>
<style lang="scss">
.aboutMain {
    padding: 50px 10px 10px;
    font-size: 14px;
    color: #333;
    line-height: 20px;
    text-align: justify;
}
</style>
