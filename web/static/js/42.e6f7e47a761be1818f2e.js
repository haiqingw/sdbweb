webpackJsonp([42],{NqMe:function(t,s){},c9QU:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("gyMJ"),i=(e("ulGR"),{data:function(){return{isDownLoading:!1,isUpLoading:!1,upFinished:!1,offset:10,isData:!0,queryData:{list:{requestType:"list",requestKeywords:"team",platformID:this.$store.state.user.pid,userID:this.$store.state.user.uid,userPhone:this.$store.state.user.uphone,page:0,limit:5},top:{requestType:"list",requestKeywords:"lowerdata",platformID:this.$store.state.user.pid,userID:this.$store.state.user.uid,userPhone:this.$store.state.user.uphone}},renderData:{top:{},list:[],oldList:[]}}},methods:{onLoadList:function(){this.queryData.list.page++,this.invitationRecordList()},onDownRefresh:function(){this.queryData.list.page=1,this.renderData.oldList=[],this.isDownLoading=!0,this.invitationRecordList()},invitationRecordList:function(){var t=this;Object(a.a)(this.queryData.list).then(function(s){1===s.data.responseStatus?(t.isData=!0,t.renderData.list=s.data.data,t.renderData.list.forEach(function(s){t.renderData.oldList.push(s)}),t.isDownLoading=!1,t.isUpLoading=!1):300===s.data.responseStatus&&1!==t.queryData.list.page?(t.upFinished=!0,t.isUpLoading=!1):300===s.data.responseStatus&&1===t.queryData.list.page&&(t.upFinished=!1,t.isUpLoading=!1,t.isData=!1)})},invitationRecordListTop:function(){var t=this;Object(a.a)(this.queryData.top).then(function(s){1===s.data.responseStatus&&(t.renderData.top=s.data)})}},created:function(){this.invitationRecordListTop()}}),n={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"invitation-record"},[a("div",{staticClass:"return"},[a("img",{attrs:{src:e("1Hd4"),alt:""},on:{click:function(s){return t.$router.go(-1)}}}),t._v(" "),a("span",[t._v("邀请记录")])]),t._v(" "),a("div",{staticClass:"top-text"},[t._v("\n        您邀请了"),a("span",[t._v(t._s(t.renderData.top.teamnum||0))]),t._v("位新用户，领取了"),a("span",[t._v(t._s(t.renderData.top.getnum||0))]),t._v("台机器，赚了"),a("span",[t._v(t._s(t.renderData.top.rewardsnum||0))]),t._v("元\n    ")]),t._v(" "),t.isData?a("div",{staticClass:"invitation-record-list"},[a("van-pull-refresh",{on:{refresh:t.onDownRefresh},model:{value:t.isDownLoading,callback:function(s){t.isDownLoading=s},expression:"isDownLoading"}},[a("van-list",{attrs:{finished:t.upFinished,"finished-text":"没有更多了",offset:t.offset},on:{load:t.onLoadList},model:{value:t.isUpLoading,callback:function(s){t.isUpLoading=s},expression:"isUpLoading"}},[a("ul",t._l(t.renderData.oldList,function(s){return a("li",{key:s.id},[a("div",{staticClass:"title"},[a("h3",[t._v(t._s(s.busname)+"（"+t._s(s.phone)+"）")]),t._v(" "),a("a",{attrs:{href:"tel:"+s.phone}})]),t._v(" "),a("div",{staticClass:"content"},[a("div",{staticClass:"machine"},[a("em",[t._v(t._s(s.getNumber))]),t._v(" "),a("span",[t._v("领取机器(台)")])]),t._v(" "),a("div",{staticClass:"reward"},[a("em",[t._v(t._s(s.rewards))]),t._v(" "),a("span",[t._v("邀请奖励(元)")])])]),t._v(" "),a("div",{staticClass:"time-detailed"},[a("time",[t._v(t._s(s.fullTime))]),t._v(" "),a("router-link",{attrs:{to:{name:"invitationRecordDetailed",params:{id:s.id}}}},[t._v("查看记录详细")])],1)])}),0)])],1)],1):a("div",{staticClass:"no-data"},[a("img",{attrs:{src:e("dotK"),alt:""}})])])},staticRenderFns:[]};var o=e("VU/8")(i,n,!1,function(t){e("NqMe")},null,null);s.default=o.exports}});
//# sourceMappingURL=42.e6f7e47a761be1818f2e.js.map