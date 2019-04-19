

<template>
    <div class="click-deliver-goods">
        <div class="return">
            <img
                src="@/assets/images/return.png" alt="" 
                @click='$router.go(-1)'/>
            <span>发货</span>
        </div>
        <div class="express-info">
            <div class="name line_bottom">
                <img src="@/assets/images/click-deliver-goods-name.png" alt="">
                <el-input v-model="queryData.sub.courierName" placeholder="请输入或选择快递名称"></el-input>
                <router-link to="/express">常用快递</router-link>
            </div>
            <div class="odd-numbers">
                <img src="@/assets/images/click-deliver-goods-odd-numbers.png" alt="">
                <el-input v-model="queryData.sub.waybillNumber" placeholder="请输入或扫码终端码"></el-input>
                <a href="javascript:;" @click="sys_click">扫码录入</a>
            </div>
        </div>
        <div class="interval"></div>
        <div>
            <div class="terminal-num-list">
                <h3>终端号列表</h3>
                <van-pull-refresh
                    v-model="isDownLoading"
                    @refresh="onDownRefresh"
                    v-if="isData"
                >
                    <van-list
                        v-model="isUpLoading"                 
                        :finished="upFinished"
                        finished-text="没有更多了"
                        @load="onLoadList"
                        :offset= "offset"
                    >
                        <ul>
                            <li>
                                <el-radio 
                                    v-model="radio" 
                                    :label="item.id" 
                                    v-for="item in renderData.oldList" 
                                    :key="item.id" 
                                    @change="changeRadio(item.terminalNo)"
                                >
                                {{item.terminalNo}}
                                </el-radio>
                            </li>
                        </ul>
                    </van-list>
                </van-pull-refresh>
                <div class="no-data" v-else>
                    <img src="@/assets/images/no-data.png" alt="">
                </div>
            </div>
        </div>
        <!-- isSelectedTerminal && renderData.sub.name == '' && renderData.sub.oddNumbers == ''  -->
        <div class="bottom-deliver-goods">
            <em>已选终端号：{{queryData.sub.terminalNo}}</em>
            <el-button type="text" 
            @click="sub">
            提交
            </el-button>
        </div>
    </div>
</template>

