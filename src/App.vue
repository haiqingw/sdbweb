<template>
    <div id="app">
        <router-view v-if="isRouterAlive" v-wechat-title="$store.state.merchant.title"></router-view>
    </div>
</template>

<script>
export default {
    name: "App",
    provide() {
        return {
            reload: this.reload
        };
    },
    data() {
        return {
            isRouterAlive: true
        };
    },
    methods: {
        reload() {
            this.isRouterAlive = false;
            this.$nextTick(function() {
                this.isRouterAlive = true;
            });
        }
    },
    mounted() {
        // window.onpopstate = () => {
        //     if (!this.allowBack) {
        //         //    这个allowBack 是存在vuex里面的变量
        //         history.go(1);
        //     }
        // };
    },
    created() {}
};
</script>

<style>
</style>
