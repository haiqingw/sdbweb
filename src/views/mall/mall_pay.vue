<template>
    <div>
        <!-- header -->
        <!-- <mt-header fixed title="确认支付">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header> -->
        <div class="return">
            <img src="@/assets/images/return.png" alt="" @click="$router.go(-1)" />
            <span>确认支付</span>
        </div>
        <!-- banner -->
        <!-- 收货地址 -->
        <div class="mallPayAddressMain">
            <router-link to="/mall/mall_address" v-if="!isAddressInfo"><a href="javascript:;">请选择收货地址</a></router-link>
            <router-link to="/mall/mall_address" tag="div" v-else>
                <div class="mallPayAddressBox rightArrIcon">
                    <div class="flex">
                        <span>{{renderData.addressInfo.name}}</span>
                        <em>{{renderData.addressInfo.phone}}</em>
                    </div>
                    <div>
                        {{renderData.addressInfo.province}}{{renderData.addressInfo.city}}{{renderData.addressInfo.area}}{{renderData.addressInfo.address}}
                    </div>
                </div>
            </router-link>
        </div>
        <div class="interval"></div>
        <!-- 产品信息 -->
        <div class="mallPayProMain">
            <img :src="item" alt="产品" v-for="item in renderData.listDetail.imgPath" :key="item">
            <div>
                <h3>{{renderData.listDetail.commodityName}}</h3>
                <p>{{renderData.listDetail.title}}</p>
                <div>
                    <em>￥</em>{{renderData.listDetail.nowPrice}}
                </div>
            </div>
        </div>
        <div class="mallPayDepositMain flex line_top">
            <span>支付押金</span>
            <em>
                <i>￥</i>{{renderData.listDetail.deposit}}</em>
        </div>
        <div class="interval"></div>
        <div class="mallPayTipMain">
            <img src="@/assets/images/confirmPressImg.png" alt="押金备注">
            <h3>为什么收押金?</h3>
            <p>防止恶意领取。收货后联系客服注册、激活。激活后押金自动解冻，提现即可。</p>
        </div>
        <div class="interval"></div>
        <div class="mallPayWechatMain">
            <div>
                <img src="@/assets/images/weChatPayIcon.png" alt="微信支付"> 微信支付
            </div>
            <em>
                <i>￥</i>{{renderData.listDetail.deposit}}</em>
        </div>
        <!-- 确认支付 -->
        <div class="submitPayBtn">
            <a href="javascript:;">
                确认支付
            </a>
        </div>
    </div>
</template>
<script>
import { getServer } from '@/api/index'

export default {
    name: "mall_pay",
    data() {
        return {
            isAddressInfo: true,
            queryData: {
                order: {
                    // requestType: 'Order',
                    // requestKeywords: 'order',
                    // userID:data.uid, 
                    // platformID:data.pid, 
                    // userPhone:data.uphone, 
                    // sid:that.data.aid, 
                    // proid:that.data.cid,
                    // openid:wxInfo.openid
                },
                listDetail: {
                    requestType: 'listdetail',     
                    requestKeywords: 'productdetail', 
                    id: this.$route.params.id
                },
                addressInfo: {
                    requestType: 'personal', 
                    requestKeywords: 'getshipping', 
                    platformID: this.$store.state.user.pid, 
                    userID: this.$store.state.user.uid, 
                    userPhone: this.$store.state.user.uphone
                }
            },
            renderData: {
                listDetail: {},
                addressInfo: {}
            }
        };
    },
    methods: {
        mall_payListDetail () {
            getServer(this.queryData.listDetail).then( res => {
                if( res.data.responseStatus === 1 ) {
                    this.renderData.listDetail = res.data.data
                }
                // console.log(this.renderData.listDetail)
            })
        },
        addressInfo () {
            getServer(this.queryData.addressInfo).then( res => {
                if( res.data.responseStatus === 1 ) {
                    this.renderData.addressInfo = res.data.data
                    this.isAddressInfo = true
                } else if( res.data.responseStatus === 300 ) {
                    this.isAddressInfo = false
                }
            })
        }
    },
    created () {
        this.mall_payListDetail()
        this.addressInfo()
    }
};
</script>
<style lang="scss">
.mallPayAddressMain {
    padding:52px 15px 15px;
    a {
        display: block;
        width: 100%;
        line-height: 40px;
        height: 40px;
        text-align: center;
        font-size: 14px;
        color: #fff;
        background: #0096fe;
    }
}
.mallPayAddressBox {
    div:nth-of-type(1) {
        justify-content: space-between;
        line-height: 30px;
        font-size: 16px;
        font-weight: bold;
    }
    div:nth-of-type(2) {
        line-height: 20px;
        font-size: 14px;
        text-align: justify;
    }
}
.mallPayProMain {
    padding: 15px;
    overflow: hidden;
    img {
        width: 60px;
        height: 60px;
        float: left;
    }
    > div {
        padding-left: 75px;
        line-height: 20px;
        h3 {
            font-size: 16px;
            font-weight: bold;
        }
        p {
            font-size: 14px;
        }
        div {
            font-size: 18px;
            text-align: right;
            em {
                font-size: 14px;
            }
        }
    }
}
.mallPayDepositMain {
    justify-content: space-between;
    font-size: 14px;
    line-height: 40px;
    padding: 0 15px;
    em {
        font-size: 18px;
        i {
            font-size: 14px;
        }
    }
}
.mallPayTipMain {
    padding: 15px;
    h3 {
        font-size: 16px;
        padding-bottom: 5px;
    }
    p {
        font-size: 14px;
        line-height: 20px;
    }
}
.mallPayWechatMain {
    overflow: hidden;
    padding: 10px 15px;
    div {
        float: left;
        font-size: 14px;
        img {
            width: 20px;
            height: 20px;
            float: left;
            margin-right: 10px;
        }
    }
    em {
        font-size: 18px;
        float: right;
        i {
            font-size: 14px;
        }
    }
}
.submitPayBtn {
    position: fixed;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #0096fe;
    font-size: 14px;
    left: 0;
    bottom: 0;
    a {
        display: block;
        color: #fff;
    }
}
</style>
