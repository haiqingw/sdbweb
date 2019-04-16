

<template>
    <div class="msg-details">
         <div class="return">
            <img
                src="@/assets/images/return.png" alt="" 
                @click='$router.go(-1)'/>
            <span>详细</span>
        </div>
        <div class="details-content" v-if="isData">
            <div class="title">
                <h3>{{renderData.detailsData.title}}</h3>
                <time>{{renderData.detailsData.sendTime}}</time>
            </div>
            <div class="content">{{renderData.detailsData.content}}</div>
        </div>
        <div class="no-data" v-else>
            <img src="@/assets/images/no-data.png" alt="">
        </div>
    </div>
</template>

<script>
    import { getServer } from '@/api/index'
    import { Indicator } from 'mint-ui'
    export default {
        data () {
            return {
                isData: true,
                queryData: {
                    msgDetails: {
                        requestType: 'messagemanage',
                        requestKeywords: 'details', 
                        userID: this.$store.state.user.uid, 
                        platformID: this.$store.state.user.pid, 
                        userPhone: this.$store.state.user.uphone, 
                        mid: this.$route.params.id
                    }
                },
                renderData: {
                    detailsData: []
                }
            }
        },
        methods: {
            mgDetails () {
                Indicator.open()
                getServer(this.queryData.msgDetails).then( res => {
                    if(res.data.responseStatus === 1) {
                        Indicator.close()
                        // console.log(res)
                        res.data.data.content = res.data.data.content.replace(/<[^>]+>/g,"");
                        this.renderData.detailsData = res.data.data
                    } else if( res.data.responseStatus === 300 ) {
                        Indicator.close()
                        this.isData = false
                    }
                })
            }
        },
        created () {
            this.mgDetails()
        }
    }
</script>


<style>
.details-content {
    padding: 0 .2rem;
    margin-top: .8rem;
}
.details-content .title {
    font-size: 0.28rem;
    overflow: hidden;
    margin: .3rem 0;
}
.details-content .title h3 {
    float: left;
}
.details-content .title time {
    float: right;
}
.details-content .content {
    font-size: .26rem;
    line-height: .4rem;
}
</style>

