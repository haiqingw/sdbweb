webpackJsonp([35],{"+xp2":function(t,n,e){(t.exports=e("FZ+f")(!0)).push([t.i,"\n.aboutMain {\n  padding: 50px 10px 10px;\n  font-size: 14px;\n  color: #333;\n  line-height: 20px;\n  text-align: justify;\n}\n","",{version:3,sources:["/Users/xiaoyu/Documents/XiaoYuShi/project/web/shuaduobao/src/views/about/index.vue"],names:[],mappings:";AACA;EACE,wBAAwB;EACxB,gBAAgB;EAChB,YAAY;EACZ,kBAAkB;EAClB,oBAAoB;CACrB",file:"index.vue",sourcesContent:["\n.aboutMain {\n  padding: 50px 10px 10px;\n  font-size: 14px;\n  color: #333;\n  line-height: 20px;\n  text-align: justify;\n}\n"],sourceRoot:""}])},AX79:function(t,n,e){var a=e("+xp2");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e("rjj0")("e6dc4882",a,!0,{})},oF1k:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("gyMJ"),s=(e("ulGR"),{data:function(){return{contentData:"",isData:!1,queryData:{requestType:"system",requestKeywords:"getsystem",platformID:this.$store.state.user.pid,type:"appabout"}}},methods:{aboutFn:function(){var t=this;Object(a.a)(this.queryData).then(function(n){console.log(n),1===n.data.responseStatus&&(t.contentData=n.data.content,"<p>暂无数据</p>"!=n.data.content&&""!=n.data.content||(t.contentData="",t.isData=!0))})}},created:function(){this.aboutFn()}}),o={render:function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",[a("div",{staticClass:"return"},[a("img",{attrs:{src:e("1Hd4"),alt:""},on:{click:function(n){return t.$router.go(-1)}}}),t._v(" "),a("span",[t._v("关于我们")])]),t._v(" "),a("div",{staticClass:"aboutMain"},[a("div",{domProps:{innerHTML:t._s(t.contentData)}}),t._v(" "),t.isData?a("div",[t._m(0)]):t._e()])])},staticRenderFns:[function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"no-data"},[n("img",{attrs:{src:e("dotK"),alt:"暂无数据"}})])}]};var i=e("VU/8")(s,o,!1,function(t){e("AX79")},null,null);n.default=i.exports}});
//# sourceMappingURL=35.8b5bf323d10d9aecaf39.js.map