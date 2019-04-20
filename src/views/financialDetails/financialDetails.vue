<template>
    <div class="financial-details">
        <!-- header -->
        <!-- <mt-header fixed title="资金明细">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header> -->
        <div class="return">
            <img src="@/assets/images/return.png" alt="" @click="$router.go(-1)" />
            <span>资金明细</span>
        </div>
        <!-- 列表 -->
        <div class="financialDetailsMain">
            <!-- 筛选 -->
            <!-- <div class="timeScreeningMain">
                <div class="timeScreeningItem line_bottom">
                    <em>开始时间</em>
                    <div>
                        <span>请选择开始时间</span>
                        <input type="data">
                    </div>
                </div>
                <div class="selector selectYear" @click="selectYear">
                    <div class="show_year">
                    <p v-if="!isClicked">请选择日期筛选</p>
                    <p v-if="isClicked">{{ year }}年{{ month }}月{{ date }}日</p>
                    </div>
                </div>
                <mt-datetime-picker
                    v-model="dateValue"
                    type="date"
                    ref="datePicker"
                    year-format="{value} 年"
                    month-format="{value} 月"
                    date-format="{value} 日"
                    :endDate="new Date()"
                    @confirm="handleConfirm"
                    @cancel="handleCancel"
                >
                </mt-datetime-picker>
                <div class="timeScreeningItem line_bottom">
                    <em>结束时间</em>
                    <div>
                        <span>请选择结束时间</span>
                        <input type="data">
                    </div>
                </div>
            </div> -->
            <!-- 切换 筛选 -->
            <!-- switchSacreeningMain -->
            <div class="choice">
                <el-radio-group v-model="queryData.list.stypes" @change="handleClick" :disabled="isDisabled" >
                    <el-radio-button label="JY">交易</el-radio-button>
                    <el-radio-button label="JH">激活</el-radio-button>
                </el-radio-group>
            </div>
            <!-- 列表 -->
            <div class="financialDetailsList">
            <!-- line_bottom -->
            <div class="flex switchSacreeningMain">
                <div class="financialDetailsList" v-if="isData">
                            <van-pull-refresh
                                v-model="isDownLoading"
                                @refresh="onDownRefresh"
                            >
                                <van-list
                                    v-model="isUpLoading"                 
                                    :finished="upFinished"
                                    finished-text="没有更多了"
                                    @load="onLoadList"
                                    :offset= "offset"
                                >
                                    <ul class="financialDetailsListUl">
                                        <li class="line_bottom flex" v-for="(item, index) in renderData.odlListData" :key="index">
                                            <div>
                                                <div class="top">
                                                    <span class="s" v-if="item.product !== null">{{item.product}}</span>
                                                    <h3 class="title">{{item.storageName}}</h3> 
                                                </div>
                                                <p>
                                                    {{item.remark}}
                                                </p>
                                            </div>
                                            <div>
                                                <h3>+{{item.changeAmount}}</h3>
                                                <p>{{item.createTime}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                </van-list>
                            </van-pull-refresh>
                        </div>
                        <div class="no-data" v-else>
                            <img src="@/assets/images/no-data.png" alt="">
                        </div>
                </div>
            </div>
            <!-- 列表 -->
            <!-- :bottom-method="loadBottom" -->
        </div>
       
    </div>
</template>
<script>
import {getServer} from '@/api/index'
import { Indicator } from 'mint-ui'
export default {
    data() {
        return {
            isDownLoading: false,//下拉刷新
            isUpLoading: false,//上拉加载
            upFinished: false,//上拉加载完毕
            offset: 10, //滚动条与底部距离小于 offset 时触发load事件
            isData: true,
            isDisabled: true,
            pickerValue: "按时间筛选",
            year: "",
            month: "",
            date: "",
            dateValue: "",
            isClicked: false,
            renderData: {
                listData: [],
                odlListData: []
            },
            queryData: {
                list: {
                    requestType: 'spendinginto',
                    requestKeywords:'earnings', 
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    page: 0,
                    limit: 15,
                    types: 'Z',
                    stypes: 'JY' // (JY 交易  JH 激活)
                }
            },
        };
    },
    methods: {
        clickChange () {
            if( this.type === 'selectionDate' ) {
                this.selectYear()
            } else {
                delete this.queryData.list.dates
                this.isClicked = false
                this.queryData.list.types = this.type
                this.upFinished = false
                this.isData = true
                this.queryData.list.page = 0
                this.renderData.oldList = []
                this.onLoadList()
            }
        },
        handleClick () {
            this.upFinished = false
            this.queryData.list.page = 1
            this.renderData.odlListData = []
            // this.isDownLoading = true
            this.profitList()
        },
        onLoadList () {
            // console.log("进来", this.queryData.list.page)
            this.queryData.list.page++
            // this.isUpLoading = true
            // console.log(this.queryData.list.page)
            this.profitList()
        },
        activationOnLoadList () {
            this.queryData.list.page++
            this.profitList()
        },
        onDownRefresh(){
            console.log("下拉刷新")
            this.queryData.list.page = 1
            this.renderData.odlListData = []
            this.isDownLoading = true
            this.profitList();
        },
        profitList () {
            this.isDisabled = true
            getServer(this.queryData.list).then( res => {
                // console.log(res)
                if( res.data.responseStatus === 1 ) {
                    this.isDisabled = false
                    this.isData = true
                    this.isDownLoading = false
                    this.isUpLoading = false
                    this.renderData.listData = res.data.data
                    this.renderData.listData.forEach( item => {
                        this.renderData.odlListData.push(item)
                    })
                } else if(res.data.responseStatus === 300 && this.queryData.list.page !== 1 ) {
                    this.isDisabled = false
                    this.upFinished = true
                    this.isUpLoading = false
                } else if( res.data.responseStatus === 300 && this.queryData.list.page === 1 ) {
                    this.isDisabled = false
                    this.upFinished = false
                    this.isUpLoading = false
                    this.isData = false
                }
            })
        },

    },
    created () {
        // this.profitList()
        // this.onLoadList()
    }
};
</script>
<style lang="scss">
.financial-details {
    .choice {
        position: fixed;
        width: 100%;
        left: 0;
        // top: 2rem;
        top: .6rem;
        background: #fff;
        z-index: 9999;
        .el-radio-group {
            width: 100%;
        }
        label {
            width: 50%;
            display: block;
            float: left;
            text-align: center;
            border-left: none;
        }
        .el-radio-button__inner {
            border: none;
            border-bottom: 1px solid transparent;
            width: 100%;
            color: #606266;
        }
        .el-radio-button__orig-radio:checked+.el-radio-button__inner {
            border: none;
            background: none;
            color: #606266;
            border-bottom: 1px solid #0096fe;
            box-shadow: 0 0 0 0 #fff;
        }
        .el-radio-button__inner:hover {
            box-shadow: 0 0 0 0 #fff;
        }
        .el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
            box-shadow: 0 0 0 0 #fff;
        }
    }
}
.financialDetailsList {
    width: 100%;
}
.loadingMore {
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    color: #333;
    img {
        width: 20px;
        height: 20px;
        position: relative;
        top: -2px;
        margin-right: 5px;
        display: inline;
    }
}
.financialDetailsMain {
    // margin-top: 3.3rem;
    margin-top:1.8rem;
    // position: fixed;
    // left:0;
    // top:160px;
    // right:0;
    // bottom:0;
    // overflow-x: hidden;
    // overflow: auto;
    // height: 120%;
}
.timeScreeningMain {
    position: fixed;
    width: 100%;
    left: 0;
    top: 40px;
    background: #fff;
    z-index: 99999;
}
.switchScreeningMain {
    // position: fixed;
    // width: 100%;
    // left: 0;
    // top: 120px;
    // z-index: 99999;
    display: block;
}
.timeScreeningItem {
    overflow: hidden;
    line-height: 40px;
    em {
        display: block;
        width: 100px;
        font-size: 14px;
        color: #333;
        float: left;
        text-indent: 20px;
    }
    div {
        padding-left: 100px;
        position: relative;
        span {
            line-height: 40px;
            font-size: 14px;
            position: absolute;
            width: 100%;
            display: block;
            left: 100px;
            top: 0;
        }
        input {
            height: 40px;
            border: none;
            background: none;
            font-size: 14px;
            position: absolute;
            width: 100%;
            left: 100px;
            top: 0;
            z-index: 9999;
        }
    }
}
.switchScreeningMain {
    justify-content: space-around;
    a {
        display: block;
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #333;
        text-align: center;
        position: relative;
        &.active {
            color: #0096fe;
        }
        &.active::before {
            content: "";
            display: block;
            width: 30%;
            height: 2px;
            background: #0096fe;
            position: absolute;
            left: 50%;
            bottom: 0;
            margin-left: -15%;
        }
    }
}
.mint-loadmore-top {
    font-size: 14px;
}
.financial-details .financialDetailsListUl{
    padding:0 15px;
    li{
        padding:10px 0;
        overflow: hidden;
        justify-content: space-between;
        // height: 300px;
        div{
             h3{
                font-size:16px;
            }
            .top {
                overflow: hidden;
                h3.title{
                    float: left;
                    // font-size:16px;
                    font-size: .28rem;
                    line-height: .3rem;
                    color: #333;
                    margin-top: .05rem;
                    border: none;
                    display: block;
                }
                span.s {
                    background-color: rgba(64,158,255,.1);
                    display: inline-block;
                    font-size: .2rem;
                    color: #409eff;
                    border-radius: 4px;
                    box-sizing: border-box;
                    border: 1px solid rgba(64,158,255,.2);
                    white-space: nowrap;
                    margin-right: .2rem;
                    width: .8rem;
                    text-align: center;
                    float: left;
                    line-height: .38rem;
                }
            }
            p{
                font-size:14px;
                margin-top: .1rem;
            }
            &:last-of-type {
                text-align:right;
                h3{
                    color:#f33;
                }
            }
        }
    }
}
.financial-details .choice .el-radio-group{
    border-bottom:1px solid #f1f1f1;
}
</style>