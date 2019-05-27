

<template>
    <div class="dial-code-list">
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)">
            <span>退码列表</span>
        </div>
        <div class="content">
            <div class="my-terminal-list" v-if="isData">
                <cube-scroll
                    ref="scroll"
                    :data="renderData.list"
                    @pulling-down="onPullingDown"
                    @pulling-up="onPullingUp"
                    :options="options"
                    v-if="isData"
                >
                    <ul>
                        <li v-for="item in renderData.oldList" :key="item.id">
                            <div class="name-state">
                                <h3>{{item.productName}}</h3>
                                <el-tag
                                    type="danger"
                                    v-if="item.useStatus === '未使用'"
                                >{{item.useStatus}}</el-tag>
                                <el-tag
                                    type="success"
                                    v-if="item.useStatus === '已使用' "
                                >{{item.useStatus}}</el-tag>
                            </div>
                            <div class="terminal-number">{{item.terminalNo}}</div>
                            <div class="time-batch">
                                <div class="left">
                                    <span v-if=" item.useName !== '0' ">使用者：{{item.useName}}</span>
                                    <time>{{item.allotTime}}</time>
                                </div>
                                <div class="right">
                                    <span>{{item.batchNo}}</span>
                                </div>
                            </div>
                            <!-- <div
                                    class="code-out"
                                    v-if="item.useStatus === '未使用'"
                                    @click="codeOut"
                                >
                                    <span>退码</span>
                            </div>-->
                        </li>
                    </ul>
                </cube-scroll>
            </div>
            <div class="no-data" v-else>
                dsafdasfsdfdsasd
                <img src="@/assets/images/no-data.png" alt>
            </div>
        </div>
    </div>
</template>

<script>
import { getServer } from "@/api/index";
import response from "@/assets/js/response.js";
export default {
    data() {
        return {
            options: {
                pullDownRefresh: {
                    threshold: 90,
                    stop: 40,
                    txt: "刷新成功"
                }, // 配置下拉刷新
                pullUpLoad: {
                    threshold: 0,
                    txt: {
                        more: "上拉加载更多",
                        noMore: "没有更多数据"
                    }
                } // 配置上拉加载，若要关闭可直接 pullUpLoad：false
            },
            isData: true,
            queryData: {
                list: {
                    requestType: "agent",
                    requestKeywords: "terminal",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    productID: this.$route.params.id, //产品ID
                    page: 1,
                    limit: 10
                }
            },
            renderData: {
                list: [],
            }
        };
    },
    methods: {
        terminalList() {
            this.upFinished = false;
            getServer(this.queryData.list).then(res => {
                // console.log(response[res.data.responseStatus])
                Indicator.close();
                // console.log(res.data.data.constructor === Array);
                if (res.data.responseStatus === 1) {
                    // console.log(res.data.data.length)
                    // console.log(res.data)
                    this.isData = true;
                    // this.renderData.list = res.data.data;
                    res.data.data.forEach(item => {
                        this.renderData.list.push(item);
                    });
                } else if (
                    res.data.responseStatus === 300 &&
                    this.queryData.list.page != 1
                ) {
                    this.$refs.scroll.forceUpdate();
                } else if (
                    res.data.responseStatus === 300 &&
                    this.queryData.list.page == 1
                ) {
                    this.isData = false;
                }
            });
        },
    },
    created() {
        this.terminalList();
    }
};
</script>

<style>
.dial-code-list .content {
    margin-top: 0.8rem;
}
.dial-code-list .my-terminal-list {
    margin-top: 1rem;
}
.my-terminal-list ul li .code-out {
    overflow: hidden;
    font-size: 0.3rem;
    margin-top: 0.15rem;
    padding-top: 0.2rem;
    border-top: 0.01rem dashed #ccc;
}
.my-terminal-list ul li .code-out span {
    float: right;
    color: #fff;
    background: #089cfe;
    border-radius: 0.1rem;
    padding: 0.1rem 0.2rem;
}
.my-terminal .el-input--suffix .el-input__inner {
    text-align: center;
}
.my-terminal .no-data {
    margin-top: 67%;
}
.my-terminal-choice {
    position: fixed;
    left: 0;
    top: 0.7rem;
    z-index: 99;
}
.my-terminal .my-terminal-choice {
    display: flex;
    font-size: 0.28rem;
    text-align: center;
    line-height: 0.4rem;
    padding: 0.2rem 0 0.1rem;
}
.my-terminal .my-terminal-choice .el-select {
    flex: 1;
    background: url(../../../assets/images/my-terminal-choice-drop-down.png)
        no-repeat 2rem center;
    background-size: 10%;
}
.my-terminal .my-terminal-choice .el-select input {
    border: none;
}
.my-terminal .mint-popup {
    width: 100%;
}
.my-terminal .mint-popup .picker-slot.picker-slot-right {
    text-align: center;
}
.my-terminal-list ul {
    padding: 0 0.2rem;
}
.my-terminal-list ul li {
    padding: 0.2rem;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    margin-bottom: 0.3rem;
}
.my-terminal-list ul li .name-state {
    overflow: hidden;
}
.my-terminal-list ul li .name-state h3 {
    float: left;
    font-size: 0.3rem;
    line-height: 0.6rem;
    color: #303133;
}
.my-terminal-list ul li .name-state h3 span {
    margin-left: 0.18rem;
    font-size: 0.28rem;
}
.my-terminal-list ul li .name-state span {
    float: right;
}
.my-terminal-list ul li .terminal-number {
    font-size: 0.4rem;
    text-align: center;
    color: #ff3300;
    font-weight: normal;
    padding: 0.3rem 0;
}
.my-terminal-list ul li .time-batch {
    overflow: hidden;
    color: #ccc;
    font-size: 0.26rem;
    line-height: 0.4rem;
}
.my-terminal-list ul li .time-batch .left {
    float: left;
}
.my-terminal-list ul li .time-batch .left span {
    margin-right: 0.2rem;
}
.my-terminal-list ul li .time-batch .right {
    float: right;
}
</style>


