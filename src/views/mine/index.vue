<template>
    <div>
        <!-- 头部 -->
        <div class="mineHeaderMain">
            <h3>个人中心</h3>
            <div class="mineHeaderBox">
                <a href="javascript:;" class="mineNoticeBtn">
                    <img src="@/assets/images/settingCenterIcon.png" alt="设置中心">
                    <!-- <i></i> -->
                </a>
                <span><img src="@/assets/images/logoSmallImg.jpg" alt="头像"></span>
                <p>青城五点半
                    <em>股东</em>
                </p>
                <div class="mineHeaderBody flex">
                    <div>
                        <b>0.00</b>
                        <p>钱包余额</p>
                    </div>
                    <div class="left_line">
                        <b>0.00</b>
                        <p>待解冻</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="mineBodyMain">
            <div class="mineItemBox line_bottom">
                <h3 class="mineTitle">我的订单</h3>
                <div class="flex">
                    <span>订单详情都在这里呢</span>
                    <a href="javascript:;" class="arrIcon">
                        查看所有订单
                    </a>
                </div>
            </div>
        </div>
        <!-- 常用菜单 -->
        <div class="mineCommonMenuBox">
            <h3 class="mineTitle">常用菜单</h3>
            <div class="mineCommonMenuList">
                <a href="javascript:;">
                    <img src="@/assets/images/myTerminalIcon.png" alt="常用菜单">
                    <p>我的终端</p>
                </a>
                <a href="javascript:;"> <img src="@/assets/images/AffiliateTransactionsIcon.png" alt="常用菜单">
                    <p>下属交易</p>
                </a>
                <a href="javascript:;">
                    <img src="@/assets/images/balanceIcon.png" alt="常用菜单">
                    <p>余额/提现</p>
                </a>
                <a href="javascript:;">
                    <img src="@/assets/images/myMachineIcon.png" alt="常用菜单">
                    <p>我的机具</p>
                </a>
                <a href="javascript:;">
                    <img src="@/assets/images/CapitalSubsidiaryIcon.png" alt="常用菜单">
                    <p>资金明细</p>
                </a>
                <a href="javascript:;">
                    <img src="@/assets/images/InvitedRecordIcon.png" alt="常用菜单">
                    <p>邀请记录</p>
                </a>
                <a href="javascript:;">
                    <img src="@/assets/images/settingCenterIcon.png" alt="常用菜单">
                    <p>设置中心</p>
                </a>
                <a href="javascript:;">
                    <img src="@/assets/images/aboutIcon.png" alt="常用菜单">
                    <p>关于我们</p>
                </a>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Footer from "@/components/footerNav/footer";
export default {
    data() {
        return {};
    },
    components: {
        Footer
    },
    methods: {}
};
</script>
<style lang="scss">
.mineHeaderMain {
    width: 100%;
    background: url("../../assets/images/mineHeaderImg.jpg") no-repeat center
        center;
    background-size: 100% 100%;
    padding: 0 15px 20px;
    box-sizing: border-box;
    > h3 {
        line-height: 50px;
        font-size: 16px;
        color: #333;
        text-align: center;
    }
}
.mineHeaderBox {
    width: 100%;
    margin: 0 auto;
    background: #fff;
    padding: 30px 15px;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 0 0 20px #ccc;
    position: relative;
    .mineNoticeBtn {
        display: block;
        width: 30px;
        height: 30px;
        position: absolute;
        right: 10px;
        top: 8px;
        z-index: 9999999;
        i {
            display: block;
            width: 10px;
            height: 10px;
            background: #f33;
            position: absolute;
            right: 1px;
            top: 1px;
            border-radius: 50%;
        }
    }
    > span {
        display: block;
        width: 70px;
        height: 70px;
        margin: 0 auto;
        overflow: hidden;
        border-radius: 50%;
        border: 2px solid #f1f1f1;
        box-sizing: border-box;
        img {
            width: 100%;
            height: 100%;
        }
    }
    > p {
        line-height: 40px;
        font-size: 16px;
        color: #333;
        text-align: center;
        font-weight: bold;
        em {
            background: #0096fe;
            color: #fff;
            font-size: 12px;
            padding: 0 5px;
            border-radius: 5px;
            position: relative;
            top: -2px;
            margin-left: 5px;
        }
    }
}
.mineHeaderBody {
    justify-content: space-around;
    padding-top: 10px;
    > div {
        width: 100%;
        text-align: center;
        font-size: 14px;
        &:first-of-type {
            border-right: 1px solid #f1f1f1;
        }
        b {
            font-size: 22px;
        }
        p {
            font-size: 12px;
        }
    }
}
.mineItemBox {
    padding-bottom: 15px;
}
.mineTitle {
    line-height: 30px;
    padding: 5px 15px 0;
    font-size: 18px;
    color: #333;
}
.mineItemBox > div {
    justify-content: space-between;
    font-size: 14px;
    padding: 0 15px;
    a {
        color: #0096fe;
    }
}
.mineCommonMenuBox {
    padding-top: 10px;
}
.mineCommonMenuList {
    padding: 0 15px;
    a {
        display: block;
        width: 25%;
        text-align: center;
        float: left;
        padding-top: 15px;
        img {
            width: 30px;
            height: 30px;
            display: block;
            margin: 0 auto;
        }
        p {
            padding-top: 5px;
            font-size: 12px;
            color: #333;
        }
    }
}
</style>