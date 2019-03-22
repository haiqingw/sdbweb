

<template>
    <div class="msg-view">
        <div class="msg-view-top">消息</div>
        <div class="msg-view-list">
            <ul>
                <router-link to="/notice" tag="li">
                    <div class="notice-ico ico"></div>
                    <div class="text"><span>官方公告</span></div>
                </router-link>
                <router-link to="/news" tag="li">
                    <div class="news-ico ico"></div>
                    <span>及时消息</span>
                </router-link>
                <router-link to="/complaint" tag="li">
                    <div class="complaint-ico ico"></div>
                    <span>投诉建议</span>
                </router-link>
            </ul>
        </div>
    </div>
</template>


<script>
    export default {
        
    }
</script>


<style>
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
        margin-top: .2rem;
        line-height: 0.8rem;
        padding: .1rem 0;
    }
    .msg-view .msg-view-list ul li>div {
        float: left;
    }
    .msg-view-list .ico {
        width: .8rem;
        height: .8rem;
        border-radius: 50%;
        margin-right: .3rem;
    }
    .msg-view-list .ico.notice-ico {
        background: url(../../assets/images/msg-notice-ico.png) no-repeat center center #3399FF;
        background-size: 60%;
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


