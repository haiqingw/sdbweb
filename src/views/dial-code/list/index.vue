

<template>
    <div class="dial-code-list">
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)">
            <span>拨码记录</span>
            <!-- <router-link to="/callback-list" class="withdrawalRecord" style="color:#fff;">回拨记录</router-link> -->
        </div>
        <div class="content">
            <div class="my-terminal-choice line_bottom">
                <el-select v-model="byProduct.value" placeholder="按产品" @change="byProductChange">
                    <el-option
                        v-for="item in byProduct.options"
                        :key="item.id"
                        :label="item.productName"
                        :value="item.id"
                    ></el-option>
                </el-select>
                <div class="search">
                    <van-search @search="onSearch" placeholder="请输入搜索关键词" v-model="search"/>
                </div>
                <!-- <el-select v-model="byBatch.value" placeholder="按批次" @change="byBatchChange">
                <el-option
                    v-for="item in byBatch.options"
                    :key="item.batchNo"
                    :label="item.batchNo"
                    :value="item.batchNo"
                ></el-option>
                </el-select>-->
            </div>
            <div class="my-terminal-list">
                <div class="dial-codelist" v-if="isData">
                    <cube-scroll
                        ref="scroll"
                        :data="renderData.list"
                        @pulling-down="onPullingDown"
                        @pulling-up="onPullingUp"
                        :options="options"
                        v-if="isData"
                    >
                        <ul>
                            <li v-for="item in renderData.list" :key="item.id">
                                <div class="name-state">
                                    <h3>{{item.product}}</h3>
                                    <span>所有者：{{item.name}}({{item.phone}})</span>
                                </div>
                                <div class="terminal-number">{{item.terminal}}</div>
                                <div class="time-batch">
                                    <div class="left">
                                        <time>{{item.allotTime}}</time>
                                    </div>
                                    <div class="right">
                                        <!-- <span>{{item.batchNo}}</span> -->
                                    </div>
                                </div>
                                <div
                                    class="code-out"
                                    @click="callback(item.productID, item.machineID, item.belongID)"
                                    v-if="item.isUse !== 1"
                                >
                                    <span>回拨</span>
                                </div>
                            </li>
                        </ul>
                    </cube-scroll>
                </div>
                <div class="no-data" v-else>
                    <img src="@/assets/images/no-data.png" alt>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getServer } from "@/api/index";
import response from "@/assets/js/response.js";
import { MessageBox, Toast, Indicator } from "mint-ui";
export default {
    data() {
        return {
            Search: "",
            isData: true,
            byProduct: {
                options: [
                    {
                        id: "1",
                        label: "按产品"
                    }
                ],
                value: ""
            },
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
            queryData: {
                callback: {
                    requestType: "datacenter",
                    requestKeywords: "backdial",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    productID: "",
                    machineID: "",
                    belongID: ""
                },
                product: {
                    // requestType: "agent",
                    // requestKeywords: "product",
                    // platformID: this.$store.state.user.pid
                    requestType: "personal",
                    requestKeywords: "agentproduct",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                },
                list: {
                    requestType: "datacenter",
                    requestKeywords: "dialcode",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    productID: "",
                    keywords: ""
                }
            },
            renderData: {
                list: []
            }
        };
    },
    methods: {
        callback(productID, machineID, belongID) {
            this.queryData.callback.productID = productID;
            this.queryData.callback.machineID = machineID;
            this.queryData.callback.belongID = belongID;
            MessageBox.confirm("您确定要回拨吗?", "回拨")
                .then(action => {
                    getServer(this.queryData.callback).then(res => {
                        if (res.data.responseStatus === 1) {
                            Toast("回拨成功");
                            setTimeout(() => {
                                this.$router.push({ name: "dial-code" });
                            }, 300);
                        } else {
                            Toast(response[res.data.responseStatus]);
                        }
                    });
                })
                .catch(() => {});
        },
        onSearch() {
            this.queryData.list.page = 1;
            this.terminalList();
        },
        onPullingUp() {
            this.queryData.list.page++;
            this.terminalList();
        },
        onPullingDown() {
            this.renderData.list = [];
            this.queryData.list.page = 1;
            this.terminalList();
        },
        byProductChange() {
            this.queryData.list.productID = this.byProduct.value;
            this.renderData.list = [];
            this.queryData.list.page = 1;
            this.terminalList();
        },
        choiceProduct() {
            getServer(this.queryData.product)
                .then(res => {
                    if (res.data.responseStatus === 1) {
                        this.byProduct.options = res.data.data;
                        this.queryData.list.productID = res.data.data[0].id;
                        this.byProduct.value = res.data.data[0].id;
                    }
                })
                .then(() => {
                    this.terminalList();
                });
        },
        terminalList() {
            if (this.search === "") {
                delete this.queryData.list.keywords;
            } else {
                this.queryData.list.keywords = this.search;
            }
            // Indicator.open();
            getServer(this.queryData.list).then(res => {
                // alert(JSON.stringify(res))
                // console.log(response[res.data.responseStatus])
                // Indicator.close();
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
        }
    },
    created() {
        this.choiceProduct();
    }
};
</script>

<style lang="scss">
.dial-code-list .no-data {
    width: 70%;
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
.dial-code-list .van-checkbox {
    overflow: initial;
}
.dial-code-list .van-checkbox__icon .van-icon {
    width: 0.5rem;
    height: 0.5rem;
    font-size: 0.4rem;
    line-height: 0.5rem;
}
.dial-code-list .van-search {
    padding: 0;
}
.mint-indicator {
    z-index: 999999999999999;
}
.mint-indicator-wrapper {
    z-index: 999999999999999;
}
.mint-indicator-mask {
    z-index: 999999999999999;
}
.my-terminal-list {
    font-size: 0.3rem;
}
.my-terminal-list .before-trigger {
    font-size: 0.3rem;
}
.my-terminal-list .dial-codelist {
    height: 12rem;
}
.my-terminal-list .scroll-list-wrap {
    height: 12rem;
    overflow: auto;
    .item {
        padding: 10px 10px;
        &:nth-child(2n + 1) {
            background: #ccc;
        }
    }
}
.dial-code-list .van-checkbox-group {
    float: right;
}
.dial-code-list .el-checkbox__label {
    display: none;
}
.dial-code .el-input--suffix .el-input__inner {
    text-align: center;
}
.dial-code-list .no-data {
    margin-top: 67%;
}
.my-terminal-choice {
    position: fixed;
    left: 0;
    top: 0.7rem;
    z-index: 99;
    width: 100%;
}
.dial-code-list .my-terminal-choice {
    display: flex;
    font-size: 0.28rem;
    text-align: center;
    line-height: 0.4rem;
    padding: 0.2rem 0 0.1rem;
}
.dial-code-list .my-terminal-choice .el-select {
    flex: 1;
    background: url(../../../assets/images/my-terminal-choice-drop-down.png)
        no-repeat 2rem center;
    background-size: 10%;
}
.dial-code-list .my-terminal-choice .el-select input {
    border: none;
}
.dial-code-list .mint-popup {
    width: 100%;
}
.dial-code-list .mint-popup .picker-slot.picker-slot-right {
    text-align: center;
}
.my-terminal-list {
    margin-top: 1.9rem;
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
    line-height: 0.6rem;
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
.my-terminal-list .el-checkbox__input {
    vertical-align: inherit;
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


