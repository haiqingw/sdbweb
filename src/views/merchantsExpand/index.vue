<template>
    <div>
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
            <span>商户拓展</span>
        </div>
        <div class="merchantsExpandMain">
            <div class="tipTextMain">
                <img src="@/assets/images/exclamationIcon.png" alt="感叹号" />仅限于业务员给用户装机
            </div>
            <div class="merchantsFromMain">
                <!-- 选择产品 -->
                <van-cell-group>
                    <van-field
                        v-model="proName"
                        readonly
                        label="产品分类"
                        placeholder="请选择产品分类"
                        right-icon="arrow"
                        @click="selectType()"
                    />
                    <!-- <van-picker :columns="columns" /> -->
                    <van-field
                        v-model="queryData.confirmInstallEquipment.terminal"
                        label="终端编号"
                        placeholder="手动输入或扫一扫"
                        right-icon="scan"
                        @click-right-icon="scanCode"
                    />
                </van-cell-group>
                <van-popup v-model="show" position="bottom" :overlay="true">
                    <van-picker
                        show-toolbar
                        title="请选择产品"
                        :columns="columns"
                        @cancel="onCancel"
                        @confirm="onConfirm"
                        value-key="productName"
                    />
                </van-popup>
                <div class="interval"></div>
                <van-cell-group>
                    <van-row>
                        <van-col span="16">
                            <van-cell title="商户类型" :label="subLabel" />
                        </van-col>
                        <van-col span="8">
                            <van-tabs
                                type="card"
                                style="width:2.8rem;font-size:14px;float:right; margin-top:10px;"
                                @click="bindTypeSwicth"
                            >
                                <van-tab title="新增"></van-tab>
                                <van-tab title="现有"></van-tab>
                            </van-tabs>
                        </van-col>
                    </van-row>
                </van-cell-group>
                <!-- 新增 -->
                <van-cell-group v-show="formWay">
                    <van-field
                        v-model="queryData.confirmInstallEquipment.busname"
                        label="商户姓名"
                        placeholder="请输入用户名"
                    />
                    <van-field
                        v-model="queryData.verificationCode.phone"
                        label="商户电话"
                        placeholder="请输入手机号"
                    />
                    <van-field
                        center
                        clearable
                        v-model="verificationCodeVal"
                        label="短信验证码"
                        placeholder="请输入短信验证码"
                    >
                        <van-button
                            @click="verificationCode"
                            slot="button"
                            size="small"
                            type="info"
                            :disabled="isSend"
                        >{{verificationCodeText}}</van-button>
                    </van-field>
                </van-cell-group>
                <!-- 现有 -->
                <van-cell-group v-show="!formWay">
                    <van-field
                        v-model="merchantNamePhone"
                        readonly
                        label="选择商户"
                        placeholder="请选择商户"
                        right-icon="arrow"
                        @click="selectMerchants()"
                    />
                </van-cell-group>
                <!-- 支付押金 -->
                <div class="payCashPledgeMain">
                    您需要支付：
                    <span>{{money?money:"0.00"}}</span>元绑定冻结金额
                </div>
                <!-- 确认提交 -->
                <div class="submitButtonMain">
                    <van-button type="info" @click="confirmInstallEquipment">确认装机</van-button>
                </div>
            </div>
        </div>
        <!-- 选择商户弹出 -->
        <div class="pupopMain" v-show="popupShow">
            <van-search
                v-model="searchValue"
                class="popupSearch"
                placeholder="请输入商户姓名或手机号"
                show-action
                shape="round"
                @search="onSearch"
            >
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>
            <div class="selectMerchantsBody" v-if="isData">
                <van-radio-group v-model="radio" @change="radioChange()">
                    <van-cell-group>
                        <!-- <van-cell title="任勇强(13296905340)" clickable @click="radio = '1'">
                            <van-radio name="1"/>
                        </van-cell>-->
                        <van-cell
                            v-for="item in renderData.subordinateMerchantsList"
                            :key="item.id"
                            :title="item.busname + (item.phone)"
                            clickable
                        >
                            <van-radio :name="item.id" />
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
            </div>
            <div class="no-data" v-else>
                <img src="@/assets/images/no-data.png" alt />
            </div>
            <div class="selectMerchantsFooter flex">
                <van-button type="info" @click="popupShow = false">取消选择</van-button>
                <van-button type="info" @click="confirmSelect">确定选择</van-button>
            </div>
        </div>
    </div>
