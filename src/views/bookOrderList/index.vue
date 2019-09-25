<template>
    <div class="bookOrderListContainer">
        <!-- header -->
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
            <span>订货订单</span>
        </div>
        <div class="myOrderListMain">
            <div class="scroll-list-wrap" v-if="isData">
                <cube-scroll
                    ref="scroll"
                    :data="renderData.list"
                    @pulling-down="onPullingDown"
                    @pulling-up="onPullingUp"
                    :options="options"
                    @scroll="onScroll"
                >
                    <ul class="myOrderListUl">
                        <li v-for="item in renderData.list" :key="item.id">
                            <em
                                :class="[item.between == 1?'subordinate':'personal']"
                                class="distinguish"
                            ></em>
                            <div class="myOrderListHeader line_bottom">
                                <!-- <span>{{item.productname}}</span> -->
                                <span style="margin-left: 15px;">{{item.nickname}}</span>
                                <!-- <em>{{item.isPaynick}}</em> -->
                            </div>
                            <div class="myOrderListBody line_bottom">
                                <div>
                                    <p>{{item.productname}}</p>
                                    <p>
                                        <span>订货数量</span>
                                        <em>x {{item.nums}}台</em>
                                    </p>
                                    <p>
                                        <span>支付金额</span>
                                        <em>
                                            <b>￥</b>
                                            <i>{{item.moneys}}</i>
                                        </em>
                                    </p>
                                </div>
                            </div>
                            <div class="myOrderListAddressMain line_bottom">
                                <h3>收货信息</h3>
                                <div class="myOrderListAddressBox">
                                    <div class="myOrderListAddressTop">
                                        <span>{{item.name}}</span>
                                        <!-- <span>13296905340</span> -->
                                    </div>
                                    <div
                                        class="myOrderListAddressSub"
                                    >{{item.addrarea}}-{{item.address}}</div>
                                </div>
                            </div>
                            <div class="myOrderListOtherInfoMain line_bottom">
                                <h3>其他信息</h3>
                                <div>
                                    <p>
                                        订单编号：
                                        <span>{{item.ordernum}}</span>
                                    </p>
                                    <p>
                                        下单时间：
                                        <span>{{item.orderTime}}</span>
                                    </p>
                                    <p v-if="item.payTime">
                                        支付时间：
                                        <span>{{item.payTime}}</span>
                                    </p>
                                    <p style="display: inline-block; margin-right: .2rem;">
                                        订单状态：
                                        <span
                                            v-if="item.status == 1"
                                            style="color: #00CC33"
                                        >{{item.isnick}}</span>
                                        <span v-else style="color: #CC0000">{{item.isnick}}</span>
                                    </p>
                                    <p style="display: inline-block; margin-right: .2rem;">
                                        支付状态：
                                        <span
                                            v-if="item.isPay == 2"
                                            style="color: #00CC33"
                                        >{{item.isPaynick}}</span>
                                        <span v-else style="color: #CC0000">{{item.isPaynick}}</span>
                                    </p>
                                    <p style="display: inline-block">
                                        发货状态：
                                        <span
                                            v-if="item.isDelivery == 2"
                                            style="color: #00CC33"
                                        >{{item.isDeliverynick}}</span>
                                        <span v-else style="color: #CC0000">{{item.isDeliverynick}}</span>
                                    </p>
                                </div>
                            </div>
                            <div class="myOrderListFooter" v-if="item.between == 1">
                                <a
                                    v-if="item.isPay == 2"
                                    href="javascript:;"
                                    @click="refund(item.id)"
                                >退款</a>
                                <a
                                    v-if="item.isDelivery == 1 && item.status == 1"
                                    href="javascript:;"
                                    @click="deliverGoods(item.id)"
                                >发货</a>
                                <a
                                    v-if="item.isDelivery == 1 && item.status == 1"
                                    href="javascript:;"
                                    @click="cancelOrder(item.id)"
                                >取消</a>
                            </div>
                        </li>
                    </ul>
                </cube-scroll>
            </div>
            <div class="no-data" v-else>
                <img src="@/assets/images/no-data.png" alt />
            </div>
        </div>
    </div>
