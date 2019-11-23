


<template>
    <div class="invitation-record">
        <div class="return">
            <img
                src="@/assets/images/return.png" alt="" 
                @click='$router.go(-1)'/>
            <span>邀请记录</span>
        </div>
        <div class="top-text">
            您邀请了<span>{{ renderData.top.teamnum || 0}}</span>位新用户，领取了<span>{{ renderData.top.getnum || 0 }}</span>台机器，赚了<span>{{ renderData.top.rewardsnum || 0.00 }}</span>元
        </div>
        <div class="invitation-record-list" v-if="isData">
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
                            <div class="title">
                                <h3>{{item.busname}}（{{item.phone}}）</h3>
                                <a :href="'tel:' + item.phone"></a>
                            </div>
                            <div class="content">
                                <div class="machine">
                                    <em>{{item.getNumber}}</em>
                                    <span>领取机器(台)</span>
                                </div>
                                <div class="reward">
                                    <em>{{item.rewards}}</em>
                                    <span>邀请奖励(元)</span>
                                </div>
                            </div>
                            <div class="time-detailed">
                                <time>{{item.fullTime}}</time>
                                <router-link :to="{name: 'invitationRecordDetailed', params: {id: item.id}}">查看记录详细</router-link>
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
    import { Toast } from "mint-ui";
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
                        requestKeywords: 'team', 
                        platformID: this.$store.state.user.pid, 
                        userID: this.$store.state.user.uid, 
                        userPhone: this.$store.state.user.uphone, 
                        page: 0, 
                        limit: 5
                    },
                    top: {
                        requestType: 'list', 
                        requestKeywords: 'lowerdata', 
                        platformID: this.$store.state.user.pid, 
                        userID: this.$store.state.user.uid, 
                        userPhone: this.$store.state.user.uphone
                    }
                },
                renderData: {
                    top: {},
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
                this.invitationRecordList()
            },
            onDownRefresh(){
                this.queryData.list.page = 1
                this.renderData.oldList = []
                this.isDownLoading = true
                this.invitationRecordList();
            },
            invitationRecordList () {
                getServer (this.queryData.list).then( res => {
                    if( res.data.responseStatus === 1 ) {
                        this.isData = true
                        this.renderData.list = res.data.data
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
            },
            invitationRecordListTop () {
                getServer (this.queryData.top).then( res => {
                    if( res.data.responseStatus === 1 ) {
                        this.renderData.top = res.data
                    }
                    
                })
            }
        },
        created () {
            this.invitationRecordListTop()
        }
    }
</script>

<style>
.invitation-record .no-data {
    margin-top: 50%;
}
.invitation-record .top-text {
    font-size: .26rem;
    text-align: center;
    line-height: 0.4rem;
    padding: 0.2rem 0;
    /* background: #f1f1f1; */
    background: #fff;
    margin-top: .8rem;
}
.invitation-record .top-text span {
    color: #FF9900;
}
.invitation-record .invitation-record-list {
    margin-top: 0.2rem;
}
.invitation-record .invitation-record-list ul li {
    padding: .2rem 0;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    margin-bottom: .3rem;
}
.invitation-record .invitation-record-list ul li .title {
    overflow: hidden;
    padding: .1rem .2rem;
}
.invitation-record .invitation-record-list ul li .title h3 {
    float: left;
    font-size: 0.3rem;
    font-weight: normal;
    line-height: .4rem;
}
.invitation-record .invitation-record-list ul li .title a {
    float: right;
    width: .4rem;
    height: .4rem;
    background: url(../../assets/images/invitation-record-lis-telephone.png) no-repeat;
    background-size: 100%;
}
.invitation-record .invitation-record-list ul li .content {
    border: .01rem solid #ccc;
    border-left: none;
    border-right: none;
    padding: .2rem 0;
    margin: .1rem 0;
    overflow: hidden;
}
.invitation-record .invitation-record-list ul li .content>div {
    width: 50%;
    float: left;
    font-size: 0.28rem;
    text-align: center;
    margin-bottom: .2rem;
}
.invitation-record .invitation-record-list ul li .content>div em {
    display: block;
    color: red;
    margin: 0.2rem 0;
    font-weight: bold;
    font-size: .38rem;
}
.invitation-record .invitation-record-list ul li .content .machine {
    border-right: .01rem solid #ccc;
    box-sizing: border-box;
}
.invitation-record .invitation-record-list ul li .time-detailed {
    padding: .1rem .2rem;
    overflow: hidden;
    font-size: .28rem;
    color: #ccc;
}
.invitation-record .invitation-record-list ul li .time-detailed time {
    float: left;
}
.invitation-record .invitation-record-list ul li .time-detailed a {
    float: right;
    color: #089cfe;
}
</style>


