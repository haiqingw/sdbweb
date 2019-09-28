<template>
    <div class="guideViewContainer">
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
            <span>帮助中心</span>
        </div>
        <div class="guideViewMain">
            <img src="@/assets/images/guideImg01.jpg" alt />
            <img src="@/assets/images/guideImg02.jpg" alt />
            <img src="@/assets/images/guideImg03.jpg" alt />
            <img src="@/assets/images/guideImg04.jpg" alt />
            <img src="@/assets/images/guideImg05.jpg" alt />
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style>
.guideViewMain {
    margin-top: .8rem;
}
</style>
