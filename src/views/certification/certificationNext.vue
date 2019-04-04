<template>
    <div>
        <!-- header -->
       <div class="return">
            <img
                src="@/assets/images/return.png" alt="" 
                @click="$route.go(-1)"/>
            <span>实名认证</span>
        </div>
        <!-- body -->
        <div class="certificationNextMain">
            
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    methods: {}
};
</script>
<style lang="scss">
</style>
