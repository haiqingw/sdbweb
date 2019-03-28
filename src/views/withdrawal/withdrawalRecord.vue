<template>
    <div>
        <!-- header -->
        <mt-header fixed title="提现记录">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <!-- withdrawalRecord -->
        <div class="withdrawalRecordMain" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <mt-loadmore :top-method="loadTop" ref="loadmore">
                <div class="withdrawalRecordItem">
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
                </div>
                <div class="withdrawalRecordItem">
                    <em class="active">已到账</em>
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
                </div>
                  <div class="withdrawalRecordItem">
                    <em class="active">已到账</em>
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
                </div>
                  <div class="withdrawalRecordItem">
                    <em class="active">已到账</em>
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
                </div>
                  <div class="withdrawalRecordItem">
                    <em class="active">已到账</em>
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
                </div>
                  <div class="withdrawalRecordItem">
                    <em class="active">已到账</em>
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
                </div>
            </mt-loadmore>
            <div v-if="loading" class="loadingMore"><img src="../../assets/images/loadingIcon.gif">数据加载中</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loading:false,
            list:[]
        };
    },
    methods:{
        loadMore() {
            this.loading = true;
            setTimeout(() => {
                // let last = this.list[this.list.length - 1];
                // for (let i = 1; i <= 10; i++) {
                //     this.list.push(last + i);
                // }
                this.loading = false;
            }, 1500);
        },
        loadTop() {
            setTimeout(() => {
                this.$refs.loadmore.onTopLoaded();
            },1000);
        }
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
    margin:5px 5px 15px;
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
    padding-top:12px;
    div {
        text-align: center;
        h3 {
            font-size: 40px;
            color: #ef4f4f;
        }
        p {
            font-size: 12px;
            color: #333;
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
    padding-top: 10px;
    p {
        line-height: 24px;
        font-size: 12px;
        color: #333;
        span {
            border-right: 1px solid #f1f1f1;
            padding: 0 10px;
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
</style>
