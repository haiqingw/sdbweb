webpackJsonp([44],{"1Iws":function(n,t,e){(n.exports=e("FZ+f")(!0)).push([n.i,"\n.withdrawalRecordMain {\n  padding: 55px 15px 15px;\n}\n.withdrawalRecordItem {\n  -webkit-box-shadow: 0 0 5px #ccc;\n          box-shadow: 0 0 5px #ccc;\n  padding: 10px;\n  overflow: hidden;\n  position: relative;\n  margin: 5px 5px 15px;\n}\n.withdrawalRecordItem em {\n    display: block;\n    width: 100px;\n    height: 25px;\n    line-height: 25px;\n    background: rgba(245, 108, 108, 0.1);\n    color: #f56c6c;\n    font-size: 12px;\n    text-align: center;\n    position: absolute;\n    right: -26px;\n    top: 12px;\n    font-weight: bold;\n    transform: rotate(45deg);\n    -webkit-transform: rotate(45deg);\n}\n.withdrawalRecordItem em.active {\n      background: rgba(103, 194, 58, 0.1);\n      color: #67c23a;\n}\n.withdrawalRecordHeader {\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n  padding-bottom: 15px;\n  padding-top: 12px;\n}\n.withdrawalRecordHeader div {\n    text-align: center;\n}\n.withdrawalRecordHeader div h3 {\n      font-size: 40px;\n      color: #ef4f4f;\n}\n.withdrawalRecordHeader div p {\n      font-size: 12px;\n      color: #333;\n}\n.withdrawalRecordHeader div:nth-of-type(2) {\n      width: 100px;\n      padding-top: 5px;\n}\n.withdrawalRecordHeader div:nth-of-type(2) span {\n        font-size: 14px;\n        color: #ef4f4f;\n        display: block;\n}\n.withdrawalRecordHeader div:nth-of-type(2) img {\n        width: 80px;\n        height: 21px;\n        display: block;\n}\n.withdrawalRecordBody {\n  padding-top: 10px;\n}\n.withdrawalRecordBody p {\n    line-height: 24px;\n    font-size: 12px;\n    color: #333;\n}\n.withdrawalRecordBody p b {\n      color: #ef4f4f;\n}\n.withdrawalRecordBody p:first-of-type {\n      padding-left: 0;\n}\n.withdrawalRecordBody p:last-of-type {\n      border: none;\n}\n.loadingMore {\n  line-height: 40px;\n  text-align: center;\n  font-size: 14px;\n  color: #333;\n}\n.loadingMore img {\n    width: 20px;\n    height: 20px;\n    position: relative;\n    top: -2px;\n    margin-right: 5px;\n    display: inline;\n}\n.mint-loadmore-top {\n  font-size: 14px;\n}\n","",{version:3,sources:["/Users/xiaoyu/Documents/XiaoYuShi/project/web/shuaduobao/src/views/withdrawal/withdrawalRecord.vue"],names:[],mappings:";AACA;EACE,wBAAwB;CACzB;AACD;EACE,iCAAiC;UACzB,yBAAyB;EACjC,cAAc;EACd,iBAAiB;EACjB,mBAAmB;EACnB,qBAAqB;CACtB;AACD;IACI,eAAe;IACf,aAAa;IACb,aAAa;IACb,kBAAkB;IAClB,qCAAqC;IACrC,eAAe;IACf,gBAAgB;IAChB,mBAAmB;IACnB,mBAAmB;IACnB,aAAa;IACb,UAAU;IACV,kBAAkB;IAClB,yBAAyB;IACzB,iCAAiC;CACpC;AACD;MACM,oCAAoC;MACpC,eAAe;CACpB;AACD;EACE,0BAA0B;MACtB,8BAA8B;EAClC,qBAAqB;EACrB,kBAAkB;CACnB;AACD;IACI,mBAAmB;CACtB;AACD;MACM,gBAAgB;MAChB,eAAe;CACpB;AACD;MACM,gBAAgB;MAChB,YAAY;CACjB;AACD;MACM,aAAa;MACb,iBAAiB;CACtB;AACD;QACQ,gBAAgB;QAChB,eAAe;QACf,eAAe;CACtB;AACD;QACQ,YAAY;QACZ,aAAa;QACb,eAAe;CACtB;AACD;EACE,kBAAkB;CACnB;AACD;IACI,kBAAkB;IAClB,gBAAgB;IAChB,YAAY;CACf;AACD;MACM,eAAe;CACpB;AACD;MACM,gBAAgB;CACrB;AACD;MACM,aAAa;CAClB;AACD;EACE,kBAAkB;EAClB,mBAAmB;EACnB,gBAAgB;EAChB,YAAY;CACb;AACD;IACI,YAAY;IACZ,aAAa;IACb,mBAAmB;IACnB,UAAU;IACV,kBAAkB;IAClB,gBAAgB;CACnB;AACD;EACE,gBAAgB;CACjB",file:"withdrawalRecord.vue",sourcesContent:["\n.withdrawalRecordMain {\n  padding: 55px 15px 15px;\n}\n.withdrawalRecordItem {\n  -webkit-box-shadow: 0 0 5px #ccc;\n          box-shadow: 0 0 5px #ccc;\n  padding: 10px;\n  overflow: hidden;\n  position: relative;\n  margin: 5px 5px 15px;\n}\n.withdrawalRecordItem em {\n    display: block;\n    width: 100px;\n    height: 25px;\n    line-height: 25px;\n    background: rgba(245, 108, 108, 0.1);\n    color: #f56c6c;\n    font-size: 12px;\n    text-align: center;\n    position: absolute;\n    right: -26px;\n    top: 12px;\n    font-weight: bold;\n    transform: rotate(45deg);\n    -webkit-transform: rotate(45deg);\n}\n.withdrawalRecordItem em.active {\n      background: rgba(103, 194, 58, 0.1);\n      color: #67c23a;\n}\n.withdrawalRecordHeader {\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n  padding-bottom: 15px;\n  padding-top: 12px;\n}\n.withdrawalRecordHeader div {\n    text-align: center;\n}\n.withdrawalRecordHeader div h3 {\n      font-size: 40px;\n      color: #ef4f4f;\n}\n.withdrawalRecordHeader div p {\n      font-size: 12px;\n      color: #333;\n}\n.withdrawalRecordHeader div:nth-of-type(2) {\n      width: 100px;\n      padding-top: 5px;\n}\n.withdrawalRecordHeader div:nth-of-type(2) span {\n        font-size: 14px;\n        color: #ef4f4f;\n        display: block;\n}\n.withdrawalRecordHeader div:nth-of-type(2) img {\n        width: 80px;\n        height: 21px;\n        display: block;\n}\n.withdrawalRecordBody {\n  padding-top: 10px;\n}\n.withdrawalRecordBody p {\n    line-height: 24px;\n    font-size: 12px;\n    color: #333;\n}\n.withdrawalRecordBody p b {\n      color: #ef4f4f;\n}\n.withdrawalRecordBody p:first-of-type {\n      padding-left: 0;\n}\n.withdrawalRecordBody p:last-of-type {\n      border: none;\n}\n.loadingMore {\n  line-height: 40px;\n  text-align: center;\n  font-size: 14px;\n  color: #333;\n}\n.loadingMore img {\n    width: 20px;\n    height: 20px;\n    position: relative;\n    top: -2px;\n    margin-right: 5px;\n    display: inline;\n}\n.mint-loadmore-top {\n  font-size: 14px;\n}\n"],sourceRoot:""}])},"3UAY":function(n,t,e){var a=e("1Iws");"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);e("rjj0")("2a81c4ae",a,!0,{})},"X/Gl":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("gyMJ"),i=(e("ulGR"),{data:function(){return{isDownLoading:!1,isUpLoading:!1,upFinished:!1,offset:10,isData:!0,queryData:{list:{requestType:"spendinginto",requestKeywords:"spending",platformID:this.$store.state.user.pid,userID:this.$store.state.user.uid,userPhone:this.$store.state.user.uphone,page:0,types:"T",stypes:"TX"}},renderData:{list:[],oldList:[]}}},methods:{onLoadList:function(){this.queryData.list.page++,this.isUpLoading=!0,this.withdrawalList()},onDownRefresh:function(){this.queryData.list.page=1,this.renderData.oldList=[],this.isDownLoading=!0,this.withdrawalList()},withdrawalList:function(){var n=this;Object(a.a)(this.queryData.list).then(function(t){1===t.data.responseStatus?(n.isData=!0,n.renderData.list=t.data.data,n.renderData.list.forEach(function(t){n.renderData.oldList.push(t)}),n.isDownLoading=!1,n.isUpLoading=!1):300===t.data.responseStatus&&1!==n.queryData.list.page?(n.upFinished=!0,n.isUpLoading=!1):300===t.data.responseStatus&&1===n.queryData.list.page&&(n.upFinished=!1,n.isUpLoading=!1,n.isData=!1)})}},created:function(){this.withdrawalList()}}),o={render:function(){var n=this,t=n.$createElement,a=n._self._c||t;return a("div",[a("div",{staticClass:"return"},[a("img",{attrs:{src:e("1Hd4"),alt:""},on:{click:function(t){return n.$router.go(-1)}}}),n._v(" "),a("span",[n._v("提现记录")])]),n._v(" "),n.isData?a("div",{staticClass:"withdrawalRecordMain"},[a("van-pull-refresh",{on:{refresh:n.onDownRefresh},model:{value:n.isDownLoading,callback:function(t){n.isDownLoading=t},expression:"isDownLoading"}},[a("van-list",{attrs:{finished:n.upFinished,"finished-text":"没有更多了",offset:n.offset},on:{load:n.onLoadList},model:{value:n.isUpLoading,callback:function(t){n.isUpLoading=t},expression:"isUpLoading"}},n._l(n.renderData.oldList,function(t){return a("div",{key:t.id,staticClass:"withdrawalRecordItem"},[1==t.reviewStatus?a("em",{staticClass:"active"},[n._v(n._s(t.reStatus))]):n._e(),n._v(" "),2==t.reviewStatus?a("em",{staticClass:"active"},[n._v(n._s(t.reStatus))]):n._e(),n._v(" "),3==t.reviewStatus?a("em",{staticClass:"active"},[n._v(n._s(t.reStatus))]):n._e(),n._v(" "),4==t.reviewStatus?a("em",[n._v(n._s(t.reStatus))]):n._e(),n._v(" "),a("div",{staticClass:"withdrawalRecordHeader flex line_bottom"},[a("div",[a("h3",[n._v(n._s(t.drawMoney))]),n._v(" "),a("p",[n._v("提现金额")])])]),n._v(" "),a("div",{staticClass:"withdrawalRecordBody"},[a("p",[n._v("手续费:\n                            "),a("b",[n._v(n._s(t.pou)+"元")])]),n._v(" "),a("p",[n._v("税金:\n                            "),a("b",[n._v(n._s(t.tax)+"元")])]),n._v(" "),a("p",[n._v("实到账:\n                            "),a("b",[n._v(n._s(t.arviAmount)+"元")])]),n._v(" "),a("p",[n._v("订单状态:\n                            "),1==t.status?a("b",{staticStyle:{color:"#67c23a"}},[n._v(n._s(t.drawStatus))]):n._e(),n._v(" "),2==t.status?a("b",[n._v(n._s(t.drawStatus))]):n._e()]),n._v(" "),a("p",[n._v("提现时间:"+n._s(t.drawTime))]),n._v(" "),a("p",[n._v("备注:"+n._s(t.remark))])])])}),0)],1)],1):a("div",{staticClass:"no-data"},[a("img",{attrs:{src:e("dotK"),alt:""}})])])},staticRenderFns:[]};var r=e("VU/8")(i,o,!1,function(n){e("3UAY")},null,null);t.default=r.exports}});
//# sourceMappingURL=44.95f731d06185aa32de6a.js.map