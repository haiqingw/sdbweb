

<template>
    <div class="dial-code-subordinate">
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)">
            <span>拨码</span>
        </div>
        <div class="dial-code-subordinate-content">
            <div class="search">
                <el-input v-model="queryData.search.keywords" placeholder="请输入名字或手机号"></el-input>
                <el-button type="primary" @click="search">搜索</el-button>
            </div>
            <div class="dial-code-subordinate-list">
                <div v-for="item in renderData.list" :key="item.id" v-if="isData">
                    <span>{{item.id}}</span>
                    <span>{{item.phone}}</span>
                    <span @click="confirmDialCode(item.id)">选择</span>
                </div>
                <div class="no-data" v-else>
                    <span>暂无</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getServer} from "@/api/index"
    import { Toast } from 'mint-ui';
    import response from '@/assets/js/response.js'
    export default {
        data() {
            return {
                isData: true,
                queryData: {
                    search: {
                        requestType: 'datacenter',
                        requestKeywords:'childagent', 
                        platformID: this.$store.state.user.pid,
                        userID: this.$store.state.user.uid,
                        userPhone: this.$store.state.user.uphone,
                        keywords: ""
                    },
                    confirmDialCode: {
                        requestType: 'agent',
                        requestKeywords:'dialcode', 
                        platformID: this.$store.state.user.pid,
                        userID: this.$store.state.user.uid,
                        userPhone: this.$store.state.user.uphone,
                        childID: "",
                        machineID: this.$route.params.terminalNoId
                    }
                },
                renderData: {
                    list: []
                }
            }
        },
        methods: {
            search() {
                if (this.queryData.search.keywords === "" ) {
                    Toast("请输入要搜索的手机号")
                } else {
                    getServer(this.queryData.search).then( res => {
                        console.log(res)
                        if( res.data.responseSatus === 1 ) {
                            this.isData = true
                            this.renderData.list = res.data.data
                        } else if (res.data.responseSatus === 300 ) {
                            this.isData = false
                        } else {
                            Toast(response[res.data.responseStatus])
                        }
                    })
                }
            },
            confirmDialCode() {

            }
        }
    }
</script>


<style>
    .dial-code-subordinate-content {
        margin-top: .8rem;
    }
    .dial-code-subordinate-content {
        padding: 0 .2rem;
    }
    .dial-code-subordinate-content .search {
        margin-top: 1rem;
        overflow: hidden;
    }
    .dial-code-subordinate-content .search .el-input {
        width: 80%;
        float: left;
    }
    .dial-code-subordinate-content .search .el-button {
        float: right;
    }
    .dial-code-subordinate-list {
        font-size: .3rem;
    }
</style>

