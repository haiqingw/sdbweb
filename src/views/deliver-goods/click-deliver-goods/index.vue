

<template>
    <div class="click-deliver-goods">
        <div class="return">
            <img
                src="@/assets/images/return.png" alt="" 
                @click='$router.go(-1)'/>
            <span>发货</span>
        </div>
        <div class="express-info">
            <div class="name">
                <img src="@/assets/images/click-deliver-goods-name.png" alt="">
                <el-input v-model="renderData.sub.name"></el-input>
                <router-link to="/express">常用快递</router-link>
            </div>
            <div class="odd-numbers">
                <img src="@/assets/images/click-deliver-goods-odd-numbers.png" alt="">
                <el-input v-model="renderData.sub.oddNumbers"></el-input>
                <a href="">扫码录入</a>
            </div>
        </div>
        <div class="terminal-num-list">
            <h3>终端号列表</h3>
            <van-pull-refresh
                v-model="isDownLoading"
                @refresh="onDownRefresh"
                v-if="isData"
            >
                <van-list
                    v-model="isUpLoading"                 
                    :finished="upFinished"
                    finished-text="没有更多了"
                    @load="onLoadList"
                    :offset= "offset"
                >
                    <ul>
                        <li>
                            <el-radio v-model="radio" label="1">111111111111111111111111111</el-radio>
                        </li>
                    </ul>
                </van-list>
            </van-pull-refresh>
            <div class="no-data" v-else>
                <img src="@/assets/images/no-data.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    import {getTerminalList} from '@/api/deliver-goods'
    export default {
        data () {
            return {
                radio: "1",
                isDownLoading: false,//下拉刷新
                isUpLoading: false,//上拉加载
                upFinished: false,//上拉加载完毕
                offset: 10, //滚动条与底部距离小于 offset 时触发load事件
                isData: true,
                queryData: {
                    list: {
                        requestType: 'agent', 
                        requestKeywords: 'terminal', 
                        platformID: this.$store.state.user.pid, 
                        userID: this.$store.state.user.uid, 
                        userPhone: this.$store.state.user.uphone, 
                        productID: this.$route.params.id, 
                        useStatus: 1,
                        limit: 10,
                        page: 0
                    }
                },
                renderData: {
                    sub: {
                        name:  JSON.parse(sessionStorage.getItem('expressName')) || "",
                        oddNumbers: ""
                    },
                    list: [],
                    oldList: []
                }
            }
        },
        methods: {
            terminalList() {
                getTerminalList(this.queryData.list).then( res => {
                    if( res.data.responseStatus === 1 ) {
                        this.isData = true
                        this.renderData.list = res.data.data
                        this.renderData.list.forEach( item => {
                            this.renderData.oldList.push(item)
                        })
                        console.log(res.data.data)
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
            }
        }
    }
</script>

<style>
.click-deliver-goods .express-info {
    margin-top: 1rem;
}
.click-deliver-goods .express-info>div {
    overflow: hidden;
    margin-top: .3rem;
    padding: 0 .2rem;
}
.click-deliver-goods .express-info div:first-child {
    border-bottom: .01rem solid #ccc;
    padding-bottom: .2rem;
}
.click-deliver-goods .express-info img {
    width: .5rem;
    height: .5rem;
    padding: .1rem;
    border-radius: 50%;
    float: left;
    background-color: #409EFF;
    margin-right: .3rem;
}
.click-deliver-goods .express-info .el-input {
    width: 60%;
    float: left;
}
.click-deliver-goods .express-info .el-input input {
    border: none;
}
.click-deliver-goods .express-info div a {
    float: right;
    color: #409EFF;
    font-size: .26rem;
    line-height: .8rem;
}
.terminal-num-list {
    padding: 0 .2rem;
    margin-top: .5rem;
}
.terminal-num-list h3 {
    font-size: .3rem;
    font-weight: normal;
    margin: .4rem 0 .2rem 0;
}
.terminal-num-list ul li {
    font-size: .28rem;
    line-height: .4rem;
    padding: .1rem 0;
}

</style>


