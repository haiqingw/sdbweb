<template>
    <div class="mall-detail">
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)">
            <span>在线订货</span>
        </div>
        <!-- banner -->
        <mt-swipe :auto="4000" class="mallDetailBanner">
            <mt-swipe-item>
                <img :src="renderData.detail.imgPath">
            </mt-swipe-item>
        </mt-swipe>
        <!-- other -->
        <mt-cell :title="renderData.detail.commodityRate" label="描述信息"></mt-cell>
        <!-- <van-stepper v-model="value" /> -->
        <!--市场价-->
        <div class="pDPriceMain flex">
            <div>
                <span>￥{{renderData.detail.totalPrice}}</span>
            </div>
        </div>
        <!--优势-->
        <!--费率、品牌-->
        <div class="rateBrandMain">
            <div>费率：{{renderData.detail.commodityRate}}</div>
            <div>单价：{{renderData.detail.itemPrice}}</div>
        </div>
        <div class="interval"></div>
        <!-- 产品介绍 -->
        <div class="advantageEvaluationMain">
            <div v-html="renderData.detail.remark"></div>
        </div>
        <!-- 领取按钮 -->
        <div style="height:40px;"></div>
        <div class="mallDetailFooterMain line_top">
            <div>
                <a href="javascript:;" @click="collectImmediately">立即订货</a>
            </div>
        </div>
    </div>
</template>
<script>
import { getServer } from "@/api/index";
import response from "@/assets/js/response.js";
import { Indicator, Toast } from "mint-ui";
import { Stepper } from 'vant';
export default {
    name: "mallDetail",
    data() {
        return {
            value: 1,
            activeName: "advantage",
            isCommentData: false,
            score: 5,
            phoneCall: "",
            isPhoneCall: false,
            queryData: {
                detail: {
                    requestType: 'orderpub',
                    requestKeywords:'onlinedetails', 
                    id: this.$route.params.id
                    // id: "1"
                }
            },
            renderData: {
                detail: {}
            }
        };
    },
    methods: {
        detail() {
            getServer(this.queryData.detail).then( res => {
                if( res.data.responseStatus === 1 ) {
                    this.renderData.detail = res.data.data
                    console.log(this.renderData.detail)
                }
            })
        },
        collectImmediately() {
             this.$router.push({
                name: "online-ordering-confirm",
                params: {
                    id: this.$route.params.id
                }
            });
        }
    },
    created() {
        this.detail();
    }
};
</script>
<style lang="scss">
.mall-detail .van-stepper {
    display: inline-block;
    margin-left: .1rem;
}
.advantageEvaluationMain {
    font-size: .3rem;
    line-height: .5rem;
    padding: 0 .2rem;
    padding-bottom: 0.5rem;
}
.mall-detail .el-tabs__nav {
    width: 100%;
    text-align: center;
    margin-top: -0.4rem;
}
.mall-detail .el-tabs__nav .el-tabs__item {
    width: 50%;
}
.mall-detail {
    .el-rate {
        float: left;
        padding: 0.2rem 0;
        span {
            float: left;
            line-height: 34px;
            font-size: 34px;
            position: relative;
            top: -13px;
        }
    }
}

.mint-cell-wrapper {
    padding: 8px 10px 12px;
    background: none;
}
.mint-cell-text {
    line-height: 24px;
}
.mallDetailBanner {
    height: 7.5rem;
    // padding-top: 40px;
    margin-top: 0.8rem;
}
.pDPriceMain {
    padding: 5px 10px;
    font-size: 16px;
    justify-content: space-between;
}
.pDPriceMain div:first-of-type {
    color: #f33;
}
.pDPriceMain div:first-of-type text {
    font-size: 14px;
}
.pDadvantageMain {
    padding: 10px;
}
.pDadvantageMain div {
    border: 1px solid #c3b091;
    font-size: 10px;
    margin-right: 10px;
    padding-right: 5px;
    line-height: 12px;
    padding-top: 1px;
}
.pDadvantageMain div span {
    background: #c3b091;
    padding: 1px 5px;
    color: #fff;
}
.rateBrandMain {
    padding: 0 10px;
    overflow: hidden;
    margin-bottom: 10px;
}
.rateBrandMain > div {
    width: 50%;
    float: left;
    padding: 10px;
    box-sizing: border-box;
    font-size: 12px;
    color: #fff;
}
.rateBrandMain > div:first-of-type {
    background: #577eff;
}
.rateBrandMain > div:last-of-type {
    background: #0096fe;
}
.advantageEvaluationNav {
    justify-content: space-around;
    box-shadow: 0 2px 3px #f1f1f1;
    a {
        display: block;
        width: 100%;
        text-align: center;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        position: relative;
        color: #333;
        &.active {
            color: #0096fe;
            font-weight: bold;
            &::before {
                content: "";
                display: block;
                width: 50%;
                height: 2px;
                background: #0096fe;
                position: absolute;
                left: 50%;
                bottom: 0;
                margin-left: -25%;
            }
        }
    }
}
.advantageEvaluationBox {
    > div {
        display: none;
    }
}
.advantageBox {
    line-height: 26px;
    font-size: 14px;
    padding: 10px;
    text-align: justify;
}
.evaluationTop {
    overflow: hidden;
    line-height: 40px;
    padding: 12px 15px 10px;
    position: relative;
    span.text {
        float: left;
        display: block;
        width: 75px;
        font-size: 16px;
        font-weight: bold;
    }
    .scoreBox {
        padding-left: 75px;
        justify-content: space-around;
        height: 40px;
        em {
            display: block;
            width: 25px;
            height: 25px;
            margin-top: 7px;
            float: left;
            margin-right: 7px;
            // background: url("../../assets/images/starActiveIcon.png") no-repeat;
            background-size: 25px 25px;
        }
    }
    > em {
        font-size: 30px;
        position: absolute;
        left: 260px;
        top: 12px;
        color: #ffbe33;
    }
}
.evaluationItemBox {
    padding: 5px 10px 10px;
    border-bottom: 5px solid #f1f1f1;
}
.evaluationItemTop {
    justify-content: space-between;
    line-height: 40px;
    span {
        font-size: 14px;
        font-weight: bold;
    }
    em {
        font-size: 12px;
    }
}
.evalutionItemMiddle {
    overflow: hidden;
    em {
        display: block;
        width: 15px;
        height: 15px;
        // background: url("../../assets/images/starActiveIcon.png") no-repeat;
        background-size: 15px 15px;
        float: left;
        margin-right: 5px;
    }
    span {
        float: left;
        margin-left: 5px;
        font-size: 14px;
        position: relative;
        top: -4px;
        font-size: 18px;
    }
}
.evalutionItemSub {
    font-size: 14px;
    line-height: 20px;
}
.mallDetailFooterMain {
    overflow: hidden;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 99999;
    div {
        a {
            display: block;
            width: 100%;
            height: 40px;
            background: #0096fe;
            color: #fff;
            text-align: center;
            line-height: 40px;
            font-size: 14px;
        }
    }
}
</style>
