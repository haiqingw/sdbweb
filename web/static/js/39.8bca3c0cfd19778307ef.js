webpackJsonp([39],{"9j8V":function(t,a){},"X/Gl":function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=s("gyMJ"),e=(s("ulGR"),{data:function(){return{isDownLoading:!1,isUpLoading:!1,upFinished:!1,offset:10,isData:!0,queryData:{list:{requestType:"spendinginto",requestKeywords:"spending",platformID:this.$store.state.user.pid,userID:this.$store.state.user.uid,userPhone:this.$store.state.user.uphone,page:0,types:"T",stypes:"TX"}},renderData:{list:[],oldList:[]}}},methods:{onLoadList:function(){this.queryData.list.page++,this.isUpLoading=!0,this.withdrawalList()},onDownRefresh:function(){this.queryData.list.page=1,this.renderData.oldList=[],this.isDownLoading=!0,this.withdrawalList()},withdrawalList:function(){var t=this;Object(i.a)(this.queryData.list).then(function(a){1===a.data.responseStatus?(t.isData=!0,t.renderData.list=a.data.data,t.renderData.list.forEach(function(a){t.renderData.oldList.push(a)}),t.isDownLoading=!1,t.isUpLoading=!1):300===a.data.responseStatus&&1!==t.queryData.list.page?(t.upFinished=!0,t.isUpLoading=!1):300===a.data.responseStatus&&1===t.queryData.list.page&&(t.upFinished=!1,t.isUpLoading=!1,t.isData=!1)})}},created:function(){this.withdrawalList()}}),n={render:function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",[i("div",{staticClass:"return"},[i("img",{attrs:{src:s("1Hd4"),alt:""},on:{click:function(a){return t.$router.go(-1)}}}),t._v(" "),i("span",[t._v("提现记录")])]),t._v(" "),t.isData?i("div",{staticClass:"withdrawalRecordMain"},[i("van-pull-refresh",{on:{refresh:t.onDownRefresh},model:{value:t.isDownLoading,callback:function(a){t.isDownLoading=a},expression:"isDownLoading"}},[i("van-list",{attrs:{finished:t.upFinished,"finished-text":"没有更多了",offset:t.offset},on:{load:t.onLoadList},model:{value:t.isUpLoading,callback:function(a){t.isUpLoading=a},expression:"isUpLoading"}},t._l(t.renderData.oldList,function(a){return i("div",{key:a.id,staticClass:"withdrawalRecordItem"},[i("em",{staticClass:"active"},[t._v("已到账")]),t._v(" "),i("div",{staticClass:"withdrawalRecordHeader flex line_bottom"},[i("div",[i("h3",[t._v("100.00")]),t._v(" "),i("p",[t._v("提现金额")])])]),t._v(" "),i("div",{staticClass:"withdrawalRecordBody"},[i("p",[i("span",[t._v("手续费：\n                                "),i("b",[t._v("5.00元")])]),t._v(" "),i("span",[t._v("税金：\n                                "),i("b",[t._v("5.00元")])]),t._v(" "),i("span",[t._v("实到账：\n                                "),i("b",[t._v("5.00元")])])]),t._v(" "),i("p",[t._v("提现时间：2018.10.26 16:00:00")])])])}),0)],1)],1):i("div",{staticClass:"no-data"},[i("img",{attrs:{src:s("dotK"),alt:""}})])])},staticRenderFns:[]};var o=s("VU/8")(e,n,!1,function(t){s("9j8V")},null,null);a.default=o.exports}});
//# sourceMappingURL=39.8bca3c0cfd19778307ef.js.map