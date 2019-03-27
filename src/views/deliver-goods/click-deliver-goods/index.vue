

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
            <ul>
                <li>
                    <el-radio v-model="radio" label="1">111111111111111111111111111</el-radio>
                </li>
                <li>
                    <el-radio v-model="radio" label="2">111111111111111111111111111</el-radio>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                radio: "1",
                
                renderData: {
                    sub: {
                        name: "",
                        oddNumbers: ""
                    }
                }
            }
        },
        methods: {
           
        }
    }
</script>

<style>
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


