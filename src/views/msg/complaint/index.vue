

<template>
    <div class="complaint">
        <div class="return">
            <img
                src="@/assets/images/return.png" alt="" 
                @click="backOff"/>
            <span>投诉建议</span>
        </div>
        <div class="complaint-content">
            <div class="big-img">
                <img src="@/assets/images/index_banner.jpg" alt="">
            </div>
            <div class="p-complaint-content">
                <h3>意见反馈</h3>
                <el-form :model="complaintForm" :rules="complaintRules" ref="complaintForm"  class="demo-ruleForm">
                    <el-form-item prop="text" style="margin-bottom: .3rem">
                        <el-input placeholder="请在此留下您宝贵的意见！" type="textarea"  v-model="complaintForm.text"></el-input>
                    </el-form-item>
                    <el-form-item prop="phone">
                        <el-input placeholder='请留下您的联系方式，方便我们与您联系！' v-model="complaintForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="commitComplaint">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                complaintForm: {
                    phone: "",
                    text: ""
                },
                complaintRules: {}
            }
        },
        methods: {
            backOff() {
                this.$router.push({ name: 'index', params: { selected: 'news' }})
            },
            commitComplaint() {
                console.log("提交")
            }
        }
    }
</script>


<style>
.p-complaint-content {
    padding: 0 .24rem;
    margin-top: 0.2rem;
}
.complaint-content h3 {
    font-size: .3rem;
    font-weight: normal;
    line-height: 0.6rem;
}
.complaint-content .el-textarea textarea {
    resize: none;
    height: 3rem;
}
.complaint-content .el-button {
    width: 100%;
}
</style>