</template>
<script>
import { getServer } from "@/api/index";
import { checkPhone } from "@/utils/verification.js";
import { Toast } from "mint-ui";
import response from "@/assets/js/response.js";
import wx from "weixin-js-sdk";
export default {
    data() {
        return {
            isSend: false,
            show: false,
            formWay: true,
            popupShow: false,
            verificationCodeText: "发送验证码",
            columns: [],
            proName: "",
            searchValue: "",
            merchantNamePhone: "",
            radio: "",
            verificationCodeVal: "",
            isData: true,
            subLabel: "新增：默认给用户注册账号，登录密码请留意短信通知",
            Verify: "",
            money: "",
            queryData: {
                relogin: {
                    requestType: "buslogin",
                    requestKeywords: "relogin",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    openid: this.$store.state.user.opid
                },
                logout: {
                    requestType: "personal",
                    requestKeywords: "launchland",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                },
                sweepCode: {
                    requestType: "sharecode",
                    requestKeywords: "jssdks",
                    code: "code"
                },
                confirmInstallEquipment: {
                    requestType: "development",
                    requestKeywords: "mechatsextends",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    terminal: "",
                    productID: "",
                    types: "NEW",
                    busname: "",
                    phone: "",
                    childID: ""
                    //                  商户拓展
                    // * NEW : 参数 busname 商户名称 phone 手机号（页面做验证必传）
                    // * OLD : 参数 childID 下级装机人ID （必传）
                },
                listProduct: {
                    requestType: "personal",
                    requestKeywords: "agentproduct",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                },
                verificationCode: {
                    requestType: "operating",
                    requestKeywords: "sendmsg",
                    type: "extends",
                    phone: "",
                    platformID: this.$store.state.user.pid
                },
                subordinateMerchants: {
                    requestType: "development",
                    requestKeywords: "buslists",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    productID: "",
                    keywords: ""
                }
            },
            renderData: {
                subordinateMerchantsList: []
            }
        };
    },
    methods: {
        relogin() {
            // alert(this.queryData.relogin.openid)
            getServer(this.queryData.relogin).then(res => {
                if (res.data.responseStatus === 1) {
                    if (res.data.status === 1) {
                        this.listProduct();
                    } else if (res.data.status === 2) {
                        Toast("您的账号已被他人登陆");
                        setTimeout(() => {
                            this.$store
                                .dispatch("LogOut", this.queryData.logout)
                                .then(() => {
                                    // location.reload();
                                    setTimeout(() => {
                                        this.$router.push({
                                            // path: "/loginoid",
                                            path: "/loginoid",
                                            query: {
                                                plat: this.$store.state.user
                                                    .plat
                                            }
                                        });
                                    }, 500);
                                });
                        }, 1000);
                    }
                }
            });
        },
        verificationCode() {
            if (
                this.queryData.verificationCode.phone == "" ||
                this.queryData.verificationCode.phone == undefined
            ) {
                Toast({
                    message: "请输入手机号",
                    duration: 1000
                });
            } else if (
                !/^1(3|4|5|6|7|8|9)\d{9}$/.test(
                    this.queryData.verificationCode.phone
                )
            ) {
                Toast({
                    message: "手机号格式不正确",
                    duration: 1000
                });
            } else {
                var time = 120;
                this.isSend = true;
                this.verificationCodeText = "验证码发送中";
                getServer(this.queryData.verificationCode).then(res => {
                    if (res.data.responseStatus === 1) {
                        this.Verify = res.data.code;
                        var inter = setInterval(() => {
                            time--;
                            this.verificationCodeText = time + "s后重新获取";
                            if (time < 0) {
                                clearInterval(inter);
                                this.isSend = false;
                                this.verificationCodeText = "获取验证码";
                                this.sendtp = true;
                            }
                        }, 1000);
                    } else {
                        this.isSend = false;
                        this.verificationCodeText = "获取验证码";
                        this.sendtp = true;
                        Toast({
                            message: response[res.data.responseStatus],
                            duration: 1000
                        });
                    }
                });
            }
        },
        selectType() {
            this.show = !this.show;
        },
        onConfirm(obj, index) {
            this.proName = obj.productName;
            this.show = false;
            this.queryData.confirmInstallEquipment.productID = obj.id;
            this.queryData.subordinateMerchants.productID = obj.id;
            this.money = obj.money;
        },
        onCancel() {
            this.show = false;
        },
        scanCode() {
            this.queryData.sweepCode.code = window.location.href.split("#")[0];
            getServer(this.queryData.sweepCode).then(res => {
                // console.log(res)
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
                        // });
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
                                        $this.queryData.confirmInstallEquipment.terminal = tempNum;
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
        },
        bindTypeSwicth(index, title) {
            if (index == 0 && title == "新增") {
                this.queryData.confirmInstallEquipment.types = "NEW";
                this.subLabel =
                    "新增：默认给用户注册账号，登录密码请留意短信通知";
                this.formWay = true;
            } else if (index == 1 && title == "现有") {
                this.queryData.confirmInstallEquipment.types = "OLD";
                this.subLabel = "现有：请确保用户已经扫您的推广码，注册账号";
                this.formWay = false;
            }
        },
        selectMerchants() {
            if (this.proName == "") {
                Toast("请选择产品");
                return;
            }
            this.popupShow = !this.popupShow;
            this.subordinateMerchants();
        },
        onSearch() {
            this.subordinateMerchants();
        },
        confirmSelect() {
            if (this.radio === "") {
                this.merchantNamePhone = "";
            } else {
                let data = "";
                data = this.renderData.subordinateMerchantsList.filter(
                    item => item.id == this.radio
                )[0];
                this.merchantNamePhone = `${data.busname}(${data.phone})`;
            }
            this.queryData.confirmInstallEquipment.childID = this.radio;
            this.popupShow = !this.popupShow;
        },
        NewConfirmInstallEquipment() {
            if (this.proName == "") {
                Toast("请选择产品");
                return;
            }
            if (this.queryData.confirmInstallEquipment.terminal == "") {
                Toast("请输入终端号");
                return;
            }
            if (this.queryData.confirmInstallEquipment.busname == "") {
                Toast("请输入商户名称");
                return;
            }
            if (this.queryData.verificationCode.phone == "") {
                Toast("请输入手机号");
                return;
            }
            if (
                !/^1(3|4|5|6|7|8|9)\d{9}$/.test(
                    this.queryData.verificationCode.phone
                )
            ) {
                Toast("手机号格式有误！");
                return;
            }
            if (this.verificationCodeVal == "") {
                Toast("请输入验证码");
                return;
            }
            if (this.verificationCodeVal != this.Verify) {
                Toast("验证码有误！");
                return;
            }
            // return new Promise( (resolve, reject) => {
            //     resolve()
            // })
            getServer(this.queryData.confirmInstallEquipment).then(res => {
                if (res.data.responseStatus === 1) {
                    if (res.data.isPay == 1) {
                        window.location.href = res.data.url;
                    } else if (res.data.isPay == 2) {
                        // console.log("直接帮")
                        // alert("直接帮")
                        Toast("绑定成功");
                        setTimeout(() => {
                            this.$router.push({ path: "/" });
                        }, 300);
                    }
                } else {
                    Toast(response[res.data.responseStatus]);
                }
            });
        },
        oldConfirmInstallEquipment() {
            if (this.proName == "") {
                Toast("请选择产品");
                return;
            }
            if (this.queryData.confirmInstallEquipment.terminal == "") {
                Toast("请输入终端号");
                return;
            }
            getServer(this.queryData.confirmInstallEquipment).then(res => {
                if (res.data.responseStatus === 1) {
                    if (res.data.isPay == 1) {
                        window.location.href = res.data.url;
                    } else if (res.data.isPay == 2) {
                        // console.log("直接帮")
                        // alert("直接帮")
                        Toast("绑定成功");
                        setTimeout(() => {
                            this.$router.push({ path: "/" });
                        }, 300);
                    }
                } else {
                    Toast(response[res.data.responseStatus]);
                }
            });
        },
        confirmInstallEquipment() {
            if (this.queryData.confirmInstallEquipment.types === "NEW") {
                delete this.queryData.confirmInstallEquipment.childID;
                this.queryData.confirmInstallEquipment.phone = this.queryData.verificationCode.phone;
                this.NewConfirmInstallEquipment();
            } else {
                delete this.queryData.confirmInstallEquipment.busname;
                delete this.queryData.confirmInstallEquipment.phone;
                this.oldConfirmInstallEquipment();
            }
        },
        radioChange() {},
        listProduct() {
            getServer(this.queryData.listProduct).then(res => {
                if (res.data.responseStatus === 1) {
                    this.columns = res.data.data;
                }
            });
        },
        subordinateMerchants() {
            if (this.searchValue === "") {
                delete this.queryData.subordinateMerchants.keywords;
            } else {
                this.queryData.subordinateMerchants.keywords = this.searchValue;
            }
            getServer(this.queryData.subordinateMerchants).then(res => {
                if (res.data.responseStatus === 1) {
                    this.isData = true;
                    this.renderData.subordinateMerchantsList = res.data.data;
                } else if (this.data.responseStatus === 300) {
                    this.isData = false;
                }
            });
        }
    },
    created() {
        this.relogin();
    }
};
</script>
<style lang="scss">
.merchantsExpandMain {
    padding-top: 0.8rem;
}
.tipTextMain {
    height: 40px;
    background: #f1f1f1;
    line-height: 41px;
    padding: 0 15px;
    font-size: 14px;
    overflow: hidden;
    img {
        width: 16px;
        height: 16px;
        float: left;
        margin: 12px 8px 0 0;
    }
}
.submitButtonMain {
    padding: 15px;
    button {
        width: 100%;
        line-height: 40px;
        height: 40px;
        display: block;
    }
}
.selectMerchantsMain {
    width: 100%;
}
.pupopMain {
    width: 100%;
    height: 100%;
    position: fixed;
    background: #fff;
    left: 0;
    top: 0;
    z-index: 999999999 !important;
    overflow-x: hidden;
    padding: 70px 0 72px;
    box-sizing: border-box;
}
.selectMerchantsBody {
    padding: 0 16px;
}
.selectMerchantsFooter {
    padding: 16px;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    height: 72px;
    z-index: 9999;
    background: #fff;
    justify-content: space-between;
    button {
        // width: 3.3rem;
        width: 45%;
        height: 40px;
        line-height: 41px;
        font-size: 14px;
        display: block;
        overflow: hidden;
        &:first-of-type {
            background: #ccc;
            border: #ccc;
        }
    }
}
.popupSearch {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 999999;
}
.payCashPledgeMain {
    line-height: 60px;
    font-size: 14px;
    color: #333;
    padding: 0 16px;
    span {
        font-size: 20px;
        color: #f33;
        font-weight: bold;
        padding-right: 4px;
    }
}
.van-field__right-icon i.van-icon-scan {
    font-size: 22px !important;
}
</style> 