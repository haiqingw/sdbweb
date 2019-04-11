


<template>
    <div class="deliver-goods">
        <div class="return">
            <img
                src="@/assets/images/return.png" alt="" 
                @click='$router.go(-1)'/>
            <span>发货</span>
        </div>
        <div class="deliver-goods-choice">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="未发货" name="3">
                    <div class="no-deliver-goods-list deliver-goods-list" v-if="isData">
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
                                        <div class="title">
                                            <h3>品 牌:{{item.pname}}</h3>
                                            <div class="right">
                                                {{item.pstatus}}
                                                |
                                                {{item.returned}}
                                            </div> 
                                        </div>
                                        <div class="info">
                                            <span>收货姓名:{{item.consignee}}</span>
                                            <em>{{item.consigneePhone}}</em>
                                        </div>
                                        <div class="receiving-address">
                                            {{item.address}}
                                        </div>
                                        <div class="time">下单时间:{{item.orderTime}}</div>
                                        <div class="btn">
                                            <span>
                                                订单号:{{item.ordernum}}
                                            </span>
                                            <router-link :to="{name: 'clickDeliverGoods', params: {id: item.id}}">发货</router-link>
                                        </div>
                                    </li>
                                </ul>
                            </van-list>
                        </van-pull-refresh>
                    </div>
                    <div class="no-data" v-else>
                        <img src="@/assets/images/no-data.png" alt="">
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已发货" name="2">
                    <div class="yes-deliver-goods-list deliver-goods-list" v-if="isData">
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
                                        <div class="title">
                                            <h3>品 牌:{{item.pname}}</h3>
                                            <div class="right">
                                                {{item.pstatus}}
                                                |
                                                {{item.returned}}
                                            </div> 
                                        </div>
                                        <div class="info">
                                            <span>收货姓名:{{item.consignee}}</span>
                                            <em>{{item.consigneePhone}}</em>
                                        </div>
                                        <div class="receiving-address">
                                            {{item.address}}
                                        </div>
                                        <div class="express-name">
                                            <!-- 快递名称:顺丰快递|运单号:0000000000 -->
                                            {{item.courier}}
                                        </div>
                                        <div class="sun">
                                            <div>终端号:{{item.terminalNumber}}</div>
                                            <div>订单号:{{item.ordernum}}</div>
                                            <div>下单时间:{{item.orderTime}}</div>
                                        </div>
                                    </li>
                                </ul>
                            </van-list>
                        </van-pull-refresh>
                    </div>
                    <div class="no-data" v-else>
                        <img src="@/assets/images/no-data.png" alt="">
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>


<script>
    import {getServer} from '@/api/index'
    export default {
        data () {
            return {
                isDownLoading: false,//下拉刷新
                isUpLoading: false,//上拉加载
                upFinished: false,//上拉加载完毕
                offset: 10, //滚动条与底部距离小于 offset 时触发load事件
                isData: true,
                activeName: '3',
                queryData: {
                    list: {
                        requestType: 'agent', 
                        requestKeywords: 'order', 
                        platformID: this.$store.state.user.pid, 
                        userID: this.$store.state.user.uid, 
                        userPhone: this.$store.state.user.uphone, 
                        isReceipt: "3", 
                        page: 0, 
                        // limit: 10
                    }
                },
                renderData: {
                    list: [],
                    oldList: []
                }
            }
        },
        methods: {
            onLoadList () {
                // console.log("进来", this.queryData.list.page)
                this.queryData.list.page++
                // this.isUpLoading = true
                // console.log(this.queryData.list.page)
                this.deliverGoodsList()
            },
            onDownRefresh(){
                this.queryData.list.page = 1
                this.renderData.oldList = []
                this.isDownLoading = true
                this.deliverGoodsList();
            },
            handleClick(tab, event) {
                // console.log(tab, event);
                this.renderData.oldList = []
                this.queryData.list.isReceipt = this.activeName
                this.upFinished = false
                this.isData = true
                this.queryData.list.page = 1
                this.deliverGoodsList()
            },
            deliverGoodsList () {
                getServer(this.queryData.list).then( res => {
                    // console.log(res.data.data)
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
            }
        },
        created () {
            // this.deliverGoodsList()
        }
    }
</script>

<style>
.deliver-goods-choice .el-tabs__header{
    position: fixed;
    width:100%;
    left:0;
    top:13px;
    z-index:9;
    background:#fff;
}
.deliver-goods-choice .el-tabs__content{
    padding-top:70px;
}
.deliver-goods-choice{
    margin-top:12px;
}
.deliver-goods .deliver-goods-choice .el-tabs__nav {
    width: 100%;
    text-align: center;
}
.deliver-goods .deliver-goods-choice .el-tabs__nav .el-tabs__item {
    width: 50%;
}
.deliver-goods-list ul {
    padding: 0 .2rem;
}
.deliver-goods-list ul li {
    font-size: 0.26rem;
    padding: .2rem;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    margin-top: .2rem;
}
.deliver-goods-list ul li .title {
    overflow: hidden;
    line-height: .4rem;
    padding: .1rem 0;
    border-bottom: .01rem dashed #ccc;
}
.deliver-goods-list ul li .title h3 {
    float: left;
    font-weight: normal;
    font-size: 0.28rem;
}
.deliver-goods-list ul li .title .right {
    float: right;
}
.deliver-goods-list ul li .info {
    overflow: hidden;
    line-height: 0.4rem;
    padding-top: .2rem;
}
.deliver-goods-list ul li .info span {
    float: left;
}
.deliver-goods-list ul li .info em {
    float: right;
}
.deliver-goods-list ul li .receiving-address {
    line-height: .4rem;
    padding-bottom: .2rem;
    border-bottom: .01rem dashed #ccc;
}
.no-deliver-goods-list ul li .time {
    line-height: 0.4rem;
    padding: 0.1rem 0;
}
.no-deliver-goods-list ul li .btn {
    overflow: hidden;
    padding-left:.2rem;
    line-height: 0.7rem;
    color: #fff;
    background-color: #089cfe;
}
.no-deliver-goods-list ul li .btn span {
    float: left;
}
.no-deliver-goods-list ul li .btn a {
    float: right;
    color: #fff;
    padding:0 .2rem;
    background:#4cb5fb;
}
.yes-deliver-goods-list ul li .express-name {
    line-height: .4rem;
    padding: .15rem 0;
    border-bottom: .01rem dashed #ccc;
}
.yes-deliver-goods-list ul li .sun {
    padding-top: .2rem;
    line-height: 0.4rem;
}
</style>


