

<template>
    <div></div>
</template>

<script>
import { Indicator } from "mint-ui";
import qs from "qs";
export default {
    data() {
        return {};
    },
    methods: {},
    created() {
        const plat = this.$route.query.plat;
        // window.location.href = "http://ttsplus.xylrcs.cn/index.php/App/Wchattest/getOpenid?plat=" + plat;
        window.location.href = 'http://ttsplus.xylrcs.cn/index.php/App/Wchat/getOpenid?plat' + plat
    }
};
</script>

<style>
</style>


