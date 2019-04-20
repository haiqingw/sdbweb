

<template>
  <div class="bingding-mplements">
    <!-- header -->
    <div class="return">
      <img src="@/assets/images/return.png" alt="" @click="$router.go(-1)" />
      <span>绑定机具</span>
    </div>
    <!-- body -->
    <div class="bingding-mplements-c">
      <div
        class="bingding-mplements-choice selectBindMain"
        @click="choiceBrand"
      >
        <h5>选择品牌</h5>
        <span class="brand-name">{{ choiceBrandVal }}</span>
      </div>
      <div class="bingding-mplements-choice">
        <h5 class="sn">SN号</h5>
        <el-input
          style="width: 60%;"
          v-model="queryData.confirmBinding.terminal"
          placeholder="请填写机具序列号"
        ></el-input>
        <el-button type="text" @click="sys_click">扫码识别</el-button>
      </div>
      <mt-popup
        v-model="popupVisible"
        position="bottom"
        closeOnClickModal="closeOnClickModal"
      >
        <mt-picker
          valueKey="name"
          :slots="slots"
          @change="onValuesChange"
        ></mt-picker>
      </mt-popup>
    </div>
    <!-- 支付押金 -->
    <div class="payDepositMain">
       您需要支付：<em>{{deposit}}</em>元绑定冻结金额
    </div>
    <!-- 押金说明 -->
    <!-- <div class="depositExplainMain">
      <h3>问：为什么要支付绑定押金?</h3>
      <div>
        答：防止恶意领取。激活后刷卡金额达标解冻相应金额，提现即可！
      </div>
    </div> -->
    <div class="determine-binding">
      <el-button
        type="primary"
        :loading="determineBindingLoading"
        @click="confirmBinding"
        style="line-height:0.8rem"
        >确定绑定</el-button
      >
    </div>
  </div>
</template>


