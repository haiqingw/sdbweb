<template>
    <div>
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)">
            <span>商户拓展</span>
        </div>
        <div class="merchantsExpandMain">
            <div class="tipTextMain">
                <img src="@/assets/images/exclamationIcon.png" alt="感叹号">仅限于业务员给用户装机
            </div>
            <div class="merchantsFromMain">
                <!-- 选择产品 -->
                <van-cell-group>
                    <van-field v-model="proName" readonly label="产品分类" placeholder="请选择产品分类" right-icon="arrow" @click="selectType()" />
                    <van-field v-model="phone" label="终端编号" placeholder="手动输入或扫一扫" right-icon="scan" @click-right-icon="scanCode()" />
                </van-cell-group>
                <van-popup v-model="show" position="bottom" :overlay="true">
                    <van-picker show-toolbar title="请选择产品" :columns="columns" @cancel="onCancel" @confirm="onConfirm" />
                </van-popup>
                <div class="interval"></div>
                <van-cell-group>
                    <van-row>
                        <van-col span="16">
                            <van-cell title="商户类型" :label="subLabel" /></van-col>
                        <van-col span="8">
                            <van-tabs type="card" style="width:2.8rem;font-size:14px;float:right; margin-top:10px;" @click="bindTypeSwicth">
                                <van-tab title="新增"></van-tab>
                                <van-tab title="现有"></van-tab>
                            </van-tabs>
                        </van-col>
                    </van-row>
                </van-cell-group>
                <!-- 新增 -->
                <van-cell-group v-show="formWay">
                    <van-field v-model="username" label="商户姓名" placeholder="请输入用户名" />
                    <van-field v-model="phone" label="商户电话" placeholder="请输入手机号" />
                    <van-field center clearable label="短信验证码" placeholder="请输入短信验证码">
                        <van-button slot="button" size="small" type="info">发送验证码</van-button>
                    </van-field>
                </van-cell-group>
                <!-- 现有 -->
                <van-cell-group v-show="!formWay">
                    <van-field v-model="phone" readonly label="选择商户" placeholder="请选择商户" right-icon="arrow" @click="selectMerchants()" />
                </van-cell-group>
                <!-- 支付押金 -->
                <div class="payCashPledgeMain">
                    您需要支付：<span>0.00</span>元绑定冻结金额
                </div>
                <!-- 确认提交 -->
                <div class="submitButtonMain">
                    <van-button type="info">确认装机</van-button>
                </div>
            </div>
        </div>
        <!-- 选择商户弹出 -->
        <div class="pupopMain" v-show="popupShow">
            <van-search v-model="searchValue" class="popupSearch" placeholder="请输入商户姓名或手机号" show-action shape="round" @search="onSearch">
                <div slot="action" @click="onSearch">搜索</div>
            </van-search>
            <div class="selectMerchantsBody">
                <van-radio-group v-model="radio" @change="radioChange()">
                    <van-cell-group>
                        <van-cell title="任勇强(13296905340)" clickable @click="radio = '1'">
                            <van-radio name="1" />
                        </van-cell>
                        <van-cell title="史晓宇(13777777777)" clickable @click="radio = '2'">
                            <van-radio name="2" />
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
            </div>
            <div class="selectMerchantsFooter">
                <van-button type="info" @click="confirmSelect()">确定选择</van-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show: false,
            formWay: true,
            popupShow: false,
            columns: ["闪POS", "鼎刷", "快钱"],
            proName: "",
            phone: "",
            username: "",
            searchValue: "",
            radio: "",
            subLabel: "新增：默认给用户注册刷多宝，登录密码请留意短信通知"
        };
    },
    methods: {
        selectType() {
            this.show = !this.show;
        },
        onConfirm(value, index) {
            this.proName = value;
            this.show = false;
        },
        onCancel() {
            this.show = false;
        },
        scanCode() {
            console.log("扫码");
        },
        bindTypeSwicth(index, title) {
            if (index == 0 && title == "新增") {
                this.subLabel =
                    "新增：默认给用户注册刷多宝，登录密码请留意短信通知";
                this.formWay = true;
            } else if (index == 1 && title == "现有") {
                this.subLabel = "现有：请确保用户已经扫您的推广码，注册刷多宝";
                this.formWay = false;
            }
        },
        selectMerchants() {
            this.popupShow = !this.popupShow;
        },
        onSearch() {
            alert("点击了搜索");
        },
        confirmSelect() {
            this.popupShow = !this.popupShow;
        },
        radioChange() {
            console.log();
        }
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
    button {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        display: block;
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
    padding:0 16px;
    span {
        font-size: 20px;
        color: #f33;
        font-weight: bold;
        padding-right:4px;
    }
}
.van-field__right-icon i.van-icon-scan{
    font-size:22px !important;
}
</style> 