<template>
    <div>
        <!-- header -->
        <!-- <mt-header fixed title="提现记录">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header> -->
        <div class="return">
            <img src="@/assets/images/return.png" alt="" @click="$router.go(-1)" />
            <span>提现记录</span>
        </div>
        <!-- withdrawalRecord -->
        <div class="withdrawalRecordMain" v-if="isData">
            <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
                <van-list v-model="isUpLoading" :finished="upFinished" finished-text="没有更多了" @load="onLoadList" :offset="offset">
                    <!-- <div class="withdrawalRecordItem">
                        <em>审核中</em>
                        <div class="withdrawalRecordHeader flex line_bottom">
                            <div>
                                <h3>100.00</h3>
                                <p>提现金额</p>
                            </div>
                        </div>
                        <div class="withdrawalRecordBody">
                            <p>
                                <span>手续费：
                                    <b>5.00元</b>
                                </span>
                                <span>税金：
                                    <b>5.00元</b>
                                </span>
                                <span>实到账：
                                    <b>5.00元</b>
                                </span>
                            </p>
                            <p>提现时间：2018.10.26 16:00:00</p>
                        </div>
                    </div> -->
                    <div class="withdrawalRecordItem" v-for="item in renderData.oldList" :key="item.id">
                        <em class="active" v-if="item.reviewStatus == 1 && item.drawStatus !== '作废'">{{item.reStatus}}</em>
                        <em class="active" v-if="item.reviewStatus == 2 && item.drawStatus !== '作废'">{{item.reStatus}}</em>
                        <em class="active" v-if="item.reviewStatus == 3 && item.drawStatus !== '作废'">{{item.reStatus}}</em>
                        <em v-if="item.reviewStatus == 4 && item.drawStatus !== '作废'">{{item.reStatus}}</em>
                        <em v-if="item.drawStatus == '作废'">已作废</em>
                        <div class="withdrawalRecordHeader flex line_bottom">
                            <div>
                                <h3>{{item.arviAmount}}</h3>
                                <p>提现金额</p>
                            </div>
                        </div>
                        <div class="withdrawalRecordBody">
                            <div class="withdrawRecordTop flex line_bottom">
                                <p>
                                    <b>{{item.pou}}<i>元</i></b>
                                    <span>手续费</span>
                                </p>
                                <p>
                                    <b>{{item.tax}}<i>元</i></b>
                                    <span>税金</span>
                                </p>
                                <p>
                                    <b>{{item.drawMoney}}<i>元</i></b>
                                    <span>实到账</span>
                                </p>
                            </div>
                            <!-- <p>审核状态:
                                <b>{{item.reviewStatus}}</b>
                            </p> -->
                            <p>订单状态:
                                <b v-if="item.status == 1" style="color: #67c23a;">{{item.drawStatus}}</b>
                                <b v-if="item.status == 2">{{item.drawStatus}}</b>
                            </p>
                            <p>提现时间:{{item.drawTime}}</p>
                            <p>备注:<span style="color:#f33">{{item.remark}}</span></p>
                        </div>
                    </div>
                </van-list>
            </van-pull-refresh>
        </div>
        <div class="no-data" v-else>
            <img src="@/assets/images/no-data.png" alt="">
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
                    requestType: "spendinginto",
                    requestKeywords: "spending",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    page: 0,
                    // limit: '20',
                    types: "T",
                    stypes: "TX"
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
            getServer(this.queryData.list).then(res => {
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
        text-align: center;
        h3 {
            font-size: 40px;
            color: #ef4f4f;
        }
        p {
            font-size: 12px;
            color: #333;
            padding-top: 10px;
        }
        &:nth-of-type(2) {
            width: 100px;
            padding-top: 5px;
            span {
                font-size: 14px;
                color: #ef4f4f;
                display: block;
            }
            img {
                width: 80px;
                height: 21px;
                display: block;
            }
        }
    }
}
.withdrawalRecordBody {
    padding-top:7px;
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
.withdrawRecordTop{
    justify-content: space-around;
    padding-bottom:13px;
    margin-bottom:10px;
    p{
        width:100%;
        text-align:center;
        b{
            font-weight:bold;
            display:block;
            font-size:14px;
            i{
                font-size:12px;
                padding-left:1px;
            }
        }
        span{
            display: block;
            font-size:12px;
            line-height:12px;
        }
    }
}
</style>
