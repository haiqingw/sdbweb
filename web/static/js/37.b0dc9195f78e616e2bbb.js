webpackJsonp([37],{"/b6l":function(n,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var a=e("gyMJ"),t=e("ulGR"),l={data:function(){return{data:{id:0,label:"XXX科技有限公司",queryData:{requestType:"agent",requestKeywords:"organization",platformID:this.$store.state.user.pid,userID:this.$store.state.user.uid,userPhone:this.$store.state.user.uphone,viewType:"main"},children:[{id:2,label:"产品研发部",children:[{id:5,label:"研发-前端"},{id:6,label:"研发-后端"},{id:9,label:"UI设计"},{id:10,label:"产品经理"}]},{id:3,label:"销售部",children:[{id:7,label:"销售一部"},{id:8,label:"销售二部"}]},{id:4,label:"财务部"},{id:9,label:"HR人事"},{id:4,label:"财务部"},{id:9,label:"HR人事"},{id:4,label:"财务部"},{id:9,label:"HR人事",children:[{id:5,label:"研发-前端"},{id:6,label:"研发-后端"},{id:9,label:"UI设计"},{id:10,label:"产品经理"}]}]},horizontal:!0,collapsable:!1,expandAll:!0,labelClassName:"bg-white"}},methods:{renderContent:function(n,o){return o.label},onExpand:function(n){"expand"in n?(n.expand=!n.expand,!n.expand&&n.children&&this.collapse(n.children)):this.$set(n,"expand",!0)},collapse:function(n){var o=this;n.forEach(function(n){n.expand&&(n.expand=!1),n.children&&o.collapse(n.children)})},getOrganizationFn:function(){Object(a.a)().then(function(n){console.log(n),console.log(t.a[n.data.responseStatus])})}},created:function(){this.getOrganizationFn()}},r={render:function(){var n=this,o=n.$createElement,a=n._self._c||o;return a("div",{staticClass:"organizationMain"},[a("div",{staticClass:"return"},[a("img",{attrs:{src:e("1Hd4"),alt:""},on:{click:function(o){return n.$router.go(-1)}}}),n._v(" "),a("span",[n._v("组织架构")])]),n._v(" "),a("div",{staticClass:"container"},[a("div",{staticClass:"col-md-10 col-md-offset-1"},[a("div",{staticClass:"text-center"},[a("vue2-org-tree",{attrs:{name:"test",data:n.data,horizontal:n.horizontal,collapsable:n.collapsable,"label-class-name":n.labelClassName,"render-content":n.renderContent},on:{"on-expand":n.onExpand}})],1)])])])},staticRenderFns:[]};var i=e("VU/8")(l,r,!1,function(n){e("3EFY")},null,null);o.default=i.exports},"3EFY":function(n,o,e){var a=e("OAZX");"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e("rjj0")("b7644ae4",a,!0,{})},OAZX:function(n,o,e){(n.exports=e("FZ+f")(!0)).push([n.i,"\n.organizationMain {\n  padding-top: 40px;\n}\n.container {\n  font-size: 14px !important;\n}\n.org-tree-node-label {\n  white-space: nowrap;\n}\n.bg-white {\n  background-color: white;\n}\n.bg-orange {\n  background-color: orange;\n}\n.bg-gold {\n  background-color: gold;\n}\n.bg-gray {\n  background-color: gray;\n}\n.bg-lightpink {\n  background-color: lightpink;\n}\n.bg-chocolate {\n  background-color: chocolate;\n}\n.bg-tomato {\n  background-color: tomato;\n}\n","",{version:3,sources:["/Users/xiaoyu/Documents/XiaoYuShi/project/web/shuaduobao/src/views/organizationChart/organization.vue"],names:[],mappings:";AACA;EACE,kBAAkB;CACnB;AACD;EACE,2BAA2B;CAC5B;AACD;EACE,oBAAoB;CACrB;AACD;EACE,wBAAwB;CACzB;AACD;EACE,yBAAyB;CAC1B;AACD;EACE,uBAAuB;CACxB;AACD;EACE,uBAAuB;CACxB;AACD;EACE,4BAA4B;CAC7B;AACD;EACE,4BAA4B;CAC7B;AACD;EACE,yBAAyB;CAC1B",file:"organization.vue",sourcesContent:["\n.organizationMain {\n  padding-top: 40px;\n}\n.container {\n  font-size: 14px !important;\n}\n.org-tree-node-label {\n  white-space: nowrap;\n}\n.bg-white {\n  background-color: white;\n}\n.bg-orange {\n  background-color: orange;\n}\n.bg-gold {\n  background-color: gold;\n}\n.bg-gray {\n  background-color: gray;\n}\n.bg-lightpink {\n  background-color: lightpink;\n}\n.bg-chocolate {\n  background-color: chocolate;\n}\n.bg-tomato {\n  background-color: tomato;\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=37.b0dc9195f78e616e2bbb.js.map