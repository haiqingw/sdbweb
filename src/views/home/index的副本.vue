<template>
    <div class="index-home">
        <div class="isLogin">
            <div class="index-capital-subsidiary-main flex" v-if="islogin">
                <div>
                    <img src="@/assets/images/indexTopBtn01.png" alt="钱包余额">
                    <h3>钱包余额</h3>
                    <p>{{ renderData.listOneData.balance ? renderData.listOneData.balance : '0.00'}}</p>
                </div>
                <div>
                    <img src="@/assets/images/indexTopBtn02.png" alt="当月赚钱">
                    <h3>当月赚钱</h3>
                    <p>{{ renderData.listOneData.curentmonth ? renderData.listOneData.curentmonth : '0.00'}}</p>
                </div>
                <div>
                    <img src="@/assets/images/indexTopBtn03.png" alt="总赚钱">
                    <h3>总赚钱</h3>
                    <p>{{ renderData.listOneData.total ? renderData.listOneData.total : '0.00'}}</p>
                </div>
                <router-link :to="{ name: 'freezeprogress' }" tag="div">
                    <img src="@/assets/images/indexTopBtn04.png" alt="待解冻">
                    <h3>待解冻</h3>
                    <p>{{ renderData.thaw ? renderData.thaw : '0.00' }}</p>
                </router-link>
            </div>
            <div class="login" v-else>
                <router-link to="/login">立即登录</router-link>
            </div>
        </div>
        <div class="interval"></div>
        <!-- 今日收益 -->
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
        <!-- banner -->
        <div class="index-banner">
            <van-swipe @change="onChange" :autoplay="3000">
                <van-swipe-item v-for="(item, index) in bannerListData" v-bind:item="item" v-bind:index="index" v-bind:key="item.id">
                    <img :src="item.picUrl" @click="bannerDetailTap(item.id)" alt="banner">
                </van-swipe-item>
                <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{ bannerLength }}</div>
            </van-swipe>
            <img class="bannerOverlazy" src="@/assets/images/bannerOverlazyImg.png" alt="bannerOverlazy">
            <!-- <img src="@/assets/images/indexBannerTextImg.png" alt="banner"> -->
        </div>
        <!-- 首页菜单 -->
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
                <li v-if="renderData.info.level != 2">
                    <div class="img">
                        <router-link to="/application-agent">
                            <img src="@/assets/images/indexBtn09.png" alt>
                        </router-link>
                    </div>
                    <div class="text">
                        <router-link to="/application-agent">申请代理</router-link>
                    </div>
                </li>
                <li v-if="renderData.info.level == 2">
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
                <!-- <li>
                    <div class="img">
                        <router-link to="/mall">
                            <img src="@/assets/images/indexBtn09.png" alt>
                        </router-link>
                    </div>
                    <div class="text">
                        <router-link to="/mall">机具商城</router-link>
                    </div>
                </li>-->
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
                <!-- <li>
          <div class="img">
            <img src="@/assets/images/index-list2-img8.png" alt="">
          </div>
          <div class="text">
            <a href="">排行榜</a>
          </div>
                </li>-->
                <!-- <li v-if="renderData.info.level == 2"> -->
                <!-- <li v-if="renderData.info.level == 2">
                    <div class="img">
                        <router-link to="/deliverGoods">
                            <img src="@/assets/images/index-list2-img4.png" alt>
                        </router-link>
                    </div>
                    <div class="text">
                        <router-link to="/deliverGoods">订单管理</router-link>
                    </div>
                </li>-->
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
                    requestType: "buslogin",
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
        // alert(this.queryData.loginSuccess.openid)
        getServer(this.queryData.loginSuccess).then(res => {});
    }
};
</script>


<style lang="scss">
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
.index-capital-subsidiary-main {
    height: 3rem;
    width: 100%;
    background: url("../../assets/images/indexHeaderBg.jpg") no-repeat center
        bottom;
    background-size: 100% auto;
    justify-content: space-around;
    padding-top: 0.55rem;
    box-sizing: border-box;
    div {
        width: 100%;
        text-align: center;
        line-height: 0.4rem;
        img {
            width: 0.6rem;
            margin: 0 auto;
        }
        h3 {
            font-size: 0.24rem;
            color: #fff;
            padding-top: 0.1rem;
        }
        p {
            font-size: 0.36rem;
            color: #fff;
        }
    }
}
.index-notice{
    padding:.1rem .36rem .1rem .33rem;
}
.index-notice-profit h3 img{
    width:0.75rem;
}
.index-notice-profit p{
    padding-top:0.12rem;
}
.index-notice-profit p em{
    margin-top: -0.055rem;
}
.index-notice-profit span{
    margin-top: 0.21rem;
}
.index-banner{
    margin-top:0.25rem;
    position: relative;
    img{
        display:block;
        height:2rem;
    }
    .bannerOverlazy{
        width:100%;
        height:100%;
        position: absolute;
        left:0;
        top:0;
        z-index:99;
    }
}
</style>
