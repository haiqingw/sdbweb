webpackJsonp([23],{WwaQ:function(t,n,e){var o=e("wkIr");"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);e("rjj0")("8b2eb744",o,!0,{})},wkIr:function(t,n,e){(t.exports=e("FZ+f")(!0)).push([t.i,"\n.p-complaint-content {\n    padding: 0 .24rem;\n    margin-top: 0.2rem;\n}\n.complaint-content h3 {\n    font-size: .3rem;\n    font-weight: normal;\n    line-height: 0.6rem;\n}\n.complaint-content .el-textarea textarea {\n    resize: none;\n    height: 3rem;\n}\n.complaint-content .el-button {\n    width: 100%;\n}\n","",{version:3,sources:["/Users/xiaoyu/Documents/XiaoYuShi/project/web/shuaduobao/src/views/msg/complaint/index.vue"],names:[],mappings:";AACA;IACI,kBAAkB;IAClB,mBAAmB;CACtB;AACD;IACI,iBAAiB;IACjB,oBAAoB;IACpB,oBAAoB;CACvB;AACD;IACI,aAAa;IACb,aAAa;CAChB;AACD;IACI,YAAY;CACf",file:"index.vue",sourcesContent:["\n.p-complaint-content {\n    padding: 0 .24rem;\n    margin-top: 0.2rem;\n}\n.complaint-content h3 {\n    font-size: .3rem;\n    font-weight: normal;\n    line-height: 0.6rem;\n}\n.complaint-content .el-textarea textarea {\n    resize: none;\n    height: 3rem;\n}\n.complaint-content .el-button {\n    width: 100%;\n}\n"],sourceRoot:""}])},xxIG:function(t,n,e){t.exports=e.p+"static/img/index_banner.7eb84be.jpg"},y2G7:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o={data:function(){return{complaintForm:{phone:"",text:""},complaintRules:{}}},methods:{backOff:function(){this.$router.push({name:"index",params:{selected:"news"}})},commitComplaint:function(){console.log("提交")}}},a={render:function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("div",{staticClass:"complaint"},[o("div",{staticClass:"return"},[o("img",{attrs:{src:e("1Hd4"),alt:""},on:{click:t.backOff}}),t._v(" "),o("span",[t._v("投诉建议")])]),t._v(" "),o("div",{staticClass:"complaint-content"},[t._m(0),t._v(" "),o("div",{staticClass:"p-complaint-content"},[o("h3",[t._v("意见反馈")]),t._v(" "),o("el-form",{ref:"complaintForm",staticClass:"demo-ruleForm",attrs:{model:t.complaintForm,rules:t.complaintRules}},[o("el-form-item",{staticStyle:{"margin-bottom":".3rem"},attrs:{prop:"text"}},[o("el-input",{attrs:{placeholder:"请在此留下您宝贵的意见！",type:"textarea"},model:{value:t.complaintForm.text,callback:function(n){t.$set(t.complaintForm,"text",n)},expression:"complaintForm.text"}})],1),t._v(" "),o("el-form-item",{attrs:{prop:"phone"}},[o("el-input",{attrs:{placeholder:"请留下您的联系方式，方便我们与您联系！"},model:{value:t.complaintForm.phone,callback:function(n){t.$set(t.complaintForm,"phone",n)},expression:"complaintForm.phone"}})],1),t._v(" "),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:t.commitComplaint}},[t._v("提交")])],1)],1)],1)])])},staticRenderFns:[function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"big-img"},[n("img",{attrs:{src:e("xxIG"),alt:""}})])}]};var i=e("VU/8")(o,a,!1,function(t){e("WwaQ")},null,null);n.default=i.exports}});
//# sourceMappingURL=23.f90d81967898144a0eb0.js.map