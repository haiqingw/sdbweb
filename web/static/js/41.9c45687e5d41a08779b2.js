webpackJsonp([41],{Mdgh:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=t("gyMJ"),a=(t("ulGR"),{data:function(){return{isDownLoading:!1,isUpLoading:!1,upFinished:!1,offset:10,isData:!0,queryData:{list:{requestType:"agent",requestKeywords:"terminal",platformID:this.$store.state.user.pid,userID:this.$store.state.user.uid,userPhone:this.$store.state.user.uphone,productID:this.$route.params.id,page:0,limit:10}},renderData:{list:[],oldList:[]}}},methods:{terminalList:function(){var n=this;this.upFinished=!1,Object(i.a)(this.queryData.list).then(function(e){1===e.data.responseStatus?(n.isData=!0,n.renderData.list=e.data.data,n.renderData.list.forEach(function(e){n.renderData.oldList.push(e)}),n.isDownLoading=!1,n.isUpLoading=!1):300===e.data.responseStatus&&1!==n.queryData.list.page?(n.upFinished=!0,n.isUpLoading=!1):300===e.data.responseStatus&&1===n.queryData.list.page&&(n.upFinished=!1,n.isUpLoading=!1,n.isData=!1)})},onLoadList:function(){this.queryData.list.page++,this.isUpLoading=!0,this.terminalList()},onDownRefresh:function(){this.queryData.list.page=1,this.renderData.oldList=[],this.isDownLoading=!0,this.terminalList()}},created:function(){this.terminalList()}}),r={render:function(){var n=this,e=n.$createElement,i=n._self._c||e;return i("div",{staticClass:"dial-code-list"},[i("div",{staticClass:"return"},[i("img",{attrs:{src:t("1Hd4"),alt:""},on:{click:function(e){return n.$router.go(-1)}}}),n._v(" "),i("span",[n._v("退码列表")])]),n._v(" "),i("div",{staticClass:"content"},[n.isData?i("div",{staticClass:"my-terminal-list"},[i("van-pull-refresh",{on:{refresh:n.onDownRefresh},model:{value:n.isDownLoading,callback:function(e){n.isDownLoading=e},expression:"isDownLoading"}},[i("van-list",{attrs:{finished:n.upFinished,"finished-text":"没有更多了",offset:n.offset},on:{load:n.onLoadList},model:{value:n.isUpLoading,callback:function(e){n.isUpLoading=e},expression:"isUpLoading"}},[i("ul",n._l(n.renderData.oldList,function(e){return i("li",{key:e.id},[i("div",{staticClass:"name-state"},[i("h3",[n._v(n._s(e.productName))]),n._v(" "),"未使用"===e.useStatus?i("el-tag",{attrs:{type:"danger"}},[n._v(n._s(e.useStatus))]):n._e(),n._v(" "),"已使用"===e.useStatus?i("el-tag",{attrs:{type:"success"}},[n._v(n._s(e.useStatus))]):n._e()],1),n._v(" "),i("div",{staticClass:"terminal-number"},[n._v(n._s(e.terminalNo))]),n._v(" "),i("div",{staticClass:"time-batch"},[i("div",{staticClass:"left"},["0"!==e.useName?i("span",[n._v("使用者："+n._s(e.useName))]):n._e(),n._v(" "),i("time",[n._v(n._s(e.allotTime))])]),n._v(" "),i("div",{staticClass:"right"},[i("span",[n._v(n._s(e.batchNo))])])])])}),0)])],1)],1):n._e()])])},staticRenderFns:[]};var l=t("VU/8")(a,r,!1,function(n){t("fxxM")},null,null);e.default=l.exports},VUVN:function(n,e,t){var i=t("kxFB");(n.exports=t("FZ+f")(!0)).push([n.i,"\n.dial-code-list .content {\n    margin-top: 0.8rem;\n}\n.dial-code-list .my-terminal-list {\n    margin-top: 1rem;\n}\n.my-terminal-list ul li .code-out {\n    overflow: hidden;\n    font-size: 0.3rem;\n    margin-top: 0.15rem;\n    padding-top: 0.2rem;\n    border-top: 0.01rem dashed #ccc;\n}\n.my-terminal-list ul li .code-out span {\n    float: right;\n    color: #fff;\n    background: #089cfe;\n    border-radius: 0.1rem;\n    padding: 0.1rem 0.2rem;\n}\n.my-terminal .el-input--suffix .el-input__inner {\n    text-align: center;\n}\n.my-terminal .no-data {\n    margin-top: 67%;\n}\n.my-terminal-choice {\n    position: fixed;\n    left: 0;\n    top: 0.7rem;\n    z-index: 99;\n}\n.my-terminal .my-terminal-choice {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    font-size: 0.28rem;\n    text-align: center;\n    line-height: 0.4rem;\n    padding: 0.2rem 0 0.1rem;\n}\n.my-terminal .my-terminal-choice .el-select {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    background: url("+i(t("pqrY"))+")\n        no-repeat 2rem center;\n    background-size: 10%;\n}\n.my-terminal .my-terminal-choice .el-select input {\n    border: none;\n}\n.my-terminal .mint-popup {\n    width: 100%;\n}\n.my-terminal .mint-popup .picker-slot.picker-slot-right {\n    text-align: center;\n}\n.my-terminal-list ul {\n    padding: 0 0.2rem;\n}\n.my-terminal-list ul li {\n    padding: 0.2rem;\n    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);\n            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);\n    border-radius: 4px;\n    border: 1px solid #ebeef5;\n    background-color: #fff;\n    margin-bottom: 0.3rem;\n}\n.my-terminal-list ul li .name-state {\n    overflow: hidden;\n}\n.my-terminal-list ul li .name-state h3 {\n    float: left;\n    font-size: 0.3rem;\n    line-height: 0.6rem;\n    color: #303133;\n}\n.my-terminal-list ul li .name-state h3 span {\n    margin-left: 0.18rem;\n    font-size: 0.28rem;\n}\n.my-terminal-list ul li .name-state span {\n    float: right;\n}\n.my-terminal-list ul li .terminal-number {\n    font-size: 0.4rem;\n    text-align: center;\n    color: #ff3300;\n    font-weight: normal;\n    padding: 0.3rem 0;\n}\n.my-terminal-list ul li .time-batch {\n    overflow: hidden;\n    color: #ccc;\n    font-size: 0.26rem;\n    line-height: 0.4rem;\n}\n.my-terminal-list ul li .time-batch .left {\n    float: left;\n}\n.my-terminal-list ul li .time-batch .left span {\n    margin-right: 0.2rem;\n}\n.my-terminal-list ul li .time-batch .right {\n    float: right;\n}\n","",{version:3,sources:["/Users/xiaoyu/Documents/XiaoYuShi/project/web/shuaduobao/src/views/dial-code/list/index.vue"],names:[],mappings:";AACA;IACI,mBAAmB;CACtB;AACD;IACI,iBAAiB;CACpB;AACD;IACI,iBAAiB;IACjB,kBAAkB;IAClB,oBAAoB;IACpB,oBAAoB;IACpB,gCAAgC;CACnC;AACD;IACI,aAAa;IACb,YAAY;IACZ,oBAAoB;IACpB,sBAAsB;IACtB,uBAAuB;CAC1B;AACD;IACI,mBAAmB;CACtB;AACD;IACI,gBAAgB;CACnB;AACD;IACI,gBAAgB;IAChB,QAAQ;IACR,YAAY;IACZ,YAAY;CACf;AACD;IACI,qBAAqB;IACrB,qBAAqB;IACrB,cAAc;IACd,mBAAmB;IACnB,mBAAmB;IACnB,oBAAoB;IACpB,yBAAyB;CAC5B;AACD;IACI,oBAAoB;QAChB,YAAY;YACR,QAAQ;IAChB;8BAC0B;IAC1B,qBAAqB;CACxB;AACD;IACI,aAAa;CAChB;AACD;IACI,YAAY;CACf;AACD;IACI,mBAAmB;CACtB;AACD;IACI,kBAAkB;CACrB;AACD;IACI,gBAAgB;IAChB,oDAAoD;YAC5C,4CAA4C;IACpD,mBAAmB;IACnB,0BAA0B;IAC1B,uBAAuB;IACvB,sBAAsB;CACzB;AACD;IACI,iBAAiB;CACpB;AACD;IACI,YAAY;IACZ,kBAAkB;IAClB,oBAAoB;IACpB,eAAe;CAClB;AACD;IACI,qBAAqB;IACrB,mBAAmB;CACtB;AACD;IACI,aAAa;CAChB;AACD;IACI,kBAAkB;IAClB,mBAAmB;IACnB,eAAe;IACf,oBAAoB;IACpB,kBAAkB;CACrB;AACD;IACI,iBAAiB;IACjB,YAAY;IACZ,mBAAmB;IACnB,oBAAoB;CACvB;AACD;IACI,YAAY;CACf;AACD;IACI,qBAAqB;CACxB;AACD;IACI,aAAa;CAChB",file:"index.vue",sourcesContent:["\n.dial-code-list .content {\n    margin-top: 0.8rem;\n}\n.dial-code-list .my-terminal-list {\n    margin-top: 1rem;\n}\n.my-terminal-list ul li .code-out {\n    overflow: hidden;\n    font-size: 0.3rem;\n    margin-top: 0.15rem;\n    padding-top: 0.2rem;\n    border-top: 0.01rem dashed #ccc;\n}\n.my-terminal-list ul li .code-out span {\n    float: right;\n    color: #fff;\n    background: #089cfe;\n    border-radius: 0.1rem;\n    padding: 0.1rem 0.2rem;\n}\n.my-terminal .el-input--suffix .el-input__inner {\n    text-align: center;\n}\n.my-terminal .no-data {\n    margin-top: 67%;\n}\n.my-terminal-choice {\n    position: fixed;\n    left: 0;\n    top: 0.7rem;\n    z-index: 99;\n}\n.my-terminal .my-terminal-choice {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    font-size: 0.28rem;\n    text-align: center;\n    line-height: 0.4rem;\n    padding: 0.2rem 0 0.1rem;\n}\n.my-terminal .my-terminal-choice .el-select {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    background: url(../../../assets/images/my-terminal-choice-drop-down.png)\n        no-repeat 2rem center;\n    background-size: 10%;\n}\n.my-terminal .my-terminal-choice .el-select input {\n    border: none;\n}\n.my-terminal .mint-popup {\n    width: 100%;\n}\n.my-terminal .mint-popup .picker-slot.picker-slot-right {\n    text-align: center;\n}\n.my-terminal-list ul {\n    padding: 0 0.2rem;\n}\n.my-terminal-list ul li {\n    padding: 0.2rem;\n    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);\n            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);\n    border-radius: 4px;\n    border: 1px solid #ebeef5;\n    background-color: #fff;\n    margin-bottom: 0.3rem;\n}\n.my-terminal-list ul li .name-state {\n    overflow: hidden;\n}\n.my-terminal-list ul li .name-state h3 {\n    float: left;\n    font-size: 0.3rem;\n    line-height: 0.6rem;\n    color: #303133;\n}\n.my-terminal-list ul li .name-state h3 span {\n    margin-left: 0.18rem;\n    font-size: 0.28rem;\n}\n.my-terminal-list ul li .name-state span {\n    float: right;\n}\n.my-terminal-list ul li .terminal-number {\n    font-size: 0.4rem;\n    text-align: center;\n    color: #ff3300;\n    font-weight: normal;\n    padding: 0.3rem 0;\n}\n.my-terminal-list ul li .time-batch {\n    overflow: hidden;\n    color: #ccc;\n    font-size: 0.26rem;\n    line-height: 0.4rem;\n}\n.my-terminal-list ul li .time-batch .left {\n    float: left;\n}\n.my-terminal-list ul li .time-batch .left span {\n    margin-right: 0.2rem;\n}\n.my-terminal-list ul li .time-batch .right {\n    float: right;\n}\n"],sourceRoot:""}])},fxxM:function(n,e,t){var i=t("VUVN");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);t("rjj0")("380757a2",i,!0,{})}});
//# sourceMappingURL=41.9c45687e5d41a08779b2.js.map