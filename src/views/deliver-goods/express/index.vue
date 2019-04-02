

<template>
    <div class="express">
        <div class="return">
            <img
                src="@/assets/images/return.png" alt="" 
                @click='$router.go(-1)'/>
            <span>发货</span>
        </div>
        <div class="express-list">
            <ul>
                <li @click="choiceExpress('顺风快递')">
                    <img src="@/assets/images/expreeIcon/1.jpg" alt="">
                    <span>顺风快递</span>
                </li>
                <li @click="choiceExpress('韵达快递')">
                    <img src="@/assets/images/expreeIcon/2.jpg" alt="">
                    <span>韵达快递</span>
                </li>
                <li @click="choiceExpress('申通快递')">
                    <img src="@/assets/images/expreeIcon/3.jpg" alt="">
                    <span>申通快递</span>
                </li>
                <li @click="choiceExpress('圆通快递')">
                    <img src="@/assets/images/expreeIcon/4.jpg" alt="">
                    <span>圆通快递</span>
                </li>
                <li @click="choiceExpress('中通快递')">
                    <img src="@/assets/images/expreeIcon/5.jpg" alt="">
                    <span>中通快递</span>
                </li>
                <li @click="choiceExpress('天天快递')">
                    <img src="@/assets/images/expreeIcon/6.jpg" alt="">
                    <span>天天快递</span>
                </li>
                <li @click="choiceExpress('佳吉快递')">
                    <img src="@/assets/images/expreeIcon/7.jpg" alt="">
                    <span>佳吉快递</span>
                </li>
                <li @click="choiceExpress('百世汇通')">
                    <img src="@/assets/images/expreeIcon/8.jpg" alt="">
                    <span>百世汇通</span>
                </li>
                <li @click="choiceExpress('全蜂快递')">
                    <img src="@/assets/images/expreeIcon/9.jpg" alt="">
                    <span>全蜂快递</span>
                </li>
                <li @click="choiceExpress('中国邮政')">
                    <img src="@/assets/images/expreeIcon/10.jpg" alt="">
                    <span>中国邮政</span>
                </li>
                <li @click="choiceExpress('优速快递')">
                    <img src="@/assets/images/expreeIcon/11.jpg" alt="">
                    <span>优速快递</span>
                </li>
                <li @click="choiceExpress('EMS快递')">
                    <img src="@/assets/images/expreeIcon/12.jpg" alt="">
                    <span>EMS快递</span>
                </li>
                <li @click="choiceExpress('德邦快递')">
                    <img src="@/assets/images/expreeIcon/13.jpg" alt="">
                    <span>德邦快递</span>
                </li>
                <li @click="choiceExpress('宅急送')">
                    <img src="@/assets/images/expreeIcon/14.jpg" alt="">
                    <span>宅急送</span>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
    export default {
        data () {
            return {}
        },
        methods: {
            choiceExpress(name) {
                console.log(name)
            }
        }
    }
</script>


<style>
.express .express-list {
    margin-top: .8rem;
}
.express .express-list ul {
    overflow: hidden;
}
.express .express-list ul li {
    float: left;
    width: 25%;
    border: .01rem solid #f1f1f1;
    box-sizing: border-box;
    text-align: center;
}
.express .express-list ul li span {
    font-size: .3rem;
    padding: .3rem 0 .5rem 0;
    display: block;
}
.express .express-list img {
    width: 2rem;
}
</style>


