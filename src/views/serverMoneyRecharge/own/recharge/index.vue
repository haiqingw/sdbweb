<template>
    <div class="serverMoneyRechargeOwnRecharge">
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
            <span>业务员续费</span>
        </div>
        <div class="content">
            <div class="top">
                <span>请选择续费时长</span>
                <router-link to="/serverMoneyRechargeOwnList">充值记录</router-link>
            </div>
            <div class="list">
                <ul>
                    <li v-for="(item, index) in renderData.list" :key="index">
                        <div class="left">
                            <span>{{item.days}}天</span>
                            <em>¥{{item.money}}.00</em>
                        </div>
                        <div class="right">
                            <van-radio-group v-model="radio">
                                <van-radio :name="item.money"></van-radio>
                            </van-radio-group>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="bottom">
                <span>
                    支付<em>{{radio}}¥</em>
                </span>
                <em @click="renew">立即续费</em>
            </div>
        </div>
    </div>
</template>

<script>
import {getServer} from '@/api/index';
export default {
    data() {
        return {
            radio: "",
            queryData: {
                list: {
                    requestType: 'servicefee', 
                    requestKeywords: 'templatelist', 
                    platformID: this.$store.state.user.pid, 
                    userID: this.$store.state.user.uid, 
                    userPhone: this.$store.state.user.uphone
                }
            },
            renderData: {
                list: []
            },
        };
    },
    methods: {
        list() {
            getServer(this.queryData.list).then( res => {
                if (res.data.responseStatus === 1) {
                    this.renderData.list = res.data.data
                    this.radio = res.data.data[0].money
                }
            })
        },
        renew() {
            alert("续费")
        }
    },
    created() {
        this.list()
    }
};
</script>

<style>
.serverMoneyRechargeOwnRecharge .content {
    margin-top: 1rem;
}
.serverMoneyRechargeOwnRecharge .content .top {
    font-size: 0.26rem;
    padding: 0 0.2rem;
    overflow: hidden;
    line-height: 0.3rem;
    margin-bottom: 0.3rem;
}
.serverMoneyRechargeOwnRecharge .content .top span {
    float: left;
}
.serverMoneyRechargeOwnRecharge .content .top a {
    float: right;
}
.serverMoneyRechargeOwnRecharge .content .list {
    font-size: 0.3rem;
    padding: 0 0.2rem;
}
.serverMoneyRechargeOwnRecharge .content .list ul li {
    border: 1px solid #ccc;
    line-height: 0.8rem;
    padding: 0 0.2rem;
    border-radius: 0.1rem;
    margin-bottom: 0.2rem;
    overflow: hidden;
}
.serverMoneyRechargeOwnRecharge .content .list ul li .left {
    float: left;
}
.serverMoneyRechargeOwnRecharge .content .list ul li .left em {
    color: #cc0033;
    margin-left: 0.1rem;
    font-weight: 700;
}
.serverMoneyRechargeOwnRecharge .content .list ul li .right {
    float: right;
    border-left: 1px dashed #f1f1f1;
    padding-left: .2rem;
}
.serverMoneyRechargeOwnRecharge .bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    font-size: .28rem;
    line-height: .8rem;
    width: 100%;
    background: #f1f1f1;
    padding-left: .2rem;
    box-sizing: border-box;
}
.serverMoneyRechargeOwnRecharge .bottom span {
    float: left;
}
.serverMoneyRechargeOwnRecharge .bottom span em {
    color: red;
    margin-left: .1rem;
}
.serverMoneyRechargeOwnRecharge .bottom>em {
    float: right;
    background: #089cfe;
    color: #fff;
    padding: 0 .2rem;
}
</style>


