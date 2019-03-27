

<template>
    <div class="msg-view">
        <div class="msg-view-top">消息</div>
        <div class="msg-view-list">
            <ul>
                <!-- v-bind="{to: '/notice' + item.id}" -->
                <router-link tag="li" :to="{name: 'notice', params: {id: item.id}}" v-for="item in renderData.msgClassification" :key="item.id">
                    <!-- <el-badge is-dot class="item"></el-badge> -->
                    <el-badge :value="item.rnum" :max="99" class="item">
                        <div class="notice-ico ico">
                            <img :src="item.picUrl" alt="">
                        </div>
                    </el-badge>
                    <div class="text">
                        <span>{{item.title}}</span>
                    </div>
                </router-link>
                <!-- <router-link to="/news" tag="li">
                    <el-badge :value="1" :max="99" class="item">
                        <div class="news-ico ico"></div>
                    </el-badge>
                    <div class="text">
                        <span>及时消息</span>
                    </div>
                </router-link> -->
                <!-- <router-link to="/complaint" tag="li">
                    <div class="complaint-ico ico"></div>
                    <div class="text">
                        <span>投诉建议</span>
                    </div>
                </router-link> -->
            </ul>
        </div>
    </div>
</template>


<script>
    import {messagemanage} from '@/api/msg'
    import { Indicator, Toast } from 'mint-ui';
    import response from '@/assets/js/response.js'
    export default {
        data () {
            return {
                queryData: {
                    msgClassification: {
                        requestType: 'messagemanage',
                        requestKeywords: 'infoc', 
                        platformID: this.$store.state.user.pid, 
                        userID: this.$store.state.user.uid, 
                        userPhone: this.$store.state.user.uphone, 
                    },
                },
                renderData: {
                    msgClassification: {}
                }
            }
        },
        methods: {
            msgClassificationFun() {
                Indicator.open();
                messagemanage(this.queryData.msgClassification).then( res => {
                    if(res.data.responseStatus === 1) {
                        Indicator.close();
                        this.renderData.msgClassification = res.data.data
                    }
                })
            },
            parentImplement() {
                this.msgClassificationFun()
            }
        },
        created () {
            this.msgClassificationFun()
        }
    }
</script>


<style>


    /* body {
        padding-bottom: 1.6rem;
    } */
    .msg-view .msg-view-top {
        font-size: .3rem;
        text-align: center;
        line-height: .8rem;
        color: #fff;
        background: #089cfe;
    }
    .msg-view .msg-view-list ul {
        padding: 0 .24rem;
    }
    .msg-view .msg-view-list ul li  {
        font-size: .28rem;
        overflow: hidden;
        /* margin-top: .2rem; */
        line-height: 0.8rem;
        padding: .2rem 0;
    }
    .msg-view .msg-view-list ul li>div {
        float: left;
    }
    .msg-view-list .ico {
        width: .8rem;
        height: .8rem;
        border-radius: 50%;
    }
    .msg-view-list .text {
        margin-left: .3rem;
    }
    .msg-view-list .ico.notice-ico {
        background: url(../../assets/images/msg-notice-ico.png) no-repeat center center #3399FF;
        background-size: 60%;
    }
    .msg-view-list .ico.notice-ico img {
    border-radius: 50%;
    }
    .msg-view-list .ico.complaint-ico {
        background: url(../../assets/images/msg-complaint-ico.png) no-repeat center center #CC9999;
        background-size: 60%;
    }
    .msg-view-list .ico.news-ico {
        background: url(../../assets/images/msg-news-ico.png) no-repeat center center #CC9933;
        background-size: 60%;
    }
</style>


