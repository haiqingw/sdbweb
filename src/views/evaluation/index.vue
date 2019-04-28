<template>
  <div class="evaluationMain">
    <!-- header -->
    <div class="return">
      <img src="@/assets/images/return.png" alt="" @click="$router.go(-1)" />
      <span>评价</span>
    </div>
    <!-- 产品标题 -->
    <!-- <h3 class="line_bottom">产品标题产品标题产品标题产品标题产品标题</h3> -->
    <h4>综合评分</h4>
    <el-rate v-model="queryData.evaluation.score" show-text> </el-rate>
    <div class="evalutionTextMain">
      <div>
        <textarea
            placeholder="产品满足你的期待吗？说说你的使用心得！"
            v-model="queryData.evaluation.content"
        ></textarea>
      </div>
    </div>
    <el-button type="primary" class="submitButton" @click="submit">确认提交</el-button>
  </div>
</template>
<script>
import {getServer} from '@/api/index'
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            queryData: {
                evaluation: {
                    requestType: 'Order', 
                    requestKeywords: 'comment', 
                    platformID: this.$store.state.user.pid, 
                    userID: this.$store.state.user.uid, 
                    userPhone: this.$store.state.user.uphone, 
                    score: 0, 
                    content: "", 
                    orderid: this.$route.params.id
                }
            }
        };
    },
    methods: {
        submit() {
            if( this.queryData.evaluation.score === 0 ) {
                Toast("请选择评分")
                return
            } else if( this.queryData.evaluation.content === "" ) {
                Toast("请输入评论内容")
                return
            } else {
                getServer(this.queryData.evaluation).then( res => {
                    if( res.data.responseStatus === 1 ) {
                        Toast("评论成功")
                        setTimeout( () => {
                            this.$router.go(-1)
                        }, 500)
                    }
                })
            }
        }
    }
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
