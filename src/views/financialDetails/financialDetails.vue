<template>
    <div>
        <!-- header -->
        <mt-header fixed title="资金明细">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <!-- 列表 -->
        <div class="financialDetailsMain">
            <!-- 筛选 -->
            <div class="timeScreeningMain">
                <div class="timeScreeningItem line_bottom">
                    <em>开始时间</em>
                    <div>
                        <span>请选择开始时间</span>
                        <input type="data">
                    </div>
                </div>
                <div class="timeScreeningItem line_bottom">
                    <em>结束时间</em>
                    <div>
                        <span>请选择结束时间</span>
                        <input type="data">
                    </div>
                </div>
            </div>
            <!-- 切换 筛选 -->
            <div class="switchScreeningMain flex line_bottom">
                <a href="javascript:;" class="active">分润</a>
                <a href="javascript:;">激活</a>
            </div>
            <!-- 列表 -->
            <div class="financialDetailsList">
                <mt-loadmore :top-method="loadTop" ref="loadmore">
                    <!-- <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                        <li v-for="item in list">{{ item }}</li>
                    </ul> -->
                    <ul class="financialDetailsListUl" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="20">
                        <li class="line_bottom flex">
                            <div>
                                <h3>交易返现</h3>
                                <p>史晓宇交易 1000.00</p>
                            </div>
                            <div>
                                <h3>+1.00</h3>
                                <p>2019-10-10 10:00:00</p>
                            </div>
                        </li>
                        <li class="line_bottom flex">
                            <div>
                                <h3>交易返现</h3>
                                <p>史晓宇交易 1000.00</p>
                            </div>
                            <div>
                                <h3>+1.00</h3>
                                <p>2019-10-10 10:00:00</p>
                            </div>
                        </li>
                        <li class="line_bottom flex">
                            <div>
                                <h3>交易返现</h3>
                                <p>史晓宇交易 1000.00</p>
                            </div>
                            <div>
                                <h3>+1.00</h3>
                                <p>2019-10-10 10:00:00</p>
                            </div>
                        </li>
                        <li class="line_bottom flex">
                            <div>
                                <h3>交易返现</h3>
                                <p>史晓宇交易 1000.00</p>
                            </div>
                            <div>
                                <h3>+1.00</h3>
                                <p>2019-10-10 10:00:00</p>
                            </div>
                        </li>
                         <li class="line_bottom flex">
                            <div>
                                <h3>交易返现</h3>
                                <p>史晓宇交易 1000.00</p>
                            </div>
                            <div>
                                <h3>+1.00</h3>
                                <p>2019-10-10 10:00:00</p>
                            </div>
                        </li>
                         <li class="line_bottom flex">
                            <div>
                                <h3>交易返现</h3>
                                <p>史晓宇交易 1000.00</p>
                            </div>
                            <div>
                                <h3>+1.00</h3>
                                <p>2019-10-10 10:00:00</p>
                            </div>
                        </li>
                         <li class="line_bottom flex">
                            <div>
                                <h3>交易返现</h3>
                                <p>史晓宇交易 1000.00</p>
                            </div>
                            <div>
                                <h3>+1.00</h3>
                                <p>2019-10-10 10:00:00</p>
                            </div>
                        </li>
                         <li class="line_bottom flex">
                            <div>
                                <h3>交易返现</h3>
                                <p>史晓宇交易 1000.00</p>
                            </div>
                            <div>
                                <h3>+1.00</h3>
                                <p>2019-10-10 10:00:00</p>
                            </div>
                        </li>
                         <li class="line_bottom flex">
                            <div>
                                <h3>交易返现</h3>
                                <p>史晓宇交易 1000.00</p>
                            </div>
                            <div>
                                <h3>+1.00</h3>
                                <p>2019-10-10 10:00:00</p>
                            </div>
                        </li>
                    </ul>
                </mt-loadmore>
                <div v-if="loading" class="loadingMore"><img src="../../assets/images/loadingIcon.gif">数据加载中</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loading: false,
            list: []
        };
    },
    methods: {
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
        }
    }
};
</script>
<style lang="scss">
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
    padding-top: 160px;
}
.timeScreeningMain {
    position: fixed;
    width: 100%;
    left: 0;
    top: 40px;
    background: #fff;
    z-index: 99999;
}
.switchScreeningMain {
    position: fixed;
    width: 100%;
    left: 0;
    top: 120px;
    z-index: 99999;
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
.financialDetailsListUl{
    padding:0 15px;
    li{
        padding:10px 0;
        overflow: hidden;
        justify-content: space-between;
        div{
            h3{
              font-size:16px;
            }
            p{
                font-size:14px;
            }
            &:last-of-type{
                text-align:right;
                h3{
                    color:#f33;
                }
            }
        }
    }
}
</style>