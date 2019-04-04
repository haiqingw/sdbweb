<template>
    <div>
        <!-- header -->
        <div class="return">
            <img
                src="@/assets/images/return.png" alt="" 
                @click="$router.go(-1)"/>
            <span>实名认证</span>
        </div>
        <!-- body -->
        <div class="certificationMain">
            <h3>个人信息认证</h3>
            <p>为有效保障您的资金安全，请填写与您身份证一致的信息，否则不会通过审核！</p>
            <div class="itemTopTextMain">
                <p>真实姓名</p>
                <div class="line_bottom">
                    <input type="text" placeholder="请填写您本人的真实姓名">
                </div>
            </div>
            <div class="itemTopTextMain">
                <p>身份证号</p>
                <div class="line_bottom">
                    <input type="text" placeholder="请填写您本人的身份证号">
                </div>
            </div>
             <div class="submitBtnMain">
                <mt-button type="primary" size="large" @click="submitModification">下一步</mt-button>
            </div>
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
.certificationMain{
    padding:40px 20px 15px;
    >h3{
        font-size:26px;
        line-height:60px;
        color:#333;
        padding-top:35px;
    }
    >p{
       font-size:14px;
       text-align:justify;
       line-height:22px;
       color:#666;
    }
    >div:first-of-type{
        padding-top:40px;
    }
}
.itemTopTextMain{
    padding-top:30px;
    >p{
        font-size:14px;
        line-height:20px;
        font-weight:bold;
    }
    >div{
        height:60px;
        line-height:60px;
        input{
            border:none;
            background:none;
            font-size:16px;
            display:block;
            width:100%;
        }
    }
}
.submitBtnMain{
    padding-top:40px;
}
</style>
