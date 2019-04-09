

<template>
    <div class="my-terminal">
        <div class="return">
            <img src="@/assets/images/return.png" alt=""  @click="$router.go(-1)"/>
            <span>我的终端</span>
        </div>
        <div class="my-terminal-choice">
            <el-select v-model="byProduct.value" placeholder="按产品" @change="byProductChange">
                <el-option
                v-for="item in byProduct.options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
            <el-select v-model="usageState.value" placeholder="使用状态" @change="usageStateChange">
                <el-option
                v-for="item in usageState.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="byBatch.value" placeholder="按批次" @change="byBatchChange">
                <el-option
                v-for="item in byBatch.options"
                :key="item.batchNo"
                :label="item.batchNo"
                :value="item.batchNo">
                </el-option>
            </el-select>
        </div>
        <div class="my-terminal-list" v-if="isData">
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
                    <ul>
                        <li v-for="item in renderData.oldList" :key="item.id">
                            <div class="name-state">
                                <h3>{{item.productName}}</h3>
                                <el-tag type="danger" v-if="item.useStatus === '未使用'">{{item.useStatus}}</el-tag>
                                <el-tag type="success" v-if="item.useStatus === '已使用' ">{{item.useStatus}}</el-tag>
                            </div>
                            <div class="terminal-number">
                                {{item.terminalNo}}
                            </div>
                            <div class="time-batch">
                                <time>{{item.allotTime}}</time>    
                                <span>{{item.batchNo}}</span>
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
</template>

<script>
    import {getChoiceProduct, getChoiceBatch, getTerminalList} from '@/api/myTerminal'
    import response from '@/assets/js/response.js'
    export default {
        data () {
            return {
                isDownLoading: false,//下拉刷新
                isUpLoading: false,//上拉加载
                upFinished: false,//上拉加载完毕
                offset: 10, //滚动条与底部距离小于 offset 时触发load事件
                isData: true,
                byProduct: {
                    options: [
                        {   
                            id: "1",
                            label: '按产品'
                        },
                    ],
                    value: ''
                },
                usageState: {
                    options: [
                        {
                            value: "2",
                            label: '已使用'
                        }, 
                        {
                            value: "1",
                            label: '未使用'
                        }, 
                    ],
                    value: ''
                },
                byBatch: {
                    options: [
                        {
                            id: "1",
                            label: '按批次'
                        }, 
                    ],
                    value: ''
                },
                queryData: {
                    product: {
                        requestType: 'agent',
                        requestKeywords: 'product',
                        platformID: this.$store.state.user.pid
                    },
                    batch: {
                        requestType: 'agent', 
                        requestKeywords: 'batchnolist', 
                        platformID: this.$store.state.user.pid, 
                        userID: this.$store.state.user.uid, 
                        userPhone: this.$store.state.user.uphone
                    },
                    list: {
                        requestType: 'agent',
                        requestKeywords: 'terminal',
                        platformID: this.$store.state.user.pid,
                        userID: this.$store.state.user.uid,
                        userPhone: this.$store.state.user.uphone,
                        // productID: "",  //产品ID
                        // batchNo: "",      //批次号
                        // useStatus: "",  //使用状态
                        page: 0,
                        limit: 10
                    }
                },
                renderData: {
                    list: [],
                    oldList: []
                }
            }
        },
        methods: {
            byProductChange () {
                this.queryData.list.productID = this.byProduct.value
                this.renderData.oldList = []
                this.queryData.list.page = 1
                this.terminalList()
            },
            usageStateChange () {
                this.queryData.list.useStatus = this.usageState.value
                this.renderData.oldList = []
                this.queryData.list.page = 1
                this.terminalList()
            },
            byBatchChange (){
                this.queryData.list.batchNo = this.byBatch.value
                this.renderData.oldList = []
                this.queryData.list.page = 1
                this.terminalList()
            },
            choiceProduct () {
                getChoiceProduct(this.queryData.product).then( res => {
                    if( res.data.responseStatus === 1 ) {
                        this.byProduct.options = res.data.data
                    }
                })
            },
            choiceBatch () {
                getChoiceBatch(this.queryData.batch).then( res => {
                    // console.log(response[res.data.responseStatus])
                    if( res.data.responseStatus === 1 ) {
                        this.byBatch.options = res.data.data
                    }
                })
            },
            terminalList () {
                this.upFinished = false
                getTerminalList(this.queryData.list).then( res => {
                    // console.log(response[res.data.responseStatus])
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
            // 下拉刷新
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
                this.terminalList();
            },
        },
        created () {
            this.choiceProduct()
            this.choiceBatch()
            // this.terminalList()
        }
    }
</script>

<style>
.my-terminal .el-input--suffix .el-input__inner {
    text-align: center;
}
.my-terminal .no-data {
    margin-top: 67%;
}
.my-terminal-choice {
    position: fixed;
    left: 0;
    top: .7rem;
    z-index: 99;
}
.my-terminal .my-terminal-choice {
    display: flex;
    font-size: 0.28rem;
    text-align: center;
    line-height: .4rem;
    padding: .1rem 0;
}
.my-terminal .my-terminal-choice .el-select {
    flex: 1;
    background: url(../../assets/images/my-terminal-choice-drop-down.png) no-repeat 2rem center;
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
    padding: 0 .2rem;
}
.my-terminal-list ul li {
    padding: .2rem;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    margin-bottom: .3rem;
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
.my-terminal-list ul li .name-state span {
    float: right;
}
.my-terminal-list ul li .terminal-number {
    font-size: .4rem;
    text-align: center;
    color: #FF3300;
    font-weight: normal;
    padding: .3rem 0;
}
.my-terminal-list ul li .time-batch {
    overflow: hidden;
    color: #ccc;
    font-size: 0.26rem;
    line-height: 0.4rem;
}
.my-terminal-list ul li .time-batch time {
    float: left;
}
.my-terminal-list ul li .time-batch span {
    float: right;
}
</style>