<script>
    import {getServer} from '@/api/index'
    import { MessageBox, Indicator, Toast } from "mint-ui";
    import wx from 'weixin-js-sdk'
    import response from '@/assets/js/response.js'
    export default {
        data () {
            return {
                radio: "1",
                isDownLoading: false,//下拉刷新
                isUpLoading: false,//上拉加载
                upFinished: false,//上拉加载完毕
                offset: 10, //滚动条与底部距离小于 offset 时触发load事件
                isData: true,
                queryData: {
                    list: {
                        requestType: 'agent',
                        requestKeywords: 'terminal',
                        platformID: this.$store.state.user.pid, 
                        userID: this.$store.state.user.uid, 
                        userPhone: this.$store.state.user.uphone, 
                        productID: this.$route.params.proid, 
                        useStatus: 1,
                        // limit: 10,
                        page: 0,
                    },
                    sweepCode: {
                        requestType: 'sharecode',
                        requestKeywords: 'jssdks',
                        code: "code"
                    },
                    sub: {
                        requestType:'agent', 
                        requestKeywords:'delivery', 
                        platformID: this.$store.state.user.pid, 
                        userID: this.$store.state.user.uid,
                        userPhone: this.$store.state.user.uphone,
                        orderID: this.$route.params.id,
                        courierName: JSON.parse(sessionStorage.getItem('expressName')) || "",
                        waybillNumber: "",
                        terminalNo: ""
                    }
                },
                renderData: {
                    list: [],
                    oldList: []
                }
            }
        },
        methods: {
            terminalList() {
                getServer(this.queryData.list).then( res => {
                    if( res.data.responseStatus === 1 ) {
                        this.isData = true
                        this.renderData.list = res.data.data
                        this.renderData.list.forEach( item => {
                            this.renderData.oldList.push(item)
                        })
                        this.isDownLoading = false
                        this.isUpLoading = false
                    } else if(res.data.responseStatus === 300 && this.queryData.list.page !== 1 ) {
                        this.upFinished = true
                        this.isUpLoading = false
                    } else if( res.data.responseStatus === 300 && this.queryData.list.page === 1 ) {
                        this.upFinished = false
                        this.isUpLoading = false
                        this.isData = false
                    }
                })
            },
            onLoadList () {
                // console.log("进来", this.queryData.list.page)
                this.queryData.list.page++
                // this.isUpLoading = true
                // console.log(this.queryData.list.page)
                this.terminalList()
            },
            onDownRefresh(){
                this.queryData.list.page = 1
                this.renderData.oldList = []
                this.isDownLoading = true
                this.terminalList()
            },
            sys_click () {
                this.queryData.sweepCode.code = window.location.href.split('#')[0]
                getServer(this.queryData.sweepCode).then( res => {
                    if( res.data.responseStatus === 1 ) {
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
                            jsApiList: ['checkJsApi', 'scanQRCode']
                        });
                        wx.error(function (res) {
                            // alert("出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
                        });
                        var $this = this;
                        wx.ready(function () {
                            wx.scanQRCode({
                                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                                scanType: ["barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                                success: function (res) {
                                    setTimeout( () => {
                                        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                                        if( result.indexOf(",") >= 0 ){
                                            var tempArray = result.split(',');
                                            var tempNum = tempArray[1];
                                            $this.queryData.sub.waybillNumber = tempNum
                                        } else{
                                            Toast("获取失败")
                                        }
                                        // $this.queryData.confirmBinding.terminal = result
                                    }, 300)
                                }
                            })
                        }); 
                    }
                })
            },
            changeRadio(terminalNo) {
                this.queryData.sub.terminalNo = terminalNo
            },
            sub () {
                if( this.queryData.sub.courierName == '' ) {
                    Toast("请选择快递")
                } else if( this.queryData.sub.waybillNumber == ''  ) {
                    Toast("请选择快递单号")
                } else if( this.queryData.sub.terminalNo == '' ) {
                    Toast("请选择终端号")
                } else {
                    MessageBox.confirm("您确定要发货吗?", "发货")
                    .then(action => {
                        getServer(this.queryData.sub).then( res => {
                            if( res.data.responseStatus === 1 ) {
                                Toast("发货成功")
                                this.$router.go(-1)
                            } else {
                                Toast(response[res.data.responseStatus])
                            }
                        })
                    })
                    .catch(() => {});
                }
            }
        }
    }
</script>

<style>
.bottom-deliver-goods {
    position: fixed;
    bottom: 0;
    font-size: .3rem;
    overflow: hidden;
    width: 100%;
    padding: .2rem 0;
    background: #fff;
}
.bottom-deliver-goods .el-button--text {
    float: right;
    margin-right: .2rem;
    padding: 0;
}
.bottom-deliver-goods em {
    float: left;
    margin-left: .2rem;
}
.click-deliver-goods .express-info {
    margin-top:40px;
}
.click-deliver-goods .express-info>div {
    overflow: hidden;
    /* margin-top: .3rem; */
    padding: 0 .2rem; 
}
/* .click-deliver-goods .express-info div:first-child {
    border-bottom: .01rem solid #ccc;
    padding-bottom: .2rem;
} */
.click-deliver-goods .express-info>div{
    padding:10px 15px;
}
.click-deliver-goods .express-info img {
    width:20px;
    height:20px;
    padding: .1rem;
    border-radius: 50%;
    float: left;
    background-color: #409EFF;
    margin-top:5px;
}
.click-deliver-goods .express-info .el-input {
    width: 60%;
    float: left;
}
.click-deliver-goods .express-info .el-input input {
    border: none;
}
.click-deliver-goods .express-info div a {
    float: right;
    color: #409EFF;
    font-size: .26rem;
    line-height: .8rem;
}
.terminal-num-list {
    padding: 0 .2rem;
    margin-top: .5rem;
    padding-bottom: .8rem;
}
.terminal-num-list h3 {
    font-size: .3rem;
    font-weight: normal;
    margin: .4rem 0 .2rem 0;
}
.terminal-num-list ul li {
    font-size: .28rem;
    line-height: .4rem;
    padding: .1rem .2rem;
}
.terminal-num-list ul li .el-radio {
    margin: .2rem 0;
    display: block;
}
</style>


