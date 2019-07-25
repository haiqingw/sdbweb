
<template>
    <div class="serverMoneyRechargeOwnList">
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
            <span>充值记录</span>
        </div>
        <div class="content">
            <div class="scroll-list-wrap" v-if="isData">
                <cube-scroll
                    ref="scroll"
                    :data="renderData.listData"
                    @pulling-down="onPullingDown"
                    @pulling-up="onPullingUp"
                    :options="options"
                >
                    <ul>
                        <li v-for="(item,index) in renderData.listData" :key="index">
                            <div class="top">
                                <span>业务员充值</span>
                                <em>{{item.payStatus}}</em>
                            </div>
                            <div class="center">
                                <div>
                                    <em>
                                        {{item.totalDays}}
                                        <span>天</span>
                                    </em>
                                    <span>购买周期</span>
                                </div>
                                <div>
                                    <em>
                                        {{item.numDays}}
                                        <span>天</span>
                                    </em>
                                    <span>上次剩余天数</span>
                                </div>
                                <div>
                                    <em>
                                        {{item.rechageMoney}}
                                        <span>元</span>
                                    </em>
                                    <span>支付金额</span>
                                </div>
                            </div>
                            <div class="sum">
                                <span>充值时间：{{item.chargeDate}}</span>
                                <span>到期时间：{{item.expDate}}</span>
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
</template>

<script>
import { getServer } from "@/api/index";
import { Indicator } from "mint-ui";
export default {
    data() {
        return {
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
            isData: true,
            queryData: {
                list: {
                    requestType: "servicefee",
                    requestKeywords: "reclist",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    page: 1,
                    limit: 10
                }
            },
            renderData: {
                listData: []
            }
        };
    },
    methods: {
         onPullingDown() {
            // console.log("下拉刷新");
            this.renderData.listData = [];
            this.queryData.list.page = 1;
            this.list();
        },
        // 触发上拉加载
        onPullingUp() {
            this.queryData.list.page++;
            this.list();
        },
        list() {
            Indicator.open();
            getServer(this.queryData.list).then(res => {
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
        }
    },
    created() {
        this.list();
    }
};
</script>

<style lang="scss">
.serverMoneyRechargeOwnList .scroll-list-wrap {
    // height: 7.9rem;
    height: 10rem;
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
.serverMoneyRechargeOwnList .content {
    margin-top: 1rem;
    font-size: 0.3rem;
}
.serverMoneyRechargeOwnList .content ul li {
    padding: 0.2rem;
    margin-bottom: 0.2rem;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.serverMoneyRechargeOwnList .content ul li .top {
    overflow: hidden;
    font-size: 0.26rem;
}
.serverMoneyRechargeOwnList .content ul li .top span {
    float: left;
}
.serverMoneyRechargeOwnList .content ul li .top em {
    float: right;
}
.serverMoneyRechargeOwnList .content ul li .center {
    font-size: 0.26rem;
    border: 1px solid #ccc;
    padding: 0.2rem 0;
    border-left: none;
    border-right: none;
    margin: 0.2rem 0 0.1rem;
    display: flex;
    justify-content: space-around;
}
.serverMoneyRechargeOwnList .content ul li .center div {
    border-right: 1px solid #ccc;
    padding: 0.2rem 0;
    text-align: center;
    width: 33.333%;
}
.serverMoneyRechargeOwnList .content ul li .center div:last-child {
    border: none;
}
.serverMoneyRechargeOwnList .content ul li .center div em {
    color: #cc0000;
    font-size: 0.46rem;
}
.serverMoneyRechargeOwnList .content ul li .center div em span {
    font-size: 0.2rem;
    margin-left: 0.05rem;
}
.serverMoneyRechargeOwnList .content ul li .center div > span {
    display: block;
    font-size: 0.26rem;
    margin-top: 0.1rem;
}
.serverMoneyRechargeOwnList .content ul li .sum {
    font-size: 0.26rem;
    line-height: 0.4rem;
}
.serverMoneyRechargeOwnList .content ul li .sum span {
    display: block;
}
</style>


