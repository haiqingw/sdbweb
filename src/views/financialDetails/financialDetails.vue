<template>
    <div class="financial-details">
        <!-- header -->
        <!-- <mt-header fixed title="资金明细">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header> -->
        <div class="return">
            <img src="@/assets/images/return.png" alt="" @click="$router.go(-1)" />
            <span>资金明细</span>
        </div>
        <!-- 列表 -->
        <div class="financialDetailsMain">
            <!-- switchSacreeningMain -->
            <div class="time-choice">
                <div class="block">
                    <el-date-picker
                        v-model="queryData.list.dates"
                        type="month"
                        placeholder="请选择日期"
                        @change="changeMonth"
                    >
                    </el-date-picker>
                </div>
            </div>
            <div class="choice">
                <!-- <el-radio-group v-model="queryData.list.stypes" @change="handleClick" :disabled="isDisabled" >
                    <swiper :options="swiperOption" ref="mySwiper" v-if="renderData.screen.length > 0">
                        <swiper-slide  v-for="item in renderData.screen" :key="item.types">
                            <el-radio-button :label="item.types">{{item.name}}</el-radio-button>
                        </swiper-slide>
                    </swiper>
                </el-radio-group> -->
                <div class="topic-list-inner">
                    <div class="nav" ref="nav">
                        <div class="box" v-for="(item,index) in renderData.screen" :key="item.types" @click="queryTopic(item, index, item.types)">
                            <div class="item" :class="{active:navActiveIndex==index}">{{item.name}}</div>
                        </div>
                    </div>
                    <!-- <div class="nav-right-arrow rotateUp" @click="openTagModal(list)">
                    </div> -->
                </div>
            </div>
            <!-- 列表 -->
            <div class="financialDetailsList line_top">
            <!-- line_bottom -->
                <div class="flex switchSacreeningMain">
                    <div class="financialDetailsList" v-if="isData">
                            <van-pull-refresh
                                v-model="isDownLoading"
                                @refresh="onDownRefresh"
                            >
                                <van-list
                                    v-model="isUpLoading"
                                    :finished="upFinished"
                                    finished-text="没有更多了"
                                    @load="onLoadList"
                                    :offset= "offset"
                                >
                                    <ul class="financialDetailsListUl">
                                        <li class="line_bottom flex" v-for="(item, index) in renderData.odlListData" :key="index">
                                            <div>
                                                <div class="top">
                                                    <span class="s" v-if="item.product">{{item.product}}</span>
                                                    <h3 class="title">{{item.storageName}}</h3>
                                                </div>
                                                <p>
                                                    {{item.remark}}
                                                </p>
                                            </div>
                                            <div>
                                                <h3>+{{item.changeAmount}}</h3>
                                                <p>{{item.createTime}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                </van-list>
                            </van-pull-refresh>
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
import {getServer} from '@/api/index'
import { Indicator } from 'mint-ui'
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
// import autoScrollInstance from '@/assets/js/autoScroll'
import AutoScroll from '@/assets/js/autoScroll'
import { parseTime, timeFormate } from '@/utils/index'
let autoScrollInstance = null 
export default {
    // components: {
    //     'modal-tag': modalTag,  //组件
    // },
    data() {
        return {
            isServer: true,
            navActiveIndex: 0, //当前高亮的tab选项卡index
            showModal: false, //是否显示modal
            selectTag: null,   //传递个子组件（modal）的数据的
            isDownLoading: false,//下拉刷新
            isUpLoading: false,//上拉加载
            upFinished: false,//上拉加载完毕
            offset: 10, //滚动条与底部距离小于 offset 时触发load事件
            isData: true,
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
                    requestType: 'spendinginto',
                    requestKeywords:'earnings',
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    page: 0,
                    limit: 15,
                    types: 'Z',
                    stypes: 'JY', // (JY 交易  JH 激活)
                    dates: timeFormate(new Date()).substring(0, 7)
                },
                screen: {
                    requestType: 'spendinginto',
                    requestKeywords:'earingsclass',
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                }
            },
            swiperOption: {
                // init: false,
                loop: true,//设置 active slide 居中后，会有左右留白现象，添加此会让未尾的导航补齐前后空白
                slideToClickedSlide: true,//设置为true则点击slide会过渡到这个slide。
                slidesPerView: 3,
                centeredSlides: true,//设定为true时，active slide会居中，而不是默认状态下的居左。
                freeMode: true,
                initialSlide: 1,//默认第二个
                observer: true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents: true,//修改swiper的父元素时，自动初始化swiper
            }
        };
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper;
        }
    },
    methods: {
        changeMonth () {
            this.queryData.list.page = 0
            this.renderData.odlListData = []
            this.queryData.list.dates = parseTime(this.queryData.list.dates).substring(0, 7)
            this.onLoadList()
        },
        queryTopic(data, index, type) {
            this.queryData.list.stypes = type
            this.upFinished = false
            this.queryData.list.page = 1
            this.renderData.odlListData = []
            // this.isDownLoading = true
            if ( this.isServer ) {
                this.profitList()
            }
            //点击谁，谁就高亮 ，定一个变量，click事件的赋值使其相等，而在:class 中 判断是否相等，即可
            this.navActiveIndex = index;
            //插件的调取方法
            if (autoScrollInstance) { //确保的插件加载成功
                autoScrollInstance.scrollTo(this.$refs.nav.childNodes[index])
            }
        },
        onLoadList () {
            // console.log("进来", this.queryData.list.page)
            this.queryData.list.page++
            // this.isUpLoading = true
            // console.log(this.queryData.list.page)
            this.profitList()
        },
        activationOnLoadList () {
            this.queryData.list.page++
            this.profitList()
        },
        onDownRefresh(){
            console.log("下拉刷新")
            this.queryData.list.page = 1
            this.renderData.odlListData = []
            this.isDownLoading = true
            this.profitList();
        },
        profitList () {
            Indicator.open();
            this.isDisabled = true
            this.isServer = false
            getServer(this.queryData.list).then( res => {
                Indicator.close();
                // console.log(res)
                this.isServer = true
                if( res.data.responseStatus === 1 ) {
                    this.isDisabled = false
                    this.isData = true
                    this.isDownLoading = false
                    this.isUpLoading = false
                    this.renderData.listData = res.data.data
                    this.renderData.listData.forEach( item => {
                        this.renderData.odlListData.push(item)
                    })
                } else if(res.data.responseStatus === 300 && this.queryData.list.page !== 1 ) {
                    this.isDisabled = false
                    this.upFinished = true
                    this.isUpLoading = false
                } else if( res.data.responseStatus === 300 && this.queryData.list.page === 1 ) {
                    this.isDisabled = false
                    this.upFinished = false
                    this.isUpLoading = false
                    this.isData = false
                }
            })
        },
        screen() {
            getServer(this.queryData.screen).then( res => {
                // console.log(res)
                if( res.data.responseStatus === 1 ) {
                    this.renderData.screen = res.data.data
                    autoScrollInstance = new AutoScroll(this.$refs.nav, {spaceBetween: 0})//节点 nav
                }
            })
        },
    },
    created () {
        // this.profitList()
        // this.onLoadList()
        this.screen()
    },
    mounted () {

    },
    // updated() {
    //     if ( this.renderData.screen.length > 1 ) {
    //         this.swiper.init();
    //     }
    // },
};
</script>
<style lang="scss">

