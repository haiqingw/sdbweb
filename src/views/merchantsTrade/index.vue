<template>
    <div class="merchantsTradeContainer">
        <div class="return" style="height:45px; line-height:45px;">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
            <span>商户交易</span>
            <a href="javascript:;" class="timeRightBtn" @click="showTimePickerTap()">
                <em>{{selectedTime}}</em>
                <van-icon name="arrow" />
            </a>
        </div>
        <div class="merchantsTradeMain">
            <!-- 筛选与搜索 -->
            <div class="searchMain">
                <div class="productScreeningMain">
                    <van-field
                        readonly
                        clickable
                        :value="proValue"
                        @click="showPicker = true"
                        right-icon="arrow-down"
                    />
                    <van-popup v-model="showPicker" position="bottom">
                        <van-picker
                            show-toolbar
                            :columns="renderData.productName"
                            title
                            :default-index="2"
                            @cancel="showPicker = false"
                            @confirm="onConfirm"
                        />
                    </van-popup>
                </div>
                <div class="searchMain">
                    <van-search
                        v-model="searchValue"
                        placeholder="请输入搜索关键词"
                        show-action
                        clearable
                        shape="round"
                        @search="onSearch"
                    >
                        <div slot="action" @click="onSearch">搜索</div>
                    </van-search>
                </div>
            </div>
        </div>
        <!-- 列表 -->
        <div class="merchantsListMain" v-if="isData">
            <div v-for="item in renderData.list" :key="item.terminalNo">
                <h3>终端号：{{item.terminalNo}}</h3>
                <div
                    class="merchantsListBox line_bottom"
                    v-for="i in item.tradeData"
                    :key="i.tradeTime"
                >
                    <div  v-if="isTerminalData">
                        <p class="ren-flex-sb">
                            <span>
                                交易金额：
                                <b>{{i.tradeAmt}}元</b>
                            </span>
                            <em>
                                交易费率：
                                <b>{{i.rate}}</b>
                            </em>
                        </p>
                        <p class="gray">交易时间：{{i.tradeTime}}</p>
                    </div>
                    <div v-else>
                        暂无
                    </div>
                </div>
            </div>
        </div>
        <div class="no-data" v-else>
            <img src="@/assets/images/no-data.png" alt />
        </div>
        <!-- 时间 -->
        <van-popup v-model="showTimePicker" position="bottom">
            <van-datetime-picker
                v-model="currentDate"
                type="year-month"
                :formatter="formatter"
                title="请选择月份"
                @confirm="onTimeConfirm"
                @cancel="onTimeCancel"
            />
        </van-popup>
    </div>
</template>
<script>
import { Searcha, Picker, DatetimePicker } from 'vant'
import { getServer } from '@/api/index'
import { parseTime } from '@/utils/index'
export default {
    data() {
        return {
            isData: true,
            isTerminalData: true,
            proValue: '',
            searchValue: '',
            showPicker: false,
            // columns: ['鼎刷', '闪POS', '红POS', '银POS'],
            showTimePicker: false,
            currentDate: new Date(),
            selectedTime: '2019-09',
            queryData: {
                list: {
                    requestType: 'funds',
                    requestKeywords: 'tradelists',
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    dates: '', //'2019-09' 年月（按月查询） ,
                    productID: ''
                    // terminalNo: ''
                },
                product: {
                    requestType: 'agent',
                    requestKeywords: 'product',
                    platformID: this.$store.state.user.pid
                }
            },
            renderData: {
                product: [
                    {
                        id: 1,
                        name: '123'
                    },
                    {
                        id: 2,
                        name: 'xiaoyu'
                    }
                ],
                productName: [],
                list: []
            }
        }
    },
    components: {},
    methods: {
        onSearch() {},
        onConfirm(value, index) {
            this.proValue = value
            this.renderData.product.forEach(item => {
                if (this.proValue === item.name) {
                    this.queryData.list.productID = item.id
                }
            })
            this.list()
            this.showPicker = false
        },
        onCancel() {
            this.showPicker = false
        },
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`
            } else if (type === 'month') {
                return `${value}月`
            }
            return value
        },
        showTimePickerTap() {
            this.showTimePicker = true
        },
        onTimeConfirm(value) {
            this.queryData.list.dates = parseTime(value).substring(0, 7)
            this.selectedTime = parseTime(value).substring(0, 7)
            this.list()
            this.showTimePicker = false
        },
        onTimeCancel() {
            this.showTimePicker = false
        },
        product() {
            getServer(this.queryData.product)
                .then(res => {
                    if (res.data.responseStatus === 1) {
                        this.renderData.product = res.data.data
                        this.renderData.product.forEach(item => {
                            this.renderData.productName.push(item.name)
                        })
                        this.proValue = res.data.data[0].name
                        this.queryData.list.productID = res.data.data[0].id
                    }
                })
                .then(() => {
                    this.list()
                })
        },
        timeView() {
            this.selectedTime = parseTime(this.currentDate).substring(0, 7)
            this.queryData.list.dates = parseTime(this.currentDate).substring(
                0,
                7
            )
            this.product()
        },
        list() {
            getServer(this.queryData.list).then(res => {
                if (res.data.responseStatus === 1) {
                    alert(JSON.stringify(res.data))
                    this.renderData.list = res.data.data
                    if( res.data.data[0].tradeData.length === 0 ) {
                        this.isTerminalData = false
                    }else {
                        this.isTerminalData = true
                    }
                    this.isData = true
                } else if (res.data.responseStatus === 300) {
                    this.isData = false
                }
            })
        }
    },
    created() {
        this.timeView()
    }
}
</script>
<style lang="less">
.merchantsTradeContainer {
    .return {
        .timeRightBtn {
            position: absolute;
            right: 10px;
            top: 0;
            color: #fff;
            font-weight: bold;
            i {
                position: relative;
                top: 2px;
                margin-left: 2px;
            }
        }
    }
}
.merchantsTradeMain {
    // padding-top: 45px;
    position: fixed;
    top: 0.8rem;
    z-index: 9999;
}
.searchMain {
    overflow: hidden;
    background: #f1f1f1;
    .productScreeningMain {
        width: 30%;
        float: left;
        .van-cell {
            line-height: 34px;
            background: none;
        }
    }
    .searchMain {
        border-left: 1px solid #fff;
        box-sizing: border-box;
        width: 70%;
        float: left;
        .van-cell {
            background: none;
        }
        .van-search {
            background: none !important;
        }
    }
}
.merchantsListMain {
    position: fixed;
    width: 100%;
    top: 99px;
    left: 0;
    right: 0;
    overflow: auto;
    h3 {
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.28rem;
        background: #089cfe75;
        padding: 0 15px;
        color: #fff;
        letter-spacing: 2px;
    }
    div.merchantsListBox {
        line-height: 30px;
        padding: 10px 15px;
        font-size: 0.28rem;
        div {
            b {
                color: #f33;
                font-weight: bold;
                font-size: 0.32rem;
            }
            p.gray {
                color: #999;
            }
        }
    }
}
</style>
