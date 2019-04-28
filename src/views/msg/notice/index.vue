

<template>
    <div class="notice">
        <div class="return">
            <img
                src="@/assets/images/return.png" alt="" 
                @click="$router.go(-1)"
            />
            <span>消息</span>
        </div>
        <div class="notice-content">
            <div class="notice-list" v-if="isData">
                <ul>
                    <router-link tag="li" v-for="item in renderData.listData" :key="item.id" :to="{name: 'msgDetails', params: {id: item.id, cid: item.classID}}">
                        <!-- <li v-for="item in renderData.listData" :key="item.id" class=""> -->
                            <div class="img">
                                <router-link :to="{name: 'msgDetails', params: {id: item.id, cid: item.classID}}"><img :src="item.picUrl" alt=""></router-link>
                            </div>
                            <div class="content">
                                <div class="title">
                                    <router-link tag="h3" :to="{name: 'msgDetails', params: {id: item.id, cid: item.classID}}">{{item.title}}</router-link>
                                    <span :class="{ 'no' : item.readStatus === '未读'}" >{{item.readStatus}}</span>
                                </div>
                                <!-- <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p> -->
                                <div class="time-more">
                                    <span>{{item.sendTime}}</span>
                                    <a href="javascript:;">查看详情</a>
                                </div>
                            </div>
                        <!-- </li> -->
                    </router-link>
                </ul>
            </div>
            <div class="no-data" v-else>
                <img src="@/assets/images/no-data.png" alt="">
            </div>
        </div>
    </div>
</template>


<script>
    import {getServer} from '@/api/index'
    import { Indicator, Toast } from 'mint-ui'
    import response from '@/assets/js/response.js'
    export default {
        data() {
            return {
                isData: true,
                queryData: {
                    msgNoticeList: {
                        requestType: 'messagemanage',
                        requestKeywords: 'lists', 
                        userID: this.$store.state.user.uid, 
                        platformID: this.$store.state.user.pid, 
                        userPhone: this.$store.state.user.uphone, 
                        cid: this.$route.params.id
                    }
                },
                renderData: {
                    listData: [],
                }
            }
        },
        methods: {
            msgNoticeListFunc () {
                Indicator.open()
                getServer(this.queryData.msgNoticeList).then( res => {
                    // Toast(response[res.data.responseStatus])
                    if( res.data.responseStatus === 1 ) {
                        Indicator.close();
                        this.renderData.listData = res.data.data
                    } else if ( res.data.responseStatus === 300 ) {
                        Indicator.close();
                        this.isData = false
                    }
                })
            }
        },
        created () {
            this.msgNoticeListFunc()
        }
    }
</script>


<style>
.notice-content {
    margin-top: .8rem;
}
.notice {
    /* background: #f1f1f1; */
    background: #fff;
    min-height: 13.33333333rem;
}
.notice-list ul {
    padding: 0.24rem;
}
.notice-list ul li {
    margin-bottom: 0.3rem;
    padding-bottom: .2rem;
    border-bottom: 1px solid #f1f1f1;
}
.notice-list ul li .img {
    height: 2rem;
}
.notice-list ul li .img img {
    height: 100%;
}
.notice-list ul li .title {
    overflow: hidden;
    padding: .1rem 0;
}
.notice-list ul li .title h3 {
    font-size: 0.3rem;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    line-height: .46rem;
    /* margin-bottom: .1rem; */
    float: left;
}
.notice-list ul li .title span {
    float: right;
    font-size: .24rem;
    background-color: rgba(103,194,58,.1);
    border-color: rgba(103,194,58,.2);
    color: #67c23a;
    padding: 0 .2rem;
    border-radius: .4rem;
    line-height: .4rem;
    height: .4rem;
    box-sizing: border-box;
    white-space: nowrap;
    /* margin-top: .1rem; */
}
.notice-list ul li .title span.no {
    background-color: rgba(245,108,108,.1);
    border-color: rgba(245,108,108,.2);
    color: #f56c6c;
}
.notice-list ul li p {
    font-size: .24rem;
    color: #ccc;
    line-height: .3rem;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
 
}
.notice-list ul li .content {
    padding: 0 .2rem;
}
.notice-list ul li .content .time-more {
    overflow: hidden;
    font-size: 0.26rem;
}
.notice-list ul li .content .time-more span {
    float: left;
    color: #ccc;
    padding-left: 0.4rem;
    background: url(../../../assets/images/notice-list-time.png) no-repeat center left;
    background-size: .3rem;
}
.notice-list ul li .content .time-more a {
    float: right;
    color: #ccc;
    padding-right: 0.4rem;
    background: url(../../../assets/images/notice-list-more.png) no-repeat center right;
    background-size: .3rem;
}
</style>


