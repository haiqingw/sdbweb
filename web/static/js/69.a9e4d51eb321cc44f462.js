webpackJsonp([69],{"7qU6":function(t,n,o){"use strict";n.b=function(t,n,o){return/^1(3|4|5|6|7|8|9)\d{9}$/.test(n)?o():o(new Error("请输入正确手机号"))},n.a=function(t){var n=t;return!(null==n||n.length<6)&&(!!new RegExp(/^[0-9A-Za-z]+$/).test(n)&&!!new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/).test(n))}},GSQI:function(t,n,o){var e=o("mzPS");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals),o("rjj0")("cf20adc2",e,!0,{})},"T+/8":function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=o("7qU6"),r=o("gyMJ"),a={data:function(){return{code:"",loading:!1,formData:{phone:"",password:"",plat:this.$route.query.plat},loginRules:{phone:[{required:!0,trigger:"blur",message:"手机号不能为空"},{required:!0,trigger:"blur",validator:e.b}],password:[{required:!0,trigger:"blur",message:"密码不能为空"}]},queryData:{merchantInfo:{requestType:"buslogin",requestKeywords:"getplatinfo",plat:""}},renderData:{merchantInfo:{}},autoLoginData:{plat:this.$route.query.plat,code:""}}},methods:{clickLogin:function(){var t=this;this.$refs.loginForm.validate(function(n){if(!n)return console.log("error submit!!"),!1;t.loading=!0,t.$store.dispatch("Login",t.formData).then(function(n){t.$route.query.code?t.$router.push({path:"/",query:{opid:t.code}}):t.$router.push({path:"/"}),t.loading=!1}).catch(function(n){t.loading=!1})})},autoLogin:function(){var t=this;this.$store.dispatch("autoLogin",this.autoLoginData).then(function(n){t.$router.push({path:"/",query:{opid:t.code}}),t.loading=!1,t.loginSuccess.openid=t.code}).catch(function(n){t.loading=!1})},merchantInfo:function(){var t=this;this.queryData.merchantInfo.plat=this.$route.query.plat,Object(r.a)(this.queryData.merchantInfo).then(function(n){1===n.data.responseStatus&&(t.renderData.merchantInfo=n.data.data)})},merchantInfoTitle:function(){this.$store.dispatch("merchantInfo",this.$route.query.plat).then(function(t){}).catch(function(t){})}},created:function(){this.code=this.$route.query.code,this.autoLoginData.code=this.$route.query.code,this.code&&this.autoLogin(),this.merchantInfo(),this.merchantInfoTitle()}},i=o("VU/8")(a,{render:function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("div",[o("div",{staticClass:"logo"},[o("img",{attrs:{src:t.renderData.merchantInfo.qrcodeLogeUrl,alt:""}})]),t._v(" "),o("div",{staticClass:"login-from"},[o("el-form",{ref:"loginForm",staticClass:"demo-ruleForm",attrs:{model:t.formData,rules:t.loginRules}},[o("el-form-item",{attrs:{prop:"phone"}},[o("el-input",{attrs:{placeholder:"请输入手机号"},model:{value:t.formData.phone,callback:function(n){t.$set(t.formData,"phone",n)},expression:"formData.phone"}})],1),t._v(" "),o("el-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{prop:"password"}},[o("el-input",{attrs:{placeholder:"请输入密码","show-password":""},model:{value:t.formData.password,callback:function(n){t.$set(t.formData,"password",n)},expression:"formData.password"}})],1),t._v(" "),o("div",{staticClass:"forgetPasswordMain"},[o("router-link",{attrs:{to:"/forgetPassword"}},[t._v("忘记密码")])],1),t._v(" "),o("el-form-item",[o("el-button",{attrs:{loading:t.loading,type:"primary"},on:{click:t.clickLogin}},[t._v("登录")])],1)],1)],1)])},staticRenderFns:[]},!1,function(t){o("GSQI")},null,null);n.default=i.exports},mzPS:function(t,n,o){(t.exports=o("FZ+f")(!0)).push([t.i,"\n.logo {\n  margin-bottom: 0.8rem;\n}\n\n/* .logo img {\n    border-radius: 50%;\n} */\n.login-from {\n  width: 80%;\n  margin: 0 auto;\n}\n.login-from {\n  text-align: center;\n}\n.login-from .el-button--primary {\n  width: 100%;\n}\n.forgetPasswordMain {\n  text-align: right;\n  line-height: 30px;\n  padding-bottom: 8px;\n}\n.forgetPasswordMain a {\n    font-size: 14px;\n    color: #333;\n}\n","",{version:3,sources:["/Users/ryq/Documents/Renyongqiang/网页制作/s_刷多宝_公众号/s_刷多宝/shuaduobao/src/views/login/index.vue"],names:[],mappings:";AACA;EACE,sBAAsB;CACvB;;AAED;;IAEI;AACJ;EACE,WAAW;EACX,eAAe;CAChB;AACD;EACE,mBAAmB;CACpB;AACD;EACE,YAAY;CACb;AACD;EACE,kBAAkB;EAClB,kBAAkB;EAClB,oBAAoB;CACrB;AACD;IACI,gBAAgB;IAChB,YAAY;CACf",file:"index.vue",sourcesContent:["\n.logo {\n  margin-bottom: 0.8rem;\n}\n\n/* .logo img {\n    border-radius: 50%;\n} */\n.login-from {\n  width: 80%;\n  margin: 0 auto;\n}\n.login-from {\n  text-align: center;\n}\n.login-from .el-button--primary {\n  width: 100%;\n}\n.forgetPasswordMain {\n  text-align: right;\n  line-height: 30px;\n  padding-bottom: 8px;\n}\n.forgetPasswordMain a {\n    font-size: 14px;\n    color: #333;\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=69.a9e4d51eb321cc44f462.js.map