
<template>
    <div class="msg">
        <div class="return">
            <img
                src="@/assets/images/return.png" alt="" 
                @click="backOff"
            />
            <span>及时消息</span>
        </div>
        <div class="msg-content">
            <div class="msg-content-list">
                <ul>
                    <li>
                        <el-card :body-style="{ padding: '0px' }">
                            <div style="padding: .24rem;">
                                <!-- <div class="type"><el-tag>类型</el-tag></div> -->
                                <div class="title"><span>标题</span></div>
                                <div class="time-more">
                                    <time>2000-00-00 00:00:00</time>
                                    <el-button type="text" class="button more">查看详细</el-button>
                                </div>
                               
                            </div>
                        </el-card>
                    </li>
                    <li>
                        <el-card :body-style="{ padding: '0px' }">
                            <div style="padding: .24rem;">
                                <!-- <div class="type"><el-tag>类型</el-tag></div> -->
                                <div class="title"><span>标题</span></div>
                                <div class="time-more">
                                    <time>2000-00-00 00:00:00</time>
                                    <el-button type="text" class="button more">查看详细</el-button>
                                </div>
                               
                            </div>
                        </el-card>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        methods: {
            backOff() {
                this.$router.push({ name: 'index', params: { selected: 'news' }})
            }
        }
    }
</script>


<style>
.msg-content-list {
    margin-top: 0.2rem;
}
.msg-content-list ul {
    padding: 0 .24rem;
}
.msg-content-list ul li {
    margin-bottom: 0.2rem;
}
.msg-content .msg-content-list ul li .title {
    font-size: 0.28rem;
    line-height: .5rem;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}
.msg-content .msg-content-list ul li time {
    font-size: .24rem;
}
.msg-content .msg-content-list ul li .type {
    line-height: 0.3rem;
}
.msg-content .msg-content-list ul li .time-more {
    overflow: hidden;
    line-height: .5rem;
}
.msg-content .msg-content-list ul li .time-more time {
    display: block;
    float: left;
    font-size: 0.26rem;
}
.msg-content .msg-content-list ul li .time-more .more {
    display: block;
    padding: 0;
    float: right;
    line-height: .5rem;
}
</style>