</template>
<script>
import { getServer } from "@/api/index";
import { Indicator, Toast, MessageBox } from "mint-ui";
import response from "@/assets/js/response.js";
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
                    requestType: "orderpub",
                    requestKeywords: "onlinelists",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    page: 1,
                    limit: 10
                },
                cancelOrder: {
                    requestType: "orderpub",
                    requestKeywords: "cancelorder",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    id: ""
                },
                refund: {
                    requestType: "orderpub",
                    requestKeywords: "orderrefund",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    id: ""
                },
                deliverGoods: {
                    requestType: "orderpub",
                    requestKeywords: "todelivery",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    id: ""
                }
            },
            renderData: {
                list: []
            }
        };
    },
    methods: {
        onPullingDown() {
            // console.log("下拉刷新");
            this.renderData.list = [];
            this.queryData.list.page = 1;
            this.list();
        },
        // 触发上拉加载
        onPullingUp() {
            this.queryData.list.page++;
            this.list();
        },
        list() {
            getServer(this.queryData.list).then(res => {
                if (res.data.responseStatus === 1) {
                    // console.log(res.data.data.length)
                    // console.log(res.data)
                    this.isData = true;
                    // this.renderData.list = res.data.data;
                    res.data.data.forEach(item => {
                        this.renderData.list.push(item);
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
        cancelOrder(id) {
            this.queryData.cancelOrder.id = id;
            MessageBox.confirm("您确定要取消订单吗?", "取消订单")
                .then(action => {
                    getServer(this.queryData.cancelOrder).then(res => {
                        if (res.data.responseStatus === 1) {
                            Toast("取消成功");
                        } else {
                            Toast(response[res.data.responseStatus]);
                        }
                    });
                })
                .catch(() => {});
        },
        refund(id) {
            this.queryData.refund.id = id;
            MessageBox.confirm("您确定要退款吗?", "退款")
                .then(action => {
                    getServer(this.queryData.refund).then(res => {
                        if (res.data.responseStatus === 1) {
                            Toast("退款成功");
                        } else {
                            Toast(response[res.data.responseStatus]);
                        }
                    });
                })
                .catch(() => {});
        },
        deliverGoods(id) {
            this.queryData.deliverGoods.id = id;
            MessageBox.confirm("您确定要发货吗?", "发货")
                .then(action => {
                    getServer(this.queryData.deliverGoods).then(res => {
                        if (res.data.responseStatus === 1) {
                            Toast("发货成功");
                        } else {
                            Toast(response[res.data.responseStatus]);
                        }
                    });
                })
                .catch(() => {});
        },
        onScroll(pos) {
            if (pos.y < -150) {
                // this.showWhiteTitle = true;
                // alert(1)
            } else {
                // this.showWhiteTitle = false;
                // alert(2)
            }
        },
    },
    created() {
        this.list();
    }
};
</script>
<style lang="scss">
.bookOrderListContainer .personal {
    border-left: 10px solid #6666ff;
}
.bookOrderListContainer .subordinate {
    border-left: 10px solid #339999;
}
.myOrderListUl li .distinguish {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 0;
    height: 0;
    border-right: 10px solid rgba(0, 0, 0, 0);
    border-bottom: 10px solid rgba(0, 0, 0, 0);
    border-top: 10px solid rgba(0, 0, 0, 0);
}
.bookOrderListContainer {
    font-size: 0.3rem;
}
.bookOrderListContainer .scroll-list-wrap {
    height: 100%;
    overflow: auto;
    .item {
        padding: 10px 10px;
        &:nth-child(2n + 1) {
            background: #ccc;
        }
    }
}
.myOrderListMain {
    // padding-top: 0.8rem;
    // padding-bottom: 2rem;
    // margin-top: .8rem;
    position: fixed;
    top: .8rem;
    height: 100%;
    width: 100%;
}
.myOrderListUl li {
    background: #fff;
    margin-bottom: 10px;
    padding: 0 10px;
    border-bottom: 5px solid #f1f1f1;
    position: relative;
}
.myOrderListHeader {
    overflow: hidden;
    height: 40px;
    line-height: 41px;
}
.myOrderListHeader > span {
    float: left;
    font-size: 16px;
}
.myOrderListHeader > em {
    float: right;
    color: #f33;
    font-size: 14px;
}
.myOrderListBody {
    overflow: hidden;
    padding: 12px 0 10px;
}
.myOrderListBody > div p {
    font-size: 14px;
    overflow: hidden;
}
.myOrderListBody > div p span {
    float: left;
    font-size: 14px;
}
.myOrderListBody > div p em {
    float: right;
    color: #f55f22;
}
.myOrderListBody > div p b {
    font-size: 12px;
}
.myOrderListBody > div p i {
    font-size: 18px;
    font-weight: bold;
}
.myOrderListBody > div p:nth-of-type(2) {
    font-size: 14px;
    line-height: 28px;
    padding-top: 3px;
}
.myOrderListBody > div p:nth-of-type(2) b {
    color: #f55f22;
}
.myOrderListBody > div p:nth-of-type(2) i {
    color: #f55f22;
    font-size: 18px;
}
.myOrderListBody > div p:nth-of-type(3) {
    padding-top: 3px;
}
.myOrderListFooter {
    overflow: hidden;
    text-align: center;
    padding: 10px 0;
}
.myOrderListFooter > a {
    padding: 0 20px;
    height: 35px;
    line-height: 35px;
    border-radius: 5px;
    font-size: 14px;
    color: #333;
    display: block;
    float: right;
    box-sizing: border-box;
    margin-left: 10px;
    color: #fff;
    &:nth-of-type(1) {
        background: #f33;
    }
    &:nth-of-type(2) {
        background: #089cfe;
    }
    &:nth-of-type(3) {
        background: #ccc;
    }
}
.myOrderListAddressMain {
    padding-bottom: 11px;
    h3 {
        line-height: 40px;
        font-size: 14px;
        font-weight: bold;
    }
    .myOrderListAddressTop {
        display: flex;
        justify-content: space-between;
        height: 14px;
        align-items: center;
        span {
            font-size: 14px;
        }
    }
    .myOrderListAddressSub {
        padding-top: 5px;
        line-height: 18px;
        font-size: 14px;
        text-align: justify;
    }
}
.myOrderListOtherInfoMain {
    padding-bottom: 11px;
    h3 {
        line-height: 40px;
        font-size: 14px;
        font-weight: bold;
    }
    div {
        p {
            font-size: 14px;
            line-height: 20px;
        }
    }
}
</style>