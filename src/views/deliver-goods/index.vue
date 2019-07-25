


<template>
    <div class="deliver-goods">
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)">
            <span>发货</span>
        </div>
        <div class="deliver-goods-choice">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="未发货" name="3">
                    <div
                        class="no-deliver-goods-list scroll-list-wrap deliver-goods-list"
                        v-if="isData"
                    >
                        <cube-scroll
                            ref="scroll"
                            :data="renderData.list"
                            @pulling-down="onPullingDown"
                            @pulling-up="onPullingUp"
                            :options="options"
                            v-if="isData"
                        >
                            <ul>
                                <li v-for="item in renderData.list" :key="item.id">
                                    <div class="title">
                                        <h3>品 牌:{{item.pname}}</h3>
                                        <div class="right">
                                            {{item.pstatus}}
                                            |
                                            {{item.returned}}
                                        </div>
                                    </div>
                                    <div class="info">
                                        <span>收货姓名:{{item.consignee}}</span>
                                        <em>{{item.consigneePhone}}</em>
                                    </div>
                                    <div class="receiving-address">{{item.address}}</div>
                                    <div class="time">下单时间:{{item.orderTime}}</div>
                                    <div class="btn">
                                        <span>订单号:{{item.ordernum}}</span>
                                        <router-link
                                            :to="{name: 'clickDeliverGoods', params: {proid: item.proid, id: item.id}}"
                                        >发货</router-link>
                                    </div>
                                </li>
                            </ul>
                        </cube-scroll>
                    </div>
                    <div class="no-data" v-else>
                        <img src="@/assets/images/no-data.png" alt>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已发货" name="2">
                    <div
                        class="yes-deliver-goods-list scroll-list-wrap deliver-goods-list"
                        v-if="isData"
                    >
                        <cube-scroll
                            ref="scroll1"
                            :data="renderData.list"
                            @pulling-down="onPullingDown"
                            @pulling-up="onPullingUp"
                            :options="options"
                            v-if="isData"
                        >
                            <ul>
                                <li v-for="item in renderData.list" :key="item.id">
                                    <div class="title">
                                        <h3>品 牌:{{item.pname}}</h3>
                                        <div class="right">
                                            {{item.pstatus}}
                                            |
                                            {{item.returned}}
                                        </div>
                                    </div>
                                    <div class="info">
                                        <span>收货姓名:{{item.consignee}}</span>
                                        <em>{{item.consigneePhone}}</em>
                                    </div>
                                    <div class="receiving-address">{{item.address}}</div>
                                    <div class="express-name">
                                        <!-- 快递名称:顺丰快递|运单号:0000000000 -->
                                        {{item.courier}}
                                    </div>
                                    <div class="sun">
                                        <div>终端号:{{item.terminalNumber}}</div>
                                        <div>订单号:{{item.ordernum}}</div>
                                        <div>下单时间:{{item.orderTime}}</div>
                                    </div>
                                </li>
                            </ul>
                        </cube-scroll>
                    </div>
                    <div class="no-data" v-else>
                        <img src="@/assets/images/no-data.png" alt>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>


<script>
import { getServer } from "@/api/index";
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
            activeName: "3",
            queryData: {
                list: {
                    requestType: "agent",
                    requestKeywords: "order",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    isReceipt: "3",
                    page: 1
                    // limit: 10
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
        onPullingDown() {
            // console.log("下拉刷新");
            this.renderData.list = [];
            this.queryData.list.page = 1;
            this.deliverGoodsList();
        },
        // 触发上拉加载
        onPullingUp() {
            this.queryData.list.page++;
            this.deliverGoodsList();
        },
        handleClick(tab, event) {
            if (this.isData) {
                this.scrollTo();
            }
            // console.log(tab, event);
            this.renderData.list = [];
            this.queryData.list.isReceipt = this.activeName;
            this.isData = true;
            this.queryData.list.page = 1;
            this.deliverGoodsList();
        },
        deliverGoodsList() {
            getServer(this.queryData.list).then(res => {
                if (res.data.responseStatus === 1) {
                    this.isData = true;
                    res.data.data.forEach(item => {
                        this.renderData.list.push(item);
                    });
                } else if (
                    res.data.responseStatus === 300 &&
                    this.queryData.list.page !== 1
                ) {
                    if(this.activeName == "3") {
                        this.$refs.scroll.forceUpdate();
                    } else {
                        this.$refs.scroll1.forceUpdate();
                    }
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
        this.deliverGoodsList();
    }
};
</script>

<style lang="scss">
.deliver-goods .scroll-list-wrap {
    height: 11rem;
    overflow: auto;
    .item {
        padding: 10px 10px;
        &:nth-child(2n + 1) {
            background: #ccc;
        }
    }
}
.deliver-goods {
    font-size: 0.3rem;
}
.deliver-goods .el-tabs__content {
    margin-top: 1.6rem;
}
.deliver-goods .before-trigger {
    font-size: 0.3rem;
}
.deliver-goods-choice .el-tabs__header {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0.8rem;
    z-index: 9;
    background: #fff;
}
// .deliver-goods-choice .el-tabs__content {
//     padding-top: 70px;
// }
.deliver-goods .deliver-goods-choice .el-tabs__nav {
    width: 100%;
    text-align: center;
}
.deliver-goods .deliver-goods-choice .el-tabs__nav .el-tabs__item {
    width: 50%;
}
.deliver-goods-list ul {
    padding: 0 0.2rem;
}
.deliver-goods-list ul li {
    font-size: 0.26rem;
    padding: 0.2rem;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    margin-top: 0.2rem;
}
.deliver-goods-list ul li .title {
    overflow: hidden;
    line-height: 0.4rem;
    padding: 0.1rem 0;
    border-bottom: 0.01rem dashed #ccc;
}
.deliver-goods-list ul li .title h3 {
    float: left;
    font-weight: normal;
    font-size: 0.28rem;
}
.deliver-goods-list ul li .title .right {
    float: right;
}
.deliver-goods-list ul li .info {
    overflow: hidden;
    line-height: 0.4rem;
    padding-top: 0.2rem;
}
.deliver-goods-list ul li .info span {
    float: left;
}
.deliver-goods-list ul li .info em {
    float: right;
}
.deliver-goods-list ul li .receiving-address {
    line-height: 0.4rem;
    padding-bottom: 0.2rem;
    border-bottom: 0.01rem dashed #ccc;
}
.no-deliver-goods-list ul li .time {
    line-height: 0.4rem;
    padding: 0.1rem 0;
}
.no-deliver-goods-list ul li .btn {
    overflow: hidden;
    padding-left: 0.2rem;
    line-height: 0.7rem;
    color: #fff;
    background-color: #089cfe;
}
.no-deliver-goods-list ul li .btn span {
    float: left;
}
.no-deliver-goods-list ul li .btn a {
    float: right;
    color: #fff;
    padding: 0 0.2rem;
    background: #4cb5fb;
}
.yes-deliver-goods-list ul li .express-name {
    line-height: 0.4rem;
    padding: 0.15rem 0;
    border-bottom: 0.01rem dashed #ccc;
}
.yes-deliver-goods-list ul li .sun {
    padding-top: 0.2rem;
    line-height: 0.4rem;
}
</style>


