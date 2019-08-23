<template>
    <div class="myBillContainer">
        <!-- header -->
        <div class="return">
            <img src="@/assets/images/return.png" alt="" @click="$router.go(-1)" />
            <span>我的账单</span>
        </div>
        <!-- body -->
        <div class="myBillMain" v-if="isData">
             <cube-scroll
                    ref="scroll"
                    :data="items"
                    @pulling-down="onPullingDown"
                    @pulling-up="onPullingUp"
                    :options="options"
                >
            <div class="myBillItemBox">
                <div class="myBillItemTop">
                    <div class="ren-flex-ac ren-flex-sb">
                        <span>
                            <i>￥</i>2500</span>
                        <em class="blue">待扣款</em>
                    </div>
                    <div class="ren-flex-ac ren-flex-sb">
                        <div>
                            订购产品：闪POS
                        </div>
                        <div>
                            订购数量：50台
                        </div>
                    </div>
                    <div class="ren-flex-ac">
                        <div>
                            账单状态：已完成
                        </div>
                    </div>
                    <span class="left"></span>
                    <span class="right"></span>
                </div>
                <div class="myBillItemSub">
                    <div>账单编号：2123131131313123</div>
                    <div>账单时间：2018-10-10 10:10:10</div>
                    <div>扣款时间：2018-10-10 10:10:10</div>
                </div>
                <div class="myBillItemFooter">
                    <img src="@/assets/images/billBgImg.png" alt="footer">
                </div>
            </div>
            <div class="myBillItemBox">
                <div class="myBillItemTop">
                    <div class="ren-flex-ac ren-flex-sb">
                        <span>
                            <i>￥</i>2500</span>
                        <em class="gray">已扣款</em>
                    </div>
                    <div class="ren-flex-ac ren-flex-sb">
                        <div>
                            订购产品：闪POS
                        </div>
                        <div>
                            订购数量：50台
                        </div>
                    </div>
                    <div class="ren-flex-ac">
                        <div>
                            账单状态：已完成
                        </div>
                    </div>
                    <span class="left"></span>
                    <span class="right"></span>
                </div>
                <div class="myBillItemSub">
                    <div>账单编号：2123131131313123</div>
                    <div>账单时间：2018-10-10 10:10:10</div>
                    <div>扣款时间：2018-10-10 10:10:10</div>
                </div>
                <div class="myBillItemFooter">
                    <img src="@/assets/images/billBgImg.png" alt="footer">
                </div>
            </div>
            </cube-scroll>
        </div>
        <div class="no-data" v-else>
                <img src="@/assets/images/no-data.png" alt />
         </div>
    </div>
</template>
<script>
import {getServer} from '@/api/index'
import response from "@/assets/js/response.js"
import {Toast} from "mint-ui";
export default {
    data() {
        return {
                 options: {
                pullDownRefresh: {
                    threshold: 90,
                    stop: 40,
                    txt: "刷新成功"
                }, // 配置下拉刷新
                pullUpLoad: {
                    threshold: 0,
                    txt: {
                        more: "上拉加载更多",
                        noMore: "没有更多数据"
                    }
                } // 配置上拉加载，若要关闭可直接 pullUpLoad：false
            },
            isData: true,
            items: [],
            queryData:{
                listProp:{
                    requestType: 'agentdata',
                    requestKeywords:'mymerchant', 
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                }
            }
        };
    },
    methods:{
         onPullingDown() {
            // console.log("下拉刷新");
            this.items = [];
            this.queryData.listProp.page = 1;
            this.searchKey = '';
            if(this.queryData.listProp.keywords){
                delete this.queryData.listProp.keywords;
            }
            this.getList();
        },
        // 触发上拉加载
        onPullingUp() {
            this.queryData.listProp.page++;
            this.getList();
        },
        getList(){
            getServer(this.queryData.listProp).then(res =>{
                 if (res.data.responseStatus === 1) {
                    this.isData = true;
                    res.data.data.forEach(item => {
                        this.items.push(item);
                    });
                } else if (
                    res.data.responseStatus === 300 &&
                    this.queryData.listProp.page !== 1
                ) {
                    this.$refs.scroll.forceUpdate();
                } else if (
                    res.data.responseStatus === 300 &&
                    this.queryData.listProp.page === 1
                ) {
                    this.isData = false;
                }
            })
        }
    },
    created () {
        this.getList()
    }
};
</script>
<style lang="scss">
.myBillContainer {
    font-size: 0.3rem;
}
.myBillMain {
    padding: 0.8rem 0.3rem 0;
    background: #f1f1f1;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 999;
    box-sizing: border-box;
}
.myBillItemBox {
    margin-top: 0.3rem;
    .myBillItemTop {
        background: #fff;
        border-bottom: 2px dashed #f1f1f1;
        position: relative;
        padding: 0.4rem;
        border-radius: 0.1rem 0.1rem 0 0;
        > div {
            font-size: 0.28rem;
            line-height: 0.6rem;
            &:first-of-type {
                margin-bottom: 0.14rem;
            }
            span {
                font-size: 0.6rem;
                font-weight: bold;
                i {
                    font-size: 0.42rem;
                }
            }
            em {
                background: #089cfe;
                padding: 0 0.2rem;
                color: #fff;
                height: 0.48rem;
                line-height: 0.48rem;
                border-radius: 0.1rem;
                font-size: 0.28rem;
                position: relative;
                top: -0.06rem;
                &.blue {
                    background: #089cfe;
                }
                &.gray {
                    background: #b7b7b7;
                }
            }
        }
        > span {
            display: block;
            width: 0.4rem;
            height: 0.4rem;
            border-radius: 50%;
            background: #f1f1f1;
            position: absolute;
            bottom: -0.22rem;
            &.left {
                left: -0.2rem;
            }
            &.right {
                right: -0.2rem;
            }
        }
    }
}
.myBillItemSub {
    background: #fff;
    padding: 0.4rem 0.4rem 0.34rem;
    div {
        line-height: 0.6rem;
        font-size: 0.28rem;
    }
}
.myBillItemFooter {
    display: block;
}
</style>