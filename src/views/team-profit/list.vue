<template>
    <div>
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
            <span>团队收益</span>
        </div>
        <!-- withdrawalRecord -->
        <div class="withdrawalRecordMain" v-if="isData">
            <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
                <van-list
                    v-model="isUpLoading"
                    :finished="upFinished"
                    finished-text="没有更多了"
                    @load="onLoadList"
                    :offset="offset"
                >
                    <div
                        class="withdrawalRecordItem"
                        v-for="item in renderData.oldList"
                        :key="item.id"
                    >
                        <div class="withdrawalRecordHeader">
                            <div>
                                <h3>下级:</h3>
                                <p>{{item.agentName}}</p>
                            </div>
                            <div>
                                <h3>终端号:</h3>
                                <p>{{item.terminalNo}}</p>
                            </div>
                            <div>
                                <h3>返现类型:</h3>
                                <p>{{item.caseNick}}</p>
                            </div>
                            <div>
                                <h3>产品名称:</h3>
                                <p>{{item.productname}}</p>
                            </div>
                            <div>
                                <h3>返现金额:</h3>
                                <p>{{item.cashMoney}}</p>
                            </div>
                            <div>
                                <h3>返现商户:</h3>
                                <p>{{item.usename}}</p>
                            </div>
                            <div>
                                <h3>返现时间:</h3>
                                <p>{{item.cashTime}}</p>
                            </div>
                        </div>
                    </div>
                </van-list>
            </van-pull-refresh>
        </div>
        <div class="no-data" v-else>
            <img src="@/assets/images/no-data.png" alt />
        </div>
    </div>
</template>
<script>
import { getServer } from "@/api/index";
import response from "@/assets/js/response.js";
export default {
    data() {
        return {
            isDownLoading: false, //下拉刷新
            isUpLoading: false, //上拉加载
            upFinished: false, //上拉加载完毕
            offset: 10, //滚动条与底部距离小于 offset 时触发load事件
            isData: true,
            queryData: {
                list: {
                    requestType: "dynamicmenu",
                    requestKeywords: "teamlists",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    // platformID: "199",
                    // userID: "d9ff90f4000eacd3a6c9cb27f78994cf",
                    // userPhone: "MsTjgf3wNpDogr0wOeTjIc2lNaDmAlO0O0Om",
                    page: 0,
                    limit: 10,
                    dates: "",
                    productID: "",
                    types: ""
                }
            },
            renderData: {
                list: [],
                oldList: []
            }
        };
    },
    methods: {
        onLoadList() {
            // console.log("进来", this.queryData.list.page)
            this.queryData.list.page++;
            this.isUpLoading = true;
            // console.log(this.queryData.list.page)
            this.withdrawalList();
        },
        onDownRefresh() {
            this.queryData.list.page = 1;
            this.renderData.oldList = [];
            this.isDownLoading = true;
            this.withdrawalList();
        },
        withdrawalList() {
            this.queryData.list.dates = this.$route.query.dates;
            this.queryData.list.productID = this.$route.query.productID;
            this.queryData.list.types = this.$route.query.types;
            getServer(this.queryData.list).then(res => {
                // console.log(res.data.responseStatus)
                // console.log(res.data.data)
                // console.log(res);
                if (res.data.responseStatus === 1) {
                    this.isData = true;
                    this.renderData.list = res.data.data;
                    this.renderData.list.forEach(item => {
                        this.renderData.oldList.push(item);
                    });
                    this.isDownLoading = false;
                    this.isUpLoading = false;
                } else if (
                    res.data.responseStatus === 300 &&
                    this.queryData.list.page !== 1
                ) {
                    this.upFinished = true;
                    this.isUpLoading = false;
                } else if (
                    res.data.responseStatus === 300 &&
                    this.queryData.list.page === 1
                ) {
                    this.upFinished = false;
                    this.isUpLoading = false;
                    this.isData = false;
                }
            });
        }
    },
    created() {
        this.withdrawalList();
    }
};
</script>
<style lang="scss">
.withdrawalRecordMain {
    padding: 55px 15px 15px;
}
.withdrawalRecordItem {
    box-shadow: 0 0 5px #ccc;
    padding: 10px;
    overflow: hidden;
    position: relative;
    margin: 5px 5px 15px;
    em {
        display: block;
        width: 100px;
        height: 25px;
        line-height: 25px;
        background: rgba(245, 108, 108, 0.1);
        color: #f56c6c;
        font-size: 12px;
        text-align: center;
        position: absolute;
        right: -26px;
        top: 12px;
        font-weight: bold;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        &.active {
            background: rgba(103, 194, 58, 0.1);
            color: #67c23a;
        }
    }
}
.withdrawalRecordHeader {
    justify-content: space-around;
    padding-bottom: 15px;
    padding-top: 12px;
    div {
        // text-align: center;
        overflow: hidden;
        line-height: 0.5rem;
        h3 {
            font-size: 0.24rem;
            color: #ef4f4f;
            // color: #333;
            float: left;
        }
        p {
            margin-left: 0.2rem;
            font-size: 0.24rem;
            color: #333;
            // padding-top: 10px;
            float: left;
        }
        // &:nth-of-type(2) {
        //     width: 100px;
        //     padding-top: 5px;
        //     span {
        //         font-size: 14px;
        //         color: #ef4f4f;
        //         display: block;
        //     }
        //     img {
        //         width: 80px;
        //         height: 21px;
        //         display: block;
        //     }
        // }
    }
}
.withdrawalRecordBody {
    padding-top: 7px;
    p {
        line-height: 24px;
        font-size: 12px;
        color: #333;
        // border-right: 1px solid #f1f1f1;
        // padding: 0 10px;
        b {
            color: #ef4f4f;
        }
        &:first-of-type {
            padding-left: 0;
        }
        &:last-of-type {
            border: none;
        }
    }
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
.mint-loadmore-top {
    font-size: 14px;
}
.withdrawRecordTop {
    justify-content: space-around;
    padding-bottom: 13px;
    margin-bottom: 10px;
    p {
        width: 100%;
        text-align: center;
        b {
            font-weight: bold;
            display: block;
            font-size: 14px;
            i {
                font-size: 12px;
                padding-left: 1px;
            }
        }
        span {
            display: block;
            font-size: 12px;
            line-height: 12px;
        }
    }
}
</style>
