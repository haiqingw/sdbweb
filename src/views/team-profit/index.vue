<template>
    <div class="financial-details">
        <div class="return">
            <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
            <span>团队收益</span>
        </div>
    </div>
</template>
<script>
import { getServer } from "@/api/index";
export default {
    // components: {
    //     'modal-tag': modalTag,  //组件
    // },
    data() {
        return {
            queryData: {
                
            },
            renderData: {

            }
        };
    },
    methods: {
        
       
        
    },
    created() {
        
    },
    mounted() {
    }
};
</script>
<style lang="scss">
</style>
