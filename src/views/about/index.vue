<template>
    <div>
        <!-- header -->
        <mt-header fixed title="关于我们">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <!-- body -->
        <div class="aboutMain">
            关于我关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们关于我们们
        </div> 
    </div>
</template>
<script>
export default {
    data() {
        return {

        };
    },
    methods: {}
};
</script>
<style lang="scss">
.aboutMain{
    padding:50px 10px 10px;
    font-size:14px;
    color:#333;
    line-height:20px;
    text-align:justify;
}
</style>
