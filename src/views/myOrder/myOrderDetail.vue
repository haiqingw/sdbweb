<template>
    <div>
      <!-- header -->
        <mt-header fixed title="订单详情">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <!-- 订单状态 -->
        <div class="myOrderDetailStatusMain">
            <img src="../../assets/images/orderStatusPosIcon.png" alt="订单状态">
            <div>
                <h3>等待发货</h3>
                <p>未激活，押金已退</p>
            </div>
        </div>
        <!-- 订单收货地址 -->
        <div class="myOrderdetailAddressMain">
            <p>
                <span>任勇强</span>
                <em>13296905340</em>
            </p>
            <p>内蒙古自治区呼和浩特市新城区兴安北路鼎盛华世纪广场10005</p>
        </div>
        <div class="interval"></div>
        <!-- 订单产品信息 -->
        <div class="myOrderProductMain">
            <img src="../../assets/images/hotPorPic.jpg" alt="产品">
            <div>
                <p>
                    <span>闪POS</span>
                    <em>￥0.00</em>
                </p>
                <p>
                    <span>费率</span>
                    <em>0.5%</em>
                </p>
                <p>
                    <span>押金</span>
                    <em>￥120.00</em>
                </p>
            </div>
        </div>
        <!-- 订单编号与时间 -->
        <div class="myOrderNumberMain">
            <p>订单编号：1234545646</p>
            <p>下单时间：2019-03-20 11:02:51</p>
        </div>
        <div class="interval"></div>
        <!-- 商品金额 -->
        <div class="myOrderMoneyMain">
            <p>
                <span>商品金额</span>
                <em>￥0.00</em>
            </p>
            <p>
                <span>商品押金</span>
                <em>￥120.00</em>
            </p>
            <p>
                <span>运费</span>
                <em>￥0.00</em>
            </p>
            <p>
                <b>订单总额：￥128.00</b>
            </p>
        </div>
        <!-- 订单操作 -->
        <div class="myOrderOperationMain">
            <a href="javascript:;">
                删除订单
            </a>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    }
};
</script>
<style lang="scss">
.myOrderDetailStatusMain {
    overflow: hidden;
    background: #0096fe;
    padding: 15px;
    margin-top:40px;
    img {
        width: 40px;
        height: 40px;
        float: left;
    }
    div {
        padding-left: 55px;
        color: #fff;
        h3 {
            line-height: 18px;
            font-size: 14px;
            padding-top: 3px;
        }
        p {
            font-size: 12px;
        }
    }
}
.myOrderdetailAddressMain{
    padding:15px;
    p{
        line-height:26px;
        overflow: hidden;
        span{
            float:left;
            font-weight:bold;
        }
        em{
            float:right;
            font-weight:bold;
        }
    }
}
.myOrderNumberMain{
    padding:15px;
    p{
        line-height:30px;;
    }
}
.myOrderMoneyMain{
    padding:15px;
    p{
        line-height:30px;
        overflow: hidden;
        span{
            float:left;
        }
        em{
            float:right;
        }
        b{
            display: block;
            text-align:right;
            font-size:16px;
        }
    }
}
.myOrderOperationMain{
    padding:15px;
    a{
        display: block;
        width:100%;
        height:40px;
        line-height:40px;
        text-align:center;
        border:1px solid #0096fe;
        box-sizing:border-box;
        color:#0096fe;
    }
}
</style>
