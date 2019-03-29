<template>
  <div class="index">
    <div class="isLogin">
      <div class="index-banner" v-if="islogin">
        <img src="@/assets/images/index_banner.jpg" alt="">
      </div>
      <div class="login" v-else>
        <router-link to="/login">立即登录</router-link>
      </div>
    </div>
    <div class="index-list1">
      <ul>
        <li>
          <div class="index-list1-img">
            <img src="@/assets/images/index-list1-1.png" alt="">
          </div>
          <div class="index-list1-text">{{renderData.listOneData.balance}}</div>
          <div class="index-list1-explain">钱包余额</div>
        </li>
        <li>
          <div class="index-list1-img">
            <img src="@/assets/images/index-list1-2.png" alt="">
          </div>
          <div class="index-list1-text">{{renderData.listOneData.curentmonth}}</div>
          <div class="index-list1-explain">当月赚钱</div>
        </li>
        <li>
          <div class="index-list1-img">
            <img src="@/assets/images/index-list1-3.png" alt="">
          </div>
          <div class="index-list1-text">{{renderData.listOneData.total}}</div>
          <div class="index-list1-explain">总赚钱</div>
        </li>
        <li>
          <div class="index-list1-img">
            <img src="@/assets/images/index-list1-4.png" alt="">
          </div>
          <div class="index-list1-text">12</div>
          <div class="index-list1-explain">待解冻</div>
        </li>
      </ul>
    </div>
    <div class="index-notice">
      <div class="index-notice-top">
        <h3>
          <img src="@/assets/images/index-notice-title.png" alt="">
        </h3>
        <div class="index-notice-top-content">
          <span>重要</span>
          <a href="">2月13-15日POS数据分润截止发放</a>
        </div>
      </div>
      <div class="index-notice-profit">
        <router-link to="/financialDetails">
        <h3>
          <img src="@/assets/images/index-notice-profit-img.png" alt="">
        </h3>
        <p>
          今日收益
          <em>+1000.00</em>
        </p>
        <span></span>
        </router-link>
      </div>
    </div>
    <div class="index-list2">
      <ul>
        <li>
          <div class="img">
            <img src="@/assets/images/index-list2-img1.png" alt="">
          </div>
          <div class="text">
            <router-link to="/bindingMplements">绑定机具</router-link>
          </div>
        </li>
        <li>
          <div class="img">
            <img src="@/assets/images/index-list2-img2.png" alt="">
          </div>
          <div class="text">
            <router-link to="/myTerminal">我的终端</router-link>
          </div>
        </li>
        <li>
          <div class="img">
            <img src="@/assets/images/index-list2-img3.png" alt="">
          </div>
          <div class="text">
            <a href="">申请代理</a>
          </div>
        </li>
        <li>
          <div class="img">
            <img src="@/assets/images/index-list2-img5.png" alt="">
          </div>
          <div class="text">
            <router-link to="/mall">机具商场</router-link>
          </div>
        </li>
        <li>
          <div class="img">
            <router-link to="/financialDetails"><img src="@/assets/images/index-list2-img6.png" alt=""></router-link>
          </div>
          <div class="text">
            <router-link to="/financialDetails">收益明细</router-link>
          </div>
        </li>
        <li>
          <div class="img">
            <router-link to="/invitationRecord"><img src="@/assets/images/index-list2-img7.png" alt=""></router-link>
          </div>
          <div class="text">
            <router-link to="/invitationRecord">邀请记录</router-link>
          </div>
        </li>
        <li>
          <div class="img">
            <img src="@/assets/images/index-list2-img8.png" alt="">
          </div>
          <div class="text">
            <a href="">排行榜</a>
          </div>
        </li>
        <li>
          <div class="img">
             <router-link to="/deliverGoods"><img src="@/assets/images/index-list2-img4.png" alt=""></router-link>
          </div>
          <div class="text">
            <router-link to="/deliverGoods">订单管理</router-link>
          </div>
        </li>
      </ul>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { fetchList,test} from '@/api/index'
  import response from '@/assets/js/response.js'
  import Footer from '@/components/footerNav/footer'
  export default {
    data() {
      return {
        renderData: {
          listOneData: {}
        },
        queryData: {
          listOne: {
            requestType: 'personal',
            requestKeywords: 'busincome',
            platformID: this.$store.state.user.pid,
            userID: this.$store.state.user.uid,
            userPhone: this.$store.state.user.uphone,
          }
        },
        test: {
          requestType: 'funds',
          requestKeywords: 'merchandise',
          platformID: this.$store.state.user.pid,
          userID: this.$store.state.user.uid,
          userPhone: this.$store.state.user.uphone,
          page: 1,
          limit: 10,
          types: 'mons'
        }
      }
    },
     components:{
       Footer  
    },
    computed: {
      ...mapGetters([
        'islogin'
      ])
    },
    methods: {
      listOne() {
        fetchList(this.queryData.listOne).then(res => {
          this.renderData.listOneData = res.data
        })
      },
      test1() {
        test(this.test).then(res => {
          // console.log(res)
        })
      },
      parentImplement() {
        this.listOne()
      }
    },
    created() {
      this.listOne()
      // this.test1()
    }
  }
</script>


<style>
  html {
    background:#fff;
}
</style>
