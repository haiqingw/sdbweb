<template>
    <div class="myMerchants">
        <!-- header -->
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)">
            <span>组织架构</span>
        </div>
        <!-- myMerchants -->
        <div class="myMerchantsHeaderMain">
            <!-- 当月新增 开始 -->
            <div class="merchantsMonthTotalMain">
                <div class="merchantsMonthTotalBox flex">
                    <div>
                        <p>100</p>
                        <h3>二级代理
                            <em>(人)</em>
                        </h3>
                    </div>
                    <div>
                        <p>100</p>
                        <h3>三级代理
                            <em>(人)</em>
                        </h3>
                    </div>
                </div>
            </div>
        </div>
        <!-- 条件筛选 开始 -->
        <!-- 按产品 parker -->

        <!-- 按用户 input -->

        <!-- 条件筛选 结束 -->
        <div class="myMerchantsBodyMain">
            <div class="myMerchantsBodySubMain">
                <div class="financialDetailsList scroll-list-wrap" v-if="isData">
                    <cube-scroll ref="scroll" :data="renderData.list" @pulling-down="onPullingDown" @pulling-up="onPullingUp" :options="options">
                        <div class="myMerchantsItem" v-for="(item, index) in renderData.list" :key="index">
                            <h3 class="line_bottom">
                                {{item.busname}}
                                <em v-if="item.phone">({{item.phone}})</em>
                                <p>升级时间：{{item.upgradeTime}}</p>
                                <a href="javascript:;">
                                    查看下级代理
                                    <img src="@/assets/images/arrRightIcon.png" alt="rightArr">
                                </a>
                            </h3>
                            <div class="flex">
                                <div @click="openSub(item.childAgent, item.id, item.phone)">
                                    <p>{{item.childAgent ? item.childAgent : 0}}</p>
                                    <h3>下级代理</h3>
                                </div>
                                <div>
                                    <p>{{item.belong ? item.belong : 0}}</p>
                                    <h3>已拨(台)</h3>
                                </div>
                                <div>
                                    <p :ref='"jh"+item.id'><img src="@/assets/images/loadingIcon.gif"></p>
                                    <h3>激活(台)</h3>
                                </div>
                                <div>
                                    <p :ref='"wjh"+item.id'><img src="@/assets/images/loadingIcon.gif"></p>
                                    <h3>未激活(台)</h3>
                                </div>
                            </div>
                        </div>
                    </cube-scroll>
                </div>
                <div class="no-data" v-else>
                    <img src="@/assets/images/no-data.png">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getServer } from "@/api/index";
