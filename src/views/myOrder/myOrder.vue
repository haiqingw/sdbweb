<template>
    <div class="myOrder">
        <!-- header -->
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
            <span>我的订单</span>
        </div>
        <!-- nav -->
        <div class="myOrderNavMain">
            <el-radio-group v-model="values.type" size="medium" @change="clickChange">
                <el-radio-button :disabled="isUpLoading" label="All">全部</el-radio-button>
                <el-radio-button :disabled="isUpLoading" label="3">待发货</el-radio-button>
                <el-radio-button :disabled="isUpLoading" label="2">待收货</el-radio-button>
                <el-radio-button :disabled="isUpLoading" label="1">已完成</el-radio-button>
                <el-radio-button :disabled="isUpLoading" label="4">待评论</el-radio-button>
            </el-radio-group>
        </div>

        <!-- 列表 -->
        <div class="myOrderListMain" v-if="isData">
            <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
                <van-list
                    v-model="isUpLoading"
                    :finished="upFinished"
                    finished-text="没有更多了"
                    @load="onLoadList"
                    :offset="offset"
                >
                    <div class="myOrderItem" v-for="item in renderData.oldList" :key="item.id">
                        <router-link :to=" {name: 'myOrderDetail', params: { id: item.id, } } ">
                            <b></b>
                            <b></b>
                            <div class="myOrderTitle">
                                <h3>
                                    {{item.productname}}
                                    <span>{{item.receipt}}</span>
                                </h3>
                                <p>品牌：{{item.productname}}</p>
                            </div>
                            <div class="myOrderAddress line_bottom">
                                <span>费率</span>
                                <p>{{item.rate}}</p>
                            </div>
                            <div class="myOrderAntherInfo line_bottom">
                                <p>
                                    <span>合计：</span>
                                    <em>￥{{item.zje}}（含运费￥{{item.yunfei}}）</em>
                                </p>
                                <p>
                                    <span>订单编号：</span>
                                    <em>{{item.ordernum}}</em>
                                </p>
                            </div>
                        </router-link>
                        <div class="myOrderOperation">
                            <a
                                href="javascript:;"
                                v-if=" item.isReceipt == '4' "
                                @click="comment(item.id)"
                            >去评价</a>
                            <a
                                href="javascript:;"
                                v-if=" item.isReceipt == '2' "
                                @click="confirmReceipt(item.id)"
                            >确认收货</a>
                            <a
                                href="javascript:;"
                                v-if=" item.isReceipt == null "
                                @click="deleteOrder(item.id)"
                            >删除订单</a>
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
import { MessageBox, Toast } from "mint-ui";
export default {
    data() {
        return {
            loading: false,
            isDownLoading: false, //下拉刷新
            isUpLoading: false, //上拉加载
            upFinished: false, //上拉加载完毕
            offset: 10, //滚动条与底部距离小于 offset 时触发load事件
            isData: true,
            values: {
                type: "All"
            },
            queryData: {
                list: {
                    requestType: "Order",
                    requestKeywords: "olist",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    page: 0,
                    // limit: 10,
                    isReceipt: "All"
                },
                confirmReceipt: {
                    requestType: "Order",
                    requestKeywords: "confirmstatus",
                    id: ""
                },
                deleteOrder: {
                    requestType: "Order",
                    requestKeywords: "deleteorder",
                    id: ""
                },
                relogin: {
                    requestType: "buslogin",
                    requestKeywords: "relogin",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    openid: this.$store.state.user.opid
                },
                logout: {
                    requestType: "personal",
                    requestKeywords: "launchland",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                }
            },
            renderData: {
                list: [],
                oldList: []
            }
        };
    },
    methods: {
        relogin() {
            // alert(this.queryData.relogin.openid)
            getServer(this.queryData.relogin).then(res => {
                if (res.data.responseStatus === 1) {
                    if (res.data.status === 1) {
                    } else if (res.data.status === 2) {
                        Toast("您的账号已被他人登陆");
                        setTimeout(() => {
                            this.$store
                                .dispatch("LogOut", this.queryData.logout)
                                .then(() => {
                                    // location.reload();
                                    setTimeout(() => {
                                        this.$router.push({
                                            // path: "/loginoid",
                                            path: "/loginoid",
                                            query: {
                                                plat: this.$store.state.user
                                                    .plat
                                            }
                                        });
                                    }, 500);
                                });
                        }, 1000);
                    }
                }
            });
        },
        onLoadList() {
            // console.log("进来", this.queryData.list.page)
            this.queryData.list.page++;
            // this.isUpLoading = true
            // console.log(this.queryData.list.page)
            this.myOrderList();
        },
        onDownRefresh() {
            this.queryData.list.page = 1;
            this.renderData.oldList = [];
            this.upFinished = false;
            this.isData = true;
            this.myOrderList();
        },
        clickChange() {
            this.queryData.list.isReceipt = this.values.type;
            this.queryData.list.page = 1;
            this.renderData.oldList = [];
            this.myOrderList();
        },
        loadMore() {
            this.loading = true;
            setTimeout(() => {
                // let last = this.list[this.list.length - 1];
                // for (let i = 1; i <= 10; i++) {
                //     this.list.push(last + i);
                // }
                this.loading = false;
            }, 2500);
        },
        loadTop() {
            setTimeout(() => {
                this.$refs.loadmore.onTopLoaded();
            }, 2000);
        },
        myOrderList() {
            // console.log(this.queryData.list)
            getServer(this.queryData.list).then(res => {
                // console.log(response[res.data.responseStatus])
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
        },
        comment(id) {
            this.$router.push({
                name: "evaluation",
                params: { id: id }
            });
        },
        deleteOrder(id) {
            this.queryData.deleteOrder.id = id;
            MessageBox.confirm("您确定要删除该订单吗?", "删除订单")
                .then(action => {
                    getServer(this.queryData.deleteOrder).then(res => {
                        if (res.data.responseStatus === 1) {
                            Toast("删除订单成功");
                            this.queryData.list.page = 0;
                            this.renderData.oldList = [];
                            this.upFinished = false;
                            this.isData = true;
                            this.onLoadList();
                        } else {
                            Toast("删除订单失败");
                        }
                    });
                })
                .catch(() => {});
        },
        confirmReceipt(id) {
            this.queryData.confirmReceipt.id = id;
            MessageBox.confirm("是否确认订单?", "确认订单")
                .then(action => {
                    getServer(this.queryData.confirmReceipt).then(res => {
                        if (res.data.responseStatus === 1) {
                            Toast("确认收货成功");
                            setTimeout(() => {
                                this.$router.push({
                                    name: "evaluation",
                                    params: { id: id }
                                });
                            }, 500);
                        } else {
                            Toast("确认收货失败");
                        }
                    });
                })
                .catch(() => {});
        }
    },
    created() {
        this.relogin();
    }
};
</script>
<style lang="scss">
.myOrder .myOrderNavMain .el-radio-button--medium .el-radio-button__inner {
    border: none;
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
.myOrderNavMain {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0.8rem;
    z-index: 9999;
}
.myOrder .myOrderNavMain .el-radio-group {
    display: block;
}
.myOrder .myOrderNavMain .el-radio-button--medium .el-radio-button__inner {
    padding: 0.2rem;
    width: 100%;
    box-sizing: border-box;
}
.myOrder .myOrderNavMain .el-radio-button,
.el-radio-button__inner {
    width: 20%;
    display: block;
    float: left;
}
.myOrder .myOrderNavMain .el-radio-button:first-child .el-radio-button__inner {
    border-radius: 0;
    border: none;
}
.myOrder .myOrderNavMain .el-radio-button:last-child .el-radio-button__inner {
    border-radius: 0;
}
.myOrder.myOrderNavMain .el-radio-button__inner {
    border: none;
    border-left: 1px solid #f1f1f1;
}
.myOrder .myOrderNavMain .el-radio-group {
    border-bottom: 1px solid #f1f1f1;
    overflow: hidden;
}
.myOrderListMain {
    padding: 90px 15px 15px;
    background: #f1f1f1;
    // background: #fff;
}
.myOrderItem {
    background: rgb(31, 23, 23);
    padding: 0 15px;
    border-radius: 6px;
    position: relative;
    overflow: hidden;
    margin-bottom: 15px;
    background: #fff;
    a {
        color: #333;
    }
}
.myOrderItem b {
    display: block;
    width: 16px;
    height: 16px;
    background: #fff;
    position: absolute;
    border-radius: 50%;
    border: 1px solid #f1f1f1;
    background: #f1f1f1;
    top: 81px;
}
.myOrderItem b:nth-of-type(1) {
    left: -7px;
}
.myOrderItem b:nth-of-type(2) {
    right: -7px;
}
.myOrderTitle {
    padding: 10px 0 20px;
    border-bottom: 1px dashed #ccc;
    box-sizing: border-box;
}
.myOrderTitle h3 {
    padding-right: 80px;
    line-height: 30px;
    font-size: 16px;
    position: relative;
}
.myOrderTitle h3 span {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 14px;
}
.myOrderTitle p {
    font-size: 16px;
    line-height: 30px;
}
.myOrderAddress {
    line-height: 20px;
    padding: 20px 0 10px;
    font-size: 16px;
}
.myOrderAddress span {
    float: left;
}
.myOrderAddress p {
    padding-left: 67px;
}
.myOrderAntherInfo {
    line-height: 30px;
    padding: 10px 0;
    font-size: 16px;
}
.myOrderOperation {
    overflow: hidden;
    padding: 10px 0;
    text-align: right;
}
.myOrderOperation a {
    display: block;
    width: 100px;
    line-height: 30px;
    border: 1px solid #ccc;
    text-align: center;
    border-radius: 30px;
    font-size: 14px;
    color: #333;
    margin-left: 10px;
    float: right;
}
</style>