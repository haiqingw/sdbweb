<template>
    <div>
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
            <span>帮助中心详情</span>
        </div>
        <div class="helpCenterDetailMain">
            <!-- <h3 class="line_bottom">{{renderData.helpCenterDetail.nPTitle}}</h3>
            <div v-html = "renderData.helpCenterDetail.nPText">-->
            <!-- <h3 class="line_bottom">{{renderData.helpCenterList.title}}</h3> -->
            <div v-html="renderData.helpCenterDetail.content"></div>
        </div>
    </div>
</template>
<script>
import { getServer } from '@/api/index'
export default {
    data() {
        return {
            queryData: {
                helpCenterDetail: {
                    requestType: 'list',
                    requestKeywords: 'helpdetail',
                    id: this.$route.params.id
                }
            },
            renderData: {
                helpCenterDetail: {}
            }
        }
    },
    methods: {
        getHelpCenterDetail() {
            getServer(this.queryData.helpCenterDetail).then(res => {
                if (res.data.responseStatus === 1) {
                    this.renderData.helpCenterDetail = res.data.data
                }
            })
        }
    },
    created() {
        this.getHelpCenterDetail()
    }
}
</script>
<style lang="less">
.helpCenterDetailMain {
    padding-top: 0.8rem;
}
.helpCenterDetailMain {
    h3 {
        padding: 0.2rem 0.3rem;
        line-height: 0.46rem;
        font-size: 0.32rem;
        color: #333;
        text-align: justify;
    }
    div {
        padding: 0.2rem 0.3rem;
        line-height: 0.4rem;
        font-size: 0.28rem;
        color: #333;
        text-align: justify;
    }
}
</style>
