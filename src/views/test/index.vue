<template>
    <div class="index-home">
        <div class="isLogin">
            <div class="index-banner" v-if="islogin">
                <!-- <vue-element-loading :active="showCustomizeLoader"> -->
                <van-swipe @change="onChange" :autoplay="3000">
                    <van-swipe-item
                        v-for="(item, index) in bannerListData"
                        v-bind:item="item"
                        v-bind:index="index"
                        v-bind:key="item.id"
                        @click="clickBanner(item.picUrl)"
                    >
                        <img :src="item.picUrl" @click="bannerDetailTap(item.id)" alt="banner" />
                    </van-swipe-item>
                    <div
                        class="custom-indicator"
                        slot="indicator"
                    >{{ current + 1 }}/{{ bannerLength }}</div>
                </van-swipe>
                <!-- </vue-element-loading> -->
            </div>

            <div class="login" v-else>
                <router-link to="/login">立即登录</router-link>
            </div>
        </div>
        <div class="interval"></div>
        <div class="index-list2">
            <ul>
                <li v-for="item in test" :key="item.id">
                    <div class="img">
                        <router-link :to="item.router">
                            <img :src="item.img" alt />
                        </router-link>
                    </div>
                    <div class="text">
                        <router-link :to="item.router">{{item.text}}</router-link>
                    </div>
                </li>
            </ul>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getServer } from "@/api/index";
import response from "@/assets/js/response.js";
import Footer from "@/components/footerNav/footer";
import { Toast } from "mint-ui";
import wx from "weixin-js-sdk";

