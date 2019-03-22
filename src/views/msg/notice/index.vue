

<template>
    <div>
        <div class="return">
            <img src="@/assets/images/return.png" alt="" @click="routerback">
            <span>系统公告</span>
        </div>
        <div>公告</div>
    </div>
</template>


<script>
    export default {
        methods: {
            routerback() {
                this.$router.back(-1)
            }
        }
    }
</script>


<style>
.return {
    position: relative;
}
.return img {
    position: absolute;
    width: .5rem;
    top: 0.13rem;
    left: 0.2rem;
}
</style>


