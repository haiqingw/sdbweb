<template>
    <div class="financial-details">
        <!-- header -->
        <!-- <mt-header fixed title="资金明细">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>-->
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
            <span>资金明细</span>
        </div>
        <div class="financial-top">
            <!-- <div class="financialDetails-banner-warp">
                <div class="financialDetails-banner">
                    <van-swipe :autoplay="3000">
                        <van-swipe-item>
                            <img src="@/assets/images/mine-banner.jpg" alt>
                        </van-swipe-item>
                    </van-swipe>
                </div>
            </div>-->
            <!-- switchSacreeningMain -->
            <div class="time-choice">
                <div class="block">
                    <el-date-picker
                        v-model="queryData.list.dates"
                        type="month"
                        placeholder="请选择日期"
                        @change="changeMonth"
                    ></el-date-picker>
                </div>
            </div>
            <div class="choice">
                <div class="topic-list-inner">
                    <div class="nav" ref="nav">
                        <div
                            class="box"
                            :class="{active:navActiveIndex==index}"
                            v-for="(item,index) in renderData.screen"
                            :key="item.types"
                            @click="queryTopic(item, index, item.types)"
                        >
                            <el-button type="text">{{item.name}}</el-button>
                        </div>
                    </div>
                    <!-- <div class="nav-right-arrow rotateUp" @click="openTagModal(list)">
                    </div>-->
                </div>
            </div>
        </div>

        <!-- 列表 -->
        <div class="financialDetailsMain">
            <!-- 列表 -->
            <div class="financialDetailsList line_top" ref="financialDetailsList">
                <!-- line_bottom -->
                <div class="flex switchSacreeningMain">
                    <!-- v-if="isData" -->
                    <div class="scroll-list-wrap" v-if="isData">
                        <cube-scroll
                            ref="scroll"
                            :data="renderData.odlListData"
                            @pulling-down="onPullingDown"
                            @pulling-up="onPullingUp"
                            :options="options"
                        >
                            <ul v-if="isThaw" class="financialDetailsListUl">
                                <li
                                    class="line_bottom"
                                    v-for="(item, index) in renderData.odlListData"
                                    :key="index"
                                >
                                    <div class="top">
                                        <div class="title">
                                            <span class="s" v-if="item.product">{{item.product}}</span>
                                            <h3>{{item.storageName}}</h3>
                                        </div>
                                        <h3 class="money">
                                            <i v-if="item.changeType === 'Z'">+</i>
                                            <i v-else-if="item.changeType === 'T'">-</i>
                                            {{item.changeAmount}}
                                        </h3>
                                    </div>
                                    <div class="info">{{item.busname}}</div>
                                    <!-- <div class="info">{{item.product}}</div> -->
                                    <div class="info">终端号：{{item.terminal}}</div>
                                    <div class="info">终端号：{{item.product}}</div>
                                    <div class="bottom">
                                        <p class="p1">{{item.remark}}</p>
                                        <p class="p2">{{item.createTime}}</p>
                                    </div>
                                </li>
                            </ul>
                            <ul class="financialDetailsListUl" v-else>
                                <li
                                    class="line_bottom"
                                    v-for="(item, index) in renderData.odlListData"
                                    :key="index"
                                >
                                    <div class="top">
                                        <div class="title">
                                            <span class="s" v-if="item.product">{{item.product}}</span>
                                            <h3>{{item.storageName}}</h3>
                                        </div>
                                        <h3 class="money">
                                            <i v-if="item.changeType === 'Z'">+</i>
                                            <i v-else-if="item.changeType === 'T'">-</i>
                                            {{item.changeAmount}}
                                        </h3>
                                    </div>
                                    <div class="bottom">
                                        <p class="p1">{{item.remark}}</p>
                                        <p class="p2">{{item.createTime}}</p>
                                    </div>
                                </li>
                            </ul>
                        </cube-scroll>
                    </div>
                    <div class="no-data" v-else>
                        <img src="@/assets/images/no-data.png" />
                    </div>
                </div>
            </div>
            <!-- 列表 -->
            <!-- :bottom-method="loadBottom" -->
        </div>
    </div>
