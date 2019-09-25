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
                            <van-cell title="问题分类一" is-link icon="question-o" />
                            <van-cell title="问题分类一" is-link icon="question-o" />
                            <van-cell title="问题分类一" is-link icon="question-o" />
                            <van-cell title="问题分类一" is-link icon="question-o" />
                        </van-cell-group>
                    </div>
                    <div class="noDataMain" v-else>
                        <img src="@/assets/images/noDataImg.png" alt="暂无数据" />
                        <p>暂无数据</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Notify } from 'vant'
export default {
    data() {
        return {
            isData: true,
            queryData: {
                helpCenterList: {

                }
            },
            renderData: {

            }
        }
    },
    methods: {
        guideTap() {
            this.$router.push('/newHelpCenter/guideView')
        },
        getHelpCenterList() {
            // helpCenterList(this.queryData.helpCenterList).then(res => {
            //     if (res.data.code === 200) {
            //         this.renderData.helpCenterList = res.data.data
            //         if (res.data.data.length === 0) {
            //             this.isData = false
            //         }
            //     }
            // })
        }
    },
    created() {
        // this.getHelpCenterList()
    }
}
</script>
<style lang="less">
.helpCenterMain {
    padding-top: 0.8rem;
    .van-hairline--top-bottom::after{
        content:'';
        border-top:none;
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
            content: '';
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