// import { parseTime, timeFormate } from "@/utils/index";
import { Indicator, Toast } from "mint-ui";
import $ from "jquery";
export default {
    data() {
        return {
            dataarr: [],
            isData: true,
            options: {
                pullDownRefresh: {
                    threshold: 90,
                    stop: 40,
                    // txt: "刷新成功"
                    txt: " "
                }, // 配置下拉刷新
                pullUpLoad: {
                    threshold: 0,
                    txt: {
                        more: "上拉加载更多",
                        noMore: "没有更多数据"
                    }
                } // 配置上拉加载，若要关闭可直接 pullUpLoad：false
            },
            popupVisible: false,
            queryData: {
                list: {
                    requestType: "agentdata",
                    requestKeywords: "organization",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    page: 1,
                    limit: 10
                },
                actived: {
                    requestType: "agentdata",
                    requestKeywords: "isactive",
                    platformID: this.$store.state.user.pid
                },
                inactive: {
                    requestType: "agentdata",
                    requestKeywords: "notactive",
                    platformID: this.$store.state.user.pid
                }
            },
            renderData: {
                list: []
            }
        };
    },
    methods: {
        scrollTo() {
            this.$refs.scroll.scrollTo(0, 0);
        },
        async onPullingDown() {
            this.renderData.list = [];
            this.queryData.list.page = 1;
            await this.list();
            this.scrollTo();
        },
        // 触发上拉加载
        async onPullingUp() {
            this.queryData.list.page++;
            await this.list();
        },
        openTotalPupon() {
            this.popupVisible = !this.popupVisible;
        },
        openSub(agentNum, id, phone) {
            this.renderData.list = [];
            if (agentNum != "0") {
                this.scrollTo();
                this.queryData.list.page = 1;
                this.queryData.list.bid = id;
                this.queryData.list.phone = phone;
                Indicator.open();
                getServer(this.queryData.list).then(res => {
                    Indicator.close();
                    if (res.data.responseStatus === 1) {
                        this.renderData.list = res.data.data;
                    }
                });
            }
        },
        async list() {
            Indicator.open();
            let res = await getServer(this.queryData.list);
            console.log("res", res);
            if (res.data.responseStatus === 1) {
                this.isData = true;
                this.renderData.listData = res.data.data;
                this.renderData.listData.forEach(item => {
                    this.renderData.list.push(item);
                });
                console.log(this.renderData.list);
                this.dataarr = [];
                for (var i = 0; i < res.data.data.length; i++) {
                    this.dataarr.push(res.data.data[i].id);
                }
                var $data = this.dataarr;
                for (let i = 0; i < $data.length; i++) {
                    this.activeList($data[i]);
                    this.inactivelist($data[i]);
                }
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
            Indicator.close();
        },
        //请求激活台数
        async activeList(mid) {
            this.queryData.actived.id = mid;
            let res = await getServer(this.queryData.actived);
            let ids = "jh" + mid;
            $(this.$refs[ids]).html(res.data.con);
        },
        //请求未激活台数
        async inactivelist(mid) {
            this.queryData.inactive.id = mid;
            let res = await getServer(this.queryData.inactive);
            let ids = "wjh" + mid;
            $(this.$refs[ids]).html(res.data.con);
        }
    },
    created() {
        // this.list();
    },
    async mounted() {
        await this.list();
    }
};
</script>
<style lang="scss">
.mint-indicator-wrapper {
    z-index: 99999;
}
.mint-indicator-mask {
    z-index: 9999;
    opacity: 1;
    // background: #000;
}
.myMerchants {
    font-size: 0.3rem;
}
.myMerchants .before-trigger {
    font-size: 0.3rem;
}
.myMerchants .scroll-list-wrap {
    height: 11rem;
    overflow-y: scroll;
    .item {
        padding: 10px 10px;
        &:nth-child(2n + 1) {
            background: #ccc;
        }
    }
}
.myMerchants .total {
    font-size: 0.3rem;
    padding: 0 10px;
    line-height: 0.4rem;
}
.myMerchantsHeaderMain {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0.8rem;
    z-index: 999;
}
.myMerchantsHeaderTopMain {
    justify-content: space-between;
    padding: 10px;
    font-size: 14px;
    color: #fff;
    background: #26a2ff;
    span {
        line-height: 24px;
    }
    em {
        border-radius: 5px;
        border: 1px solid #fff;
        box-sizing: border-box;
        padding: 5px 8px;
        font-size: 12px;
    }
}
.myMerchantsHeaderSubMain {
    height: 41px;
    line-height: 41px;
    // background: #f1f1f1;
    // background: #fff;
    padding: 0 10px;
    font-size: 14px;
    span {
        float: left;
    }
    div {
        padding-top: 4px;
        img {
            width: 15px;
            height: 15px;
            display: inline-block;
            margin: 0 2px;
            position: relative;
            top: 8px;
        }
        em {
            border: 1px solid #f1f1f1;
            background: #fff;
            line-height: 30px;
            font-size: 14px;
            padding: 0 10px;
            display: block;
            max-width: 56px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
        }
    }
}
.myMerchantsBodyMain {
    padding: 2.8rem 10px 10px;
}
.myMerchantsBodyTopMain {
    font-size: 16px;
    padding-bottom: 10px;
    span {
        padding-left: 8px;
        border-left: 2px solid #ccc;
        font-weight: bold;
    }
    em {
        font-size: 12px;
        padding-left: 5px;
        color: #333;
    }
}
.myMerchantsBodySubMain {
    overflow: hidden;
    padding: 10px 0;
    .myMerchantsItem {
        font-size: 14px;
        line-height: 30px;
        border: 1px solid #f1f1f1;
        color: #333;
        display: block;
        padding: 0 0.1rem;
        // float: left;
        margin: 0 10px 10px 0;
        > h3 {
            line-height: 24px;
            font-weight: bold;
            padding-top: 5px;
            position: relative;
            a {
                color: #333;
                font-size: 12px;
                line-height: 12px;
                position: absolute;
                right: 10px;
                top: 50%;
                margin-top: -6px;
                img {
                    width: 10px;
                    height: 10px;
                    position: relative;
                    top: -1px;
                    display: inline-block;
                    margin-left: 2px;
                }
            }
            p {
                font-size: 12px;
                line-height: 12px;
                padding-bottom: 10px;
                color: #999;
            }
        }
        > div {
            justify-content: space-around;
            padding: 10px 0 14px;
            div {
                width: 100%;
                text-align: center;
                h3 {
                    line-height: 26px;
                    font-size: 12px;
                    em {
                        font-size: 10px;
                    }
                }
                p {
                    line-height: 25px;
                    font-size: 25px;
                    padding-top: 3px;
                    img {
                        width: 25px;
                        height: 25px;
                    }
                }
            }
        }
        span {
            display: block;
        }
    }
}
em.moreEm {
    padding-right: 20px;
    position: relative;
}
em.moreEm::after {
    content: "";
    display: block;
    width: 6px;
    height: 6px;
    border-right: 2px solid #ccc;
    border-bottom: 2px solid #ccc;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    position: absolute;
    right: 7px;
    top: 50%;
    margin-top: -4px;
}
.subPuponMain {
    width: 70%;
    position: fixed;
    right: 0;
    top: 40px;
    bottom: 0;
    background: #fff;
    z-index: 999;
    div:first-of-type {
        padding: 10px;
        overflow: hidden;
        em {
            font-size: 12px;
            border: 1px solid #f1f1f1;
            padding: 5px 10px;
            border-radius: 5px;
            display: block;
            float: right;
        }
    }
    div:last-of-type {
        padding: 10px;
        position: absolute;
        width: 100%;
        box-sizing: border-box;
        top: 40px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-x: hidden;
        em {
            font-size: 14px;
            line-height: 30px;
            border: 1px solid #f1f1f1;
            color: #333;
            display: block;
            padding: 0 10px;
            // float: left;
            margin: 0 10px 10px 0;
        }
    }
    em {
        span {
            display: block;
        }
    }
}
.overlazySub {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
}
.merchantsInfoTotalMain {
    justify-content: space-around;
    div {
        width: 100px;
        font-size: 14px;
        text-align: center;
        padding: 10px 0;
    }
}
.merchantsMonthTotalBox {
    position: relative;
    &::before {
        content: "";
        display: block;
        width: 1px;
        height: 40px;
        background: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -1px;
        margin-top: -20px;
    }
}
.merchantsMonthTotalMain {
    justify-content: space-around;
    background: #089cfe;
    padding: 15px 15px 25px;
    color: #fff;
    > h3 {
        font-size: 14px;
        padding-bottom: 16px;
        a {
            float: right;
            color: #fff;
            img {
                width: 14px;
                height: 14px;
                position: relative;
                top: -2px;
                display: inline-block;
            }
        }
    }
    div {
        text-align: center;
        font-size: 14px;
        width: 100%;
        line-height: 36px;
        p {
            line-height: 40px;
            font-size: 30px;
        }
        h3 {
            font-size: 14px;
            line-height: 20px;
            em {
                font-size: 12px;
            }
        }
    }
}
.myMerchantsTotalPuponMain {
    background: #fff;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 9999999999;
}
.myMerchantsTotalPuponHeaderMain {
    overflow: hidden;
    line-height: 40px;
    padding: 0 15px;
    font-size: 14px;
    background: #089cfe;
    color: #fff;
    em {
        float: left;
    }
    a {
        float: right;
        border-radius: 5px;
        display: block;
        width: 50px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        box-sizing: border-box;
        font-size: 12px;
        margin-top: 6.5px;
        background: #fff;
    }
}
.myMerchantsTotalPuponBodyMain {
    padding: 0 15px;
}
.myMerchantsTotalPuponItem {
    justify-content: space-between;
    line-height: 50px;
    span {
        img {
            width: 16px;
            height: 16px;
            position: relative;
            top: -2px;
            display: inline-block;
            margin-right: 2px;
        }
        font-size: 14px;
    }
    em {
        b {
            color: #f33;
            padding-right: 2px;
            font-weight: bold;
        }
        font-size: 16px;
    }
}
.agentTotalTitleH3 {
    font-size: 16px;
    font-weight: bold;
    line-height: 40px;
}
.agentTotalMain {
    justify-content: space-around;
    padding: 8px 0 12px;
    div {
        width: 100%;
        text-align: left;
        font-size: 14px;
        h3 {
            line-height: 30px;
        }
        p {
            padding-top: 5px;
            font-size: 18px;
            font-weight: bold;
        }
    }
}
.merchantsMonthTotalMain .el-date-editor {
    float: left;
}
.merchantsMonthTotalMain .el-date-editor input {
    background: none;
    border: none;
    color: #fff;
}
.mint-indicator {
    z-index: 9999999999;
    position: relative;
}
</style>
