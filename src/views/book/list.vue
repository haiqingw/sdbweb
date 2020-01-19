<template>
  <div>
    <div class="return">
      <img src="@/assets/images/return.png" alt @click="$router.go(-1)" />
      <span>预约订货</span>
    </div>
    <!-- body -->
    <div class="bookListContainer">
      <cube-scroll
        ref="scroll"
        :data="renderData.list"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp"
        :options="options"
      >  
      <div class="bookListMain" v-if="isData">
        <div class="bookListItem" v-for="(item,index) in renderData.list" :key="index">
          <router-link tag="div" class="bookListLeftBox" :to="{name:'bookdetail',params:{id:item.id}}">
            <h3>优选套餐</h3>
            <div>
              <img :src="item.imgPath" alt="产品图片" />
            </div>
          </router-link>
          <div class="bookListRightBox">
            <div class="restrictedPurchase">
              可预约数量：
              <b>{{item.commoditySets}}</b>台
            </div>
            <h3>{{item.title}}</h3>
            <p>押金：{{item.totalPrice}}</p>
            <a href="javascript:;">点击预约</a>
          </div>
        </div>
      </div>
       <div class="bookListMain" v-else>
         <div class="no-data-main">
          <img src="@/assets/images/no-data.png" alt="暂无数据" />
        </div>  
       </div>    
      </cube-scroll>
      <!-- 批量购买按钮 -->
      <div class="volumePurchaseMain">
        <a href="javascript:;">批量预定</a>
      </div>
    </div>
  </div>
</template>
<script>
import { getServer } from "@/api/index";
import response from "@/assets/js/response.js";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      isData:true,
       options: {
        pullDownRefresh: {
          threshold: 90,
          stop: 40,
          txt: "刷新成功"
        }, // 配置下拉刷新
        pullUpLoad:false
      },
      queryData: {
        relogin: {
          requestType: "buslogin",
          requestKeywords: "relogin",
          platformID: this.$store.state.user.pid,
          userID: this.$store.state.user.uid,
          userPhone: this.$store.state.user.uphone,
          openid: this.$store.state.user.opid
        },
        logout: {
          requestType: "personal",
          requestKeywords: "shoplists",
          platformID: this.$store.state.user.pid,
          userID: this.$store.state.user.uid,
          userPhone: this.$store.state.user.uphone
        },
        bookList: {
          requestType: "onlinedes",
          requestKeywords: "shoplists",
          platformID: this.$store.state.user.pid,
          userID: this.$store.state.user.uid,
          userPhone: this.$store.state.user.uphone
        }
      },
      renderData: {
        list: []
      }
    };
  },
  methods: {
    relogin() {
      // alert(this.queryData.relogin.openid)
      getServer(this.queryData.relogin).then(res => {
        if (res.data.responseStatus === 1) {
          if (res.data.status === 1) {
            this.aboutFn();
          } else if (res.data.status === 2) {
            Toast("您的账号已被他人登陆");
            setTimeout(() => {
              this.$store.dispatch("LogOut", this.queryData.logout).then(() => {
                // location.reload();
                setTimeout(() => {
                  this.$router.push({
                    // path: "/loginoid",
                    path: "/loginoid",
                    query: {
                      plat: this.$store.state.user.plat
                    }
                  });
                }, 500);
              });
            }, 1000);
          }
        }
      });
    },
    getBookList() {
      getServer(this.queryData.bookList).then(res => {
        if (res.data.responseStatus === 1) {
            this.isData = true;
            var datas = res.data.data;
            this.renderData.list = datas; 
        }else{
            this.isData = false;
        }
      });
    },
     //下拉刷新
    onPullingDown() {
      this.renderData.list = [];
      this.getBookList();
    }
  },
  created() {
    this.relogin();
    this.getBookList();
  }
};
</script>
<style lang="scss">
.no-data-main {
  padding: 20% 60px 0;
}
.bookListContainer {
  background: #f4f4f4;
  width: 100%;
  position: fixed;
  left: 0;
  top:0.8rem;
  height: 100%;
  overflow-x: hidden;
  padding: 15px;
  box-sizing: border-box;
  font-size:0.3rem;
}
.bookListItem {
  background: #fff url("../../assets/images/grayBgImg.png?789795") no-repeat left center;
  background-size: 55% 100%;
  overflow: hidden;
  padding: 15px 30px 10px;
  margin-bottom: 15px;
  box-shadow: 0 0 10px #d5d5d5;
}
.bookListItem .bookListLeftBox {
  width: 32%;
  float: left;
}
.bookListItem .bookListLeftBox h3 {
  font-size: 18px;
  line-height: 20px;
  padding-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight:bold;
}
.bookListItem .bookListLeftBox div {
  padding: 15px 0 10px;
}
.bookListItem .bookListLeftBox div img {
  width: 100%;
}
.bookListItem .bookListRightBox {
  width: 65%;
  float: right;
  text-align: right;
}
.bookListItem .bookListRightBox .restrictedPurchase {
  font-size: 14px;
  line-height: 30px;
}
.bookListItem .bookListRightBox .restrictedPurchase b {
  font-size: 30px;
  padding-right: 5px;
  color: #ff9933;
}
.bookListItem .bookListRightBox h3 {
  font-size: 18px;
  line-height: 18px;
  padding-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight:bold;
}
.bookListItem .bookListRightBox p {
  font-size: 14px;
  line-height: 30px;
}
.bookListItem .bookListRightBox a {
  display: block;
  height: 30px;
  width: 100px;
  border: 1px solid #409efe;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  font-weight: 400;
  color: #409efe;
  float: right;
  margin-top: 9px;
}
.bookListMain {
  padding-bottom: 70px;
}
.volumePurchaseMain {
  padding: 15px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
}
.volumePurchaseMain a {
  display: block;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  background: #409efe;
  text-align: center;
  color: #fff;
}
</style>
