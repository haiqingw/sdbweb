


<template>
    <div class="deliver-goods">
        <div class="return">
            <img
                src="@/assets/images/return.png" alt="" 
                @click='$router.go(-1)'/>
            <span>发货</span>
        </div>
        <div class="deliver-goods-choice">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="未发货" name="noDeliverGoods">
                    <div class="no-deliver-goods-list deliver-goods-list">
                        <ul>
                            <li>
                                <div class="title">
                                    <h3>品 牌:闪POS</h3>
                                    <div class="right">
                                        已支付
                                        |
                                        押金已退
                                    </div> 
                                </div>
                                <div class="info">
                                    <span>收货姓名:晓宇</span>
                                    <em>15888888888</em>
                                </div>
                                <div class="receiving-address">
                                    收货地址:内蒙古自治区呼和浩特市新城区兴安北路鼎盛华世纪广场10005
                                </div>
                                <div class="time">下单时间:2000.00.00 00:00:00</div>
                                <div class="btn">
                                    <span>
                                        订单号:000000000000
                                    </span>
                                    <a>发货</a>
                                </div>
                            </li>
                            <li>
                                <div class="title">
                                    <h3>品 牌:闪POS</h3>
                                    <div class="right">
                                        已支付
                                        |
                                        押金已退
                                    </div> 
                                </div>
                                <div class="info">
                                    <span>收货姓名:晓宇</span>
                                    <em>15888888888</em>
                                </div>
                                <div class="receiving-address">
                                    收货地址:内蒙古自治区呼和浩特市新城区兴安北路鼎盛华世纪广场10005
                                </div>
                                <div class="time">下单时间:2000.00.00 00:00:00</div>
                                <div class="btn">
                                    <span>
                                        订单号:000000000000
                                    </span>
                                    <a>发货</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已发货" name="yesDeliverGoods">
                    <div class="yes-deliver-goods-list deliver-goods-list">
                        <ul>
                            <li>
                                <div class="title">
                                    <h3>品 牌:闪POS</h3>
                                    <div class="right">
                                        已支付
                                        |
                                        押金已退
                                    </div> 
                                </div>
                                <div class="info">
                                    <span>收货姓名:晓宇</span>
                                    <em>15888888888</em>
                                </div>
                                <div class="receiving-address">
                                    收货地址:内蒙古自治区呼和浩特市新城区兴安北路鼎盛华世纪广场10005
                                </div>
                                <div class="express-name">
                                    快递名称:顺丰快递|运单号:0000000000
                                </div>
                                <div class="sun">
                                    <div>终端号:00000000000000000000</div>
                                    <div>订单号:0000000000</div>
                                    <div>下单时间:2000.00.00 00:00:00</div>
                                </div>
                            </li>
                            <li>
                                <div class="title">
                                    <h3>品 牌:闪POS</h3>
                                    <div class="right">
                                        已支付
                                        |
                                        押金已退
                                    </div> 
                                </div>
                                <div class="info">
                                    <span>收货姓名:晓宇</span>
                                    <em>15888888888</em>
                                </div>
                                <div class="receiving-address">
                                    收货地址:内蒙古自治区呼和浩特市新城区兴安北路鼎盛华世纪广场10005
                                </div>
                                <div class="express-name">
                                    快递名称:顺丰快递|运单号:0000000000
                                </div>
                                <div class="sun">
                                    <div>终端号:00000000000000000000</div>
                                    <div>订单号:0000000000</div>
                                    <div>下单时间:2000.00.00 00:00:00</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>


<script>
    export default {
        data () {
            return {
                activeName: 'noDeliverGoods'
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style>
.deliver-goods .deliver-goods-choice .el-tabs__nav {
    width: 100%;
    text-align: center;
    margin-top: -.4rem;
}
.deliver-goods .deliver-goods-choice .el-tabs__nav .el-tabs__item {
    width: 50%;
}
.deliver-goods-list ul {
    padding: 0 .2rem;
}
.deliver-goods-list ul li {
    font-size: 0.26rem;
    padding: .2rem;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    margin-top: .2rem;
}
.deliver-goods-list ul li .title {
    overflow: hidden;
    line-height: .4rem;
    padding: .1rem 0;
    border-bottom: .01rem dashed #ccc;
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
    padding-top: .2rem;
}
.deliver-goods-list ul li .info span {
    float: left;
}
.deliver-goods-list ul li .info em {
    float: right;
}
.deliver-goods-list ul li .receiving-address {
    line-height: .4rem;
    padding-bottom: .2rem;
    border-bottom: .01rem dashed #ccc;
}
.no-deliver-goods-list ul li .time {
    line-height: 0.4rem;
    padding: 0.1rem 0;
}
.no-deliver-goods-list ul li .btn {
    overflow: hidden;
    padding: 0 .1rem;
    line-height: 0.7rem;
    color: #fff;
    background-color: #089cfe;
}
.no-deliver-goods-list ul li .btn span {
    float: left;
}
.no-deliver-goods-list ul li .btn a {
    float: right;
}
.yes-deliver-goods-list ul li .express-name {
    line-height: .4rem;
    padding: .15rem 0;
    border-bottom: .01rem dashed #ccc;
}
.yes-deliver-goods-list ul li .sun {
    padding-top: .2rem;
    line-height: 0.4rem;
}
</style>


