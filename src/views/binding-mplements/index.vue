

<template>
    <div class="bingding-mplements">
        <div class="return">
            <img
                src="@/assets/images/return.png" alt="" 
                @click="backOff"/>
            <span>绑定机具</span>
        </div>
        <div>
            <div class="bingding-mplements-choice">
                <h5>选择品牌</h5>
                <span class="brand-name" @click="choiceBrand">{{choiceBrandVal}}</span>
            </div>
            <div class="bingding-mplements-choice">
                <h5 class="sn">SN号</h5>
                <el-input style="width: 60%;" v-model="SN" placeholder="请填写机具序列号"></el-input>
                <el-button type="text" @click="sys_click">自动识别</el-button>
            </div>
            <mt-popup
                v-model="popupVisible"
                position="bottom"
                closeOnClickModal="closeOnClickModal"
            >
                <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
            </mt-popup>
        </div>
        <div class="determine-binding">
            <el-button type="primary" :loading="determineBindingLoading" @click="determineBinding">确定绑定</el-button>
        </div>
    </div>
</template>


<script>
    import {wxSweepCode} from '@/api/binding-mplements'
    export default {
        data() {
            return {
                choiceBrandVal: "",
                popupVisible: false,
                closeOnClickModal: false,
                determineBindingLoading: false,
                SN: "",
                slots: [
                    {
                        flex: 1,
                        values: 
                            [
                                '点击选择品牌', 
                                '2015-02', 
                                '2015-03', 
                                '2015-04', 
                                '2015-05', 
                                '2015-06'
                            ],
                        className: 'slot1',
                        textAlign: 'right'
                    }
                ]
            }
        },
        methods: {
            choiceBrand () {
                this.popupVisible = true
            },
            onValuesChange (picker, values) {
                this.choiceBrandVal = String(values)
            },
            backOff () {
                this.$router.go(-1)
            },
            sys_click () {
                wxSweepCode().then( res => {
                      wx.config({
                        // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        debug: false,
                        // 必填，公众号的唯一标识
                        appId: jsondata.model.appId,
                        // 必填，生成签名的时间戳
                        timestamp: "" + jsondata.model.timestamp,
                        // 必填，生成签名的随机串
                        nonceStr: jsondata.model.nonceStr,
                        // 必填，签名
                        signature: jsondata.model.signature,
                        // 必填，需要使用的JS接口列表，所有JS接口列表
                        jsApiList: ['checkJsApi', 'scanQRCode']
                    });
                    wx.error(function (res) {
                        alert("出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
                    });
                    wx.ready(function () {
                        wx.checkJsApi({
                            jsApiList: ['scanQRCode'],
                            success: function (res) {
 
                            }
                        });
                        wx.scanQRCode({
                            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                            scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                            success: function (res) {
                                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                                alert("扫描结果："+result);
                                window.location.href = result;//因为我这边是扫描后有个链接，然后跳转到该页面
                            }
                        });
                    }); 
                })
            },
            determineBinding () { // 确定绑定 
                this.determineBindingLoading = true
            }
        }
    }
</script>


<style>
.bingding-mplements .brand-name {
    font-size: 0.26rem;
}
.bingding-mplements .mint-popup {
    width: 100%;
}
.bingding-mplements .mint-popup .picker-slot.picker-slot-right {
    text-align: center;
}
.bingding-mplements .bingding-mplements-choice {
    border-bottom: .01rem solid #ccc;
    line-height: 0.5rem;
    padding: .24rem;
    overflow: hidden;
}
.bingding-mplements .bingding-mplements-choice h5 {
    float: left;
    font-size: 0.3rem;
    font-weight: normal;
    margin-right: .4rem;
}
.bingding-mplements .bingding-mplements-choice span {
    float: left;
    display: block;
}
.bingding-mplements .bingding-mplements-choice h5.sn {
    line-height: .6rem;
}
.bingding-mplements .el-input {
    float: left;
}
.bingding-mplements .el-input input {
    height: .6rem;
    border: none;
    padding: 0;
}
.bingding-mplements .el-button {
    float: left;
    padding: 0;
    line-height: .6rem;
    margin-left: .5rem;
}
.bingding-mplements .determine-binding {
   width: 90%; 
   margin: .3rem auto;
}
.bingding-mplements .determine-binding .el-button {
    width: 100%;
    margin: 0;
}
</style>


