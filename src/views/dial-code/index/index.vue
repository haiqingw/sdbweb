
<template>
    <div class="dial-code">
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)">
            <span>拨码</span>
            <router-link class="withdrawalRecord" to="/dial-code-list" style="color:#fff;">拨码记录</router-link>
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
                <van-search @search="onSearch" v-model="queryData.searchVal"/>
                <!-- <el-input v-model="search"></el-input> -->
                <el-button type="text" @click="sys_click">扫码</el-button>
            </div>
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
                                <van-checkbox-group v-model="checkList">
                                    <van-checkbox :name="item.id"></van-checkbox>
                                </van-checkbox-group>
                            </div>
                            <div class="terminal-number">{{item.terminalNo}}</div>
                            <div class="time-batch">
                                <div class="left">
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
import wx from 'weixin-js-sdk'
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
                    limit: 10,
                    terminals: ""
                },
                searchVal: "",
                sweepCode: {
                    requestType: "sharecode",
                    requestKeywords: "jssdks",
                    code: "code"
                }
            },
            renderData: {
                list: []
            }
        };
    },
    methods: {
        onSearch() {
            this.queryData.list.page = 1;
            this.terminalList();
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
            // alert(JSON.stringify(this.checkList))
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
            if (this.queryData.searchVal === "") {
                delete this.queryData.list.terminals;
            } else {
                this.queryData.list.terminals = this.queryData.searchVal;
            }
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
                    // this.checkList.push("35943")
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
        sys_click() {
            this.queryData.sweepCode.code = window.location.href.split("#")[0];
            getServer(this.queryData.sweepCode).then(res => {
                if (res.data.responseStatus === 1) {
                    wx.config({
                        // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        debug: false,
                        // 必填，公众号的唯一标识
                        appId: res.data.data.appId,
                        // 必填，生成签名的时间戳
                        timestamp: res.data.data.timestamp,
                        // 必填，生成签名的随机串
                        nonceStr: res.data.data.nonceStr,
                        // 必填，签名
                        signature: res.data.data.signature,
                        // 必填，需要使用的JS接口列表，所有JS接口列表
                        jsApiList: ["checkJsApi", "scanQRCode"]
                    });
                    wx.error(function(res) {
                        // alert("出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
                    });
                    var $this = this;
                    wx.ready(function() {
                        // wx.checkJsApi({
                        //     jsApiList: ['scanQRCode', 'checkJsApi'],
                        //     success: function (res) {

                        //     }
                        // });f
                        wx.scanQRCode({
                            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                            // scanType: ["barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                            scanType: ["qrCode", "barCode"],
                            success: function(res) {
                                setTimeout(() => {
                                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                                    if (result.indexOf(",") >= 0) {
                                        var tempArray = result.split(",");
                                        var tempNum = tempArray[1];
                                        $this.queryData.searchVal = tempNum;
                                        $this.queryData.list.page = 1;
                                        $this.terminalList();
                                    } else {
                                        Toast("获取失败");
                                    }
                                    // $this.queryData.confirmBinding.terminal = result
                                }, 300);
                            }
                        });
                    });
                }
            });
        }
    },
    created() {
        this.choiceProduct();
        this.choiceBatch();
        // this.terminalList()
    }
};
</script>

<style lang="scss">
.dial-code .search {
    text-align: center;
    width: 50%;
}
.dial-code .search .el-button {
    padding: 0;
    float: right;
    // padding-right: 0.1rem;
    line-height: 32px;
}
.dial-code .no-data {
    width: 70%;
}
.dial-code .van-checkbox {
    overflow: initial;
}
.dial-code .van-checkbox__icon .van-icon {
    width: 0.5rem;
    height: 0.5rem;
    font-size: 0.4rem;
    line-height: 0.5rem;
}
.dial-code .van-search {
    padding: 0;
    width: 80%;
    float: left;
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
    height: 10rem;
}
.my-terminal-list .dial-codelist {
    height: 10rem;
}
.my-terminal-list .scroll-list-wrap {
    height: 10rem;
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
    // margin-top: .5rem;
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

