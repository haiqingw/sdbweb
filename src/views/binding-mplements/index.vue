

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
          v-model="SN"
          placeholder="请填写机具序列号"
        ></el-input>
        <el-button type="text" @click="sys_click">自动识别</el-button>
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
       您需要支付：<em>{{deposit}}</em>元押金
    </div>
    <!-- 押金说明 -->
    <div class="depositExplainMain">
      <h3>问：为什么要支付押金?</h3>
      <div>
        答：防止恶意领取。激活后押金自动解冻，提现即可！
      </div>
    </div>
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
    import { getBindingMplements } from '@/api/binding-mplements'
    import { getWexinPay, getBackEndWexinPay } from '@/api/wexinPay'
    import wx from 'weixin-js-sdk'
    export default {
        data() {
            return {
                deposit: "0.00",
                choiceBrandVal: "",
                popupVisible: false,
                closeOnClickModal: false,
                determineBindingLoading: false,
                SN: "",
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
                        requestType: 'agent', 
                        requestKeywords: 'oneclick', 
                        platformID: this.$store.state.user.pid, 
                        userID: this.$store.state.user.uid, 
                        userPhone: this.$store.state.user.uphone, 
                        childID: "", 
                        machineID: "", 
                        terminal: ""
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
                // console.log(values)
                this.choiceBrandVal = String(values[0].name)
            },
            sys_click () {
                getBindingMplements().then( res => {
                    console.log(res)
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
            brand () {
                getBindingMplements(this.queryData.brand).then( res => {
                    this.slots[0].values = res.data.data
                    // res.data.data.forEach(item => {
                    //   .push(item.name)
                    // })
                })
            },
            confirmBinding () { // 确定绑定 
                this.determineBindingLoading = true
                getBackEndWexinPay().then( res => {
                    //成功状态下  
                    if (res.data.status) {
                    // 存储微信支付数据data
                    let data = res.data.data;
                    console.log("即将跳转微信支付");
                    //函数为分装过得  (就是调用微信支付)
                    getWexinPay(
                        {
                            appId: data.appId,
                            nonceStr: data.nonceStr,
                            package: data.package,
                            paySign: data.paySign,
                            signType: data.signType,
                            timeStamp: data.timeStamp
                        },
                        //成功回调函数
                        res => {
                            that.$router.push({ path: "/vip" });
                        }
                    );
                    } 
                    else {
                        console.log("失败")
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
  margin-top: 0.8rem;
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
  padding: 0.24rem;
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
    right:10px;
    top:0.5rem;
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


