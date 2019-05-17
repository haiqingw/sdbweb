
<template>
    <div class="dial-code">
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)">
            <span>拨码</span>
        </div>
         <div class="my-terminal-choice line_bottom">
            <el-select v-model="byProduct.value" placeholder="按产品" @change="byProductChange">
                <el-option
                v-for="item in byProduct.options"
                :key="item.id"
                :label="item.name"
                :value="item.id">
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
                                <!-- <el-tag type="danger" v-if="item.useStatus === '未使用'">{{item.useStatus}}</el-tag>
                                <el-tag type="success" v-if="item.useStatus === '已使用' ">{{item.useStatus}}</el-tag> -->
                                <el-checkbox-group v-model="checkList" @change="handleCheckedCitiesChange">
                                    <el-checkbox :label="item.id"></el-checkbox>
                                </el-checkbox-group>
                            </div>
                            <div class="terminal-number">
                                {{item.terminalNo}}
                            </div>
                            <div class="time-batch">
                                <div class="left">
                                    <span v-if=" item.useName !== '0' ">使用者：{{item.useName}}</span>
                                    <time>{{item.allotTime}}</time>    
                                </div>
                                <div class="right">
                                    <span>{{item.batchNo}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </van-list>
            </van-pull-refresh>
            <div class="confirm" @click="confirm">
                <em>已选{{checkList.length}}</em>
                <span>确定</span>
            </div>
        </div>
        <div class="no-data" v-else>
            <img src="@/assets/images/no-data.png" alt="">
        </div>
    </div>
</template>


<script>
    import { getServer } from '@/api/index'
    import response from '@/assets/js/response.js'
    import { Toast, Indicator } from 'mint-ui';
    export default {
        data () {
            return {
                isDownLoading: false,//下拉刷新
                isUpLoading: false,//上拉加载
                upFinished: false,//上拉加载完毕
                offset: 10, //滚动条与底部距离小于 offset 时触发load事件
                isData: true,
                checkList: [],
                byProduct: {
                    options: [
                        {   
                            id: "1",
                            label: '按产品'
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
                        useStatus: "1",  //使用状态
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
            confirm () {
                if (this.checkList.length == 0) {
                    Toast("请选择终端")
                } else {
                    this.$router.push({ name: 'dial-code-subordinate', params: { terminalNoId: this.checkList.join() }})
                }
               
            },
            handleCheckedCitiesChange() {
                // this.checkNum = this.checkList.length
            },
            byProductChange () {
                this.queryData.list.productID = this.byProduct.value
                this.renderData.oldList = []
                this.queryData.list.page = 0
                this.onLoadList()
            },
            byBatchChange (){
                this.queryData.list.batchNo = this.byBatch.value
                this.renderData.oldList = []
                this.queryData.list.page = 0
                this.onLoadList()
            },
            choiceProduct () {
                getServer(this.queryData.product).then( res => {
                    if( res.data.responseStatus === 1 ) {
                        this.byProduct.options = res.data.data
                    }
                })
            },
            choiceBatch () {
                getServer(this.queryData.batch).then( res => {
                    // console.log(response[res.data.responseStatus])
                    if( res.data.responseStatus === 1 ) {
                        this.byBatch.options = res.data.data
                    }
                })
            },
            terminalList () {
                Indicator.open()
                this.upFinished = false
                getServer(this.queryData.list).then( res => {
                    // console.log(response[res.data.responseStatus])
                    Indicator.close()
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
                this.isUpLoading = true
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
.dial-code .el-checkbox-group {
    float: right;
}
.dial-code .el-checkbox__label {
    display: none;
}
.dial-code .van-list {
    padding-bottom: .6rem;
}
.dial-code .confirm {
    position: fixed;
    bottom: 0;
    left: 0;
    font-size: .3rem;
    color: #fff;
    background: #089cfe;
    width: 100%;
    line-height: .8rem;
    height: .8rem;
    padding: 0 .2rem;
    box-sizing: border-box;
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
    top: .7rem;
    z-index: 99;
    width: 100%;
}
.dial-code .my-terminal-choice {
    display: flex;
    font-size: 0.28rem;
    text-align: center;
    line-height: .4rem;
    padding:.2rem 0 0.1rem;
}
.dial-code .my-terminal-choice .el-select {
    flex: 1;
    background: url(../../../assets/images/my-terminal-choice-drop-down.png) no-repeat 2rem center;
    background-size: 10%;
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
.my-terminal-list ul li .name-state h3 span {
    margin-left: .18rem;
    font-size: .28rem;
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
    margin-right: .2rem;
}
.my-terminal-list ul li .time-batch .right {
    float: right;
}
</style>

