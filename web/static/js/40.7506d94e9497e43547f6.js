webpackJsonp([40],{"T+/8":function(t,o,n){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var e=n("7qU6"),r=n("gyMJ"),a={data:function(){return{code:"",loading:!1,formData:{phone:"",password:"",plat:this.$route.query.plat},loginRules:{phone:[{required:!0,trigger:"blur",message:"手机号不能为空"},{required:!0,trigger:"blur",validator:e.b}],password:[{required:!0,trigger:"blur",message:"密码不能为空"}]},queryData:{merchantInfo:{requestType:"buslogin",requestKeywords:"getplatinfo",plat:""}},renderData:{merchantInfo:{}}}},methods:{clickLogin:function(){var t=this;this.$refs.loginForm.validate(function(o){if(!o)return console.log("error submit!!"),!1;t.loading=!0,t.$store.dispatch("Login",t.formData).then(function(o){t.$route.query.code?t.$router.push({path:"/",query:{opid:t.code}}):t.$router.push({path:"/"}),t.loading=!1}).catch(function(o){t.loading=!1})})},autoLogin:function(){var t=this;this.$store.dispatch("autoLogin",this.code).then(function(o){t.$router.push({path:"/",query:{opid:t.code}}),t.loading=!1,t.loginSuccess.openid=t.code}).catch(function(o){t.loading=!1})},merchantInfo:function(){var t=this;this.queryData.merchantInfo.plat=this.$route.query.plat,Object(r.a)(this.queryData.merchantInfo).then(function(o){1===o.data.responseStatus&&(t.renderData.merchantInfo=o.data.data)})},merchantInfoTitle:function(){this.$store.dispatch("merchantInfo",this.$route.query.plat).then(function(t){}).catch(function(t){})}},created:function(){this.code=this.$route.query.code,this.code&&this.autoLogin(),this.merchantInfo(),this.merchantInfoTitle()}},i={render:function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("div",[n("div",{staticClass:"logo"},[n("img",{attrs:{src:t.renderData.merchantInfo.qrcodeLogeUrl,alt:""}})]),t._v(" "),n("div",{staticClass:"login-from"},[n("el-form",{ref:"loginForm",staticClass:"demo-ruleForm",attrs:{model:t.formData,rules:t.loginRules}},[n("el-form-item",{attrs:{prop:"phone"}},[n("el-input",{attrs:{placeholder:"请输入手机号"},model:{value:t.formData.phone,callback:function(o){t.$set(t.formData,"phone",o)},expression:"formData.phone"}})],1),t._v(" "),n("el-form-item",{staticStyle:{"margin-bottom":"0"},attrs:{prop:"password"}},[n("el-input",{attrs:{placeholder:"请输入密码","show-password":""},model:{value:t.formData.password,callback:function(o){t.$set(t.formData,"password",o)},expression:"formData.password"}})],1),t._v(" "),n("div",{staticClass:"forgetPasswordMain"},[n("router-link",{attrs:{to:"/forgetPassword"}},[t._v("忘记密码")])],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{loading:t.loading,type:"primary"},on:{click:t.clickLogin}},[t._v("登录")])],1)],1)],1)])},staticRenderFns:[]};var s=n("VU/8")(a,i,!1,function(t){n("f9DD")},null,null);o.default=s.exports},f9DD:function(t,o,n){var e=n("mx6u");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);n("rjj0")("7beeebb6",e,!0,{})},mx6u:function(t,o,n){(t.exports=n("FZ+f")(!0)).push([t.i,"\n.logo {\n  margin-bottom: .8rem;\n}\n\n/* .logo img {\n    border-radius: 50%;\n} */\n.login-from {\n  width: 80%;\n  margin: 0 auto;\n}\n.login-from {\n  text-align: center;\n}\n.login-from .el-button--primary {\n  width: 100%;\n}\n.forgetPasswordMain {\n  text-align: right;\n  line-height: 30px;\n  padding-bottom: 8px;\n}\n.forgetPasswordMain a {\n    font-size: 14px;\n    color: #333;\n}\n","",{version:3,sources:["/Users/xiaoyu/Documents/XiaoYuShi/project/web/shuaduobao/src/views/login/index.vue"],names:[],mappings:";AACA;EACE,qBAAqB;CACtB;;AAED;;IAEI;AACJ;EACE,WAAW;EACX,eAAe;CAChB;AACD;EACE,mBAAmB;CACpB;AACD;EACE,YAAY;CACb;AACD;EACE,kBAAkB;EAClB,kBAAkB;EAClB,oBAAoB;CACrB;AACD;IACI,gBAAgB;IAChB,YAAY;CACf",file:"index.vue",sourcesContent:["\n.logo {\n  margin-bottom: .8rem;\n}\n\n/* .logo img {\n    border-radius: 50%;\n} */\n.login-from {\n  width: 80%;\n  margin: 0 auto;\n}\n.login-from {\n  text-align: center;\n}\n.login-from .el-button--primary {\n  width: 100%;\n}\n.forgetPasswordMain {\n  text-align: right;\n  line-height: 30px;\n  padding-bottom: 8px;\n}\n.forgetPasswordMain a {\n    font-size: 14px;\n    color: #333;\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=40.7506d94e9497e43547f6.js.map