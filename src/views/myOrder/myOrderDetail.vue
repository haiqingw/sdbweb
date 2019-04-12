<template>
    <div>
      <!-- header -->
        <!-- <mt-header fixed title="订单详情">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header> -->
        <div class="return">
            <img src="@/assets/images/return.png" alt="" @click="$router.go(-1)" />
            <span>订单详情</span>
        </div>
        <!-- 订单状态 -->
        <div class="myOrderDetailStatusMain">
            <img src="../../assets/images/orderStatusPosIcon.png" alt="订单状态">
            <div>
                <h3>{{renderData.details.rstatus}}</h3>
                <p>{{renderData.details.jhzt}}，{{renderData.details.returned}}</p>
            </div>
        </div>
        <!-- 订单收货地址 -->
        <div class="myOrderdetailAddressMain">
            <p>
                <span>{{renderData.details.consignee}}</span>
                <em>{{renderData.details.consigneePhone}}</em>
            </p>
            <p>{{renderData.details.address}}</p>
        </div>
        <div class="interval"></div>
        <!-- 订单产品信息 -->
        <div class="myOrderProductMain">
            <img v-for="item in renderData.details.imgPath" :key="item" :src="item" alt="产品">
            <div>
                <p>
                    <span>{{renderData.details.productname}}</span>
                    <em>￥{{renderData.details.orderMoney}}</em>
                </p>
                <p>
                    <span>费率</span>
                    <em>{{renderData.details.rate}}</em>
                </p>
                <p>
                    <span>押金</span>
                    <em>￥{{renderData.details.depositMoney}}</em>
                </p>
            </div>
        </div>
        <div class="interval"></div>
        <!-- 订单编号与时间 -->
        <div class="myOrderNumberMain">
            <p>订单编号：{{renderData.details.ordernum}}</p>
            <p>下单时间：{{renderData.details.orderTime}}</p>
        </div>
        <div class="interval"></div>
        <!-- 商品金额 -->
        <div class="myOrderMoneyMain">
            <p>
                <span>商品金额</span>
                <em>￥{{renderData.details.orderMoney}}</em>
            </p>
            <p>
                <span>商品押金</span>
                <em>￥{{renderData.details.depositMoney}}</em>
            </p>
            <p>
                <span>运费</span>
                <em>￥{{renderData.details.freight}}</em>
            </p>
            <p>
                <b>订单总额：￥<i>{{renderData.details.wxpayMoney}}</i></b>
            </p>
        </div>
        <!-- 订单操作 -->
        <div class="myOrderOperationMain">
            <a href="javascript:;" v-if=" renderData.details.isReceipt == '4'  ">去评价</a>
            <a href="javascript:;" v-if=" renderData.details.isReceipt == '2' ">确认收货</a>
            <a href="javascript:;" v-if=" renderData.details.isReceipt == null ">删除订单</a>
        </div>
    </div>
</template>
<script>
import {getServer} from '@/api/index'
export default {
    data() {
        return {
            queryData: {
                details: {
                    requestType: 'Order', 
                    requestKeywords: 'detail', 
                    id: this.$route.params.id
                }
            },
            renderData: {
                details: {}
            }
        };
    },
    methods: {
        details () {
            getServer(this.queryData.details).then( res => {
                if( res.data.responseStatus === 1 ) {
                    this.renderData.details = res.data.data
                    // console.log(this.renderData.details)
                }
            })
        }
    },
    created () {
        this.details()
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
    font-size:14px;
    p{
        line-height:18px;
        overflow: hidden;
        text-align:justify;
        &:first-of-type{
           padding-bottom:5px;
        }
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
.myOrderProductMain{
  padding:10px;
  img{
      width:60px;
      height:60px;
      float: left;
  }
  div{
      padding-left:70px;
      p{
          font-size:14px;
          line-height:20px;
          &:first-of-type{
              font-weight:bold;
          }
      }
  }
}
.myOrderNumberMain{
    p{
        line-height:24px;
        font-size:14px;
    }
}
.myOrderMoneyMain{
    p{
        justify-content:space-between;
        line-height:30px;
        font-size:14px;
        em{
            font-weight:bold;
            color:#f33;
        }
        b{
            font-size:16px;
            padding-top:5px;
            i{
                color:#f33;
                font-size:20px;
            }
        }
    }
}
.myOrderOperationMain{
    a{
        display: block;
        width:100%;
        height:40px;
        line-height:38px;
        font-size:14px;
        border-radius:40px;
        overflow: hidden;
    }
}
</style>
