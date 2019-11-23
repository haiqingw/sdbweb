<template>
    <div class="team-profit">
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
            <span>团队收益</span>
        </div>
        <div class="team-profit-choice">
            <div class="team-profit-top">
                <!-- <span @click="timeShow = true">{{valueTime}}</!-->
                <van-field
                    v-model="valueTime"
                    readonly
                    label="时间"
                    placeholder="请选择时间"
                    right-icon="arrow"
                    @click="timeShow = true"
                />
                <!-- <span @click="productShow = true">{{valueProduct}}</span> -->
                <van-field
                    v-model="valueProduct"
                    readonly
                    label="产品分类"
                    placeholder="请选择产品分类"
                    right-icon="arrow"
                    @click="productShow = true"
                />
            </div>
            <van-popup v-model="productShow" position="bottom">
                <van-picker
                    show-toolbar
                    title="产品选择"
                    :columns="columns"
                    @confirm="changeProduct"
                    @cancel="productShow = false"
                    value-key="productName"
                />
            </van-popup>
            <van-popup v-model="timeShow" position="bottom">
                <van-datetime-picker
                    v-model="currentDate"
                    type="year-month"
                    :max-date="maxDate"
                    :formatter="formatter"
                    @confirm="confirmTime"
                    @cancel="timeShow = false"
                />
            </van-popup>
        </div>
        <div class="team-profit-list">
            <div class="wButtonMain">
                <div
                    @click="likeList(item.types)"
                    v-for="item in renderData.incomeDetails"
                    :key="item.id"
                >
                    <img :src="item.imgUrl" alt="直属" />
                    <div>
                        {{item.name}}
                        <span>
                            <b>￥</b>
                            {{item.money}}
                        </span>
                    </div>
                </div>
                <!-- <div>
                    <img src="static/images/indirectIcon.png" alt="间属" />
                    <div>
                        间属收益金额(元)
                        <span>
                            <b>￥</b>1000.00
                        </span>
                    </div>
                </div>-->
            </div>
        </div>
    </div>
</template>
<script>
import { getServer } from "@/api/index";
import { timeFormate } from "@/utils/index";
import { DatetimePicker } from "vant";
import response from "@/assets/js/response.js";
import { Toast } from "mint-ui";
export default {
    // components: {
    //     'modal-tag': modalTag,  //组件
    // },
    data() {
        return {
            columns: [],
            productShow: false,
            valueTime: "",
            valueProduct: "",
            timeShow: false,
            currentDate: new Date(),
            // minDate: new Date(),
            maxDate: new Date(),
            queryData: {
                listProduct: {
                    requestType: "personal",
                    requestKeywords: "agentproduct",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                    // platformID: "199",
                    // userID: "d77e68596c15c53c2a33ad143739902d",
                    // userPhone: "MsTjUf2wNpjoErywNezjgcylOaDmElO0O0Om"
                },
                incomeDetails: {
                    requestType: "dynamicmenu",
                    requestKeywords: "teamincome",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    // platformID: "199",
                    // userID: "d77e68596c15c53c2a33ad143739902d",
                    // userPhone: "MsTjUf2wNpjoErywNezjgcylOaDmElO0O0Om",
                    dates: "",
                    productID: ""
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
                incomeDetails: []
            }
        };
    },
    methods: {
        relogin() {
            // alert(this.queryData.relogin.openid)
            getServer(this.queryData.relogin).then(res => {
                if (res.data.responseStatus === 1) {
                    if (res.data.status === 1) {
                        this.listProduct();
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
        incomeDetails() {
            // console.log(this.queryData.incomeDetails)
            getServer(this.queryData.incomeDetails).then(res => {
                // console.log(res)
                // console.log( response[res.data.responseStatus])
                if (res.data.responseStatus === 1) {
                    this.renderData.incomeDetails = res.data.data;
                }
            });
        },
        likeList(types) {
            // console.log(types)
            this.$router.push({
                name: "teamProfitList",
                query: {
                    types: types,
                    dates: this.queryData.incomeDetails.dates,
                    productID: this.queryData.incomeDetails.productID
                }
            });
        },
        listProduct() {
            getServer(this.queryData.listProduct)
                .then(res => {
                    // console.log(res);
                    // console.log( response[res.data.responseStatus])
                    if (res.data.responseStatus === 1) {
                        this.columns = res.data.data;
                        res.data.data.unshift({
                            id: "All",
                            money: "0.00",
                            productName: "全部"
                        });
                        this.valueProduct = res.data.data[0].productName;
                        this.queryData.incomeDetails.productID =
                            res.data.data[0].id;
                    }
                })
                .then(() => {
                    this.incomeDetails();
                });
        },
        confirmTime() {
            this.timeShow = false;
            this.valueTime = timeFormate(this.currentDate).slice(0, 7);
            this.queryData.incomeDetails.dates = this.valueTime;
            this.incomeDetails();
            // this.valueTime = this.currentDate;
            // console.log(this.formatter())
        },
        formatter(type, value) {
            if (type === "year") {
                return `${value}年`;
            } else if (type === "month") {
                return `${value}月`;
            }
            return value;
        },
        changeProduct(obj, index) {
            this.valueProduct = obj.productName;
            this.productShow = false;
            this.queryData.incomeDetails.productID = obj.id;
            this.incomeDetails();
            // this.queryData.confirmInstallEquipment.productID = obj.id;
            // this.queryData.subordinateMerchants.productID = obj.id;
            // this.money = obj.money
        }
    },
    created() {
        this.valueTime = timeFormate(this.currentDate).slice(0, 7);
        this.queryData.incomeDetails.dates = this.valueTime;
        this.relogin();
    },
    mounted() {}
};
</script>
<style lang="scss">
.team-profit {
    font-size: 0.28rem;
    .van-popup {
        // width: 100%;
    }
    .team-profit-choice {
        margin-top: 0.8rem;
        .team-profit-top {
            overflow: hidden;
            padding: 0 0.5rem;
            line-height: 0.8rem;
            .van-cell {
                padding: 0;
                width: 45%;
                float: left;
                line-height: 0.8rem;
            }
            .van-cell:nth-child(2) {
                float: right;
            }
            // span {
            //     float: left;
            //     width: 50%;
            //     text-indent: 2em;
            // }
        }
    }
    .team-profit-list {
        // margin-top: 0.8rem;
        .wButtonMain {
            width: 100%;
            padding: 0 0.2rem;
            box-sizing: border-box;
        }
        .wButtonMain > div {
            width: 100%;
            background: #e1e3f7;
            padding: 15px;
            box-sizing: border-box;
            overflow: hidden;
            margin-bottom: 20px;
            border-radius: 10px;
            color: #5972ce;
        }
        .wButtonMain > div:nth-of-type(2) {
            background: #f8e6d0;
            color: #e2963d;
        }
        .wButtonMain > div img {
            width: 50px;
            height: 50px;
            float: left;
            margin: 15px;
        }
        .wButtonMain > div div {
            padding-left: 65px;
            padding-top: 8px;
        }
        .wButtonMain > div div span {
            display: block;
            font-size: 36px;
            font-weight: bold;
        }
        .wButtonMain > div div span b {
            font-size: 16px;
        }
    }
}
</style>
