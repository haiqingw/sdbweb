<template>
    <div>
        <!-- header -->
        <mt-header fixed title="我的订单">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <!-- nav -->
        <div class="myOrderNavMain">
            <el-radio-group v-model="values.type" size="medium" @change="test">
                <el-radio-button label="all">全部</el-radio-button>
                <el-radio-button label="dfh">待发货</el-radio-button>
                <el-radio-button label="dsh">待收货</el-radio-button>
                <el-radio-button label="ywc">已完成</el-radio-button>
                <el-radio-button label="dpl">待评论</el-radio-button>
            </el-radio-group>
        </div>

        <!-- 列表 -->
        <div class="myOrderListMain">
            <mt-loadmore :top-method="loadTop" ref="loadmore">
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                    <div class="myOrderItem">
                        <router-link to="/myOrderDetail">
                        <b></b>
                        <b></b>
                        <div class="myOrderTitle">
                            <h3>
                                闪POS
                                <span>等待发货</span>
                            </h3>
                            <p>品牌：闪POS</p>
                        </div>
                        <div class="myOrderAddress line_bottom">
                            <span>费率</span>
                            <p>0.55%+3</p>
                        </div>
                        <div class="myOrderAntherInfo line_bottom">
                            <p>
                                <span>合计：</span>
                                <em>￥0.00（含运费￥0.00）</em>
                            </p>
                            <p>
                                <span>订单编号：</span>
                                <em>21231231123</em>
                            </p>
                        </div>
                        </router-link>
                        <div class="myOrderOperation">
                            <a href="javascript:;">删除订单</a>
                            <a href="javascript:;">取消订单</a>
                        </div>
                    </div>
                    <div class="myOrderItem">
                        <router-link to="/myOrderDetail">
                        <b></b>
                        <b></b>
                        <div class="myOrderTitle">
                            <h3>
                                闪POS
                                <span>等待发货</span>
                            </h3>
                            <p>品牌：闪POS</p>
                        </div>
                        <div class="myOrderAddress line_bottom">
                            <span>费率</span>
                            <p>0.55%+3</p>
                        </div>
                        <div class="myOrderAntherInfo line_bottom">
                            <p>
                                <span>合计：</span>
                                <em>￥0.00（含运费￥0.00）</em>
                            </p>
                            <p>
                                <span>订单编号：</span>
                                <em>21231231123</em>
                            </p>
                        </div>
                        <div class="myOrderOperation">
                            <a href="javascript:;">删除订单</a>
                            <a href="javascript:;">取消订单</a>
                        </div>
                        </router-link>
                    </div>
                    <div class="myOrderItem">
                        <router-link to="/myOrderDetail">
                        <b></b>
                        <b></b>
                        <div class="myOrderTitle">
                            <h3>
                                闪POS
                                <span>等待发货</span>
                            </h3>
                            <p>品牌：闪POS</p>
                        </div>
                        <div class="myOrderAddress line_bottom">
                            <span>费率</span>
                            <p>0.55%+3</p>
                        </div>
                        <div class="myOrderAntherInfo line_bottom">
                            <p>
                                <span>合计：</span>
                                <em>￥0.00（含运费￥0.00）</em>
                            </p>
                            <p>
                                <span>订单编号：</span>
                                <em>21231231123</em>
                            </p>
                        </div>
                        <div class="myOrderOperation">
                            <a href="javascript:;">删除订单</a>
                            <a href="javascript:;">取消订单</a>
                        </div> 
                        </router-link>
                    </div>
                </div>
            </mt-loadmore>
            <div v-if="loading" class="loadingMore"><img src="@/assets/images/loadingIcon.gif">数据加载中</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loading:false,
            values: {
                type: "all"
            }
        };
    },
    methods: {
        test() {
            console.log(this.values);
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
.myOrderNavMain {
    position: fixed;
    width: 100%;
    left: 0;
    top: 40px;
    z-index: 9999;
}
.myOrderNavMain .el-radio-group {
    display: block;
}
.myOrderNavMain .el-radio-button--medium .el-radio-button__inner {
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
}
.myOrderNavMain .el-radio-button,
.el-radio-button__inner {
    width: 20%;
}
.myOrderNavMain .el-radio-button:first-child .el-radio-button__inner {
    border-radius: 0;
    border: none;
}
.myOrderNavMain .el-radio-button:last-child .el-radio-button__inner {
    border-radius: 0;
}
.myOrderNavMain .el-radio-button__inner {
    border: none;
    border-left: 1px solid #f1f1f1;
}
.myOrderNavMain .el-radio-group {
    border-bottom: 1px solid #f1f1f1;
}
.myOrderListMain {
    padding: 90px 15px 15px;
    background: #f1f1f1;
}
.myOrderItem {
    background: #fff;
    padding: 0 15px;
    border-radius: 6px;
    position: relative;
    overflow: hidden;
    margin-bottom: 15px;
    a{
        color:#333;
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