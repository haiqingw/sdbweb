<template>
    <div>
        <!-- header -->
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)">
            <span>服务商数据统计</span>
        </div>
        <!-- body -->
        <div class="agentDataMain">
            <div class="agentDataHeaderMain"></div>
            <div class="agentDataBodyMain"></div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    }
};
</script>
<style lang="scss">
.agentDataMain {
    padding-top: 0.8rem;
}
</style>
