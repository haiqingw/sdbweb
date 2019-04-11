<template>
  <div>
    <!-- header -->
    <!-- <mt-header fixed title="关于我们">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header> -->
    <div class="return">
      <img src="@/assets/images/return.png" alt="" @click="$router.go(-1)" />
      <span>关于我们</span>
    </div>
    <!-- body -->
    <div class="aboutMain">
      <div v-html="contentData"></div>
      <div v-if="isData">
        <div class="no-data">
          <img src="@/assets/images/no-data.png" alt="暂无数据" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAbout } from "@/api/mine";
import response from "@/assets/js/response.js";
export default {
  data() {
    return {
      contentData: "",
      isData:false,
      queryData: {
        requestType: "system",
        requestKeywords: "getsystem",
        platformID: this.$store.state.user.pid,
        type: "appabout"
      }
    };
  },
  methods: {
    aboutFn() {
      getAbout(this.queryData).then(res => {
         console.log(res);
        if (res.data.responseStatus === 1) {
          this.contentData = res.data.content;
          if (res.data.content == "<p>暂无数据</p>" || res.data.content == "") {
            this.contentData = "";  
            this.isData = true;
          }
        }
      });
    }
  },
  created() {
    this.aboutFn();
  }
};
</script>
<style lang="scss">
.aboutMain {
  padding: 50px 10px 10px;
  font-size: 14px;
  color: #333;
  line-height: 20px;
  text-align: justify;
}
</style>
