webpackJsonp([40],{"53jc":function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("gyMJ"),i=a("Au9i"),r=(a("ulGR"),{data:function(){return{isData:!0,queryData:{msgNoticeList:{requestType:"messagemanage",requestKeywords:"lists",userID:this.$store.state.user.uid,platformID:this.$store.state.user.pid,userPhone:this.$store.state.user.uphone,cid:this.$route.params.id}},renderData:{listData:[]}}},methods:{msgNoticeListFunc:function(){var t=this;i.Indicator.open(),Object(e.a)(this.queryData.msgNoticeList).then(function(s){1===s.data.responseStatus?(i.Indicator.close(),t.renderData.listData=s.data.data):300===s.data.responseStatus&&(i.Indicator.close(),t.isData=!1)})}},created:function(){this.msgNoticeListFunc()}}),n={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"notice"},[e("div",{staticClass:"return"},[e("img",{attrs:{src:a("1Hd4"),alt:""},on:{click:function(s){return t.$router.go(-1)}}}),t._v(" "),e("span",[t._v("消息")])]),t._v(" "),e("div",{staticClass:"notice-content"},[t.isData?e("div",{staticClass:"notice-list"},[e("ul",t._l(t.renderData.listData,function(s){return e("li",{key:s.id},[e("div",{staticClass:"img"},[e("img",{attrs:{src:s.picUrl,alt:""}})]),t._v(" "),e("div",{staticClass:"content"},[e("div",{staticClass:"title"},[e("h3",[t._v(t._s(s.title))]),t._v(" "),e("span",{class:{no:"未读"===s.readStatus}},[t._v(t._s(s.readStatus))])]),t._v(" "),e("div",{staticClass:"time-more"},[e("span",[t._v(t._s(s.sendTime))]),t._v(" "),e("router-link",{attrs:{to:{name:"msgDetails",params:{id:s.id,cid:s.classID}}}},[t._v("查看详情")])],1)])])}),0)]):e("div",{staticClass:"no-data"},[e("img",{attrs:{src:a("dotK"),alt:""}})])])])},staticRenderFns:[]};var c=a("VU/8")(r,n,!1,function(t){a("sGEf")},null,null);s.default=c.exports},sGEf:function(t,s){}});
//# sourceMappingURL=40.ebed4f0a2ac4b816ed24.js.map