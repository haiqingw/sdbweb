
<template>
    <div class="application-agent">
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)">
            <span>申请代理</span>
        </div>
        <div class="applyAgentMain">
            <img src="@/assets/images/applyAgentImg.jpg" alt="申请代理">
        </div>
        <div class="applyAgentButtonMain">
            <a href="javascript:;" @click="applyAgent()">立即成为代理商</a>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    methods:{
        applyAgent(){
           console.log('申请代理');
        }
    }
};
</script>
<style lang="scss">
.application-agent {
    padding-top:0.8rem;
}
.applyAgentButtonMain {
    position: fixed;
    width: 100%;
    height: 55px;
    left: 0;
    bottom: 0;
    z-index: 99;
    box-sizing: border-box;
    padding: 10px;
    background: #fff;
}

.applyAgentButtonMain a {
    text-align: center;
    display: block;
    font-size: 16px;
    line-height: 35px;
    background: -webkit-linear-gradient(top, #1b9bfc 0%, #4c81ef 100%);
    color: #fff;
    border-radius: 4px;
    border: 1px solid #4c81ef;
}
</style>