import VueElementLoading from "vue-element-loading";
import img from '@/assets/images/indexBtn05.png'
export default {
    data() {
        return {
            test: [
                {
                    id: 1,
                    img: img,
                    text: "商户拓展",
                    router: "/"
                },
                {
                    id: 2,
                    img: img,
                    text: "商户拓展",
                    router: "/merchantsExpand"
                }
            ],
            showCustomizeLoader: true,
            likeStatus: false,
            current: 0,
            bannerLength: 0,
            bannerListData: {},
            dialCodeStatus: false,
            renderData: {
                listOneData: {},
                thaw: "",
                info: {},
                todayProfit: "",
                isChecke: 0,
                onlineCheckStatus: false
            },
            queryData: {
                dialCodeStatus: {
                    requestType: "checke",
                    requestKeywords: "dialcodecheck",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone //APP拨码显示开关 返回 status 1 显示 2 关
                },
                likeStatus: {
                    requestType: "checke",
                    requestKeywords: "linkdisplaycheck",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                },
                listOne: {
                    requestType: "personal",
                    requestKeywords: "busincome",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                },
                thaw: {
                    requestType: "thaw",
                    requestKeywords: "thawmoney",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                },
                isChecke: {
                    //  返回 status 1 显示 2 关闭
                    requestType: "checke",
                    requestKeywords: "applycheck",
                    platformID: this.$store.state.user.pid
                },
                bannerData: {
                    requestType: "list",
                    requestKeywords: "newadvertis",
                    types: "syl",
                    platformID: this.$store.state.user.pid
                },
                info: {
                    requestType: "personal",
                    requestKeywords: "getbusinfo",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                },
                todayProfit: {
                    requestType: "spendinginto",
                    requestKeywords: "daysearnings",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                },
                loginSuccess: {
                    requestType: "buslogin",
                    requestKeywords: "cordeopenid",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    openid: this.$route.query.opid
                },
                onlineCheck: {
                    //返回 status 1 显示 2 关闭
                    requestType: "checke",
                    requestKeywords: "onlinecheck",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                }
            }
        };
    },
    components: {
        Footer,
        VueElementLoading
    },
    computed: {
        ...mapGetters(["islogin"])
    },
    methods: {
        clickBanner(url) {
            if (url) {
                window.location.href = url;
            }
        },
        loanHref() {
            window.location.href =
                "https://m.rong360.com/hehuoren/wechat/hhrtpl/applyNew?partner_id=12443774&wx_user_id=1235632&spread=p_list&utm_source=wxgzh&utm_medium=hehuoren&_js_r=%2523%252Fproductlist&_js_r_r=1#/productlist";
        },
        cardHref() {
            window.location.href =
                "https://m.hhrcard.com/credit/miniprogram/copartner/bankList?invitecode=12443774&oas=1&city_name=%E5%91%BC%E5%92%8C%E6%B5%A9%E7%89%B9%E5%B8%82";
        },
        isChecke() {
            getServer(this.queryData.isChecke).then(res => {
                if (res.data.responseStatus === 1) {
                    this.renderData.isChecke = res.data.status;
                }
            });
        },
        todayProfit() {
            getServer(this.queryData.todayProfit).then(res => {
                if (res.data.responseStatus === 1) {
                    this.renderData.todayProfit = res.data.total;
                    if (this.renderData.todayProfit === null) {
                        this.renderData.todayProfit = 0;
                    }
                }
            });
        },
        listOne() {
            getServer(this.queryData.listOne).then(res => {
                this.renderData.listOneData = res.data;
            });
        },
        thaw() {
            getServer(this.queryData.thaw).then(res => {
                this.renderData.thaw = res.data.thawMoney;
            });
        },
        bannerList() {
            getServer(this.queryData.bannerData).then(res => {
                // console.log(res);
                this.bannerLength = res.data.data.length;
                this.bannerListData = res.data.data;
                this.showCustomizeLoader = false;
            });
        },
        //banner图详情页
        bannerDetailTap(id) {
            //console.log(id);
            // alert('banner图详情正在建设中');
        },
        onChange(index) {
            this.current = index;
        },
        info() {
            getServer(this.queryData.info).then(res => {
                if (res.data.responseStatus === 1) {
                    this.renderData.info = res.data.data;
                }
            });
        },
        onBrowserBack() {
            // 这里写点击返回键时候的事件
            // 比如判断需求执行back()或者go(-2)或者PopupShow=false隐藏弹框
            wx.closeWindow();
        },
        //APP平台在线订货显示开关
        onlineCheck() {
            getServer(this.queryData.onlineCheck).then(res => {
                if (res.data.responseStatus === 1) {
                    if (res.data.status == 1) {
                        this.renderData.onlineCheckStatus = true;
                    } else if (res.data.status == 2) {
                        this.renderData.onlineCheckStatus = false;
                    }
                }
            });
        },
        likeStatusFunc() {
            getServer(this.queryData.likeStatus).then(res => {
                if (res.data.responseStatus === 1) {
                    if (res.data.status == 1) {
                        this.likeStatus = true;
                    } else {
                        this.likeStatus = false;
                    }
                }
            });
        },
        dialCodeStatusFunc() {
            getServer(this.queryData.dialCodeStatus).then(res => {
                if (res.data.responseStatus === 1) {
                    if (res.data.status == 1) {
                        this.dialCodeStatus = true;
                    } else {
                        this.dialCodeStatus = false;
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
    watch: {
        // 弹框监听，当弹框显示的时候，pushState添加一个历史，供返回键使用
        PopupShow: {
            handler(newVal, oldVal) {
                if (newVal.Terms === true) {
                    window.history.pushState(null, null, document.URL);
                }
            },
            deep: true
        }
    },
    created() {
        this.listOne();
        this.thaw();
        // this.test1()
        this.bannerList();
        this.info();
        this.isChecke();
        this.todayProfit();
        // this.loginSuccess.openid = this.$route.query.opid
        // alert(this.queryData.loginSuccess.openid)
        getServer(this.queryData.loginSuccess).then(res => {});
        // this.verify();;
        this.onlineCheck();
        this.likeStatusFunc();
        this.dialCodeStatusFunc();
    }
};
</script>


<style>
html {
    background: #fff;
}
.index-home .etc-img {
    /* margin-top: 0.2rem; */
    /* padding: 0 0.2rem; */
}
.index-home {
    padding-bottom: 1.4rem;
    background: #fff;
}
.custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    color: #fff;
    background: rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
}
</style>