</template>
<script>
import { getServer } from "@/api/index";
import { Indicator } from "mint-ui";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
// import autoScrollInstance from '@/assets/js/autoScroll'
import AutoScroll from "@/assets/js/autoScroll";
import { parseTime, timeFormate } from "@/utils/index";
let autoScrollInstance = null;
export default {
    // components: {
    //     'modal-tag': modalTag,  //组件
    // },
    data() {
        return {
            screenState: "",
            islogin: this.$store.state.user.islogin,
            isThaw: false,
            options: {
                pullDownRefresh: {
                    threshold: 90,
                    stop: 40,
                    txt: "刷新成功"
                }, // 配置下拉刷新
                pullUpLoad: {
                    threshold: 0,
                    txt: {
                        more: "上拉加载更多",
                        noMore: "没有更多数据"
                    }
                } // 配置上拉加载，若要关闭可直接 pullUpLoad：false
            },
            isServer: false,
            navActiveIndex: 0, //当前高亮的tab选项卡index
            showModal: false, //是否显示modal
            selectTag: null, //传递个子组件（modal）的数据的
            isDownLoading: false, //下拉刷新
            isUpLoading: false, //上拉加载
            upFinished: false, //上拉加载完毕
            offset: 10, //滚动条与底部距离小于 offset 时触发load事件
            isData: false,
            isDisabled: true,
            pickerValue: "按时间筛选",
            year: "",
            month: "",
            dateValue: "",
            isClicked: false,
            renderData: {
                listData: [],
                odlListData: [],
                screen: []
            },
            queryData: {
                list: {
                    requestType: "spendinginto",
                    requestKeywords: "earnings",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    page: 1,
                    limit: 15,
                    types: "Z",
                    stypes: "JY", // (JY 交易  JH 激活)
                    dates: timeFormate(new Date()).substring(0, 7)
                },
                screen: {
                    requestType: "spendinginto",
                    requestKeywords: "earingsclass",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                }
            },
            swiperOption: {
                // init: false,
                loop: true, //设置 active slide 居中后，会有左右留白现象，添加此会让未尾的导航补齐前后空白
                slideToClickedSlide: true, //设置为true则点击slide会过渡到这个slide。
                slidesPerView: 3,
                centeredSlides: true, //设定为true时，active slide会居中，而不是默认状态下的居左。
                freeMode: true,
                initialSlide: 1, //默认第二个
                observer: true, //修改swiper自己或子元素时，自动初始化swiper
                observeParents: true //修改swiper的父元素时，自动初始化swiper
            }
        };
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper;
        }
    },
    methods: {
        scrollTo() {
            this.$refs.scroll.scrollTo(
                0,
                0
                // this.scrollToY,
                // this.scrollToTime,
                // this.scrollToEasing
            );
        },
        onPullingDown() {
            // console.log("下拉刷新");
            this.renderData.odlListData = [];
            this.queryData.list.page = 1;
            this.profitList();
        },
        // 触发上拉加载
        onPullingUp() {
            // alert(1)
            // console.log("上拉加载");
            // 模拟更新数据
            // setTimeout(() => {
            //     if (Math.random() > 0.5) {
            //         // 如果有新数据
            //         let newPage = [1, 2, 3, 4, 5, 6];
            //         console.log("有新数据");
            //         this.msg = this.msg.concat(newPage);
            //     } else {
            //         // 如果没有新数据
            //         this.$refs.scroll.forceUpdate();
            //     }
            // }, 1000);
            this.queryData.list.page++;
            this.profitList();
        },
        changeMonth() {
            this.queryData.list.page = 1;
            this.renderData.odlListData = [];
            this.queryData.list.dates = parseTime(
                this.queryData.list.dates
            ).substring(0, 7);
            this.profitList();
        },
        queryTopic(data, index, type) {
            if (data.types === "YJ") {
                this.isThaw = true;
            } else {
                this.isThaw = false;
            }
            if (this.isData) {
                this.scrollTo();
            }
            this.queryData.list.stypes = type;
            this.upFinished = false;
            this.queryData.list.page = 1;
            this.renderData.odlListData = [];
            // this.isDownLoading = true
            if (this.isServer) {
                this.profitList();
            }
            //点击谁，谁就高亮 ，定一个变量，click事件的赋值使其相等，而在:class 中 判断是否相等，即可
            this.navActiveIndex = index;
            //插件的调取方法
            if (autoScrollInstance) {
                //确保的插件加载成功
                autoScrollInstance.scrollTo(this.$refs.nav.childNodes[index]);
            }
        },
        // activationOnLoadList () {
        //     this.queryData.list.page++
        //     this.profitList()
        // },
        profitList() {
            this.isServer = false;
            Indicator.open();
            getServer(this.queryData.list).then(res => {
                // alert(JSON.stringify(res.data.data));
                this.isServer = true;
                Indicator.close();
                if (res.data.responseStatus === 1) {
                    this.isData = true;
                    this.renderData.listData = res.data.data;
                    this.renderData.listData.forEach(item => {
                        this.renderData.odlListData.push(item);
                    });
                } else if (
                    res.data.responseStatus === 300 &&
                    this.queryData.list.page !== 1
                ) {
                    this.$refs.scroll.forceUpdate();
                } else if (
                    res.data.responseStatus === 300 &&
                    this.queryData.list.page === 1
                ) {
                    this.isData = false;
                }
            });
        },
        screen() {
            getServer(this.queryData.screen).then(res => {
                // console.log(res)
                if (res.data.responseStatus === 1) {
                    this.renderData.screen = res.data.data;
                    this.renderData.screen.forEach((item, index) => {
                        if (item.types === this.screenState) {
                            this.navActiveIndex = index;
                            this.queryData.list.stypes = item.types;
                            this.isThaw = false;
                        } else {
                            this.isThaw = true;
                        }
                    });
                    this.profitList();
                    autoScrollInstance = new AutoScroll(this.$refs.nav, {
                        spaceBetween: 0
                    }); //节点 nav
                }
            });
        }
    },
    created() {
        // alert(this.$route.query.state);
        if (this.$route.query.state) {
            this.screenState = this.$route.query.state;
        }
        this.screen();
        this.scrollTo();
    },
    mounted() {
        this.scrollTo();
    }
};
</script>
<style lang="scss">
.financial-details .no-data {
    margin-top: 0;
}
.financial-top {
    margin-top: 0.8rem;
}
.financial-details {
    font-size: 0.3rem;
}
.financial-details .before-trigger {
    font-size: 0.3rem;
}
.switchSacreeningMain {
    position: fixed;
    height: 100%;
    width: 100%;
}
.financial-details .scroll-list-wrap {
    // height: 7.9rem;
    // height: 10rem;
    height: 100%;
    // margin-top: .2rem;
    overflow-y: scroll;
    width: 100%;
    padding-top: 0.2rem;
    box-sizing: border-box;
    .item {
        padding: 10px 10px;
        &:nth-child(2n + 1) {
            background: #ccc;
        }
    }
}
.mint-indicator-wrapper {
    z-index: 99999;
}
.mint-indicator-mask {
    z-index: 9999;
    opacity: 1;
    // background: #000;
}
.financial-details .el-button {
    color: #000;
}
.financialDetailsListUl {
    div {
        overflow: hidden;
        font-size: 0.3rem;
        padding: 0 0.2rem;
        box-sizing: border-box;
    }
    li {
        padding: 0.15rem 0;
        .top {
            width: 100%;
            margin-bottom: 0.14rem;
            .title {
                float: left;
                padding: 0;
                span {
                    float: left;
                    background-color: rgba(64, 158, 255, 0.1);
                    display: inline-block;
                    font-size: 0.2rem;
                    color: #409eff;
                    border-radius: 4px;
                    box-sizing: border-box;
                    border: 1px solid rgba(64, 158, 255, 0.2);
                    white-space: nowrap;
                    margin-right: 0.2rem;
                    padding: 0 0.1rem;
                    text-align: center;
                    line-height: 0.38rem;
                }
                h3 {
                    float: left;
                    font-size: 0.28rem;
                    color: #333;
                    margin-top: 0.05rem;
                }
            }
            .money {
                float: right;
                color: #f33;
            }
        }
        .bottom {
            width: 100%;
            font-size: 0.26rem;
            overflow: hidden;
            .p1 {
                float: left;
            }
            .p2 {
                float: right;
            }
        }
    }
    .info {
        margin-bottom: 0.1rem;
        display: block;
        font-size: 0.26rem;
        color: #000;
    }
}
.financial-details .v-modal {
    z-index: 9999 !important;
}
.financial-details .mint-popup-bottom {
    z-index: 99999 !important;
}

