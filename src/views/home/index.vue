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
                    <div class="index-list1-explain">当月赚钱</div>
                </li>
                <li>
                    <div class="index-list1-img">
                        <img src="@/assets/images/index-list1-3.png" alt>
                    </div>
                    <div class="index-list1-text">{{ renderData.listOneData.total }}</div>
                    <div class="index-list1-explain">总赚钱</div>
                </li>
                <li>
                    <router-link
                        :to="{ name: 'freezeprogress', params: { money: renderData.thaw } }"
                    >
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
                            <img src="@/assets/images/index-list2-img1.png" alt>
                        </router-link>
                    </div>
                    <div class="text">
                        <router-link to="/bindingMplements">绑定机具</router-link>
                    </div>
                </li>
                <li v-if="renderData.info.level == 2">
                    <div class="img">
                        <router-link to="/myTerminal">
                            <img src="@/assets/images/index-list2-img2.png" alt>
                        </router-link>
                    </div>
                    <div class="text">
                        <router-link to="/myTerminal">我的终端</router-link>
                    </div>
                </li>
                <router-link tag="li" @click="applyAgent" to="/application-agent">
                    <div class="img">
                        <img src="@/assets/images/index-list2-img3.png" alt>
                    </div>
                    <div class="text">
                        <a href="javascript:;">申请代理</a>
                    </div>
                </router-link>
                <router-link tag="li" @click="applyAgent" to="/dial-code">
                    <div class="img">
                        <img src="@/assets/images/index-list2-img3.png" alt>
                    </div>
                    <div class="text">
                        <a href="javascript:;">拨码</a>
                    </div>
                </router-link>
                <!-- <li>
                    <div class="img">
                        <router-link to="/mall">
                            <img src="@/assets/images/index-list2-img5.png" alt>
                        </router-link>
                    </div>
                    <div class="text">
                        <router-link to="/mall">机具商场</router-link>
                    </div>
                </li> -->
                <li v-if="renderData.info.level == 2">
                    <div class="img">
                        <router-link to="/financialDetails">
                            <img src="@/assets/images/index-list2-img6.png" alt>
                        </router-link>
                    </div>
                    <div class="text">
                        <router-link to="/financialDetails">收益明细</router-link>
                    </div>
                </li>
                <li v-if="renderData.info.level == 2">
                    <div class="img">
                        <router-link to="/myMerchants">
                            <img src="@/assets/images/organizationIcon.png" alt>
                        </router-link>
                    </div>
                    <div class="text">
                        <router-link to="/myMerchants">组织架构</router-link>
                    </div>
                </li>
                <!-- <li>
          <div class="img">
            <img src="@/assets/images/index-list2-img8.png" alt="">
          </div>
          <div class="text">
            <a href="">排行榜</a>
          </div>
                </li>-->
<<<<<<< HEAD
                <!-- <li v-if="renderData.info.level == 2">
=======
                <li v-if="renderData.info.level == 2" style="display:none;">
>>>>>>> 16ebcd01d1d95c49d18e5866b0979c022afd9d5f
                    <div class="img">
                        <router-link to="/deliverGoods">
                            <img src="@/assets/images/index-list2-img4.png" alt>
                        </router-link>
                    </div>
                    <div class="text">
                        <router-link to="/deliverGoods">订单管理</router-link>
                    </div>
                </li> -->
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
export default {
    data() {
        return {
            current: 0,
            bannerLength: 0,
            bannerListData: {},
            renderData: {
                listOneData: {},
                thaw: "",
                info: {},
                todayProfit: ""
            },
            queryData: {
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
                    requestType: "personal",
                    requestKeywords: "cordeopenid",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    openid: this.$route.query.opid
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
        //申请代理商
        applyAgent() {
            Toast({
                message: "请联系您的上级代理",
                duration: 1000
            });
        }
    },
    created() {
        this.listOne();
        this.thaw();
        // this.test1()
        this.bannerList();
        this.info();
        this.todayProfit();
        // this.loginSuccess.openid = this.$route.query.opid
        getServer(this.queryData.loginSuccess).then(res => {});
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
