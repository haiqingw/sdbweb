webpackJsonp([58],{"1Hd4":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAE8UlEQVR4Xu2dzYpURxiG33cTRAzoFehWMJArUBFFJKiQECLobtaDeCeiC0FwpS4kuhE1WSQk4hUIbkW8AnXhD6JTcsYzTDt296mqc5qvqr53tlO/7/P0V+ec6ekm9OM6AbrevTYPCeBcAgkgAZwn4Hz7qgASwHkCzrevCiABnCfgfPuqABLAeQLOt68KIAGcJ+B8+6oAEsB5As63rwogAZwn4Hz7qgASwHkCzrevCiABnCfgfPuqABkChBDWAawBONB3fwHgOslrGcOZdpEACfGHEHYBuA3g1wXd/gTwB8mQMKxpUwkQGX8P/yGAYwNdLpK8EjmseTMJEIEgAX432jsAP5LciBjavIkEGECQCH9rtJ9IPjOnG7EACbAkpEz43YgnSP4Tkb95EwmwAMEI+N2Ie0m+MacbsQAJMCekkfCfkDwckX0RTSTADgwj4X8AcIjk8yLoRixCAsyENBL+RwBnSf4dkXsxTSRAj8Ij/G7rEgCAV/gSwDl89wJ4fuVvXYS4PQIE/6sCLgUQ/O2bEHcCCP63d6CuBBgJ/xOA07Xd5w89cHAjwATwfyN5fyjQ2n7vQgDBX6xl8wII/vKa1LQAgj98IDUrgOAPw2/2OYDgx8FvUgDBj4ffnACCnwa/KQEEPx1+MwIIfh78JgQQ/Hz41QsQQvgBwF8R/641L6Xu2X6Tj3dTlKj2OUAPv3s2fzJlw31bwe+DqFIAwc9QfkGX6gQQ/OngV3cNIPjTwq9KAMGfHn41Agj+auBXIYDgrw5+8QII/mrhFy2A4K8efukC3ARwISOGz92neLX4Bs6MLAa7FPkcIIRwCsCjwdV/36CDf47k3Yy+LruUKsB/AI4mEhH8xMCKPQJCCK+6z9lJ2I/gJ4Q127TUCvAWwO6EPUmAhLBqEOB/AEcS9yQJEgMr+Qj4BcCDjP1IgsTQijwCuj2EEG4BOJ+4n665JEgIrWQBunf75L7hQxJESlCsAH0VkASRIHObFS2AJMjFGt+veAEkQTzMnJZVCDCRBPr7wBxDqhFgAgn0TuDaBZAEOUV+eZ+qKsDWVvRegelEqFIAVQIJsJmAKsF4EaqtADoOxsPvRqheAFWCcSI0IcCMBPpP4UQfmhGgl6D7ateYb/ecF5PL5wRNCSAJEl/+rVwD7Ny2PjUkXoTmKsDM3YGOgwgPmhVAx0EE/VaPgNmt6zho8G8BcW5vt5IEixNr+ghQJRh+qbgRYKJrAn1lzLBTZbcYeRxU+f3Ay4i4qgAT3SI2JYFLASY4DpqRwK0AkuBrPXQtgCSQAJuvAs8Xhu4rgPcLQwkwc4/ksRJIgB03ySMleA/gIMmXZT8N2V6dBJhDaqQEj0mmfsCVmS8SYEH0IyXYR/K1GdWEiSXAkrBGSHCc5L8JHMyaSoCB6DMl+JnkUzOqCRNLgIiwEiXoLgT3kNyIGNq8iQSIRJAgwSWSlyOHNW8mARIQ9BLcAXBmQbd7AH4nGRKGNW0qATLiDyGsA1gDsL/v3t333yB5NWM40y4SwDR++8klgD0D0xVIANP47SeXAPYMTFcgAUzjt59cAtgzMF2BBDCN335yCWDPwHQFEsA0fvvJJYA9A9MVSADT+O0nlwD2DExXIAFM47efXALYMzBdgQQwjd9+cglgz8B0BRLANH77ySWAPQPTFUgA0/jtJ5cA9gxMVyABTOO3n/wLWEb6kLkW6BwAAAAASUVORK5CYII="},UoSp:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Au9i"),i=a("gyMJ"),r=a("ulGR"),s={data:function(){return{realName:"",bankName:"",queryData:{isBindBankCard:{requestType:"operating",requestKeywords:"checkbankcard",userID:this.$store.state.user.uid,platformID:this.$store.state.user.pid,userPhone:this.$store.state.user.uphone},realName:{requestType:"personal",requestKeywords:"getcerti",userID:this.$store.state.user.uid,platformID:this.$store.state.user.pid,userPhone:this.$store.state.user.uphone},bankNameData:{requestType:"operating",requestKeywords:"checkcards"},bindCardCer:{requestType:"operating",requestKeywords:"addbankcard",userID:this.$store.state.user.uid,platformID:this.$store.state.user.pid,userPhone:this.$store.state.user.uphone}}}},methods:{isBindCard:function(){var e=this;Object(i.a)(this.queryData.isBindBankCard).then(function(t){1===t.data.responseStatus&&e.$router.push({name:"certificationComplete"})})},getRealName:function(){var e=this;Object(i.a)(this.queryData.realName).then(function(t){1===t.data.responseStatus&&(e.realName=t.data.data.name)})},getBankName:function(){var e=this;this.queryData.bankNameData.cardNum=this.queryData.bindCardCer.cardNum,""!=this.queryData.bankNameData.cardNum&&void 0!=this.queryData.bankNameData.cardNum&&Object(i.a)(this.queryData.bankNameData).then(function(t){1===t.data.responseStatus?"未知"==t.data.bankName?Object(n.Toast)({message:"不能识别的银行卡号，请重新输入",duration:2e3}):e.bankName=t.data.bankName:Object(n.Toast)(r.a[t.data.responseStatus])})},submitModification:function(){var e=this;""!=this.queryData.bindCardCer.cardNum&&void 0!=this.queryData.bindCardCer.cardNum?""!=this.queryData.bindCardCer.phone&&void 0!=this.queryData.bindCardCer.phone?/^1(1|2|3|4|5|6|7|8|9)\d{9}$/.test(this.queryData.bindCardCer.phone)?("未知"==this.$refs.bankName.value||""==this.$refs.bankName.value?Object(n.Toast)("请重新确认银行卡号是否正确"):this.queryData.bindCardCer.bankName=this.$refs.bankName.value,Object(i.a)(this.queryData.bindCardCer).then(function(t){1===t.data.responseStatus?e.$router.push({name:"certificationComplete"}):Object(n.Toast)(r.a[t.data.responseStatus])})):Object(n.Toast)("手机号输入格式不正确"):Object(n.Toast)("请输入银行预留手机号"):Object(n.Toast)("请输入银行卡号")}},created:function(){this.isBindCard(),this.getRealName()}},o={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"return"},[n("router-link",{attrs:{to:"/mine"}},[n("img",{attrs:{src:a("1Hd4"),alt:""}})]),e._v(" "),n("span",[e._v("实名认证")])],1),e._v(" "),n("div",{staticClass:"certificationMain"},[n("h3",[e._v("绑定结算卡")]),e._v(" "),n("p",[e._v("为有效保障您的资金安全，请填写与您身份证一致的信息，否则不会通过审核！")]),e._v(" "),n("div",{staticClass:"itemTopTextMain"},[n("p",[e._v("真实姓名")]),e._v(" "),n("div",{staticClass:"line_bottom"},[n("input",{attrs:{type:"text",placeholder:"真实姓名",readonly:"readonly"},domProps:{value:e.realName}})])]),e._v(" "),n("div",{staticClass:"itemTopTextMain"},[n("p",[e._v("银行卡号")]),e._v(" "),n("div",{staticClass:"line_bottom"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.queryData.bindCardCer.cardNum,expression:"queryData.bindCardCer.cardNum"}],attrs:{type:"text",placeholder:"请填写银行卡号"},domProps:{value:e.queryData.bindCardCer.cardNum},on:{blur:e.getBankName,input:function(t){t.target.composing||e.$set(e.queryData.bindCardCer,"cardNum",t.target.value)}}})])]),e._v(" "),n("div",{staticClass:"itemTopTextMain"},[n("p",[e._v("所属银行")]),e._v(" "),n("div",{staticClass:"line_bottom"},[n("input",{ref:"bankName",attrs:{type:"text",placeholder:"所属银行",readonly:"readonly"},domProps:{value:e.bankName}})])]),e._v(" "),n("div",{staticClass:"itemTopTextMain"},[n("p",[e._v("银行预留手机号")]),e._v(" "),n("div",{staticClass:"line_bottom"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.queryData.bindCardCer.phone,expression:"queryData.bindCardCer.phone"}],attrs:{type:"tel",placeholder:"请输入银行预留手机号",maxlength:"11"},domProps:{value:e.queryData.bindCardCer.phone},on:{input:function(t){t.target.composing||e.$set(e.queryData.bindCardCer,"phone",t.target.value)}}})])]),e._v(" "),n("div",{staticClass:"submitBtnMain"},[n("mt-button",{attrs:{type:"primary",size:"large"},on:{click:e.submitModification}},[e._v("确认提交")])],1)])])},staticRenderFns:[]},A=a("VU/8")(s,o,!1,function(e){a("VfPP")},null,null);t.default=A.exports},VfPP:function(e,t,a){var n=a("nnw3");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals),a("rjj0")("7c15fb04",n,!0,{})},nnw3:function(e,t,a){(e.exports=a("FZ+f")(!0)).push([e.i,"\n.certificationMain {\n  padding: 40px 20px 15px;\n}\n.certificationMain > h3 {\n    font-size: 26px;\n    line-height: 60px;\n    color: #333;\n    padding-top: 20px;\n}\n.certificationMain > p {\n    font-size: 14px;\n    text-align: justify;\n    line-height: 22px;\n    color: #666;\n}\n.certificationMain > div:first-of-type {\n    padding-top: 40px;\n}\n.itemTopTextMain {\n  padding-top: 20px;\n}\n.itemTopTextMain > p {\n    font-size: 14px;\n    line-height: 20px;\n    font-weight: bold;\n}\n.itemTopTextMain > div {\n    height: 50px;\n    line-height: 50px;\n}\n.itemTopTextMain > div input {\n      border: none;\n      background: none;\n      font-size: 16px;\n      display: block;\n      width: 100%;\n}\n.submitBtnMain {\n  padding-top: 40px;\n}\n","",{version:3,sources:["/Users/xiaoyu/Documents/XiaoYuShi/project/web/shuaduobao/src/views/certification/certificationNext.vue"],names:[],mappings:";AACA;EACE,wBAAwB;CACzB;AACD;IACI,gBAAgB;IAChB,kBAAkB;IAClB,YAAY;IACZ,kBAAkB;CACrB;AACD;IACI,gBAAgB;IAChB,oBAAoB;IACpB,kBAAkB;IAClB,YAAY;CACf;AACD;IACI,kBAAkB;CACrB;AACD;EACE,kBAAkB;CACnB;AACD;IACI,gBAAgB;IAChB,kBAAkB;IAClB,kBAAkB;CACrB;AACD;IACI,aAAa;IACb,kBAAkB;CACrB;AACD;MACM,aAAa;MACb,iBAAiB;MACjB,gBAAgB;MAChB,eAAe;MACf,YAAY;CACjB;AACD;EACE,kBAAkB;CACnB",file:"certificationNext.vue",sourcesContent:["\n.certificationMain {\n  padding: 40px 20px 15px;\n}\n.certificationMain > h3 {\n    font-size: 26px;\n    line-height: 60px;\n    color: #333;\n    padding-top: 20px;\n}\n.certificationMain > p {\n    font-size: 14px;\n    text-align: justify;\n    line-height: 22px;\n    color: #666;\n}\n.certificationMain > div:first-of-type {\n    padding-top: 40px;\n}\n.itemTopTextMain {\n  padding-top: 20px;\n}\n.itemTopTextMain > p {\n    font-size: 14px;\n    line-height: 20px;\n    font-weight: bold;\n}\n.itemTopTextMain > div {\n    height: 50px;\n    line-height: 50px;\n}\n.itemTopTextMain > div input {\n      border: none;\n      background: none;\n      font-size: 16px;\n      display: block;\n      width: 100%;\n}\n.submitBtnMain {\n  padding-top: 40px;\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=58.9995f0f9c0f350f935e9.js.map