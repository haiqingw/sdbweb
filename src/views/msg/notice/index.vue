

<template>
    <div class="notice">
        <div class="return">
            <img
                src="@/assets/images/return.png" alt="" 
                @click="backOff"
            />
            <span>系统公告</span>
        </div>
        <div class="notice-content">
            <div class="notice-list">
                <ul>
                    <li>
                        <div class="img">
                            <img src="@/assets/images/index_banner.jpg" alt="">
                        </div>
                        <div class="content">
                            <h3>标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</h3>
                            <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
                            <div class="time-more">
                                <span>2000-00-00 00:00:00</span>
                                <a href="">查看详情</a>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="img">
                            <img src="@/assets/images/index_banner.jpg" alt="">
                        </div>
                        <div class="content">
                            <h3>标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题</h3>
                            <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
                            <div class="time-more">
                                <span>2000-00-00</span>
                                <a href="">查看详情</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {}
        },
        methods: {
            backOff() {
                this.$router.push({ name: 'index', params: { selected: 'news' }})
            }
        }
    }
</script>


<style>
.notice {
    background: #f1f1f1;
    min-height: 13.33333333rem;
}
.notice-list ul {
    padding: 0.24rem;
}
.notice-list ul li {
    margin-bottom: 0.3rem;
    padding-bottom: .2rem;
    background: #fff;
}
.notice-list ul li .img {
    height: 2rem;
}
.notice-list ul li .img img {
    height: 100%;
}
.notice-list ul li h3 {
    font-size: 0.3rem;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    line-height: .46rem;
    margin-bottom: .1rem;
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
    margin-top: 0.2rem;
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


