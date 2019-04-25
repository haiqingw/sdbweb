<template>
    <div class="myMerchants">
        <!-- header -->
        <div class="return">
            <img src="@/assets/images/return.png" alt=""  @click="$router.go(-1)"/>
            <span>组织架构</span>
        </div>
        <!-- myMerchants -->
        <div class="myMerchantsHeaderMain">
            <div class="myMerchantsHeaderTopMain flex">
                <!-- <span>当前位置：
                    <b>任勇强</b>
                </span>
                <em>关闭</em> -->
                当月团队新增1人，当月直增1人
            </div>
            <div class="myMerchantsHeaderSubMain">
                <span>当前所属：</span>
                <div class="flex">
                    <em>任勇强</em><img src="@/assets/images/notice-list-more.png" alt="">
                    <em>任勇强</em><img src="@/assets/images/notice-list-more.png" alt="">
                    <em>任勇强</em>
                </div>
            </div>
        </div>
        <div class="myMerchantsBodyMain">
            <div class="myMerchantsBodyTopMain line_bottom">
                <span>任勇强</span>
                <em>下属用户</em>
            </div>
            <div class="myMerchantsBodySubMain">
                <em class="moreEm" @click="openSub">
                    <span>
                        史晓宇(157****2396)
                    </span>
                    <span>
                        下级代理：5
                    </span>
                    <span>
                        以拨机器：1
                    </span>
                    <span>
                        激活机器：1
                    </span>
                    <span>
                        未激活机器：1
                    </span>
                </em>
            </div>
        </div>
        <!-- 下级Pupon -->
        <div class="overlazySub" v-if="popupVisible" @click="openSub"></div>
        <div class="subPuponMain" v-if="popupVisible">
            <div class="line_bottom">
                <em @click="openSub">关闭</em>
            </div>
            <div>
                <!-- class="moreEm" -->
                <em>
                    <span>
                        任二永(132****5462)
                    </span>
                    <span>
                        下级代理：5
                    </span>
                    <span>
                        以拨机器：1
                    </span>
                    <span>
                        激活机器：1
                    </span>
                    <span>
                        未激活机器：1
                    </span>
                </em>
            </div>
        </div>
        <div class="total">
            <div>
                一级激活1台，交易量：1万
            </div>
            <div>
                二级激活1台，交易量：1万
            </div>
            <div>
                三级激活1台，交易量：1万
            </div>
            <div>
                总计：服务商30人，激活80台，交易量170万
            </div>
        </div>
    </div>
</template>
<script>
import {getServer} from '@/api/index'
export default {
    data() {
        return {
            popupVisible: false,
            queryData: {
                list: {
                    requestType: 'agentdata',
                    requestKeywords:'organization', 
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    dates: "2019-04"
                }
            }
        };
    },
    methods: {
        openSub() {
            this.popupVisible = !this.popupVisible;
        },
        list() {
            getServer(this.queryData.list).then( res => {
                console.log(res)
            })
        },
    },
    created () {
        this.list()
    }
};
</script>
<style lang="scss">
.myMerchants .total {
    font-size: .3rem;
    padding: 0 10px;
    line-height: .4rem;
}
.myMerchantsHeaderMain {
    margin-top: .8rem;
}
.myMerchantsHeaderTopMain {
    justify-content: space-between;
    padding: 10px;
    font-size: 14px;
    color: #fff;
    background: #26a2ff;
    em {
        border-radius: 5px;
        border: 1px solid #fff;
        box-sizing: border-box;
        padding: 0 5px;
        font-size: 12px;
    }
}
.myMerchantsHeaderSubMain {
    height: 40px;
    line-height: 40px;
    // background: #f1f1f1;
    background: #fff;
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
            text-align:center;
        }
    }
}
.myMerchantsBodyMain {
    padding: 10px;
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
    em {
        font-size: 14px;
        line-height: 30px;
        border: 1px solid #f1f1f1;
        color: #333;
        display: block;
        padding: 0 0.1rem;
        // float: left;
        margin: 0 10px 10px 0;
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
            padding: 0 7px;
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
</style>
