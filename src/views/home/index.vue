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
        <!-- <div class="index-list1">
            <ul>
                <li>
                    <div class="index-list1-img">
                        <img src="@/assets/images/index-list1-1.png" alt />
                    </div>
                    <div class="index-list1-text">{{ renderData.listOneData.balance }}</div>
                    <div class="index-list1-explain">钱包余额</div>
                </li>
                <li>
                    <div class="index-list1-img">
                        <img src="@/assets/images/index-list1-2.png" alt />
                    </div>
                    <div class="index-list1-text">{{ renderData.listOneData.curentmonth }}</div>
                    <div class="index-list1-explain">当月收益</div>
                </li>
                <li>
                    <div class="index-list1-img">
                        <img src="@/assets/images/index-list1-3.png" alt />
                    </div>
                    <div class="index-list1-text">{{ renderData.listOneData.total }}</div>
                    <div class="index-list1-explain">累计收益</div>
                </li>
                <li>
                    <router-link :to="{ name: 'freezeprogress' }">
                        <div class="index-list1-img">
                            <img src="@/assets/images/index-list1-4.png" alt />
                        </div>
                        <div class="index-list1-text">{{ renderData.thaw }}</div>
                        <div class="index-list1-explain">预期达标奖励</div>
                    </router-link>
                </li>
            </ul>
        </div>-->
        <div class="index-notice">
            <!-- <div class="index-notice-top">
        <h3>
          <img src="@/assets/images/index-notice-title.png" alt="">
        </h3>
        <div class="index-notice-top-content">
          <span>重要</span>
          <a href="">2月13-15日POS数据分润截止发放</a>
        </div>
            </div>-->
            <div class="money">
                <swiper :options="swiperOption" v-if="renderData.homeArings.length">
                    <swiper-slide v-for="item in renderData.homeArings" :key="item.id">
                        <router-link
                            :to="{name: 'financialDetails', query: {
                                state: item.types
                            }}"
                            tag="div"
                        >
                            <div
                                class="content"
                                :style="{backgroundImage: 'url(' + (item.backs) + ')', backgroundSize:'contain'}"
                            >
                                <p :style="{color: `#${item.fonts}` }">
                                    {{item.name}}
                                    <em>
                                        <b>¥</b>
                                        {{item.money}}
                                    </em>
                                </p>
                                <img v-if="item.imgUrl" :src="item.imgUrl" alt />
                            </div>
                        </router-link>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
                <!-- <div class>
                    <router-link :to="{name: 'financialDetails', query: {state: 'db'}}" style="display:block;">
                        <h3>
                            <img src="@/assets/images/index-notice-profit-img.png" alt />
                        </h3>
                        <p>
                            达标奖励(元)
                            <em><b>¥</b>{{ renderData.monthstandard || 0}}</em>
                        </p>
                        <img src="@/assets/images/dbjlImg.png" alt="">
                        <span></span>
                    </router-link>
                </div>-->
            </div>
        </div>
        <!-- <div class="etc-img" v-if="likeStatus">
            <router-link to="/etc">
                <img src="@/assets/images/home-etc.jpg" alt />
            </router-link>
        </div>-->
        <div class="index-list2">
            <ul>
                <li v-for="item in renderData.navList" :key="item.jumpPageLink">
                    <div class="img">
                        <router-link :to="item.jumpPageLink">
                            <img :src="item.iconUrl" alt />
                        </router-link>
                    </div>
                    <div class="text">
                        <router-link :to="item.jumpPageLink">{{item.moduleName}}</router-link>
                    </div>
                </li>
                <!-- <li>
                    <div class="img" @click="goShoppingMall">
                        <img src="@/assets/images/index-list2-img2.png" alt />
                    </div>
                    <div class="text">刷多宝商城</div>
                </li>-->
            </ul>
        </div>
        <van-dialog v-model="footShow" title="温馨提示" @confirm="confirms">
            <!-- <van-cell title="单元格" value="内容" /> -->
            <p style="padding: .5rem; line-height: .4rem;">{{renderData.reminmsg}}</p>
        </van-dialog>
        <Footer v-if="!footShow"></Footer>
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
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
import { Dialog } from "vant";
export default {
    data() {
        return {
            footShow: false,
            swiperOption: {
                // autoplay: true,
                // slidesPerView: 1,
                // spaceBetween: 10,
                // observer: true,
                // direction: "horizontal",
                // loop: true,
                // initialSlide: 0,
                // speed: 1000,
                // pagination: {
                //     el: ".swiper-pagination",
                //     clickable: true
                // }
                autoplay: {
                    disableOnInteraction: false, // 用户操作swiper之后，是否禁止autoplay
                    delay: 2000 // 自动切换的时间间隔（单位ms）
                },
                loop: true,
                initialSlide: 0,
                pagination: { el: ".swiper-pagination" }, // 分页按钮
                paginationClickable: true,
                onSlideChangeEnd: swiper => {
                    //console.log('onSlideChangeEnd', swiper.realIndex)
                }
            },
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
                onlineCheckStatus: false,
                navList: [],
                monthstandard: "",
                homeArings: [],
                reminmsg: ""
            },
            queryData: {
                reminmsg: {
                    requestType: "messagemanage",
                    requestKeywords: "reminmsg",
                    userID: this.$store.state.user.uid,
                    platformID: this.$store.state.user.pid,
                    userPhone: this.$store.state.user.uphone
                },
                checkmsgremin: {
                    requestType: "checke",
                    requestKeywords: "checkmsgremin",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                },
                confirms: {
                    requestType: "messagemanage",
                    requestKeywords: "confirms",
                    userID: this.$store.state.user.uid,
                    platformID: this.$store.state.user.pid,
                    userPhone: this.$store.state.user.uphone,
                    mid: ""
                },
                relogin: {
                    requestType: "buslogin",
                    requestKeywords: "relogin",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    openid:
                        this.$route.query.opid || this.$store.state.user.opid
                },
                logout: {
                    requestType: "personal",
                    requestKeywords: "launchland",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                },
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
                homeArings: {
                    requestType: "dynamicmenu",
                    requestKeywords: "homearings",
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
                monthstandard: {
                    requestType: "spendinginto",
                    requestKeywords: "monthstandard",
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
                },
                navList: {
                    requestType: "usermodule",
                    requestKeywords: "lists",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    classType: "SY"
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
        confirms() {
            // this.queryData.confirms.mid = this.renderData.reminmsg.mid;
            getServer(this.queryData.confirms).then(res => {
                if (res.data.responseStatus === 1) {
                    this.footShow = false;
                    this.homeArings();
                    // this.listOne();
                    this.thaw();
                    this.navList();
                    // this.test1()
                    this.bannerList();
                    this.info();
                    this.isChecke();
                    this.todayProfit();
                    // this.loginSuccess.openid = this.$route.query.opid
                    // alert(this.queryData.loginSuccess.openid)
                    // this.verify();;
                    this.onlineCheck();
                    this.likeStatusFunc();
                    this.dialCodeStatusFunc();
                    this.monthstandard();
                }
            });
        },
        reminmsg() {
            getServer(this.queryData.reminmsg).then(res => {
                if (res.data.responseStatus === 1) {
                    this.checkmsgremin();
                    this.renderData.reminmsg = res.data.data.content;
                    this.queryData.confirms.mid = res.data.data.mid;
                } else if (res.data.responseStatus === 300) {
                    this.footShow = false;
                    this.homeArings();
                    // this.listOne();
                    this.thaw();
                    this.navList();
                    // this.test1()
                    this.bannerList();
                    this.info();
                    this.isChecke();
                    this.todayProfit();
                    // this.loginSuccess.openid = this.$route.query.opid
                    // alert(this.queryData.loginSuccess.openid)
                    // this.verify();;
                    this.onlineCheck();
                    this.likeStatusFunc();
                    this.dialCodeStatusFunc();
                    this.monthstandard();
                }
            });
        },
        checkmsgremin() {
            getServer(this.queryData.checkmsgremin).then(res => {
                if (res.data.responseStatus === 1) {
                    // alert(JSON.stringify(res.data));
                    if (res.data.status === 1) {
                        this.footShow = true;
                    } else {
                        this.footShow = false;
                    }
                }
            });
        },
        relogin() {
            if (this.$store.state.user.opid) {
                this.reminmsg();
            } else {
                alert(1);
                getServer(this.queryData.relogin).then(res => {
                    if (res.data.responseStatus === 1) {
                        if (res.data.status === 1) {
                            this.homeArings();
                            // this.listOne();
                            this.thaw();
                            this.navList();
                            // this.test1()
                            this.bannerList();
                            this.info();
                            this.isChecke();
                            this.todayProfit();
                            // this.loginSuccess.openid = this.$route.query.opid
                            // alert(this.queryData.loginSuccess.openid)
                            // this.verify();;
                            this.onlineCheck();
                            this.likeStatusFunc();
                            this.dialCodeStatusFunc();
                            this.monthstandard();
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
        homeArings() {
            getServer(this.queryData.homeArings).then(res => {
                if (res.data.responseStatus === 1) {
                    this.renderData.homeArings = res.data.data;
                    // alert(JSON.stringify(this.renderData.homeArings));
                }
            });
        },
        monthstandard() {
            getServer(this.queryData.monthstandard).then(res => {
                if (res.data.responseStatus === 1) {
                    this.renderData.monthstandard = res.data.total;
                }
            });
        },
        goShoppingMall() {
            window.location.href = `http://shopapi.ospay.net.cn/web/#/?uid=${this.$store.state.user.uid}&pid=${this.$store.state.user.pid}&uphone=${this.$store.state.user.uphone}`;
        },
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
        },
        navList() {
            getServer(this.queryData.navList).then(res => {
                if (res.data.responseStatus === 1) {
                    this.renderData.navList = res.data.data;
                } else {
                }
            });
        },
        setOpid() {
            this.$store
                .dispatch("SetOpid", this.$route.query.opid)
                .then(res => {});
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
        getServer(this.queryData.loginSuccess).then(res => {
            this.relogin();
        });
        if (this.$route.query.opid) {
            this.setOpid();
        }
    }
};
</script>


<style lang="scss" scoped>
.swiper-container-horizontal > .swiper-pagination-bullets,
.swiper-pagination-custom,
.swiper-pagination-fraction {
    bottom: 2px;
}
.swiper-pagination-bullet {
    width: 20px;
    height: 2px;
    border-radius: 10px;
}
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
.index-notice {
    padding: 0.1rem 0.2rem;
}
.index-notice .money {
    overflow: hidden;
    font-size: 0.24rem;
    /* padding: 0.2rem; */
}
.index-notice .money .content {
    /* width: 49%; */
    /* float: right; */
    text-align: left;
    color: #fff;
    padding: 0.32rem 0.3rem 0.28rem;
    border-radius: 0.1rem;
    box-sizing: border-box;
    border-radius: 0.3rem;
}
.index-notice .money .content {
    /* background: #f8e6d0; */
    overflow: hidden;
    /* margin-right: 0.2rem; */
}
/* .index-notice .money .content:nth-of-type(even) {
    background: #e1e3f7;
}
.index-notice .money .content:nth-of-type(even) p {
    color: #5972ce;
} */
.index-notice .money div p {
    /* color: #e2963d; */
    float: left;
    padding-top: 0.1rem;
}
.index-notice .money div:last-child {
    /* background: #e1e3f7; */
    /* float: left; */
}
.index-notice .money div:last-child p {
    /* color: #5972ce; */
}
.index-notice .money div p em {
    display: block;
    font-size: 0.46rem;
    padding-top: 0.1rem;
    font-weight: bold;
}
.index-notice .money div p em b {
    font-size: 0.24rem;
    padding-right: 0.05rem;
}
.index-notice .money div img {
    width: 1rem;
    float: right;
}
</style>
