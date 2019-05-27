

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
            <div class="dial-code-subordinate-list" v-if="isData">
                <div class="item" v-for="item in renderData.list" :key="item.id">
                    <div class="img">
                        <img src="@/assets/images/dial-code-user.png" alt>
                    </div>
                    <div class="info">
                        <span>{{item.busname}}</span>
                        <span>{{item.phone}}</span>
                    </div>
                    <div class="confirmDialCode">
                        <span @click="confirmDialCode(item.id)">选择</span>
                    </div>
                </div>
            </div>
            <div class="no-data" v-else>
                <img src="@/assets/images/no-data.png" alt>
            </div>
        </div>
    </div>
</template>

<script>
import { getServer } from "@/api/index";
import { Toast, Indicator } from "mint-ui";
import response from "@/assets/js/response.js";
export default {
    data() {
        return {
            isData: true,
            queryData: {
                search: {
                    requestType: "datacenter",
                    requestKeywords: "underagency",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    productID: "",
                    keywords: ""
                },
                confirmDialCode: {
                    requestType: "agent",
                    requestKeywords: "dialcode",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    childID: "",
                    machineID: this.$route.params.terminalNoId
                },
                list: {
                    requestType: "datacenter",
                    requestKeywords: "underagency",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    productID: ""
                    // keywords: ""
                }
            },
            renderData: {
                list: []
            },
            conduct: true
        };
    },
    methods: {
        search() {
            if (this.queryData.search.keywords === "") {
                Toast("请输入要搜索的手机号");
            } else {
                Indicator.open();
                this.queryData.search.productID = this.$route.params.id;
                getServer(this.queryData.search).then(res => {
                    Indicator.close();
                    if (res.data.responseStatus === 1) {
                        this.isData = true;
                        this.renderData.list = res.data.data;
                    } else if (res.data.responseStatus === 300) {
                        this.isData = false;
                    } else {
                        Toast(response[res.data.responseStatus]);
                    }
                });
            }
        },
        confirmDialCode(id) {
            if (this.conduct) {
                this.conduct = false;
                this.queryData.confirmDialCode.childID = id;
                getServer(this.queryData.confirmDialCode).then(res => {
                    if (res.data.responseStatus === 1) {
                        Toast("拨码成功");
                        setTimeout(() => {
                            this.$router.go(-1);
                            this.conduct = true;
                        }, 500);
                    } else {
                        this.conduct = true;
                        Toast(response[res.data.responseStatus]);
                    }
                });
            }
        },
        list() {
            Indicator.open();
            this.queryData.list.productID = this.$route.params.id;
            getServer(this.queryData.list).then(res => {
                Indicator.close();
                if (res.data.responseStatus === 1) {
                    this.isData = true;
                    this.renderData.list = res.data.data;
                } else if (res.data.responseStatus === 300) {
                    this.isData = false;
                } else {
                    Toast(response[res.data.responseStatus]);
                }
            });
        }
    },
    created() {
        this.list();
    }
};
</script>


<style>
.dial-code-subordinate .no-data {
    width: 70%;
}
.dial-code-subordinate-content {
    margin-top: 0.8rem;
}
.dial-code-subordinate-content {
    padding: 0 0.2rem;
}
.dial-code-subordinate-content .search {
    margin-top: 1rem;
    overflow: hidden;
}
.dial-code-subordinate-content .search .el-input {
    width: 70%;
    float: left;
}
.dial-code-subordinate-content .search .el-button {
    float: right;
}
.dial-code-subordinate-list {
    font-size: 0.3rem;
    margin-top: 0.3rem;
}
.dial-code-subordinate-list .item {
    padding: 0.2rem;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
}
.dial-code-subordinate-list .item .img {
    width: 0.8rem;
    float: left;
}
.dial-code-subordinate-list .item .info {
    float: left;
    margin-left: 0.3rem;
    line-height: 0.4rem;
}
.dial-code-subordinate-list .item .info span {
    display: block;
}
.dial-code-subordinate-list .item .confirmDialCode {
    float: right;
    color: #409eff;
    line-height: 0.8rem;
}
</style>

