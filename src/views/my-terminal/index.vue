

<template>
    <div class="my-terminal">
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
            <span>我的终端</span>
            <!-- <a
                class="withdrawalRecord"
                @click="dialCodeList"
                href="javascript:;"
                style="color:#fff;"
            >退码列表</a>-->
            <a
                href="javascript:;"
                v-if="renderData.keyacceptcheckStatus"
                @click="keyAcceptFn"
                class="returnRightBtn"
            >一键接收</a>
        </div>
        <div class="my-terminal-choice line_bottom">
            <el-select v-model="byProduct.value" @change="byProductChange">
                <el-option
                    v-for="item in byProduct.options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                ></el-option>
            </el-select>
            <el-select v-model="usageState.value" placeholder="使用状态" @change="usageStateChange">
                <el-option
                    v-for="item in usageState.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
            <el-select v-model="byBatch.value" placeholder="按批次" @change="byBatchChange">
                <el-option
                    v-for="item in byBatch.options"
                    :key="item.batchNo"
                    :label="item.batchNo"
                    :value="item.batchNo"
                ></el-option>
            </el-select>
        </div>
        <div class="my-terminal-list">
            <div class="scroll-list-wrap">
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
                            <img
                                v-if="item.isActive == 2"
                                class="stampImgR"
                                src="@/assets/images/stampImg-active.png"
                                alt="已激活"
                            />
                            <img
                                v-if="item.isActive == 1"
                                class="stampImgR"
                                src="@/assets/images/stampImg.png"
                                alt="未激活"
                            />
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
                            <div
                                class="code-out"
                                v-if="item.isActive == 1"
                                @click="codeOut(item.id, item.useID, item.terminalNo)"
                            >
                                <span>退码</span>
                            </div>
                        </li>
                    </ul>
                </cube-scroll>
                <div class="no-data" v-else>
                    <img src="@/assets/images/no-data.png" alt />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getServer } from "@/api/index";
import response from "@/assets/js/response.js";
import { Indicator, Toast, MessageBox } from "mint-ui";
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
            _isData: true,
            get isData() {
                return this._isData;
            },
            set isData(value) {
                this._isData = value;
            },
            byProduct: {
                options: [],
                value: ""
            },
            usageState: {
                options: [
                    {
                        value: "2",
                        label: "已使用"
                    },
                    {
                        value: "1",
                        label: "未使用"
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
                    requestType: "agent",
                    requestKeywords: "product",
                    platformID: this.$store.state.user.pid
                },
                batch: {
                    requestType: "agent",
                    requestKeywords: "batchnolist",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                },
                list: {
                    requestType: "agent",
                    requestKeywords: "terminal",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    // productID: "",  //产品ID
                    // batchNo: "",      //批次号
                    // useStatus: "",  //使用状态
                    page: 1,
                    limit: 10
                },
                codeOut: {
                    requestType: "terminalmanage",
                    requestKeywords: "backyards",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    childID: "", //（下级商户ID）,
                    machineID: "", // 终端列表ID（接口输出的ID）,
                    terminal: "" //终端号
                },
                //一键接收 开关
                keyAcceptCheck: {
                    requestType: "checke",
                    requestKeywords: "keyacceptcheck",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                },
                //一键接收 操作
                keyAcceptPara: {
                    requestType: "terminalmanage",
                    requestKeywords: "keytoaccept",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                }
            },
            renderData: {
                keyacceptcheckStatus: false,
                list: []
            }
        };
    },
    methods: {
        scrollTo() {
            this.$refs.scroll.scrollTo(0, 0);
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
        // dialCodeList() {
        //     this.$router.push({
        //         name: "dial-code-list",
        //         params: { id: this.byProduct.value }
        //     });
        // },
        codeOut(id, useId, terminalNo) {
            this.queryData.codeOut.childID = useId;
            this.queryData.codeOut.machineID = id;
            this.queryData.codeOut.terminal = terminalNo;
            MessageBox.confirm("您确定要退码吗?", "退码")
                .then(action => {
                    getServer(this.queryData.codeOut).then(res => {
                        if (res.data.responseStatus === 1) {
                            Toast("退码成功");
                            this.renderData.list = [];
                            this.queryData.list.page = 1;
                            this.terminalList();
                        } else {
                            Toast(response[res.data.responseStatus]);
                        }
                    });
                })
                .catch(() => {});
        },
        byProductChange() {
            if (this.isData) {
                this.scrollTo();
            }
            this.queryData.list.productID = this.byProduct.value;
            this.renderData.list = [];
            this.queryData.list.page = 1;
            this.terminalList();
        },
        usageStateChange() {
            if (this.isData) {
                this.scrollTo();
            }
            this.queryData.list.useStatus = this.usageState.value;
            this.renderData.list = [];
            this.queryData.list.page = 1;
            this.terminalList();
        },
        byBatchChange() {
            if (this.isData) {
                this.scrollTo();
            }
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
                        this.byProduct.value = res.data.data[0].name;
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
        // 一键接收 开关
        keyAcceptCheck() {
            getServer(this.queryData.keyAcceptCheck).then(res => {
                if (res.data.responseStatus === 1) {
                    if (res.data.status == 1) {
                        this.renderData.keyacceptcheckStatus = true;
                    } else if (res.data.status == 2) {
                        this.renderData.keyacceptcheckStatus = false;
                    }
                }
            });
        },
        // 一键接收 操作
        keyAcceptFn() {
            if (isNaN(this.byProduct.value)) {
                this.queryData.keyAcceptPara.productID = this.byProduct.options[0].id;
            } else {
                this.queryData.keyAcceptPara.productID = this.byProduct.value;
            }
            getServer(this.queryData.keyAcceptPara).then(res => {
                if (res.data.responseStatus === 1) {
                    Toast("接收成功");
                    this.terminalList();
                } else {
                    Toast(response[res.data.responseStatus]);
                }
            });
        }
    },
    created() {
        this.keyAcceptCheck();
        this.choiceProduct();
        this.choiceBatch();
    }
};
</script>

<style lang="scss">
.my-terminal-list {
    position: fixed;
    width: 100%;
    height: 100%;
}
.my-terminal-list .isActive {
    text-align: center;
    line-height: 0.3rem;
    padding-bottom: 0.2rem;
}
.my-terminal-list {
    font-size: 0.3rem;
}
.my-terminal-list .before-trigger {
    font-size: 0.3rem;
}
.my-terminal-list {
    // height: 11rem;
}
.my-terminal-list .scroll-list-wrap {
    // height: 11rem;
    height: 100%;
    overflow: auto;
    .item {
        padding: 10px 10px;

        &:nth-child(2n + 1) {
            background: #ccc;
        }
    }
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
    margin-top: 70%;
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
    background: url(../../assets/images/my-terminal-choice-drop-down.png)
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
    position: relative;
}
.my-terminal-list ul li .stampImgR {
    width: 1.6rem;
    height: 1.6rem;
    position: absolute;
    bottom: 0.9rem;
    // bottom: .1rem;
    right: 0.1rem;
    z-index: 99;
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
.returnRightBtn {
    overflow: hidden;
    width: 1.5rem;
    height: 0.52rem;
    line-height: 0.53rem;
    background: #fff;
    color: #089cfe;
    font-size: 0.28rem;
    text-align: center;
    position: absolute;
    right: 0.2rem;
    top: 50%;
    margin-top: -0.26rem;
    border-radius: 0.1rem;
}
</style>


