webpackJsonp([39],{"15N7":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("Au9i"),a=n("gyMJ"),r=n("ulGR"),o={data:function(){return{queryData:{isCer:{requestType:"personal",requestKeywords:"checkcer",userID:this.$store.state.user.uid,platformID:this.$store.state.user.pid,userPhone:this.$store.state.user.uphone},realNameCer:{requestType:"operating",requestKeywords:"realnameauth",userID:this.$store.state.user.uid,platformID:this.$store.state.user.pid,userPhone:this.$store.state.user.uphone}}}},methods:{isCerFn:function(){var e=this;Object(a.a)(this.queryData.isCer).then(function(t){1===t.data.responseStatus&&e.$router.push({name:"certificationNext"})})},submitModification:function(){var e=this;""!=this.queryData.realNameCer.name&&void 0!=this.queryData.realNameCer.name?""!=this.queryData.realNameCer.idcard&&void 0!=this.queryData.realNameCer.idcard?/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/.test(this.queryData.realNameCer.idcard)?Object(a.a)(this.queryData.realNameCer).then(function(t){1===t.data.responseStatus?e.$router.push({name:"certificationNext"}):Object(i.Toast)(r.a[t.data.responseStatus])}):Object(i.Toast)("身份证号格式不规范"):Object(i.Toast)("请输入您的身份证号"):Object(i.Toast)("请输入您的真实姓名")}},created:function(){this.isCerFn()}},s={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",{staticClass:"return"},[i("router-link",{attrs:{to:"/mine"}},[i("img",{attrs:{src:n("1Hd4"),alt:""}})]),e._v(" "),i("span",[e._v("实名认证")])],1),e._v(" "),i("div",{staticClass:"certificationMain"},[i("h3",[e._v("个人信息认证")]),e._v(" "),i("p",[e._v("为有效保障您的资金安全，请填写与您身份证一致的信息，否则不会通过审核！")]),e._v(" "),i("div",{staticClass:"itemTopTextMain"},[i("p",[e._v("真实姓名")]),e._v(" "),i("div",{staticClass:"line_bottom"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.queryData.realNameCer.name,expression:"queryData.realNameCer.name"}],attrs:{type:"text",placeholder:"请填写您本人的真实姓名"},domProps:{value:e.queryData.realNameCer.name},on:{input:function(t){t.target.composing||e.$set(e.queryData.realNameCer,"name",t.target.value)}}})])]),e._v(" "),i("div",{staticClass:"itemTopTextMain"},[i("p",[e._v("身份证号")]),e._v(" "),i("div",{staticClass:"line_bottom"},[i("input",{directives:[{name:"model",rawName:"v-model",value:e.queryData.realNameCer.idcard,expression:"queryData.realNameCer.idcard"}],attrs:{type:"text",placeholder:"请填写您本人的身份证号"},domProps:{value:e.queryData.realNameCer.idcard},on:{input:function(t){t.target.composing||e.$set(e.queryData.realNameCer,"idcard",t.target.value)}}})])]),e._v(" "),i("div",{staticClass:"submitBtnMain"},[i("mt-button",{attrs:{type:"primary",size:"large"},on:{click:e.submitModification}},[e._v("下一步")])],1)])])},staticRenderFns:[]};var p=n("VU/8")(o,s,!1,function(e){n("4Ail")},null,null);t.default=p.exports},"4Ail":function(e,t,n){var i=n("hD0j");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n("rjj0")("a046708a",i,!0,{})},hD0j:function(e,t,n){(e.exports=n("FZ+f")(!0)).push([e.i,"\n.certificationMain {\n  padding: 40px 20px 15px;\n}\n.certificationMain > h3 {\n    font-size: 26px;\n    line-height: 60px;\n    color: #333;\n    padding-top: 20px;\n}\n.certificationMain > p {\n    font-size: 14px;\n    text-align: justify;\n    line-height: 22px;\n    color: #666;\n}\n.certificationMain > div:first-of-type {\n    padding-top: 40px;\n}\n.itemTopTextMain {\n  padding-top: 20px;\n}\n.itemTopTextMain > p {\n    font-size: 14px;\n    line-height: 20px;\n    font-weight: bold;\n}\n.itemTopTextMain > div {\n    height: 50px;\n    line-height: 50px;\n}\n.itemTopTextMain > div input {\n      border: none;\n      background: none;\n      font-size: 16px;\n      display: block;\n      width: 100%;\n}\n.submitBtnMain {\n  padding-top: 40px;\n}\n","",{version:3,sources:["/Users/xiaoyu/Documents/XiaoYuShi/project/web/shuaduobao/src/views/certification/index.vue"],names:[],mappings:";AACA;EACE,wBAAwB;CACzB;AACD;IACI,gBAAgB;IAChB,kBAAkB;IAClB,YAAY;IACZ,kBAAkB;CACrB;AACD;IACI,gBAAgB;IAChB,oBAAoB;IACpB,kBAAkB;IAClB,YAAY;CACf;AACD;IACI,kBAAkB;CACrB;AACD;EACE,kBAAkB;CACnB;AACD;IACI,gBAAgB;IAChB,kBAAkB;IAClB,kBAAkB;CACrB;AACD;IACI,aAAa;IACb,kBAAkB;CACrB;AACD;MACM,aAAa;MACb,iBAAiB;MACjB,gBAAgB;MAChB,eAAe;MACf,YAAY;CACjB;AACD;EACE,kBAAkB;CACnB",file:"index.vue",sourcesContent:["\n.certificationMain {\n  padding: 40px 20px 15px;\n}\n.certificationMain > h3 {\n    font-size: 26px;\n    line-height: 60px;\n    color: #333;\n    padding-top: 20px;\n}\n.certificationMain > p {\n    font-size: 14px;\n    text-align: justify;\n    line-height: 22px;\n    color: #666;\n}\n.certificationMain > div:first-of-type {\n    padding-top: 40px;\n}\n.itemTopTextMain {\n  padding-top: 20px;\n}\n.itemTopTextMain > p {\n    font-size: 14px;\n    line-height: 20px;\n    font-weight: bold;\n}\n.itemTopTextMain > div {\n    height: 50px;\n    line-height: 50px;\n}\n.itemTopTextMain > div input {\n      border: none;\n      background: none;\n      font-size: 16px;\n      display: block;\n      width: 100%;\n}\n.submitBtnMain {\n  padding-top: 40px;\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=39.fb7cb69ee36b228fb55e.js.map