.time-choice {
    width: 100%;
    z-index: 999;
    .block {
        background: #fff;
        padding: 0 0.2rem;
        .el-input {
            display: block;
            width: 100%;
        }
        .el-input__inner {
            border: none;
        }
    }
}
.topic-list-inner {
    width: 100%;
    background: #fff;
}
.nav {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    .box {
        white-space: nowrap;
        font-size: 0.3rem;
        padding: 0 0.5rem;
        height: 1rem;
        line-height: 0.9rem;
        color: #333333;
        .item {
            height: 100%;
            &.active {
                color: #0096fe;
                //   border-bottom: .01rem solid #0096fe;
            }
        }
    }
    .active .el-button {
        color: #0096fe;
    }
}
.nav-right-arrow {
    position: fixed;
    right: 0;
    top: 0;
    width: 1rem;
    height: 0.9rem;
    /*background: #fff;*/
    background-image: linear-gradient(to right, rgba(#fff, 0), #fff 30%, #fff);
    display: flex;
    align-items: center;
    justify-content: center;
    .drop-down {
        width: 0.22rem;
        /*padding-top: 0.35rem;*/
        /*margin-left: 0.22rem;*/
        transform: rotate(0deg);
        transition: all 0.5s;
        &.reverse {
            transform: rotate(-180deg);
        }
    }
}
.financialDetailsList {
    width: 100%;
    // margin-top: 4.4rem;
}
.loadingMore {
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #333;
    img {
        width: 20px;
        height: 20px;
        position: relative;
        top: -2px;
        margin-right: 5px;
        display: inline;
    }
}
.timeScreeningMain {
    position: fixed;
    width: 100%;
    left: 0;
    top: 40px;
    background: #fff;
    z-index: 999;
}

.financial-details .choice .el-radio-group {
    border-bottom: 1px solid #f1f1f1;
}
</style>
