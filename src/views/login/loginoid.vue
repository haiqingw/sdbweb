

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
        // let plat = this.$route.query.plat;
        // window.location.href = "http://ttsplus.xylrcs.cn/index.php/App/Wchattest/getOpenid?plat=" + plat;
        // alert(plat)
        // window.location.href = 'http://ttsplus.xylrcs.cn/index.php/App/Wchacf/getOpenid?plat=' + plat
    },
    mounted() {
        // let plat = this.$route.query.plat || this.$store.state.user.plat;
        // window.location.href =
        //     "http://ttsplus.xylrcs.cn/index.php/App/Wchacf/getOpenid?plat=" +
        //     plat;
        let plat = this.$route.query.plat || 1;
        window.location.href =
            "http://ttsplus.xylrcs.cn/index.php/App/Wchattest/getOpenid?plat=" +
            plat;
    }
};
</script>

<style>
</style>


