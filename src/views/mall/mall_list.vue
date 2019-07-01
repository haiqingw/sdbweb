<template>
    <div class="posMallContainer">
        <!-- header -->
        <!-- <mt-header fixed title="机具商城">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
        </mt-header>-->
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
            <span>机具商城</span>
        </div>
        <!-- banner -->
        <div class="posMallHeader">
            <van-swipe @change="onChange">
                <van-swipe-item
                    v-for="(item, index) in renderData.banner"
                    v-bind:item="item"
                    v-bind:index="index"
                    v-bind:key="item.id"
                >
                    <img :src="item.picUrl" alt="banner" />
                </van-swipe-item>
                <div class="custom-indicator" slot="indicator">{{ current + 1 }}/{{ bannerLength }}</div>
            </van-swipe>
            <!-- <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in renderData.banner" :key="item.id">
          <img :src="item.picUrl" />
        </mt-swipe-item>
            </mt-swipe>-->
        </div>
        <!-- 热门产品 -->
        <div class="posMallHotProduct">
            <h3>热门产品</h3>
            <div class="hotProductView" v-for="item in renderData.popular" :key="item.id">
                <img :src="imgs" alt v-for="imgs in item.imageData" :key="imgs" />
                <div>
                    <p class="ellipsis">[{{ item.name }}]{{ item.commodityName }}</p>
                    <p>费率：{{ item.rate }}</p>
                    <p>{{ item.sold }}人已领取</p>
                    <router-link :to="{ name: 'mallDetail', params: { id: item.id } }">
                        <a href="javascript:;">免费领取</a>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="interval"></div>
        <!-- 批量进货 入口 开始 -->
        <a class="stockChannelImg" :href="creditCard">
            <img src="@/assets/images/stockChannelImg.png" alt="批量进货通道" />
        </a>
        <!-- 批量进货 入口 结束 -->
        <div class="interval"></div>
        <!-- POS列表 -->
        <div class="posMallBody">
            <h3>其他优质POS机</h3>
            <div class="posMallListMain" style="display:block;">
                <div
                    class="posMallListItem"
                    v-for="item in renderData.productIndexList"
                    :key="item.id"
                >
                    <img :src="imgs" alt v-for="imgs in item.imageData" :key="imgs" />
                    <p class="ellipsis">[{{ item.name }}]{{ item.commodityName }}</p>
                    <p>费率：{{ item.rate }}</p>
                    <p>{{ item.sold }}人已领取</p>
                    <router-link :to="{ name: 'mallDetail', params: { id: item.id } }">
                        <a href="javascript:;">免费领取</a>
                    </router-link>
                </div>
            </div>
            <!-- 暂无数据 -->
            <div class="posMallNoDateMain" style="display:none;">
                <img src="@/assets/images/uploadIcon.png" alt="上架" />
                <p>其他产品正在上架中</p>
            </div>
        </div>
        <!-- 详情页 -->
    </div>
</template>
<script>
import { getServer } from "@/api/index";
export default {
    data() {
        return {
            creditCard:
                "https://m.hhrcard.com/credit/miniprogram/copartner/bankList?invitecode=52832966&oas=1",
            current: 0,
            bannerLength: 0,
            queryData: {
                banner: {
                    requestType: "list",
                    requestKeywords: "advertis",
                    types: "cpl",
                    platformID: this.$store.state.user.pid
                },
                popular: {
                    requestType: "list",
                    requestKeywords: "productlists",
                    type: 2,
                    platformID: this.$store.state.user.pid,
                    page: 1,
                    limit: 10
                },
                productIndexList: {
                    requestType: "list",
                    requestKeywords: "productlists",
                    platformID: this.$store.state.user.pid,
                    page: 1,
                    limit: 10
                }
            },
            renderData: {
                banner: [],
                popular: [],
                productIndexList: []
            }
        };
    },
    methods: {
        mallBanner() {
            getServer(this.queryData.banner).then(res => {
                if (res.data.responseStatus === 1) {
                    this.renderData.banner = res.data.data;
                    this.bannerLength = res.data.data.length;
                }
            });
        },
        popularProduct() {
            getServer(this.queryData.popular).then(res => {
                if (res.data.responseStatus === 1) {
                    this.renderData.popular = res.data.data;
                }
            });
        },
        productIndexList() {
            getServer(this.queryData.productIndexList).then(res => {
                if (res.data.responseStatus === 1) {
                    this.renderData.productIndexList = res.data.data;
                }
            });
        },
        onChange(index) {
            this.current = index;
        }
    },
    created() {
        this.mallBanner();
        this.popularProduct();
        this.productIndexList();
    }
};
</script>
<style scoped>
.posMallContainer {
    padding-top: 40px;
}
.posMallHeader {
    padding: 15px 15px 0;
    height: 2.93rem;
}
.posMallHotProduct {
    padding: 15px;
}
.posMallHotProduct > h3 {
    line-height: 30px;
    height: 30px;
    font-size: 18px;
    color: #111d35;
}
.hotProductView {
    overflow: hidden;
    padding-top: 7px;
}
.hotProductView > img {
    width: 90px;
    height: 90px;
    float: left;
    border: 1px solid #f1f1f1;
    box-sizing: border-box;
}
.hotProductView > div {
    padding-left: 105px;
    box-sizing: border-box;
    position: relative;
}
.hotProductView > div p {
    line-height: 30px;
    font-size: 16px;
}
.hotProductView > div p:first-of-type {
    font-weight: bold;
}
.hotProductView > div p:last-of-type {
    font-size: 12px;
    color: #333;
}
.hotProductView > div a {
    background: #f33;
    color: #fff;
    font-size: 12px;
    padding: 0 10px;
    display: block;
    height: 30px;
    line-height: 30px;
    border-radius: 30px;
    width: 80px;
    position: absolute;
    right: 0;
    bottom: 0;
    text-align: center;
}
.posMallBody {
    padding: 15px;
}
.posMallBody > h3 {
    line-height: 30px;
    height: 30px;
    font-size: 18px;
    color: #111d35;
}
.posMallListMain {
    padding: 10px 2px 0;
    overflow: hidden;
}
.posMallListMain > div {
    width: 48%;
    float: left;
    padding: 5px;
    box-sizing: border-box;
    box-shadow: 0 0 3px #ccc;
    margin-bottom: 10px;
}
.posMallListMain > div:nth-of-type(2n) {
    float: right;
}
.posMallListMain > div p {
    line-height: 24px;
    line-height: 26px;
    font-size: 16px;
}
.posMallListMain > div p:first-of-type {
    font-weight: bold;
    padding-top: 5px;
}
.posMallListMain > div p:last-of-type {
    color: #333;
    font-size: 14px;
    line-height: 20px;
}
.posMallListMain > div a {
    background: #f33;
    color: #fff;
    font-size: 12px;
    display: block;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-top: 5px;
}
.posMallNoDateMain {
    text-align: center;
    padding-top: 20%;
}
.posMallNoDateMain > img {
    width: 70px;
    height: 70px;
}
.posMallNoDateMain > p {
    font-size: 16px;
    color: #ccc;
    padding-top: 15px;
}
.custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    color: #fff;
    background: rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
}
</style>

