<template>
    <div class="myMerchants">
        <!-- header -->
        <div class="return">
            <img src="@/assets/images/return.png" alt="" @click="$router.go(-1)" />
            <span>组织架构</span>
        </div>
        <!-- myMerchants -->
        <div class="myMerchantsHeaderMain">
            <!-- 当月新增 开始 -->
            <div class="merchantsMonthTotalMain">
                <h3>我的当月团队成员统计
                    <a href="javascript:;" @click="openTotalPupon">查看全部统计<img src="@/assets/images/arrRightWriteIcon.png" alt="rightArr"></a>
                </h3>
                <div class="merchantsMonthTotalBox flex">
                    <div>
                        <h3>我的当月新增(人)</h3>
                        <p>100</p>
                    </div>
                    <div>
                        <h3>我的当月直增(人)</h3>
                        <p>100</p>
                    </div>
                </div>
            </div>
            <div class="myMerchantsHeaderSubMain line_bottom">
                <span>当前所属：</span>
                <div class="flex">
                    <em>任勇强</em><img src="@/assets/images/notice-list-more.png" alt="">
                    <em>任勇强</em><img src="@/assets/images/notice-list-more.png" alt="">
                    <em>任勇强</em>
                </div>
            </div>
        </div>
        <div class="myMerchantsBodyMain">
            <div class="myMerchantsBodySubMain">
                <div class="myMerchantsItem" @click="openSub">
                    <h3 class="line_bottom">
                        史晓宇(157****2396)
                        <a href="javascript:;">查看下级代理<img src="@/assets/images/arrRightIcon.png" alt="rightArr"></a>
                    </h3>
                    <div class="flex">
                        <div>
                            <h3>下级代理
                                <em>(人)</em>
                            </h3>
                            <p>5</p>
                        </div>
                        <div>
                            <h3>已拨机器
                                <em>(台)</em>
                            </h3>
                            <p>5</p>
                        </div>
                        <div>
                            <h3>激活机器
                                <em>(台)</em>
                            </h3>
                            <p>5</p>
                        </div>
                        <div>
                            <h3>未激活机器
                                <em>(台)</em>
                            </h3>
                            <p>5</p>
                        </div>
                    </div>
                </div>
                <div class="myMerchantsItem" @click="openSub">
                    <h3 class="line_bottom">
                        史晓宇(157****2396)
                        <a href="javascript:;">查看下级代理<img src="@/assets/images/arrRightIcon.png" alt="rightArr"></a>
                    </h3>
                    <div class="flex">
                        <div>
                            <h3>下级代理
                                <em>(人)</em>
                            </h3>
                            <p>5</p>
                        </div>
                        <div>
                            <h3>已拨机器
                                <em>(台)</em>
                            </h3>
                            <p>5</p>
                        </div>
                        <div>
                            <h3>激活机器
                                <em>(台)</em>
                            </h3>
                            <p>5</p>
                        </div>
                        <div>
                            <h3>未激活机器
                                <em>(台)</em>
                            </h3>
                            <p>5</p>
                        </div>
                    </div>
                </div>
                <div class="myMerchantsItem" @click="openSub">
                    <h3 class="line_bottom">
                        史晓宇(157****2396)
                        <a href="javascript:;">查看下级代理<img src="@/assets/images/arrRightIcon.png" alt="rightArr"></a>
                    </h3>
                    <div class="flex">
                        <div>
                            <h3>下级代理
                                <em>(人)</em>
                            </h3>
                            <p>5</p>
                        </div>
                        <div>
                            <h3>已拨机器
                                <em>(台)</em>
                            </h3>
                            <p>5</p>
                        </div>
                        <div>
                            <h3>激活机器
                                <em>(台)</em>
                            </h3>
                            <p>5</p>
                        </div>
                        <div>
                            <h3>未激活机器
                                <em>(台)</em>
                            </h3>
                            <p>5</p>
                        </div>
                    </div>
                </div>
                <div class="myMerchantsItem" @click="openSub">
                    <h3 class="line_bottom">
                        史晓宇(157****2396)
                        <a href="javascript:;">查看下级代理<img src="@/assets/images/arrRightIcon.png" alt="rightArr"></a>
                    </h3>
                    <div class="flex">
                        <div>
                            <h3>下级代理
                                <em>(人)</em>
                            </h3>
                            <p>5</p>
                        </div>
                        <div>
                            <h3>已拨机器
                                <em>(台)</em>
                            </h3>
                            <p>5</p>
                        </div>
                        <div>
                            <h3>激活机器
                                <em>(台)</em>
                            </h3>
                            <p>5</p>
                        </div>
                        <div>
                            <h3>未激活机器
                                <em>(台)</em>
                            </h3>
                            <p>5</p>
                        </div>
                    </div>
                </div>
                <div class="myMerchantsItem" @click="openSub">
                    <h3 class="line_bottom">
                        史晓宇(157****2396)
                        <a href="javascript:;">查看下级代理<img src="@/assets/images/arrRightIcon.png" alt="rightArr"></a>
                    </h3>
                    <div class="flex">
                        <div>
                            <h3>下级代理
                                <em>(人)</em>
                            </h3>
                            <p>5</p>
                        </div>
                        <div>
                            <h3>已拨机器
                                <em>(台)</em>
                            </h3>
                            <p>5</p>
                        </div>
                        <div>
                            <h3>激活机器
                                <em>(台)</em>
                            </h3>
                            <p>5</p>
                        </div>
                        <div>
                            <h3>未激活机器
                                <em>(台)</em>
                            </h3>
                            <p>5</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 全部统计弹窗 开始 -->
        <div class="myMerchantsTotalPuponMain" v-show="popupVisible">
            <div class="myMerchantsTotalPuponHeaderMain line_bottom">
                <em>我的商户数据统计</em>
                <a href="javascript:;" @click="openTotalPupon">关闭</a>
            </div>
            <div class="myMerchantsTotalPuponBodyMain">
                <div class="myMerchantsTotalPuponItem flex line_bottom">
                    <span>
                        <img src="@/assets/images/agentTotalNumIcon.png" alt="服务商人数"> 服务商人数
                    </span>
                    <em>
                        <b>100</b>人
                    </em>
                </div>
                 <div class="myMerchantsTotalPuponItem flex line_bottom">
                    <span>
                        <img src="@/assets/images/agentTotalActiveIcon.png" alt="激活台数"> 激活台数
                    </span>
                    <em>
                        <b>100</b>台 
                    </em>
                </div>
                 <div class="myMerchantsTotalPuponItem flex">
                    <span>
                        <img src="@/assets/images/agentTotalTradingIcon.png" alt="交易量"> 交易量
                    </span>
                    <em>
                        <b>10000</b>元
                    </em>
                </div>
                <div class="interval"></div>
                <!-- 一级代理 -->
                <h3 class="agentTotalTitleH3 line_bottom">一级代理</h3>
                <div class="agentTotalMain flex">
                    <div>
                        <h3>
                            激活台数(台)
                        </h3>
                        <p>100</p>
                    </div>
                    <div>
                        <h3>
                            交易量(元)
                        </h3>
                        <p>100000000</p>
                    </div>
                </div>
                <div class="interval"></div>
                <!-- 二级代理 -->
                <h3 class="agentTotalTitleH3 line_bottom">二级代理</h3>
                <div class="agentTotalMain flex">
                    <div>
                        <h3>
                            激活台数(台)
                        </h3>
                        <p>100</p>
                    </div>
                    <div>
                        <h3>
                            交易量(元)
                        </h3>
                        <p>100000000</p>
                    </div>
                </div>
                <div class="interval"></div>
                <!-- 三级代理 -->
                <h3 class="agentTotalTitleH3 line_bottom">三级代理</h3>
                <div class="agentTotalMain flex">
                    <div>
                        <h3>
                            激活台数(台)
                        </h3>
                        <p>100</p>
                    </div>
                    <div>
                        <h3>
                            交易量(元)
                        </h3>
                        <p>100000000</p>
                    </div>
                </div>
                <div class="interval"></div>
            </div>
        </div>
        <!-- 全部统计弹窗 结束 -->
    </div>
