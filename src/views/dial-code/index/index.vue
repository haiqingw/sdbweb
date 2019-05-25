
<template>
    <div class="dial-code">
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)">
            <span>拨码</span>
        </div>
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
                <van-search
                    @search="onSearch"
                    placeholder="请输入搜索关键词"
                    v-model="queryData.search.val"
                />
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
                                <h3>{{item.productName}}</h3>
                                <!-- <el-tag type="danger" v-if="item.useStatus === '未使用'">{{item.useStatus}}</el-tag>
                                <el-tag type="success" v-if="item.useStatus === '已使用' ">{{item.useStatus}}</el-tag>-->
                                <!-- <el-checkbox-group
                                v-model="checkList"
                                @change="handleCheckedCitiesChange"
                            >
                                <el-checkbox :label="item.id"></el-checkbox>
                                </el-checkbox-group>-->
                                <van-checkbox-group v-model="checkList">
                                    <van-checkbox :name="item.id"></van-checkbox>
                                </van-checkbox-group>
                            </div>
                            <div class="terminal-number">{{item.terminalNo}}</div>
                            <div class="time-batch">
                                <div class="left">
                                    <!-- <span v-if=" item.useName !== '0' ">使用者：{{item.useName}}</span> -->
                                    <time>{{item.allotTime}}</time>
                                </div>
                                <div class="right">
                                    <span>{{item.batchNo}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </cube-scroll>
            </div>
            <div class="no-data" v-else>
                <img src="@/assets/images/no-data.png" alt>
            </div>
        </div>
        <div class="height: 1rem;"></div>
        <div class="confirm" @click="confirm">
            <em>已选{{checkList.length}}</em>
            <span>确定</span>
        </div>
    </div>
</template>


<script>
import { getServer } from "@/api/index";
import response from "@/assets/js/response.js";
import { Toast, Indicator } from "mint-ui";
export default {
    data() {
        return {
            isData: true,
            checkList: [],
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
            byProduct: {
                options: [
                    {
                        id: "1",
                        label: "按产品"
                    }
                ],
                value: ""
            },
            byBatch: {
                options: [
                    {
                        id: "1",
                        label: "按批次"
                    }
                ],
                value: ""
            },
            queryData: {
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
                batch: {
                    requestType: "agent",
                    requestKeywords: "batchnolist",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                },
                list: {
                    requestType: "datacenter",
                    requestKeywords: "terminals",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    // productID: "",  //产品ID
                    // batchNo: "",      //批次号
                    useStatus: "1", //使用状态
                    page: 1,
                    limit: 10
                },
                search: {
                    val: ""
                }
            },
            renderData: {
                list: []
            }
        };
    },
    methods: {
        onSearch() {
            alert(1);
        },
        onPullingDown() {
            this.renderData.list = [];
            this.queryData.list.page = 1;
            this.terminalList();
        },
        // 触发上拉加载
        onPullingUp() {
            this.queryData.list.page++;
            this.terminalList();
        },
        confirm() {
            if (this.checkList.length == 0) {
                Toast("请选择终端");
            } else {
                this.$router.push({
                    name: "dial-code-subordinate",
                    params: {
                        terminalNoId: this.checkList.join(),
                        id: this.byProduct.value
                    }
                });
            }
        },
        handleCheckedCitiesChange() {
            // alert(JSON.stringify(this.checkList))
        },
        byProductChange() {
            this.queryData.list.productID = this.byProduct.value;
            this.renderData.list = [];
            this.queryData.list.page = 1;
            this.terminalList();
        },
        byBatchChange() {
            this.queryData.list.batchNo = this.byBatch.value;
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
        choiceBatch() {
            getServer(this.queryData.batch).then(res => {
                // console.log(response[res.data.responseStatus])
                if (res.data.responseStatus === 1) {
                    this.byBatch.options = res.data.data;
                }
            });
        },
        terminalList() {
            // Indicator.open();
            getServer(this.queryData.list).then(res => {
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
        // 下拉刷新
    },
    created() {
        this.choiceProduct();
        this.choiceBatch();
        // this.terminalList()
    }
};
</script>

<style lang="scss">
.van-search {
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
.my-terminal-list {
    height: 11rem;
}
.my-terminal-list .dial-codelist {
    height: 11rem;
}
.my-terminal-list .scroll-list-wrap {
    height: 11rem;
    overflow: auto;
    .item {
        padding: 10px 10px;
        &:nth-child(2n + 1) {
            background: #ccc;
        }
    }
}
.dial-code .van-checkbox-group {
    float: right;
}
.dial-code .el-checkbox__label {
    display: none;
}
.dial-code .van-list {
    padding-bottom: 0.6rem;
}
.dial-code .confirm {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    font-size: 0.3rem;
    color: #fff;
    background: #089cfe;
    width: 100%;
    line-height: 0.8rem;
    height: 0.8rem;
    padding: 0 0.2rem;
    box-sizing: border-box;
    z-index: 99999999999999999999999999999999;
}
.dial-code .confirm em {
    float: left;
}
.dial-code .confirm span {
    float: right;
}
.dial-code .el-input--suffix .el-input__inner {
    text-align: center;
}
.dial-code .no-data {
    margin-top: 67%;
}
.my-terminal-choice {
    position: fixed;
    left: 0;
    top: 0.7rem;
    z-index: 99;
    width: 100%;
}
.dial-code .my-terminal-choice {
    display: flex;
    font-size: 0.28rem;
    text-align: center;
    line-height: 0.4rem;
    padding: 0.2rem 0 0.1rem;
}
.dial-code .my-terminal-choice .el-select {
    flex: 1;
    background: url(../../../assets/images/my-terminal-choice-drop-down.png)
        no-repeat 2rem center;
    background-size: 10%;
}
.dial-code .my-terminal-choice .el-select input {
    border: none;
}
.dial-code .mint-popup {
    width: 100%;
}
.dial-code .mint-popup .picker-slot.picker-slot-right {
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

