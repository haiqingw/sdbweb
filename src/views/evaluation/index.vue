<template>
  <div class="evaluationMain">
    <!-- header -->
    <div class="return">
      <img src="@/assets/images/return.png" alt="" @click="$router.go(-1)" />
      <span>评价</span>
    </div>
    <!-- 产品标题 -->
    <h3 class="line_bottom">产品标题产品标题产品标题产品标题产品标题</h3>
    <h4>综合评分</h4>
    <el-rate v-model="value3" show-text> </el-rate>
    <div class="evalutionTextMain">
      <div>
        <textarea
          placeholder="产品满足你的期待吗？说说你的使用心得！"
        ></textarea>
      </div>
    </div>
    <el-button type="primary" class="submitButton">确认提交</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value3: null
    };
  },
  methods: {}
};
</script>
<style lang="scss">
.el-rate__icon {
  font-size: 36px;
}
.el-rate {
  height: 70px;
}
.evaluationMain {
    padding:1.1rem 15px 15px;
  > h3 {
    font-size: 14px;
    line-height: 22px;
    padding-bottom: 10px;
    text-align: justify;
  }
  > h4 {
    padding-top: 10px;
    font-size: 18px;
    line-height: 22px;
  }
}

.evalutionTextMain > div {
  border: 1px solid skyblue;
  box-shadow: 0 0 5px skyblue;
  border-radius: 5px;
  height: 150px;
  padding: 5px 10px;
  box-sizing: border-box;
}

.evalutionTextMain > div textarea {
  width: 100%;
  font-size: 14px;
  color: #333;
  line-height: 26px;
  border: none;
  background: none;
  resize: none;
  font-family: "é»‘ä½“";
}
.submitButton {
  width: 100%;
}
</style>
