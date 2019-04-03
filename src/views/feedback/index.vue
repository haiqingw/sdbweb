<template>
    <div>
        <!-- header -->
        <mt-header fixed title="意见反馈">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <!-- body -->
        <div class="feedbackMain">
             <div class="feedbackTopMain">
                 <h3>客服热线：13296905340</h3>
                 <p>（周一到周五9:30-17:30）</p>
             </div>
             <div class="interval"></div>
             <div class="feedbackSubMain">
                 <h3>留言反馈</h3>
                 <div>
                     <textarea placeholder="请在此留下您宝贵的意见!"></textarea>
                 </div>
                 <div>
                     <input type="text" placeholder="请留下您的联系方式，方便我们与您联系！">
                 </div>
             </div>
             <div class="submitBtnMain">
                <mt-button type="primary" size="large">确定提交</mt-button>
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
.feedbackMain{
    padding-top:40px;
}
.feedbackTopMain{
  h3{
      font-size:18px;
      text-align:center;
      padding-top:20px;
  }
  p{
      font-size:12px;
      text-align:center;
      line-height:30px;
      padding-bottom:10px;
  }
}
.feedbackSubMain{
   h3{
       
   }
}
</style>
