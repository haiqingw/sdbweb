
<template>
    <div class="application-agent-To-examine">
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)">
            <span>代理审核</span>
        </div>
        <div class="agentCheckMain">
            <!-- 审核切换按钮 -->
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <!-- <div class="agentCheckTabMain flex line_bottom">
                <a href="javascript:;">待审核</a>
                <a href="javascript:;" class="active">已审核</a>
                </div>-->
                <el-tab-pane label="待审核" name="1">
                    <div class="agentCheckListMain" v-if="isUnauditedData">
                        <div
                            class="agentCheckListItem agentCheckedListItem"
                            v-for="(item,index) in unaudited"
                            :key="index"
                        >
                            <h3>
                                申请人：
                                <span>{{item.name}}</span>
                            </h3>
                            <div class="flex">
                                <span>
                                    联系方式：
                                    <i>{{item.phone}}</i>
                                </span>
                                <a href="tel:13296905340">
                                    <img
                                        src="@/assets/images/invitation-record-lis-telephone.png"
                                        alt="一键拨号"
                                    >
                                </a>
                            </div>
                            <!-- <span>代理产品：{{item.agentPro}}</span> -->
                            <!-- <p>申请时间：{{item.applyTime}}</p> -->
                            <p>审核时间：{{item.createTime}}</p>
                            <a href="javascript:;" @click="showProModel(item.id, item.bid)">审核</a>
                        </div>
                    </div>
                    <div class="no-data" v-else>
                        <img src="@/assets/images/no-data.png" alt>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="已审核" name="2">
                    <div class="agentCheckListMain" v-if="isAuditedData">
                        <div
                            class="agentCheckListItem agentCheckedListItem"
                            v-for="(item,index) in audited"
                            :key="index"
                        >
                            <h3>
                                申请人：
                                <span>{{item.name}}</span>
                            </h3>
                            <div class="flex">
                                <span>
                                    联系方式：
                                    <i>{{item.phone}}</i>
                                </span>
                                <a href="tel:13296905340">
                                    <img
                                        src="@/assets/images/invitation-record-lis-telephone.png"
                                        alt="一键拨号"
                                    >
                                </a>
                            </div>
                            <!-- <span>代理产品：{{item.agentPro}}</span> -->
                            <!-- <p>申请时间：{{item.applyTime}}</p> -->
                            <p>审核时间：{{item.createTime}}</p>
                            <a href="javascript:;" @click="showProModel(item.id, item.bid)">修改</a>
                        </div>
                    </div>
                    <div class="no-data" v-else>
                        <img src="@/assets/images/no-data.png" alt>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <!-- 审核列表 -->
            <!-- 选择产品弹窗 -->
            <van-dialog v-model="show" title="请选择产品" show-cancel-button @confirm="productConfirm">
                <div class="checkSelectProductMain">
                    <van-checkbox-group v-model="result">
                        <van-checkbox
                            v-for="(item, index) in renderData.list"
                            :key="index"
                            :name="item.id"
                        >{{ item.name }}</van-checkbox>
                    </van-checkbox-group>
                </div>
            </van-dialog>
        </div>
    </div>