.financial-details .v-modal {
    z-index: 9999 !important;
}
.financial-details .mint-popup-bottom {
    z-index: 99999 !important;
}
.time-choice {
    position: fixed;
    top: .8rem;
    left: 0;
    width: 100%;
    z-index: 999;
    .block {
        padding: 0 .2rem;
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
.financial-details {
    .choice {
        position: fixed;
        width: 100%;
        left: 0;
        // top: 2rem;
        top: 1.5rem;
        background: #fff;
        z-index: 999;
        // overflow-x: auto;
        overflow: auto;
        line-height: .8rem;
        height: .8rem;
        .el-radio-group {
            width: 100%;
        }
        label {
            // width: 50%;
            display: block;
            float: left;
            text-align: center;
            border-left: none;
            border: none;
        }
        label:hover {
            border: none;
        }
        .el-radio-button__inner {
            border: none;
            border-bottom: 1px solid transparent;
            width: 100%;
            color: #606266;
        }
        .el-radio-button__inner:hover {
            border-bottom: 1px solid transparent;
        }
        .el-radio-button__orig-radio:checked+.el-radio-button__inner {
            border: none;
            background: none;
            color: #606266;
            border-bottom: 1px solid #0096fe;
            border-radius: 0;
            box-shadow: 0 0 0 0 #fff;
        }
        .el-radio-button__inner:hover {
            box-shadow: 0 0 0 0 #fff;
        }
        .el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
            box-shadow: 0 0 0 0 #fff;
        }
    }
}
.financialDetailsList {
    width: 100%;
    margin-top:0.2rem;
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
.financialDetailsMain {
    // margin-top: 3.3rem;
    margin-top: 2.3rem;
    // position: fixed;
    // left:0;
    // top:160px;
    // right:0;
    // bottom:0;
    // overflow-x: hidden;
    // overflow: auto;
    // height: 120%;
}
.timeScreeningMain {
    position: fixed;
    width: 100%;
    left: 0;
    top: 40px;
    background: #fff;
    z-index: 999;
}
.switchScreeningMain {
    // position: fixed;
    // width: 100%;
    // left: 0;
    // top: 120px;
    // z-index: 99999;
    display: block;
}
.timeScreeningItem {
    overflow: hidden;
    line-height: 40px;
    em {
        display: block;
        width: 100px;
        font-size: 14px;
        color: #333;
        float: left;
        text-indent: 20px;
    }
    div {
        padding-left: 100px;
        position: relative;
        span {
            line-height: 40px;
            font-size: 14px;
            position: absolute;
            width: 100%;
            display: block;
            left: 100px;
            top: 0;
        }
        input {
            height: 40px;
            border: none;
            background: none;
            font-size: 14px;
            position: absolute;
            width: 100%;
            left: 100px;
            top: 0;
            z-index: 9999;
        }
    }
}
.switchScreeningMain {
    justify-content: space-around;
    a {
        display: block;
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #333;
        text-align: center;
        position: relative;
        &.active {
            color: #0096fe;
        }
        &.active::before {
            content: "";
            display: block;
            width: 30%;
            height: 2px;
            background: #0096fe;
            position: absolute;
            left: 50%;
            bottom: 0;
            margin-left: -15%;
        }
    }
}
.mint-loadmore-top {
    font-size: 14px;
}
.financial-details .financialDetailsListUl{
    padding:0 15px;
    li{
        padding:10px 0;
        overflow: hidden;
        justify-content: space-between;
        // height: 300px;
        div{
             h3{
                font-size:16px;
            }
            .top {
                overflow: hidden;
                display: block;
                h3.title{
                    float: left;
                    // font-size:16px;
                    font-size: .28rem;
                    // line-height: .3rem;
                    color: #333;
                    margin-top: .05rem;
                    border: none;
                    display: block;
                }
                span.s {
                    background-color: rgba(64,158,255,.1);
                    display: inline-block;
                    font-size: .2rem;
                    color: #409eff;
                    border-radius: 4px;
                    box-sizing: border-box;
                    border: 1px solid rgba(64,158,255,.2);
                    white-space: nowrap;
                    margin-right: .2rem;
                    width: .8rem;
                    text-align: center;
                    float: left;
                    line-height: .38rem;
                }
            }
            p{
                font-size:14px;
                margin-top: .1rem;
            }
            &:last-of-type {
                text-align:right;
                h3{
                    color:#f33;
                }
            }
        }
    }
}
.financial-details .choice .el-radio-group{
    border-bottom:1px solid #f1f1f1;
}
</style>
