<template>
    <div>
       <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
            <span>帮助中心详情</span>
        </div>
        <div class="helpCenterDetailMain">
            <!-- <h3 class="line_bottom">{{renderData.helpCenterDetail.nPTitle}}</h3>
            <div v-html = "renderData.helpCenterDetail.nPText"> -->
            <h3 class="line_bottom">标题标题</h3>
            <div>正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文</div>
            </div>
        </div>
    </div>
</template>
<script>
// import { helpCenterDetail } from '@/api/helpCenter'
export default {
    data(){
        return {
            queryData: {
                helpCenterDetail: {

                }
            },
            renderData: {
                helpCenterDetail:{}
            }
        }
    },
    methods: {
        getHelpCenterDetail() {
            // helpCenterDetail(this.queryData.helpCenterDetail).then( res => {
            //     if( res.data.code === 200 ) {
            //         this.renderData.helpCenterDetail = res.data.data
            //     }
            // })
        }
    },
    created() {
        // this.getHelpCenterDetail()
    }
}
</script>
<style lang="less">
.helpCenterDetailMain{
    padding-top:0.8rem;
}
.helpCenterDetailMain{
    h3{
        padding:0.2rem 0.3rem;
        line-height:0.46rem;
        font-size:0.32rem;
        color:#333;
        text-align:justify;
    }
    div{
        padding:0.2rem 0.3rem;
         line-height:0.4rem;
        font-size:0.28rem;
        color:#333;
        text-align:justify;

    }
}
</style>
