webpackJsonp([53],{"5vNA":function(t,e,n){(t.exports=n("FZ+f")(!0)).push([t.i,"\n.details-content {\n    padding: 0 .2rem;\n    margin-top: .8rem;\n}\n.details-content .title {\n    font-size: 0.28rem;\n    overflow: hidden;\n    /* margin: .3rem 0; */\n    line-height: .8rem;\n}\n.details-content .title h3 {\n    float: left;\n}\n.details-content .title time {\n    float: right;\n}\n.details-content .content {\n    font-size: .26rem;\n    line-height: .4rem;\n    padding-top:0.2rem;\n}\n","",{version:3,sources:["/Users/ryq/Documents/Renyongqiang/网页制作/s_刷多宝_公众号/s_刷多宝/shuaduobao/src/views/msg/details/index.vue"],names:[],mappings:";AACA;IACI,iBAAiB;IACjB,kBAAkB;CACrB;AACD;IACI,mBAAmB;IACnB,iBAAiB;IACjB,sBAAsB;IACtB,mBAAmB;CACtB;AACD;IACI,YAAY;CACf;AACD;IACI,aAAa;CAChB;AACD;IACI,kBAAkB;IAClB,mBAAmB;IACnB,mBAAmB;CACtB",file:"index.vue",sourcesContent:["\n.details-content {\n    padding: 0 .2rem;\n    margin-top: .8rem;\n}\n.details-content .title {\n    font-size: 0.28rem;\n    overflow: hidden;\n    /* margin: .3rem 0; */\n    line-height: .8rem;\n}\n.details-content .title h3 {\n    float: left;\n}\n.details-content .title time {\n    float: right;\n}\n.details-content .content {\n    font-size: .26rem;\n    line-height: .4rem;\n    padding-top:0.2rem;\n}\n"],sourceRoot:""}])},ChOd:function(t,e,n){var a=n("5vNA");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("rjj0")("487dcf1a",a,!0,{})},Y12v:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("gyMJ"),s=n("Au9i"),i={data:function(){return{isData:!0,queryData:{msgDetails:{requestType:"messagemanage",requestKeywords:"details",userID:this.$store.state.user.uid,platformID:this.$store.state.user.pid,userPhone:this.$store.state.user.uphone,mid:this.$route.params.id}},renderData:{detailsData:[]}}},methods:{mgDetails:function(){var t=this;s.Indicator.open(),Object(a.a)(this.queryData.msgDetails).then(function(e){console.log(e),1===e.data.responseStatus?(s.Indicator.close(),t.renderData.detailsData=e.data.data):300===e.data.responseStatus&&(s.Indicator.close(),t.isData=!1)})}},created:function(){this.mgDetails()}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"msg-details"},[a("div",{staticClass:"return"},[a("img",{attrs:{src:n("1Hd4"),alt:""},on:{click:function(e){return t.$router.go(-1)}}}),t._v(" "),a("span",[t._v("详细")])]),t._v(" "),t.isData?a("div",{staticClass:"details-content"},[a("div",{staticClass:"title line_bottom"},[a("h3",[t._v(t._s(t.renderData.detailsData.title))]),t._v(" "),a("time",[t._v(t._s(t.renderData.detailsData.sendTime))])]),t._v(" "),a("div",{staticClass:"content",domProps:{innerHTML:t._s(t.renderData.detailsData.content)}})]):a("div",{staticClass:"no-data"},[a("img",{attrs:{src:n("dotK"),alt:""}})])])},staticRenderFns:[]};var o=n("VU/8")(i,r,!1,function(t){n("ChOd")},null,null);e.default=o.exports}});
//# sourceMappingURL=53.20d578cd2b88e7f7a441.js.map