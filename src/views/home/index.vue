<template>
    <div class="index-home">
        <div class="isLogin">
            <div class="index-banner" v-if="islogin">
                <van-swipe @change="onChange" :autoplay="3000">
                    <van-swipe-item
                        v-for="(item, index) in bannerListData"
                        v-bind:item="item"
                        v-bind:index="index"
                        v-bind:key="item.id"
                    >
                        <img :src="item.picUrl" @click="bannerDetailTap(item.id)" alt="banner">
                    </van-swipe-item>
                    <div
                        class="custom-indicator"
                        slot="indicator"
                    >{{ current + 1 }}/{{ bannerLength }}</div>
                </van-swipe>
            </div>
            <div class="login" v-else>
                <router-link to="/login">立即登录</router-link>
            </div>
        </div>
        <div class="interval"></div>
        <div class="index-list1">
            <ul>
                <li>
                    <div class="index-list1-img">
                        <img src="@/assets/images/index-list1-1.png" alt>
                    </div>
                    <div class="index-list1-text">{{ renderData.listOneData.balance }}</div>
                    <div class="index-list1-explain">钱包余额</div>
                </li>
                <li>
                    <div class="index-list1-img">
                        <img src="@/assets/images/index-list1-2.png" alt>
                    </div>
                    <div class="index-list1-text">{{ renderData.listOneData.curentmonth }}</div>
                    <div class="index-list1-explain">当月收益</div>
                </li>
                <li>
                    <div class="index-list1-img">
                        <img src="@/assets/images/index-list1-3.png" alt>
                    </div>
                    <div class="index-list1-text">{{ renderData.listOneData.total }}</div>
                    <div class="index-list1-explain">总赚钱</div>
                </li>
                <li>
                    <router-link :to="{ name: 'freezeprogress' }">
                        <div class="index-list1-img">
                            <img src="@/assets/images/index-list1-4.png" alt>
                        </div>
                        <div class="index-list1-text">{{ renderData.thaw }}</div>
                        <div class="index-list1-explain">待解冻</div>
                    </router-link>
                </li>
            </ul>
        </div>
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
            <div class="index-notice-profit">
                <router-link to="/financialDetails" style="display:block;">
                    <h3>
                        <img src="@/assets/images/index-notice-profit-img.png" alt>
                    </h3>
                    <p>
                        今日收益
                        <em>+ {{renderData.todayProfit}}</em>
                    </p>
                    <span></span>
                </router-link>
            </div>
        </div>
        <div class="index-list2">
            <ul>
                <li>
                    <div class="img">
                        <router-link to="/bindingMplements">
                            <img src="@/assets/images/indexBtn01.png" alt>
                        </router-link>
                    </div>
                    <div class="text">
                        <router-link to="/bindingMplements">自助绑机</router-link>
                    </div>
                </li>
                <li>
                    <div class="img">
                        <router-link to="/merchantsExpand">
                            <img src="@/assets/images/indexBtn05.png" alt>
                        </router-link>
                    </div>
                    <div class="text">
                        <router-link to="/merchantsExpand">商户拓展</router-link>
                    </div>
                </li>
                <li v-if="renderData.info.level == 2">
                    <div class="img">
                        <router-link to="/myTerminal">
                            <img src="@/assets/images/indexBtn02.png" alt>
                        </router-link>
                    </div>
                    <div class="text">
                        <router-link to="/myTerminal">我的终端</router-link>
                    </div>
                </li>
                <li v-if="renderData.info.level != 2 && renderData.isChecke == 1">
                    <div class="img">
                        <router-link to="/application-agent">
                            <img src="@/assets/images/indexBtn09.png" alt>
                        </router-link>
                    </div>
                    <div class="text">
                        <router-link to="/application-agent">申请代理</router-link>
                    </div>
                </li>
                <li v-if="renderData.info.level == 2 && renderData.isChecke == 1">
                    <div class="img">
                        <router-link to="/application-agent-To-examine">
                            <img src="@/assets/images/indexBtn03.png" alt>
                        </router-link>
                    </div>
                    <div class="text">
                        <router-link to="/application-agent-To-examine">代理审核</router-link>
                    </div>
                </li>
                <li v-if="renderData.info.level == 2">
                    <div class="img">
                        <router-link to="/dial-code">
                            <img src="@/assets/images/indexBtn04.png" alt>
                        </router-link>
                    </div>
                    <div class="text">
                        <router-link to="/dial-code">拨码</router-link>
                    </div>
                </li>
                <!-- v-if="this.$store.state.user.pid == 175" -->
                <!-- <li v-if="this.$store.state.user.pid == 215">
                    <div class="img">
                        <router-link to="/mall">
                            <img src="@/assets/images/indexBtn09.png" alt>
                        </router-link>
                    </div>
                    <div class="text">
                        <router-link to="/mall">机具商城</router-link>
                    </div>
                </li> -->
                <li>
                    <div class="img">
                        <router-link to="/financialDetails">
                            <img src="@/assets/images/indexBtn06.png" alt>
                        </router-link>
                    </div>
                    <div class="text">
                        <router-link to="/financialDetails">收益明细</router-link>
                    </div>
                </li>
                <li v-if="renderData.info.level == 2">
                    <div class="img">
                        <router-link to="/myMerchants">
                            <img src="@/assets/images/indexBtn07.png" alt>
                        </router-link>
                    </div>
                    <div class="text">
                        <router-link to="/myMerchants">组织架构</router-link>
                    </div>
                </li>
                <li v-if="renderData.info.level == 2">
                    <div class="img">
                        <router-link to="/rank">
                            <img src="@/assets/images/indexBtn11.png" alt>
                        </router-link>
                    </div>
                    <div class="text">
                        <router-link to="/rank">排行榜</router-link>
                    </div>
                </li>
                <!-- <li v-if="renderData.info.level == 2 && this.$store.state.user.pid == 215">
                    <div class="img">
                        <router-link to="/deliverGoods">
                            <img src="@/assets/images/index-list2-img4.png" alt>
                        </router-link>
                    </div>
                   <div class="text">
                        <router-link to="/deliverGoods">订单管理</router-link>
                    </div>
                </li> -->
                  <li v-if="renderData.onlineCheckStatus">
                    <div class="img">
                        <router-link to="/online-ordering">
                            <img src="@/assets/images/indexBtn10.png" alt>
                        </router-link>
                    </div>
                    <div class="text">
                        <router-link to="/mall">在线订货</router-link>
                    </div>
                </li>
                <li v-if="renderData.onlineCheckStatus">
                    <div class="img">
                        <router-link to="/bookOrderList">
                            <img src="@/assets/images/indexBtn12.png" alt>
                        </router-link>
                    </div>
                   <div class="text">
                        <router-link to="/bookOrderList">订货订单</router-link>
                    </div>
                </li>
                <li v-if="likeStatus" @click="loanHref">
                    <div class="img">
                        <img src="@/assets/images/indexBtn12.png" alt>
                    </div>
                   <div class="text">
                        <a href="javascript:;">在线贷款</a>
                    </div>
                </li>
                <li v-if="likeStatus" @click="cardHref">
                    <div class="img">
                        <img src="@/assets/images/indexBtn12.png" alt>
                    </div>
                   <div class="text">
                        <a href="javascript:;">在线办卡</a>
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
export default {
    data() {
        return {
            likeStatus: false,
            current: 0,
            bannerLength: 0,
            bannerListData: {},
            renderData: {
                listOneData: {},
                thaw: "",
                info: {},
                todayProfit: "",
                isChecke: 0,
                onlineCheckStatus:false
            },
            queryData: {
                likeStatus: {
                    requestType: "checke",
                    requestKeywords:'linkdisplaycheck', 
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
                isChecke: { //  返回 status 1 显示 2 关闭
                    requestType: "checke",
                    requestKeywords:'applycheck', 
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
                onlineCheck:{   //返回 status 1 显示 2 关闭
                    requestType:"checke",
                    requestKeywords:"onlinecheck",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                }
            }
        };
    },
    components: {
        Footer
    },
    computed: {
        ...mapGetters(["islogin"])
    },
    methods: {
        loanHref() {
            window.location.href = "https://m.hhrcard.com/credit/miniprogram/copartner/bankList?invitecode=12443774&oas=1&city_name=%E5%91%BC%E5%92%8C%E6%B5%A9%E7%89%B9%E5%B8%82"
        },
        cardHref() {
            window.location.href = "https://m.rong360.com/hehuoren/wechat/hhrtpl/applyNew?partner_id=12443774&wx_user_id=1235632&spread=p_list&utm_source=wxgzh&utm_medium=hehuoren&_js_r=%2523%252Fproductlist&_js_r_r=1#/productlist"
        },
        isChecke() {
            getServer(this.queryData.isChecke).then( res => {
                if( res.data.responseStatus === 1 ) {
                    this.renderData.isChecke = res.data.status
                }
            })
        },
        todayProfit() {
            getServer(this.queryData.todayProfit).then(res => {
                if (res.data.responseStatus === 1) {
                    this.renderData.todayProfit = res.data.total;
                    if (this.renderData.todayProfit === null) {
                        this.renderData.todayProfit = 0;
                    }
                }
            })
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
        onlineCheck(){
            getServer(this.queryData.onlineCheck).then(res => {
                if (res.data.responseStatus === 1) {
                    if(res.data.status == 1){
                        this.renderData.onlineCheckStatus = true;
                    }else if(res.data.status == 2){
                        this.renderData.onlineCheckStatus = false;
                    }
                }
            });
        },
        likeStatusFunc() {
            getServer(this.queryData.likeStatus).then( res => {
                if( res.data.responseStatus === 1 ) {
                    if( res.data.status == 1 ) {
                        this.likeStatus = true
                    } else {
                        this.likeStatus = false
                    }
                }
            })
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
        this.isChecke()
        this.todayProfit();
        // this.loginSuccess.openid = this.$route.query.opid
        // alert(this.queryData.loginSuccess.openid)
        getServer(this.queryData.loginSuccess).then(res => {});
        // this.verify();;
        this.onlineCheck()
        this.likeStatusFunc()
    }
};
</script>


<style>
html {
    background: #fff;
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