<script>
    import { getServer } from '@/api/index'
    import response from '@/assets/js/response.js'
    import wx from 'weixin-js-sdk'
    import { Toast } from 'mint-ui';
    export default {
        data() {
            return {
                deposit: "0",
                choiceBrandVal: "",
                popupVisible: false,
                closeOnClickModal: false,
                determineBindingLoading: false,
                slots: [
                    {
                        flex: 1,
                        values: [
                            {
                                name: "请选择品牌",
                                id: 0
                            }
                        ],
                        className: 'slot1',
                        textAlign: 'right'
                    }
                ],
                queryData: {
                    brand: {
                        requestType: 'agent',
                        requestKeywords: 'product',
                        platformID: this.$store.state.user.pid
                    },
                    confirmBinding: {
                        requestType: 'terminalmanage',
                        requestKeywords: 'bindextreme', 
                        platformID: this.$store.state.user.pid,
                        userID: this.$store.state.user.uid,
                        userPhone: this.$store.state.user.uphone,
                        // machineID: "38809",
                        // K1020A71473
                        terminal: ""
                    },
                    searchChild: {
                        requestType: 'agent', 
                        requestKeywords: 'getbuslist', 
                        platformID: this.$store.state.user.pid, 
                        userID: this.$store.state.user.uid, 
                        userPhone: this.$store.state.user.uphone, 
                        keywords: ""
                    },
                    sweepCode: {
                        requestType: 'sharecode',
                        requestKeywords: 'jssdks',
                        code: "code"
                    }
                },
                renderData: {
                    brand: []
                }
            }
        },
        methods: {
            choiceBrand () {
                this.popupVisible = true
            },
            onValuesChange (picker, values) {
                this.deposit = values[0].frozen
                this.choiceBrandVal = String(values[0].name)
            },
            sys_click () {
                // this.queryData.sweepCode.code = window.location.href
                this.queryData.sweepCode.code = window.location.href.split('#')[0]
                // this.queryData.sweepCode.code = this.queryData.sweepCode.code.replace(/#[/]/g,'');
                // console.log(this.queryData.sweepCode.code)
                // alert(this.queryData.sweepCode.code)
                getServer(this.queryData.sweepCode).then( res => {
                    console.log(res)
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
                            // wx.checkJsApi({
                            //     jsApiList: ['scanQRCode', 'checkJsApi'],
                            //     success: function (res) {
                                    
                            //     }
                            // });
                            wx.scanQRCode({
                                needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                                scanType: ["barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                                success: function (res) {
                                    setTimeout( () => {
                                        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                                        if( result.indexOf(",") >= 0 ){
                                            var tempArray = result.split(',');
                                            var tempNum = tempArray[1];
                                            $this.queryData.confirmBinding.terminal = tempNum
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
            brand () {
                getServer(this.queryData.brand).then( res => {
                    this.slots[0].values = res.data.data
                })
            },
            confirmBinding () { // 确定绑定 
                this.determineBindingLoading = true
                if( this.queryData.confirmBinding.terminal === "" ) {
                    Toast("请填写机具序列号")
                    this.determineBindingLoading = false
                    return
                }
                getServer(this.queryData.confirmBinding).then( res => {
                    this.determineBindingLoading = false
                    if( res.data.responseStatus === 1 ) {
                        if( res.data.isPay == 1 ) {
                            window.location.href = res.data.url
                        } else if( res.data.isPay == 2 ) {
                            // console.log("直接帮")
                            // alert("直接帮")
                            Toast("绑定成功")
                            setTimeout( () => {
                                this.$router.go(-1)
                            }, 800)
                        }
                    } else {
                        Toast(response[res.data.responseStatus])
                    }
                })
            },
            searchChild () {
                getServer(this.queryData.searchChild).then( res => {
                    // console.log(response[res.data.responseStatus])
                    if( res.data.responseStatus === 1 ) {
                        this.queryData.confirmBinding.childID = res.data.data[0].id
                        console.log(this.queryData.confirmBinding.childID)
                    }
                })
            }
        },
        created () {
            this.brand()
        }
    }
</script>


<style lang="scss">
.bingding-mplements-c {
  margin-top: 0.9rem;
}
.bingding-mplements .brand-name {
  font-size: 0.3rem;
}
.bingding-mplements .mint-popup {
  width: 100%;
}
.bingding-mplements .mint-popup .picker-slot.picker-slot-right {
  text-align: center;
}
.bingding-mplements .bingding-mplements-choice {
  border-bottom: 0.01rem solid #ccc;
  line-height:30px;
  padding:0.27rem 0.24rem 0.24rem;
  overflow: hidden;
}
.bingding-mplements .bingding-mplements-choice h5 {
  float: left;
  font-size: 0.3rem;
  font-weight: normal;
  margin-right: 0.4rem;
}
.bingding-mplements .bingding-mplements-choice span {
  float: left;
  display: block;
  font-size:0.3rem;
}
.bingding-mplements .bingding-mplements-choice h5.sn {
  line-height: 0.6rem;
}
.bingding-mplements .el-input {
  float: left;
}
.bingding-mplements .el-input input {
  height: 0.6rem;
  border: none;
  padding: 0;
  font-size:0.3rem;
}
.bingding-mplements .el-button {
  float: right;
  padding: 0;
  line-height: 0.6rem;
}
.bingding-mplements .determine-binding {
  width: 90%;
  margin: 0.3rem auto;
}
.bingding-mplements .determine-binding .el-button {
  width: 100%;
  margin: 0;
}
.selectBindMain {
  position: relative;
  &:after {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid #ccc;
    position: absolute;
    right:0.4rem;
    top:0.46rem;
  }
}
.payDepositMain{
    padding:20px 15px 15px;
    font-size:16px;
    em{
        font-weight:bold;
        color:#f33;
        padding-right:5px;
        font-size:22px;
    }
}
.depositExplainMain{
   background:#f9f9f9;
   padding:15px;
   font-size:14px;
   line-height:24px;
   >h3{
     font-size:16px;
     padding-bottom:8px;
   }
}
</style>