</template>
<script>
import { getServer } from "@/api/index";
import response from '@/assets/js/response.js'
import { Indicator, Toast } from 'mint-ui'
export default {
    data() {
        return {
            isAuditedData: true,
            isUnauditedData: true,
            activeName: "1",
            show: false,
            result: [],
            checkListArr: [],
            audited: [],
            unaudited: [],
            queryData: {
                listProduct: {
                    requestType: "personal",
                    requestKeywords: "agentproduct",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                },
                list: {
                    requestType: "personal",
                    requestKeywords: "audits",
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone
                },
                productConfirm: {
                    requestType: 'personal',
                    requestKeywords: 'auditmod',
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    productID: "",
                    auditID: "", // 申请列表ID,
                    applicantID: ""  // 申请人ID
                }
            },
            renderData: {
                list: []
            }
        };
    },
    methods: {
        showProModel(auditID, applicantID) {
            this.queryData.productConfirm.applicantID = applicantID
            this.queryData.productConfirm.auditID = auditID
            getServer(this.queryData.listProduct).then(res => {
                // alert(JSON.stringify(res))
                if (res.data.responseStatus === 1) {
                    this.show = !this.show;
                    // alert(res.data.data.length)
                    this.renderData.list = res.data.data;
                }
            });
        },
        productConfirm() {
            this.queryData.productConfirm.productID = this.result.join(',')
            getServer(this.queryData.productConfirm).then(res => {
                // alert(response[res.data.responseStatus])
                if (res.data.responseStatus === 1) {
                    if( this.activeName === "1" ) {
                        Toast("审核成功")
                    } else {
                        Toast("修改成功")
                    }
                    this.activeName = "2";
                    this.list();
                }
            });
        },
        list() {
            Indicator.open()
            getServer(this.queryData.list).then(res => {
                Indicator.close();
                if (res.data.responseStatus === 1) {
                    // this.checkListArr = res.data.data;
                    // alert(JSON.stringify(res.data.data))
                    this.unaudited = res.data.data.filter(
                        item => item.review == "未审核"
                    );
                    this.audited = res.data.data.filter(
                        item => item.review != "未审核"
                    );
                }
            });
        },
        handleClick() {
            this.list()
            if (this.activeName === "1") {
                if (this.unaudited.length === 0) {
                    this.isUnauditedData = false
                } else {
                    this.isUnauditedData = true
                }
            } else {
                if (this.audited.length === 0) {
                    this.isAuditedData = false
                } else {
                    this.isAuditedData = true
                }
            }
        }
    },
    created() {
        this.list();
    }
};
</script>
<style lang="scss">
.application-agent-To-examine .el-tabs {
    display: block;
}
.application-agent-To-examine .el-tabs__header {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0.4rem;
    z-index: 9;
    background: #fff;
}
.application-agent-To-examine .el-tabs__nav {
    width: 100%;
    text-align: center;
}
.application-agent-To-examine .el-tabs__nav .el-tabs__item {
    width: 50%;
}
.agentCheckMain {
    padding-top: 1.6rem;
}
.agentCheckTabMain {
    justify-content: space-around;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0.8rem;
    z-index: 999;
    a {
        display: block;
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        position: relative;
        &.active {
            font-weight: bold;
            color: #089cfe;
            &:after {
                content: "";
                display: block;
                width: 56px;
                height: 2px;
                background: #089cfe;
                position: absolute;
                left: 50%;
                bottom: 0;
                margin-left: -28px;
            }
        }
    }
}
.agentCheckListItem {
    border-bottom: 5px solid #f1f1f1;
    padding-right: 100px;
    position: relative;
    > a {
        display: block;
        width: 80px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        background: #089cfe;
        color: #fff;
        position: absolute;
        right: 10px;
        top: 50%;
        margin-top: -20px;
    }
    h3 {
        line-height: 40px;
        font-size: 18px;
        color: #333;
        padding: 0 15px;
    }
    div {
        padding: 0 15px;
        line-height: 20px;
        span {
            font-size: 16px;
        }
        a {
            margin-left: 10px;
            img {
                width: 20px;
                height: 20px;
                display: block;
            }
        }
    }
    p {
        font-size: 14px;
        padding: 3px 15px 2px;
        color: #999;
        line-height: 30px;
    }
    > span {
        display: block;
        line-height: 30px;
        font-size: 14px;
        padding: 5px 15px 0;
    }
}
.agentCheckedListItem {
    p {
        margin-top: -5px;
    }
}
.checkSelectProductMain {
    padding: 20px;
    line-height: 40px;
    max-height: 150px;
    overflow-x: hidden;
}
// .application-agent-To-examine .van-dialog__header {
//     line-height: 40px;
// }
</style>
