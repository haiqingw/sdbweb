<template>
    <div class="myBusinessContainer">
        <!-- header -->
        <div class="return">
            <img src="@/assets/images/return.png" alt="" @click="$router.go(-1)" />
            <span>我的商户</span>
        </div>
        <!-- search -->
        <div class="myBusinessSearchMain">
            <div class="searchBox">
                <input type="text" placeholder="请输入商户姓名或电话" v-model="searchKey">
            </div>
            <div class="searchBtn" @click="searchTap">
                <a href="javascript:;">搜索</a>
            </div>
        </div>
        <!-- body -->   
        <div class="myBusinessBody" v-if="isData">
               <cube-scroll
                    ref="scroll"
                    :data="items"
                    @pulling-down="onPullingDown"
                    @pulling-up="onPullingUp"
                    :options="options"
                >
            <div class="myBusinessItem ren-flex-ac" v-for="(item,index) in items" :key="index">
               <div class="itemLeft">
                  {{item.busname[0]}} 
               </div>
               <div class="itemRight">
                   <div class="flex">
                       <span>{{item.busname}}</span>
                        <em>{{item.levelnick}}</em>
                    </div>
                    <div>
                        联系电话：{{item.phonenick}}
                    </div>
                    <div>
                        注册时间：{{item.regisTime}}
                    </div>
               </div>
               <a class="keyPhone" :href="'tel:'+item.phone">
                   <img src="@/assets/images/invitation-record-lis-telephone.png" alt="">
               </a>
            </div>
            </cube-scroll>
        </div>
         <div class="no-data" v-else>
                <img src="@/assets/images/no-data.png" alt />
         </div>
    </div>
</template>
<script>
import {getServer} from '@/api/index'
import response from "@/assets/js/response.js"
import {Toast} from "mint-ui";
export default {
    data(){
        return {
             options: {
                pullDownRefresh: {
                    threshold: 90,
                    stop: 40,
                    txt: "刷新成功"
                }, // 配置下拉刷新
                pullUpLoad: {
                    threshold: 0,
                    txt: {
                        more: "上拉加载更多",
                        noMore: "没有更多数据"
                    }
                } // 配置上拉加载，若要关闭可直接 pullUpLoad：false
            },
            isData: true,
            items: [],
            searchKey:'',
            queryData:{
                listProp:{
                    requestType: 'agentdata',
                    requestKeywords:'mymerchant', 
                    platformID: this.$store.state.user.pid,
                    userID: this.$store.state.user.uid,
                    userPhone: this.$store.state.user.uphone,
                    page: 1,
                }
            } 
        }
    },
    methods:{
         onPullingDown() {
            // console.log("下拉刷新");
            this.items = [];
            this.queryData.listProp.page = 1;
            this.searchKey = '';
            if(this.queryData.listProp.keywords){
                delete this.queryData.listProp.keywords;
            }
            this.getList();
        },
        // 触发上拉加载
        onPullingUp() {
            this.queryData.listProp.page++;
            this.getList();
        },
        getList(){
            getServer(this.queryData.listProp).then(res =>{
                if (res.data.responseStatus == 1) {
                    this.isData = true;
                    res.data.data.forEach(item => {
                        this.items.push(item);
                    });
                } else if (
                    res.data.responseStatus == 300 &&
                    this.queryData.listProp.page !== 1
                ) {
                    this.$refs.scroll.forceUpdate();
                } else if (
                    res.data.responseStatus == 300 &&
                    this.queryData.listProp.page === 1
                ) {
                    this.isData = false;
                }
            })
        },
        searchTap(){
            var $keyWord = this.searchKey;
            if($keyWord==''){
                Toast({
                    message:"请输入商户名称或商户电话号",
                    duration: 800
                     })
                    ;
            }else{
               this.items = [];
               this.queryData.listProp.keywords = $keyWord;
               this.getList();
            }
        }
    },
    created () {
        this.getList()
    }
}
</script>
<style lang="scss" scope>
.myBusinessContainer{
    font-size:0.3rem;
}
   .myBusinessBody{
       padding:1.8rem 0.2rem 0;
       position:fixed;
       left:0;
       top:0;
       width:100%;
       height:100%;
       box-sizing:border-box;
       z-index:999;
       background:#f1f1f1;
   } 
   .myBusinessSearchMain{
       padding:0.1rem;
       position:fixed;
       left:0;
       top:0.8rem;
       width:100%;
       box-sizing:border-box;
       overflow:hidden;
       background:#e6e4e4;
       z-index:9999;
       .searchBox{
           width:80%;
           height:0.8rem;
           line-height:0.8rem;
           float:left;
           box-sizing:border-box;
           background:#fff;
           padding:0 0.2rem;
        //    border-radius:0.8rem;
           input{
               width:100%;
               height:0.8rem;
               background:none;
               border:none;
               font-size:0.28rem;
               display:block;
           }
       }
       .searchBtn{
           width:18%;
           display:block;
           height:0.8rem;
           line-height:0.8rem;
           text-align:center;
           font-size:0.28rem;
           float:right;
           background:#089cfe;
           a{
               display: block;
               color:#fff;
           }
       }
   }
   .myBusinessItem{
       padding:0.2rem;
       overflow: hidden;
       background:#fff;
       margin-top:0.2rem;
       border-radius:0.1rem;
       position: relative;
   }
   .itemLeft{
       width:1rem;
       height:1rem;
       background:#eee;
       text-align:center;
       line-height:1.06rem;
       font-size:0.52rem;
       border-radius:2rem;
       float:left;
       overflow:hidden;
   }
   .itemRight{
       padding-left:0.3rem;
       div{
            font-size:0.24rem;
            color:#333;
            line-height:0.4rem;
           &:first-of-type{
               line-height:0.36rem;
               padding-bottom:0.1rem;
               padding-top:0.1rem;
               span{
                   font-size:0.36rem;
                   display:block;
               }
               em{
                   background:cadetblue;
                   color:#fff;
                   padding:0 0.1rem;
                   font-size:0.24rem;
                   display:block;
                   margin-left:0.1rem;
                   border-radius:0.24rem;
               }
               b{
                   font-size:0.28rem;
                   display:block;
                   position: relative;
                   top:0.04rem;
               }
           }
       }
   }
   .keyPhone{
       display: block;
       width:0.6rem;
       height:0.6rem;
       position:absolute;
       right:0.2rem;
       top:50%;
       margin-top:-0.3rem;
   }
</style>