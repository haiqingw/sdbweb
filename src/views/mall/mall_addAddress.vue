<template>
    <div>
        <!-- header -->
        <mt-header fixed title="添加收货地址">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <!-- addAddress -->
        <section class="addAddressSection">
           <SelectAddress></SelectAddress>
           <mt-field class="detailAddress" label="" placeholder="请输入详细地址" v-model="username"></mt-field>
           <div class="SetToDefault line_top">
            <mt-switch v-model="value">设为默认</mt-switch>
           </div>
           <div class="submitView">
             <mt-button type="primary" size="large">确认提交</mt-button>
           </div>
        </section>
    </div>
</template>
<script>
import SelectAddress from '@/components/selectAddress/selectAddress'
export default {
    name: "mallAddAddress",
    data() {
        return {};
    },
    methods: {},
    components:{
      SelectAddress  
    }
};
</script>
<style lang="scss">
   .addAddressSection{
       width:100%;
       height:100%;
       position: fixed;
       left:0;
       bottom:0;
       padding-top:40px;
   } 
   .submitView{
       padding:15px;
   }
   .SetToDefault{
       font-size:16px;
       padding:15px;
   }
</style>