
<template>
    <div class="online-ordering-index">
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
            <span>在线订货</span>
        </div>
        <section class="onlineBookSection">
            <img src="@/assets/images/onlineBookBannerImg.jpg" alt="批量进货" />
            <div class="onlineBookMain">
                <div class="onlineBookBox" v-if="isData">
                    <div class="onlineBookItem" v-for="item in renderData.list" :key="item.id">
                        <div class="onlineBookItemTop">
                            <img :src="item.imgPath" alt="产品列表" />
                            <div>
                                <h3>{{item.name}}</h3>
                                <!-- <p>库存：{{item.totalPrice}}</p> -->
                                <p>费率：{{item.commodityRate}}</p>
                            </div>
                        </div>
                        <div class="onlineBookItemSub line_top">
                            <span>{{item.commoditySets}}台起批</span>
                            <router-link
                                :to="{ name: 'online-ordering-detail', params: { id: item.id } }"
                            >立即订货</router-link>
                        </div>
                    </div>
                </div>
                <div class="no-data" v-else>
                    <img src="@/assets/images/no-data.png" />
                </div>
                <!-- 暂无数据 -->
                <!-- <div class="listNoDataMain" v-else>
                    <img src="@/assets/images/uploadIcon.png" alt="暂无数据" />
                    <p>更多优质POS机正在上架中</p>
                </div>-->
            </div>
        </section>
    </div>
</template>


<script>
import { getServer } from "@/api/index";
import { Toast } from "mint-ui";
export default {
    data() {
        return {
            isData: true,
            queryData: {
                list: {
                    requestType: "orderpub",
                    requestKeywords: "productlists",
                    // platformID: "175",
                    platformID: this.$store.state.user.pid
                },
                relogin: {
                    requestType: "buslogin",
                    requestKeywords: "relogin",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    openid: this.$store.state.user.opid
                },
                logout: {
                    requestType: "personal",
                    requestKeywords: "launchland",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                }
            },
            renderData: {
                list: []
            }
        };
    },
    methods: {
        relogin() {
            // alert(this.queryData.relogin.openid)
            getServer(this.queryData.relogin).then(res => {
                if (res.data.responseStatus === 1) {
                    if (res.data.status === 1) {
                        this.list();
                    } else if (res.data.status === 2) {
                        Toast("您的账号已被他人登陆");
                        setTimeout(() => {
                            this.$store
                                .dispatch("LogOut", this.queryData.logout)
                                .then(() => {
                                    // location.reload();
                                    setTimeout(() => {
                                        this.$router.push({
                                            // path: "/loginoid",
                                            path: "/loginoid",
                                            query: {
                                                plat: this.$store.state.user
                                                    .plat
                                            }
                                        });
                                    }, 500);
                                });
                        }, 1000);
                    }
                }
            });
        },
        list() {
            getServer(this.queryData.list).then(res => {
                if (res.data.responseStatus === 1) {
                    this.isData = true;
                    this.renderData.list = res.data.data;
                } else if (res.data.responseStatus === 300) {
                    // alert(13)
                    this.isData = false;
                }
            });
        }
    },
    created() {
        this.relogin();
    }
};
</script>


<style>
.posMallNoDateMain {
    text-align: center;
    padding-top: 20%;
    background: #000;
    position: fixed;
    height: 100%;
    width: 100%;
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
.onlineBookSection {
    margin-top: 0.8rem;
}
</style>

