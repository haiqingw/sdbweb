
<template>
    <div class="application-agent-To-examine">
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)">
            <span>代理审核</span>
        </div>
        <div class="agentCheckMain">
            <!-- 审核切换按钮 -->
            <div class="agentCheckTabMain flex line_bottom">
                <a href="javascript:;">待审核</a>
                <a href="javascript:;" class="active">已审核</a>
            </div>
            <!-- 审核列表 -->
            <div class="agentCheckListMain">
                <div class="agentCheckListItem">
                    <h3>申请人：
                        <span>任勇强</span>
                    </h3>
                    <div class="flex">
                        <span>
                            联系方式：
                            <i>13296905340</i>
                        </span>
                        <a href="tel:13296905340">
                            <img src="@/assets/images/invitation-record-lis-telephone.png" alt="一键拨号">
                        </a>
                    </div>
                    <p>申请时间：2019-05-22 15:00:00</p>
                    <a href="javascript:;">审核</a>
                </div>
                <div class="agentCheckListItem">
                    <h3>申请人：
                        <span>任勇强</span>
                    </h3>
                    <div class="flex">
                        <span>
                            联系方式：
                            <i>13296905340</i>
                        </span>
                        <a href="tel:13296905340">
                            <img src="@/assets/images/invitation-record-lis-telephone.png" alt="一键拨号">
                        </a>
                    </div>
                    <p>申请时间：2019-05-22 15:00:00</p>
                    <a href="javascript:;">审核</a>
                </div>
                <div class="agentCheckListItem">
                    <h3>申请人：
                        <span>任勇强</span>
                    </h3>
                    <div class="flex">
                        <span>
                            联系方式：
                            <i>13296905340</i>
                        </span>
                        <a href="tel:13296905340">
                            <img src="@/assets/images/invitation-record-lis-telephone.png" alt="一键拨号">
                        </a>
                    </div>
                    <p>申请时间：2019-05-22 15:00:00</p>
                    <a href="javascript:;">审核</a>
                </div>
                <div class="agentCheckListItem">
                    <h3>申请人：
                        <span>任勇强</span>
                    </h3>
                    <div class="flex">
                        <span>
                            联系方式：
                            <i>13296905340</i>
                        </span>
                        <a href="tel:13296905340">
                            <img src="@/assets/images/invitation-record-lis-telephone.png" alt="一键拨号">
                        </a>
                    </div>
                    <p>申请时间：2019-05-22 15:00:00</p>
                    <a href="javascript:;">审核</a>
                </div>
                <div class="agentCheckListItem">
                    <h3>申请人：
                        <span>任勇强</span>
                    </h3>
                    <div class="flex">
                        <span>
                            联系方式：
                            <i>13296905340</i>
                        </span>
                        <a href="tel:13296905340">
                            <img src="@/assets/images/invitation-record-lis-telephone.png" alt="一键拨号">
                        </a>
                    </div>
                    <p>申请时间：2019-05-22 15:00:00</p>
                    <a href="javascript:;">审核</a>
                </div>
                <div class="agentCheckListItem">
                    <h3>申请人：
                        <span>任勇强</span>
                    </h3>
                    <div class="flex">
                        <span>
                            联系方式：
                            <i>13296905340</i>
                        </span>
                        <a href="tel:13296905340">
                            <img src="@/assets/images/invitation-record-lis-telephone.png" alt="一键拨号">
                        </a>
                    </div>
                    <p>申请时间：2019-05-22 15:00:00</p>
                    <a href="javascript:;">审核</a>
                </div>
                <div class="agentCheckListItem">
                    <h3>申请人：
                        <span>任勇强</span>
                    </h3>
                    <div class="flex">
                        <span>
                            联系方式：
                            <i>13296905340</i>
                        </span>
                        <a href="tel:13296905340">
                            <img src="@/assets/images/invitation-record-lis-telephone.png" alt="一键拨号">
                        </a>
                    </div>
                    <p>申请时间：2019-05-22 15:00:00</p>
                    <a href="javascript:;">审核</a>
                </div>
                <div class="agentCheckListItem">
                    <h3>申请人：
                        <span>任勇强</span>
                    </h3>
                    <div class="flex">
                        <span>
                            联系方式：
                            <i>13296905340</i>
                        </span>
                        <a href="tel:13296905340">
                            <img src="@/assets/images/invitation-record-lis-telephone.png" alt="一键拨号">
                        </a>
                    </div>
                    <span>代理产品：鼎刷，闪POS</span>
                    <p>审核时间：2019-05-22 15:00:00</p>
                    <a href="javascript:;">修改</a>
                </div>
            </div>
            <!-- 选择产品弹窗 -->
            <van-dialog v-model="show" title="请选择产品" show-cancel-button>
                <div class="checkSelectProductMain">
                    <van-checkbox-group v-model="result">
                        <van-checkbox v-for="(item, index) in list" :key="index" :name="item.name">
                            {{ item.name }}
                        </van-checkbox>
                    </van-checkbox-group>
                </div>
            </van-dialog>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show: true,
            result: [],
            list: [
                {
                    id: 1,
                    name: "鼎刷"
                },
                {
                    id: 2,
                    name: "闪POS"
                },
                {
                    id: 3,
                    name: "银POS"
                },
                {
                    id: 4,
                    name: "银POS1"
                },
                {
                    id: 4,
                    name: "银POS2"
                },
                {
                    id: 4,
                    name: "银POS3"
                },
                {
                    id: 4,
                    name: "银POS4"
                }
                // {
                //     id: 1,
                //     name: "闪POS"
                // },
                // {
                //     id: 1,
                //     name: "银POS"
                // },
                // {
                //     id: 1,
                //     name: "闪POS"
                // },
                // {
                //     id: 1,
                //     name: "银POS"
                // },
                // {
                //     id: 1,
                //     name: "闪POS"
                // },
                // {
                //     id: 1,
                //     name: "银POS"
                // },
                // {
                //     id: 1,
                //     name: "闪POS"
                // },
                // {
                //     id: 1,
                //     name: "银POS"
                // },
                // {
                //     id: 1,
                //     name: "闪POS"
                // },
                // {
                //     id: 1,
                //     name: "银POS"
                // },
                // {
                //     id: 1,
                //     name: "闪POS"
                // },
                // {
                //     id: 1,
                //     name: "银POS"
                // },
                // {
                //     id: 1,
                //     name: "闪POS"
                // },
                // {
                //     id: 1,
                //     name: "银POS"
                // }
            ]
        };
    },
    methods: {
        toggle(index) {
            this.$refs.checkboxes[index].toggle();
            console.log(index);
            // console.log(this.result)
        }
    }
};
</script>
<style lang="scss">
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
    >span{
        display: block;
        line-height:30px;
        font-size:14px;
        padding:0 15px;
    }
}
.checkSelectProductMain {
    padding: 20px;
    line-height: 40px;
    max-height: 150px;
    overflow-x: hidden;
}
.application-agent-To-examine .van-dialog__header {
    line-height: 40px;
}
</style>
