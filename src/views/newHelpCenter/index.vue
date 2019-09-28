<template>
    <div class="helpCenter">
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
            <span>帮助中心</span>
        </div>
        <div class="helpCenterMain">
            <!-- 公告 -->
            <van-notice-bar text="如果您是初次使用刷多宝，请先认真阅读新手指引" left-icon="volume-o" />
            <!-- 新手引导 -->
            <div class="noviceGuideBannerMain">
                <img
                    @click="guideTap()"
                    src="@/assets/images/noviceGuideBannerBannerImg.jpg"
                    alt="新手引导banner"
                />
            </div>
            <!-- 常见问题 -->
            <div class="commonProblemsMain">
                <h3>问题类型</h3>
                <div class="commonProblemsItem">
                    <div v-if="isData">
                        <van-cell-group>
                            <!-- <van-cell v-for="item in renderData.helpCenterList" :key="item.nPNo" :title="item.nPTitle" :to="{name: 'helpCenterDetail', params: {nPNo: item.nPNo}}" is-link icon="question-o" /> -->
                            <van-cell
                                v-for="item in renderData.helpCenterList"
                                :key="item.id"
                                :title="item.title"
                                is-link
                                :icon="item.picUrl"
                                :to="{name: 'newHelpList', params: {id: item.id}}"
                            />
                        </van-cell-group>
                    </div>
                    <div class="noDataMain" v-else>
                        <img src="@/assets/images/noDataImg.png" alt="暂无数据" />
                        <p>暂无数据</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="contactUs" v-if="renderData.phone.landline">
            <div>
                <van-icon name="phone-circle-o" />
                <a :href="'tel:' + renderData.phone.landline">联系客服</a>
            </div>
            <!-- <div>
                <van-icon name="phone-circle-o" />
                <a :href="'tel:' + renderData.phone.landline">意见反馈</a>
            </div>-->
            <router-link to="/feedback" tag="div">
                <van-icon name="records" />
                <a :href="'tel:' + renderData.phone.landline">意见反馈</a>
            </router-link>
        </div>
    </div>
</template>
<script>
import { Notify } from "vant";
import { getServer } from "@/api/index";
export default {
    data() {
        return {
            isData: true,
            queryData: {
                helpCenterList: {
                    requestType: "list",
                    requestKeywords: "apphelp",
                    platformID: this.$store.state.user.pid
                },
                phone: {
                    requestType: "system",
                    requestKeywords: "getsystem",
                    platformID: this.$store.state.user.pid,
                    type: "customerservicetelephone"
                }
            },
            renderData: {
                helpCenterList: [],
                phone: {}
            }
        };
    },
    methods: {
        guideTap() {
            this.$router.push("/newHelpCenter/guideView");
        },
        getHelpCenterList() {
            getServer(this.queryData.helpCenterList).then(res => {
                if (res.data.responseStatus === 1) {
                    this.renderData.helpCenterList = res.data.data;
                } else if (res.data.responseStatus === 300) {
                    this.isData = false;
                }
            });
        },
        getPhone() {
            getServer(this.queryData.phone).then(res => {
                if (res.data.responseStatus === 1) {
                    this.renderData.phone = res.data.content;
                }
            });
        }
    },
    created() {
        this.getHelpCenterList();
        this.getPhone();
    }
};
</script>
<style lang="less">
.helpCenter {
    background: #f1f1f1;
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: auto;
}
.helpCenter .van-cell {
    background: #f1f1f1;
}
.helpCenterMain {
    padding-bottom: 0.8rem;
}

.contactUs {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    text-align: center;
    font-size: 0.28rem;
    line-height: 0.8rem;
    z-index: 999;
    background: #fff;
    overflow: hidden;
    i {
        font-size: 0.32rem;
        position: relative;
        top: 0.06rem;
        color: #698bf6;
    }
    a {
        color: #698bf6;
    }
}
.contactUs > div {
    float: left;
    width: 50%;
    text-align: center;
    border: 0.01rem solid #ccc;
    box-sizing: border-box;
}
.helpCenterMain {
    padding-top: 0.8rem;
    .van-hairline--top-bottom::after {
        content: "";
        border-top: none;
    }
}
.commonProblemsMain {
    padding: 0.3rem;
    > h3 {
        line-height: 0.6rem;
        font-size: 0.32rem;
        position: relative;
        z-index: 999;
        &::before {
            content: "";
            display: block;
            width: 1.3rem;
            height: 0.2rem;
            border-radius: 0.2rem;
            position: absolute;
            left: 0;
            bottom: 0.1rem;
            background: #089cfe;
            opacity: 0.4;
        }
    }
}
.commonProblemsItem {
    .van-cell--clickable {
        padding-left: 0;
        padding-right: 0;
    }
}
</style>
