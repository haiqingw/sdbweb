


<template>
    <div class="invitation-record-detailed">
        <div class="return">
            <img
                src="@/assets/images/return.png" alt="" 
                @click='$router.go(-1)'/>
            <span>邀请记录详细</span>
        </div>
        <div class="invitation-record-detailed-contnet-top">
            三人共创(15888888888)累计为我赚了
            <span>0.00<em>元</em></span>
        </div>
        <div class="invitation-record-detailed-contnet-list" v-if="isData">
            <h3>奖励明细</h3>
            <van-pull-refresh
                v-model="isDownLoading"
                @refresh="onDownRefresh"
            >
                <van-list
                    v-model="isUpLoading"                 
                    :finished="upFinished"
                    finished-text="没有更多了"
                    @load="onLoadList"
                    :offset= "offset"
                >
                    <ul>
                        <li v-for="item in renderData.oldList" :key="item.id">
                            <div class="left">
                                <h3>业务员返现</h3>
                                <time>2000-00-00 00:00:00</time>
                            </div>
                            <div class="right">
                                + 0.00
                            </div>
                        </li>
                    </ul>
                </van-list>
            </van-pull-refresh>
        </div>
        <div class="no-data" v-else>
            <img src="@/assets/images/no-data.png" alt="">
        </div>
    </div>
</template>


<script>
    import {getServer} from '@/api/index'
    import response from '@/assets/js/response.js'
    export default {
        data () {
            return {
                isDownLoading: false, //下拉刷新
                isUpLoading: false, //上拉加载
                upFinished: false, //上拉加载完毕
                offset: 10, //滚动条与底部距离小于 offset 时触发load事件
                isData: true,
                queryData: {
                    list: {
                        requestType: 'list', 
                        requestKeywords: 'teamdetail', 
                        platformID: this.$store.state.user.pid, 
                        userID: this.$store.state.user.uid, 
                        userPhone: this.$store.state.user.uphone, 
                        page: 0, 
                        limit: 10, 
                        id: this.$route.params.id
                    },
                    top: {
                       
                    }
                },
                renderData: {
                    list: [],
                    oldList: []
                }
            }
        },
        methods: {
            // 下拉刷新
            onLoadList () {
                // console.log("进来", this.queryData.list.page)
                this.queryData.list.page++
                // this.isUpLoading = true
                // console.log(this.queryData.list.page)
                this.listDetails()
            },
            onDownRefresh(){
                this.queryData.list.page = 1
                this.renderData.oldList = []
                this.isDownLoading = true
                this.listDetails();
            },
            listDetails () {
                getServer(this.queryData.list).then( res => {
                    console.log(response[res.data.responseStatus])
                    if( res.data.responseStatus === 1 ) {
                        this.isData = true
                        this.renderData.list = res.data.listData
                        this.renderData.list.forEach( item => {
                            this.renderData.oldList.push(item)
                        })
                        this.isDownLoading = false
                        this.isUpLoading = false
                       
                    } else if(res.data.responseStatus === 300 && this.queryData.list.page !== 1 ) {
                        this.upFinished = true
                        this.isUpLoading = false
                    } else if( res.data.responseStatus === 300 && this.queryData.list.page === 1 ) {
                        this.upFinished = false
                        this.isUpLoading = false
                        this.isData = false
                    }
                })
            }        
        }
    }
</script>

<style>
.invitation-record-detailed-contnet-top {
    background: #089cfe;
    color: #fff;
    font-size: 0.3rem;
    padding: .3rem .2rem;
    margin-top: .8rem;
}
.invitation-record-detailed-contnet-top span {
    font-size: 0.8rem;
    display: block;
    margin-top: 0.2rem;
}
.invitation-record-detailed-contnet-top span em {
    font-size: .3rem;
}
.invitation-record-detailed-contnet-list {
    margin-top: 0.2rem;
}
.invitation-record-detailed-contnet-list>h3 {
    font-weight: normal;
    font-size: 0.3rem;
    margin-bottom: 0.1rem;
    padding: 0 .2rem;
}
.invitation-record-detailed-contnet-list ul li {
    overflow: hidden;
    padding: .2rem;
    height: 0.8em;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    margin-top: 0.2em;
}
.invitation-record-detailed-contnet-list ul li .left {
    float: left;
}
.invitation-record-detailed-contnet-list ul li .left h3 {
    font-size: 0.28em;
    font-weight: normal;
    margin-bottom: 0.1rem;
}
.invitation-record-detailed-contnet-list ul li .left time {
    font-size: 0.26rem;
    display: block;
    color: #5e6d82;
}
.invitation-record-detailed-contnet-list ul li .right {
    float: right;
    line-height: .8rem;
    font-size: 0.32rem;
    font-weight: bold;
    color: #CC0000;
   
}
</style>