</template>
<script>
import { getServer } from "@/api/index";
export default {
    data() {
        return {
            popupVisible: false,
            queryData: {
                list: {
                    requestType: "agentdata",
                    requestKeywords: "organization",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    dates: "2019-04"
                }
            }
        };
    },
    methods: {
        openTotalPupon(){
            this.popupVisible = !this.popupVisible;
        },
        openSub() {
            console.log("跳转下级");
        },
        list() {
            getServer(this.queryData.list).then(res => {
                console.log(res);
            });
        }
    },
    created() {
        this.list();
    }
};
</script>
<style lang="scss">
.myMerchants .total {
    font-size: 0.3rem;
    padding: 0 10px;
    line-height: 0.4rem;
}
.myMerchantsHeaderMain {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0.8rem;
    z-index: 999;
}
.myMerchantsHeaderTopMain {
    justify-content: space-between;
    padding: 10px;
    font-size: 14px;
    color: #fff;
    background: #26a2ff;
    span {
        line-height: 24px;
    }
    em {
        border-radius: 5px;
        border: 1px solid #fff;
        box-sizing: border-box;
        padding: 5px 8px;
        font-size: 12px;
    }
}
.myMerchantsHeaderSubMain {
    height: 41px;
    line-height: 41px;
    // background: #f1f1f1;
    // background: #fff;
    padding: 0 10px;
    font-size: 14px;
    span {
        float: left;
    }
    div {
        padding-top: 4px;
        img {
            width: 15px;
            height: 15px;
            display: inline-block;
            margin: 0 2px;
            position: relative;
            top: 8px;
        }
        em {
            border: 1px solid #f1f1f1;
            background: #fff;
            line-height: 30px;
            font-size: 14px;
            padding: 0 10px;
            display: block;
            max-width: 56px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
        }
    }
}
.myMerchantsBodyMain {
    padding: 215px 10px 10px;
}
.myMerchantsBodyTopMain {
    font-size: 16px;
    padding-bottom: 10px;
    span {
        padding-left: 8px;
        border-left: 2px solid #ccc;
        font-weight: bold;
    }
    em {
        font-size: 12px;
        padding-left: 5px;
        color: #333;
    }
}
.myMerchantsBodySubMain {
    overflow: hidden;
    padding: 10px 0;
    .myMerchantsItem {
        font-size: 14px;
        line-height: 30px;
        border: 1px solid #f1f1f1;
        color: #333;
        display: block;
        padding: 0 0.1rem;
        // float: left;
        margin: 0 10px 10px 0;
        > h3 {
            line-height: 40px;
            font-weight: bold;
            a {
                float: right;
                color: #333;
                font-size: 12px;
                img {
                    width: 10px;
                    height: 10px;
                    position: relative;
                    top: -1px;
                    display: inline-block;
                    margin-left: 2px;
                }
            }
        }
        > div {
            justify-content: space-around;
            padding: 10px 0 14px;
            div {
                width: 100%;
                text-align: center;
                h3 {
                    line-height: 26px;
                    font-size: 12px;
                    em {
                        font-size: 10px;
                    }
                }
                p {
                    line-height: 25px;
                    font-size: 25px;
                    padding-top: 3px;
                }
            }
        }
        span {
            display: block;
        }
    }
}
em.moreEm {
    padding-right: 20px;
    position: relative;
}
em.moreEm::after {
    content: "";
    display: block;
    width: 6px;
    height: 6px;
    border-right: 2px solid #ccc;
    border-bottom: 2px solid #ccc;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    position: absolute;
    right: 7px;
    top: 50%;
    margin-top: -4px;
}
.subPuponMain {
    width: 70%;
    position: fixed;
    right: 0;
    top: 40px;
    bottom: 0;
    background: #fff;
    z-index: 999;
    div:first-of-type {
        padding: 10px;
        overflow: hidden;
        em {
            font-size: 12px;
            border: 1px solid #f1f1f1;
            padding: 5px 10px;
            border-radius: 5px;
            display: block;
            float: right;
        }
    }
    div:last-of-type {
        padding: 10px;
        position: absolute;
        width: 100%;
        box-sizing: border-box;
        top: 40px;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-x: hidden;
        em {
            font-size: 14px;
            line-height: 30px;
            border: 1px solid #f1f1f1;
            color: #333;
            display: block;
            padding: 0 10px;
            // float: left;
            margin: 0 10px 10px 0;
        }
    }
    em {
        span {
            display: block;
        }
    }
}
.overlazySub {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
}
.merchantsInfoTotalMain {
    justify-content: space-around;
    div {
        width: 100px;
        font-size: 14px;
        text-align: center;
        padding: 10px 0;
    }
}
.merchantsMonthTotalBox {
    position: relative;
    &::before {
        content: "";
        display: block;
        width: 1px;
        height: 40px;
        background: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -1px;
        margin-top: -20px;
    }
}
.merchantsMonthTotalMain {
    justify-content: space-around;
    background: #089cfe;
    padding: 15px;
    color: #fff;
    > h3 {
        font-size: 14px;
        padding-bottom: 16px;
        a {
            float: right;
            color: #fff;
            img {
                width: 14px;
                height: 14px;
                position: relative;
                top: -2px;
                display: inline-block;
            }
        }
    }
    div {
        text-align: center;
        font-size: 14px;
        width: 100%;
        h3 {
            padding-top: 10px;
        }
        p {
            line-height: 40px;
            font-size: 22px;
        }
    }
}
.myMerchantsTotalPuponMain {
    background: #fff;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 9999999999;
}
.myMerchantsTotalPuponHeaderMain {
    overflow: hidden;
    line-height: 40px;
    padding: 0 15px;
    font-size: 14px;
    background:#089cfe;
    color:#fff;
    em {
        float: left;
    }
    a {
        float: right;
        border-radius: 5px;
        display: block;
        width: 50px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        box-sizing: border-box;
        font-size: 12px;
        margin-top: 6.5px;
        background:#fff;
    }
}
.myMerchantsTotalPuponBodyMain{
    padding:0 15px;
}
.myMerchantsTotalPuponItem{
    justify-content: space-between;
    line-height:50px;
    span{
        img{
            width:16px;
            height:16px;
            position: relative;
            top:-2px;
            display:inline-block;
            margin-right:2px;
        }
        font-size:14px;
    }
    em{
        b{
            color:#f33;
            padding-right:2px;
            font-weight:bold;
        }
        font-size:16px;
    }
}
.agentTotalTitleH3{
    font-size:16px;
    font-weight:bold;
    line-height:40px;
}
.agentTotalMain{
    justify-content: space-around;
    padding:8px 0 12px;
    div{
        width:100%;
        text-align:left;
        font-size:14px;
        h3{
            line-height:30px;
        }
        p{
            padding-top:5px;
            font-size:18px;
            font-weight:bold;
        }
    }
}
</style>
