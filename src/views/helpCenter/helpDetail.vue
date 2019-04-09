<template>
  <div>
    <!-- header -->
    <mt-header fixed title="帮助中心">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <!-- body -->
    <div class="helpCenterDetailMain">
      <h3 class="line_bottom">
        标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题
      </h3>
      <div class="helpCenterDetailBox">
        正正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文文
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
.helpCenterDetailMain {
    padding-top:40px;
    text-align:justify;
  h3 {
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
  }
}
.helpCenterDetailBox{
    padding:10px;
    line-height:20px;
    font-size:14px;
}
</style>
