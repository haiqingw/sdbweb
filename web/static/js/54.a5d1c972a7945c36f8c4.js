webpackJsonp([54],{"1Hd4":function(n,A){n.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAE8UlEQVR4Xu2dzYpURxiG33cTRAzoFehWMJArUBFFJKiQECLobtaDeCeiC0FwpS4kuhE1WSQk4hUIbkW8AnXhD6JTcsYzTDt296mqc5qvqr53tlO/7/P0V+ec6ekm9OM6AbrevTYPCeBcAgkgAZwn4Hz7qgASwHkCzrevCiABnCfgfPuqABLAeQLOt68KIAGcJ+B8+6oAEsB5As63rwogAZwn4Hz7qgASwHkCzrevCiABnCfgfPuqABkChBDWAawBONB3fwHgOslrGcOZdpEACfGHEHYBuA3g1wXd/gTwB8mQMKxpUwkQGX8P/yGAYwNdLpK8EjmseTMJEIEgAX432jsAP5LciBjavIkEGECQCH9rtJ9IPjOnG7EACbAkpEz43YgnSP4Tkb95EwmwAMEI+N2Ie0m+MacbsQAJMCekkfCfkDwckX0RTSTADgwj4X8AcIjk8yLoRixCAsyENBL+RwBnSf4dkXsxTSRAj8Ij/G7rEgCAV/gSwDl89wJ4fuVvXYS4PQIE/6sCLgUQ/O2bEHcCCP63d6CuBBgJ/xOA07Xd5w89cHAjwATwfyN5fyjQ2n7vQgDBX6xl8wII/vKa1LQAgj98IDUrgOAPw2/2OYDgx8FvUgDBj4ffnACCnwa/KQEEPx1+MwIIfh78JgQQ/Hz41QsQQvgBwF8R/641L6Xu2X6Tj3dTlKj2OUAPv3s2fzJlw31bwe+DqFIAwc9QfkGX6gQQ/OngV3cNIPjTwq9KAMGfHn41Agj+auBXIYDgrw5+8QII/mrhFy2A4K8efukC3ARwISOGz92neLX4Bs6MLAa7FPkcIIRwCsCjwdV/36CDf47k3Yy+LruUKsB/AI4mEhH8xMCKPQJCCK+6z9lJ2I/gJ4Q127TUCvAWwO6EPUmAhLBqEOB/AEcS9yQJEgMr+Qj4BcCDjP1IgsTQijwCuj2EEG4BOJ+4n665JEgIrWQBunf75L7hQxJESlCsAH0VkASRIHObFS2AJMjFGt+veAEkQTzMnJZVCDCRBPr7wBxDqhFgAgn0TuDaBZAEOUV+eZ+qKsDWVvRegelEqFIAVQIJsJmAKsF4EaqtADoOxsPvRqheAFWCcSI0IcCMBPpP4UQfmhGgl6D7ateYb/ecF5PL5wRNCSAJEl/+rVwD7Ny2PjUkXoTmKsDM3YGOgwgPmhVAx0EE/VaPgNmt6zho8G8BcW5vt5IEixNr+ghQJRh+qbgRYKJrAn1lzLBTZbcYeRxU+f3Ay4i4qgAT3SI2JYFLASY4DpqRwK0AkuBrPXQtgCSQAJuvAs8Xhu4rgPcLQwkwc4/ksRJIgB03ySMleA/gIMmXZT8N2V6dBJhDaqQEj0mmfsCVmS8SYEH0IyXYR/K1GdWEiSXAkrBGSHCc5L8JHMyaSoCB6DMl+JnkUzOqCRNLgIiwEiXoLgT3kNyIGNq8iQSIRJAgwSWSlyOHNW8mARIQ9BLcAXBmQbd7AH4nGRKGNW0qATLiDyGsA1gDsL/v3t333yB5NWM40y4SwDR++8klgD0D0xVIANP47SeXAPYMTFcgAUzjt59cAtgzMF2BBDCN335yCWDPwHQFEsA0fvvJJYA9A9MVSADT+O0nlwD2DExXIAFM47efXALYMzBdgQQwjd9+cglgz8B0BRLANH77ySWAPQPTFUgA0/jtJ5cA9gxMVyABTOO3n/wLWEb6kLkW6BwAAAAASUVORK5CYII="},"2JWg":function(n,A,e){var t=e("uQ5y");"string"==typeof t&&(t=[[n.i,t,""]]),t.locals&&(n.exports=t.locals),e("rjj0")("0464fd8b",t,!0,{})},I6sR:function(n,A,e){"use strict";Object.defineProperty(A,"__esModule",{value:!0});var t=e("gyMJ"),i=(e("ulGR"),e("Au9i"),e("Fd2+"),{name:"mallDetail",data:function(){return{value:1,activeName:"advantage",isCommentData:!1,score:5,phoneCall:"",isPhoneCall:!1,queryData:{detail:{requestType:"orderpub",requestKeywords:"onlinedetails",id:this.$route.params.id}},renderData:{detail:{}}}},methods:{detail:function(){var n=this;Object(t.a)(this.queryData.detail).then(function(A){1===A.data.responseStatus&&(n.renderData.detail=A.data.data)})},collectImmediately:function(){this.$router.push({name:"online-ordering-confirm",params:{id:this.$route.params.id}})}},created:function(){this.detail()}}),a={render:function(){var n=this,A=n.$createElement,t=n._self._c||A;return t("div",{staticClass:"mall-detail"},[t("div",{staticClass:"return"},[t("img",{attrs:{src:e("1Hd4"),alt:""},on:{click:function(A){return n.$router.go(-1)}}}),n._v(" "),t("span",[n._v("在线订货")])]),n._v(" "),t("mt-swipe",{staticClass:"mallDetailBanner",attrs:{auto:4e3}},[t("mt-swipe-item",[t("img",{attrs:{src:n.renderData.detail.imgPath}})])],1),n._v(" "),t("mt-cell",{attrs:{title:n.renderData.detail.commodityRate,label:"描述信息"}}),n._v(" "),t("div",{staticClass:"pDPriceMain flex"},[t("div",[t("span",[n._v("￥"+n._s(n.renderData.detail.totalPrice))])])]),n._v(" "),t("div",{staticClass:"rateBrandMain"},[t("div",[n._v("费率："+n._s(n.renderData.detail.commodityRate))]),n._v(" "),t("div",[n._v("单价："+n._s(n.renderData.detail.itemPrice))])]),n._v(" "),t("div",{staticClass:"interval"}),n._v(" "),t("div",{staticClass:"advantageEvaluationMain"},[t("div",{domProps:{innerHTML:n._s(n.renderData.detail.remark)}})]),n._v(" "),t("div",{staticStyle:{height:"40px"}}),n._v(" "),t("div",{staticClass:"mallDetailFooterMain line_top"},[t("div",[t("a",{attrs:{href:"javascript:;"},on:{click:n.collectImmediately}},[n._v("立即订货")])])])],1)},staticRenderFns:[]},o=e("VU/8")(i,a,!1,function(n){e("2JWg")},null,null);A.default=o.exports},uQ5y:function(n,A,e){(n.exports=e("FZ+f")(!0)).push([n.i,'\n.mall-detail .van-stepper {\n  display: inline-block;\n  margin-left: .1rem;\n}\n.advantageEvaluationMain {\n  font-size: .3rem;\n  line-height: .5rem;\n  padding: 0 .2rem;\n  padding-bottom: 0.5rem;\n}\n.mall-detail .el-tabs__nav {\n  width: 100%;\n  text-align: center;\n  margin-top: -0.4rem;\n}\n.mall-detail .el-tabs__nav .el-tabs__item {\n  width: 50%;\n}\n.mall-detail .el-rate {\n  float: left;\n  padding: 0.2rem 0;\n}\n.mall-detail .el-rate span {\n    float: left;\n    line-height: 34px;\n    font-size: 34px;\n    position: relative;\n    top: -13px;\n}\n.mint-cell-wrapper {\n  padding: 8px 10px 12px;\n  background: none;\n}\n.mint-cell-text {\n  line-height: 24px;\n}\n.mallDetailBanner {\n  height: 7.5rem;\n  margin-top: 0.8rem;\n}\n.pDPriceMain {\n  padding: 5px 10px;\n  font-size: 16px;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.pDPriceMain div:first-of-type {\n  color: #f33;\n}\n.pDPriceMain div:first-of-type text {\n  font-size: 14px;\n}\n.pDadvantageMain {\n  padding: 10px;\n}\n.pDadvantageMain div {\n  border: 1px solid #c3b091;\n  font-size: 10px;\n  margin-right: 10px;\n  padding-right: 5px;\n  line-height: 12px;\n  padding-top: 1px;\n}\n.pDadvantageMain div span {\n  background: #c3b091;\n  padding: 1px 5px;\n  color: #fff;\n}\n.rateBrandMain {\n  padding: 0 10px;\n  overflow: hidden;\n  margin-bottom: 10px;\n}\n.rateBrandMain > div {\n  width: 50%;\n  float: left;\n  padding: 10px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  font-size: 12px;\n  color: #fff;\n}\n.rateBrandMain > div:first-of-type {\n  background: #577eff;\n}\n.rateBrandMain > div:last-of-type {\n  background: #0096fe;\n}\n.advantageEvaluationNav {\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n  -webkit-box-shadow: 0 2px 3px #f1f1f1;\n          box-shadow: 0 2px 3px #f1f1f1;\n}\n.advantageEvaluationNav a {\n    display: block;\n    width: 100%;\n    text-align: center;\n    font-size: 14px;\n    height: 40px;\n    line-height: 40px;\n    position: relative;\n    color: #333;\n}\n.advantageEvaluationNav a.active {\n      color: #0096fe;\n      font-weight: bold;\n}\n.advantageEvaluationNav a.active::before {\n        content: "";\n        display: block;\n        width: 50%;\n        height: 2px;\n        background: #0096fe;\n        position: absolute;\n        left: 50%;\n        bottom: 0;\n        margin-left: -25%;\n}\n.advantageEvaluationBox > div {\n  display: none;\n}\n.advantageBox {\n  line-height: 26px;\n  font-size: 14px;\n  padding: 10px;\n  text-align: justify;\n}\n.evaluationTop {\n  overflow: hidden;\n  line-height: 40px;\n  padding: 12px 15px 10px;\n  position: relative;\n}\n.evaluationTop span.text {\n    float: left;\n    display: block;\n    width: 75px;\n    font-size: 16px;\n    font-weight: bold;\n}\n.evaluationTop .scoreBox {\n    padding-left: 75px;\n    -ms-flex-pack: distribute;\n        justify-content: space-around;\n    height: 40px;\n}\n.evaluationTop .scoreBox em {\n      display: block;\n      width: 25px;\n      height: 25px;\n      margin-top: 7px;\n      float: left;\n      margin-right: 7px;\n      background-size: 25px 25px;\n}\n.evaluationTop > em {\n    font-size: 30px;\n    position: absolute;\n    left: 260px;\n    top: 12px;\n    color: #ffbe33;\n}\n.evaluationItemBox {\n  padding: 5px 10px 10px;\n  border-bottom: 5px solid #f1f1f1;\n}\n.evaluationItemTop {\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  line-height: 40px;\n}\n.evaluationItemTop span {\n    font-size: 14px;\n    font-weight: bold;\n}\n.evaluationItemTop em {\n    font-size: 12px;\n}\n.evalutionItemMiddle {\n  overflow: hidden;\n}\n.evalutionItemMiddle em {\n    display: block;\n    width: 15px;\n    height: 15px;\n    background-size: 15px 15px;\n    float: left;\n    margin-right: 5px;\n}\n.evalutionItemMiddle span {\n    float: left;\n    margin-left: 5px;\n    font-size: 14px;\n    position: relative;\n    top: -4px;\n    font-size: 18px;\n}\n.evalutionItemSub {\n  font-size: 14px;\n  line-height: 20px;\n}\n.mallDetailFooterMain {\n  overflow: hidden;\n  width: 100%;\n  position: fixed;\n  left: 0;\n  bottom: 0;\n  z-index: 99999;\n}\n.mallDetailFooterMain div a {\n    display: block;\n    width: 100%;\n    height: 40px;\n    background: #0096fe;\n    color: #fff;\n    text-align: center;\n    line-height: 40px;\n    font-size: 14px;\n}\n',"",{version:3,sources:["/Users/xiaoyu/Documents/XiaoYuShi/project/web/shuaduobao/src/views/online-ordering/detail/index.vue"],names:[],mappings:";AACA;EACE,sBAAsB;EACtB,mBAAmB;CACpB;AACD;EACE,iBAAiB;EACjB,mBAAmB;EACnB,iBAAiB;EACjB,uBAAuB;CACxB;AACD;EACE,YAAY;EACZ,mBAAmB;EACnB,oBAAoB;CACrB;AACD;EACE,WAAW;CACZ;AACD;EACE,YAAY;EACZ,kBAAkB;CACnB;AACD;IACI,YAAY;IACZ,kBAAkB;IAClB,gBAAgB;IAChB,mBAAmB;IACnB,WAAW;CACd;AACD;EACE,uBAAuB;EACvB,iBAAiB;CAClB;AACD;EACE,kBAAkB;CACnB;AACD;EACE,eAAe;EACf,mBAAmB;CACpB;AACD;EACE,kBAAkB;EAClB,gBAAgB;EAChB,0BAA0B;MACtB,uBAAuB;UACnB,+BAA+B;CACxC;AACD;EACE,YAAY;CACb;AACD;EACE,gBAAgB;CACjB;AACD;EACE,cAAc;CACf;AACD;EACE,0BAA0B;EAC1B,gBAAgB;EAChB,mBAAmB;EACnB,mBAAmB;EACnB,kBAAkB;EAClB,iBAAiB;CAClB;AACD;EACE,oBAAoB;EACpB,iBAAiB;EACjB,YAAY;CACb;AACD;EACE,gBAAgB;EAChB,iBAAiB;EACjB,oBAAoB;CACrB;AACD;EACE,WAAW;EACX,YAAY;EACZ,cAAc;EACd,+BAA+B;UACvB,uBAAuB;EAC/B,gBAAgB;EAChB,YAAY;CACb;AACD;EACE,oBAAoB;CACrB;AACD;EACE,oBAAoB;CACrB;AACD;EACE,0BAA0B;MACtB,8BAA8B;EAClC,sCAAsC;UAC9B,8BAA8B;CACvC;AACD;IACI,eAAe;IACf,YAAY;IACZ,mBAAmB;IACnB,gBAAgB;IAChB,aAAa;IACb,kBAAkB;IAClB,mBAAmB;IACnB,YAAY;CACf;AACD;MACM,eAAe;MACf,kBAAkB;CACvB;AACD;QACQ,YAAY;QACZ,eAAe;QACf,WAAW;QACX,YAAY;QACZ,oBAAoB;QACpB,mBAAmB;QACnB,UAAU;QACV,UAAU;QACV,kBAAkB;CACzB;AACD;EACE,cAAc;CACf;AACD;EACE,kBAAkB;EAClB,gBAAgB;EAChB,cAAc;EACd,oBAAoB;CACrB;AACD;EACE,iBAAiB;EACjB,kBAAkB;EAClB,wBAAwB;EACxB,mBAAmB;CACpB;AACD;IACI,YAAY;IACZ,eAAe;IACf,YAAY;IACZ,gBAAgB;IAChB,kBAAkB;CACrB;AACD;IACI,mBAAmB;IACnB,0BAA0B;QACtB,8BAA8B;IAClC,aAAa;CAChB;AACD;MACM,eAAe;MACf,YAAY;MACZ,aAAa;MACb,gBAAgB;MAChB,YAAY;MACZ,kBAAkB;MAClB,2BAA2B;CAChC;AACD;IACI,gBAAgB;IAChB,mBAAmB;IACnB,YAAY;IACZ,UAAU;IACV,eAAe;CAClB;AACD;EACE,uBAAuB;EACvB,iCAAiC;CAClC;AACD;EACE,0BAA0B;MACtB,uBAAuB;UACnB,+BAA+B;EACvC,kBAAkB;CACnB;AACD;IACI,gBAAgB;IAChB,kBAAkB;CACrB;AACD;IACI,gBAAgB;CACnB;AACD;EACE,iBAAiB;CAClB;AACD;IACI,eAAe;IACf,YAAY;IACZ,aAAa;IACb,2BAA2B;IAC3B,YAAY;IACZ,kBAAkB;CACrB;AACD;IACI,YAAY;IACZ,iBAAiB;IACjB,gBAAgB;IAChB,mBAAmB;IACnB,UAAU;IACV,gBAAgB;CACnB;AACD;EACE,gBAAgB;EAChB,kBAAkB;CACnB;AACD;EACE,iBAAiB;EACjB,YAAY;EACZ,gBAAgB;EAChB,QAAQ;EACR,UAAU;EACV,eAAe;CAChB;AACD;IACI,eAAe;IACf,YAAY;IACZ,aAAa;IACb,oBAAoB;IACpB,YAAY;IACZ,mBAAmB;IACnB,kBAAkB;IAClB,gBAAgB;CACnB",file:"index.vue",sourcesContent:['\n.mall-detail .van-stepper {\n  display: inline-block;\n  margin-left: .1rem;\n}\n.advantageEvaluationMain {\n  font-size: .3rem;\n  line-height: .5rem;\n  padding: 0 .2rem;\n  padding-bottom: 0.5rem;\n}\n.mall-detail .el-tabs__nav {\n  width: 100%;\n  text-align: center;\n  margin-top: -0.4rem;\n}\n.mall-detail .el-tabs__nav .el-tabs__item {\n  width: 50%;\n}\n.mall-detail .el-rate {\n  float: left;\n  padding: 0.2rem 0;\n}\n.mall-detail .el-rate span {\n    float: left;\n    line-height: 34px;\n    font-size: 34px;\n    position: relative;\n    top: -13px;\n}\n.mint-cell-wrapper {\n  padding: 8px 10px 12px;\n  background: none;\n}\n.mint-cell-text {\n  line-height: 24px;\n}\n.mallDetailBanner {\n  height: 7.5rem;\n  margin-top: 0.8rem;\n}\n.pDPriceMain {\n  padding: 5px 10px;\n  font-size: 16px;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.pDPriceMain div:first-of-type {\n  color: #f33;\n}\n.pDPriceMain div:first-of-type text {\n  font-size: 14px;\n}\n.pDadvantageMain {\n  padding: 10px;\n}\n.pDadvantageMain div {\n  border: 1px solid #c3b091;\n  font-size: 10px;\n  margin-right: 10px;\n  padding-right: 5px;\n  line-height: 12px;\n  padding-top: 1px;\n}\n.pDadvantageMain div span {\n  background: #c3b091;\n  padding: 1px 5px;\n  color: #fff;\n}\n.rateBrandMain {\n  padding: 0 10px;\n  overflow: hidden;\n  margin-bottom: 10px;\n}\n.rateBrandMain > div {\n  width: 50%;\n  float: left;\n  padding: 10px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  font-size: 12px;\n  color: #fff;\n}\n.rateBrandMain > div:first-of-type {\n  background: #577eff;\n}\n.rateBrandMain > div:last-of-type {\n  background: #0096fe;\n}\n.advantageEvaluationNav {\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n  -webkit-box-shadow: 0 2px 3px #f1f1f1;\n          box-shadow: 0 2px 3px #f1f1f1;\n}\n.advantageEvaluationNav a {\n    display: block;\n    width: 100%;\n    text-align: center;\n    font-size: 14px;\n    height: 40px;\n    line-height: 40px;\n    position: relative;\n    color: #333;\n}\n.advantageEvaluationNav a.active {\n      color: #0096fe;\n      font-weight: bold;\n}\n.advantageEvaluationNav a.active::before {\n        content: "";\n        display: block;\n        width: 50%;\n        height: 2px;\n        background: #0096fe;\n        position: absolute;\n        left: 50%;\n        bottom: 0;\n        margin-left: -25%;\n}\n.advantageEvaluationBox > div {\n  display: none;\n}\n.advantageBox {\n  line-height: 26px;\n  font-size: 14px;\n  padding: 10px;\n  text-align: justify;\n}\n.evaluationTop {\n  overflow: hidden;\n  line-height: 40px;\n  padding: 12px 15px 10px;\n  position: relative;\n}\n.evaluationTop span.text {\n    float: left;\n    display: block;\n    width: 75px;\n    font-size: 16px;\n    font-weight: bold;\n}\n.evaluationTop .scoreBox {\n    padding-left: 75px;\n    -ms-flex-pack: distribute;\n        justify-content: space-around;\n    height: 40px;\n}\n.evaluationTop .scoreBox em {\n      display: block;\n      width: 25px;\n      height: 25px;\n      margin-top: 7px;\n      float: left;\n      margin-right: 7px;\n      background-size: 25px 25px;\n}\n.evaluationTop > em {\n    font-size: 30px;\n    position: absolute;\n    left: 260px;\n    top: 12px;\n    color: #ffbe33;\n}\n.evaluationItemBox {\n  padding: 5px 10px 10px;\n  border-bottom: 5px solid #f1f1f1;\n}\n.evaluationItemTop {\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  line-height: 40px;\n}\n.evaluationItemTop span {\n    font-size: 14px;\n    font-weight: bold;\n}\n.evaluationItemTop em {\n    font-size: 12px;\n}\n.evalutionItemMiddle {\n  overflow: hidden;\n}\n.evalutionItemMiddle em {\n    display: block;\n    width: 15px;\n    height: 15px;\n    background-size: 15px 15px;\n    float: left;\n    margin-right: 5px;\n}\n.evalutionItemMiddle span {\n    float: left;\n    margin-left: 5px;\n    font-size: 14px;\n    position: relative;\n    top: -4px;\n    font-size: 18px;\n}\n.evalutionItemSub {\n  font-size: 14px;\n  line-height: 20px;\n}\n.mallDetailFooterMain {\n  overflow: hidden;\n  width: 100%;\n  position: fixed;\n  left: 0;\n  bottom: 0;\n  z-index: 99999;\n}\n.mallDetailFooterMain div a {\n    display: block;\n    width: 100%;\n    height: 40px;\n    background: #0096fe;\n    color: #fff;\n    text-align: center;\n    line-height: 40px;\n    font-size: 14px;\n}\n'],sourceRoot:""}])}});
//# sourceMappingURL=54.a5d1c972a7945c36f8c4.js.map