webpackJsonp([47],{T34T:function(e,n,i){(e.exports=i("FZ+f")(!0)).push([e.i,"\n.deliver-goods-choice .el-tabs__header{\n    position: fixed;\n    width:100%;\n    left:0;\n    top: .4rem;\n    z-index:9;\n    background:#fff;\n}\n.deliver-goods-choice .el-tabs__content{\n    padding-top:70px;\n}\n.deliver-goods-choice{\n    margin-top:12px;\n}\n.deliver-goods .deliver-goods-choice .el-tabs__nav {\n    width: 100%;\n    text-align: center;\n}\n.deliver-goods .deliver-goods-choice .el-tabs__nav .el-tabs__item {\n    width: 50%;\n}\n.deliver-goods-list ul {\n    padding: 0 .2rem;\n}\n.deliver-goods-list ul li {\n    font-size: 0.26rem;\n    padding: .2rem;\n    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);\n    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);\n    border-radius: 4px;\n    border: 1px solid #ebeef5;\n    background-color: #fff;\n    margin-top: .2rem;\n}\n.deliver-goods-list ul li .title {\n    overflow: hidden;\n    line-height: .4rem;\n    padding: .1rem 0;\n    border-bottom: .01rem dashed #ccc;\n}\n.deliver-goods-list ul li .title h3 {\n    float: left;\n    font-weight: normal;\n    font-size: 0.28rem;\n}\n.deliver-goods-list ul li .title .right {\n    float: right;\n}\n.deliver-goods-list ul li .info {\n    overflow: hidden;\n    line-height: 0.4rem;\n    padding-top: .2rem;\n}\n.deliver-goods-list ul li .info span {\n    float: left;\n}\n.deliver-goods-list ul li .info em {\n    float: right;\n}\n.deliver-goods-list ul li .receiving-address {\n    line-height: .4rem;\n    padding-bottom: .2rem;\n    border-bottom: .01rem dashed #ccc;\n}\n.no-deliver-goods-list ul li .time {\n    line-height: 0.4rem;\n    padding: 0.1rem 0;\n}\n.no-deliver-goods-list ul li .btn {\n    overflow: hidden;\n    padding-left:.2rem;\n    line-height: 0.7rem;\n    color: #fff;\n    background-color: #089cfe;\n}\n.no-deliver-goods-list ul li .btn span {\n    float: left;\n}\n.no-deliver-goods-list ul li .btn a {\n    float: right;\n    color: #fff;\n    padding:0 .2rem;\n    background:#4cb5fb;\n}\n.yes-deliver-goods-list ul li .express-name {\n    line-height: .4rem;\n    padding: .15rem 0;\n    border-bottom: .01rem dashed #ccc;\n}\n.yes-deliver-goods-list ul li .sun {\n    padding-top: .2rem;\n    line-height: 0.4rem;\n}\n","",{version:3,sources:["/Users/xiaoyu/Documents/XiaoYuShi/project/web/shuaduobao/src/views/deliver-goods/index.vue"],names:[],mappings:";AACA;IACI,gBAAgB;IAChB,WAAW;IACX,OAAO;IACP,WAAW;IACX,UAAU;IACV,gBAAgB;CACnB;AACD;IACI,iBAAiB;CACpB;AACD;IACI,gBAAgB;CACnB;AACD;IACI,YAAY;IACZ,mBAAmB;CACtB;AACD;IACI,WAAW;CACd;AACD;IACI,iBAAiB;CACpB;AACD;IACI,mBAAmB;IACnB,eAAe;IACf,gDAAgD;IAChD,wCAAwC;IACxC,mBAAmB;IACnB,0BAA0B;IAC1B,uBAAuB;IACvB,kBAAkB;CACrB;AACD;IACI,iBAAiB;IACjB,mBAAmB;IACnB,iBAAiB;IACjB,kCAAkC;CACrC;AACD;IACI,YAAY;IACZ,oBAAoB;IACpB,mBAAmB;CACtB;AACD;IACI,aAAa;CAChB;AACD;IACI,iBAAiB;IACjB,oBAAoB;IACpB,mBAAmB;CACtB;AACD;IACI,YAAY;CACf;AACD;IACI,aAAa;CAChB;AACD;IACI,mBAAmB;IACnB,sBAAsB;IACtB,kCAAkC;CACrC;AACD;IACI,oBAAoB;IACpB,kBAAkB;CACrB;AACD;IACI,iBAAiB;IACjB,mBAAmB;IACnB,oBAAoB;IACpB,YAAY;IACZ,0BAA0B;CAC7B;AACD;IACI,YAAY;CACf;AACD;IACI,aAAa;IACb,YAAY;IACZ,gBAAgB;IAChB,mBAAmB;CACtB;AACD;IACI,mBAAmB;IACnB,kBAAkB;IAClB,kCAAkC;CACrC;AACD;IACI,mBAAmB;IACnB,oBAAoB;CACvB",file:"index.vue",sourcesContent:["\n.deliver-goods-choice .el-tabs__header{\n    position: fixed;\n    width:100%;\n    left:0;\n    top: .4rem;\n    z-index:9;\n    background:#fff;\n}\n.deliver-goods-choice .el-tabs__content{\n    padding-top:70px;\n}\n.deliver-goods-choice{\n    margin-top:12px;\n}\n.deliver-goods .deliver-goods-choice .el-tabs__nav {\n    width: 100%;\n    text-align: center;\n}\n.deliver-goods .deliver-goods-choice .el-tabs__nav .el-tabs__item {\n    width: 50%;\n}\n.deliver-goods-list ul {\n    padding: 0 .2rem;\n}\n.deliver-goods-list ul li {\n    font-size: 0.26rem;\n    padding: .2rem;\n    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);\n    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);\n    border-radius: 4px;\n    border: 1px solid #ebeef5;\n    background-color: #fff;\n    margin-top: .2rem;\n}\n.deliver-goods-list ul li .title {\n    overflow: hidden;\n    line-height: .4rem;\n    padding: .1rem 0;\n    border-bottom: .01rem dashed #ccc;\n}\n.deliver-goods-list ul li .title h3 {\n    float: left;\n    font-weight: normal;\n    font-size: 0.28rem;\n}\n.deliver-goods-list ul li .title .right {\n    float: right;\n}\n.deliver-goods-list ul li .info {\n    overflow: hidden;\n    line-height: 0.4rem;\n    padding-top: .2rem;\n}\n.deliver-goods-list ul li .info span {\n    float: left;\n}\n.deliver-goods-list ul li .info em {\n    float: right;\n}\n.deliver-goods-list ul li .receiving-address {\n    line-height: .4rem;\n    padding-bottom: .2rem;\n    border-bottom: .01rem dashed #ccc;\n}\n.no-deliver-goods-list ul li .time {\n    line-height: 0.4rem;\n    padding: 0.1rem 0;\n}\n.no-deliver-goods-list ul li .btn {\n    overflow: hidden;\n    padding-left:.2rem;\n    line-height: 0.7rem;\n    color: #fff;\n    background-color: #089cfe;\n}\n.no-deliver-goods-list ul li .btn span {\n    float: left;\n}\n.no-deliver-goods-list ul li .btn a {\n    float: right;\n    color: #fff;\n    padding:0 .2rem;\n    background:#4cb5fb;\n}\n.yes-deliver-goods-list ul li .express-name {\n    line-height: .4rem;\n    padding: .15rem 0;\n    border-bottom: .01rem dashed #ccc;\n}\n.yes-deliver-goods-list ul li .sun {\n    padding-top: .2rem;\n    line-height: 0.4rem;\n}\n"],sourceRoot:""}])},pEcZ:function(e,n,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=i("gyMJ"),s={data:function(){return{isDownLoading:!1,isUpLoading:!1,upFinished:!1,offset:10,isData:!0,activeName:"3",queryData:{list:{requestType:"agent",requestKeywords:"order",platformID:this.$store.state.user.pid,userID:this.$store.state.user.uid,userPhone:this.$store.state.user.uphone,isReceipt:"3",page:0}},renderData:{list:[],oldList:[]}}},methods:{onLoadList:function(){this.queryData.list.page++,this.deliverGoodsList()},onDownRefresh:function(){this.queryData.list.page=1,this.renderData.oldList=[],this.isDownLoading=!0,this.deliverGoodsList()},handleClick:function(e,n){this.renderData.oldList=[],this.queryData.list.isReceipt=this.activeName,this.upFinished=!1,this.isData=!0,this.queryData.list.page=0,this.deliverGoodsList()},deliverGoodsList:function(){var e=this;Object(t.a)(this.queryData.list).then(function(n){1===n.data.responseStatus?(e.isData=!0,e.renderData.list=n.data.data,e.renderData.list.forEach(function(n){e.renderData.oldList.push(n)}),e.isDownLoading=!1,e.isUpLoading=!1):300===n.data.responseStatus&&1!==e.queryData.list.page?(e.upFinished=!0,e.isUpLoading=!1):300===n.data.responseStatus&&1===e.queryData.list.page&&(e.upFinished=!1,e.isUpLoading=!1,e.isData=!1)})}},created:function(){}},o={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"deliver-goods"},[t("div",{staticClass:"return"},[t("img",{attrs:{src:i("1Hd4"),alt:""},on:{click:function(n){return e.$router.go(-1)}}}),e._v(" "),t("span",[e._v("发货")])]),e._v(" "),t("div",{staticClass:"deliver-goods-choice"},[t("el-tabs",{on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(n){e.activeName=n},expression:"activeName"}},[t("el-tab-pane",{attrs:{label:"未发货",name:"3"}},[e.isData?t("div",{staticClass:"no-deliver-goods-list deliver-goods-list"},[t("van-pull-refresh",{on:{refresh:e.onDownRefresh},model:{value:e.isDownLoading,callback:function(n){e.isDownLoading=n},expression:"isDownLoading"}},[t("van-list",{attrs:{finished:e.upFinished,"finished-text":"没有更多了",offset:e.offset},on:{load:e.onLoadList},model:{value:e.isUpLoading,callback:function(n){e.isUpLoading=n},expression:"isUpLoading"}},[t("ul",e._l(e.renderData.oldList,function(n){return t("li",{key:n.id},[t("div",{staticClass:"title"},[t("h3",[e._v("品 牌:"+e._s(n.pname))]),e._v(" "),t("div",{staticClass:"right"},[e._v("\n                                            "+e._s(n.pstatus)+"\n                                            |\n                                            "+e._s(n.returned)+"\n                                        ")])]),e._v(" "),t("div",{staticClass:"info"},[t("span",[e._v("收货姓名:"+e._s(n.consignee))]),e._v(" "),t("em",[e._v(e._s(n.consigneePhone))])]),e._v(" "),t("div",{staticClass:"receiving-address"},[e._v("\n                                        "+e._s(n.address)+"\n                                    ")]),e._v(" "),t("div",{staticClass:"time"},[e._v("下单时间:"+e._s(n.orderTime))]),e._v(" "),t("div",{staticClass:"btn"},[t("span",[e._v("\n                                            订单号:"+e._s(n.ordernum)+"\n                                        ")]),e._v(" "),t("router-link",{attrs:{to:{name:"clickDeliverGoods",params:{proid:n.proid,id:n.id}}}},[e._v("发货")])],1)])}),0)])],1)],1):t("div",{staticClass:"no-data"},[t("img",{attrs:{src:i("dotK"),alt:""}})])]),e._v(" "),t("el-tab-pane",{attrs:{label:"已发货",name:"2"}},[e.isData?t("div",{staticClass:"yes-deliver-goods-list deliver-goods-list"},[t("van-pull-refresh",{on:{refresh:e.onDownRefresh},model:{value:e.isDownLoading,callback:function(n){e.isDownLoading=n},expression:"isDownLoading"}},[t("van-list",{attrs:{finished:e.upFinished,"finished-text":"没有更多了",offset:e.offset},on:{load:e.onLoadList},model:{value:e.isUpLoading,callback:function(n){e.isUpLoading=n},expression:"isUpLoading"}},[t("ul",e._l(e.renderData.oldList,function(n){return t("li",{key:n.id},[t("div",{staticClass:"title"},[t("h3",[e._v("品 牌:"+e._s(n.pname))]),e._v(" "),t("div",{staticClass:"right"},[e._v("\n                                            "+e._s(n.pstatus)+"\n                                            |\n                                            "+e._s(n.returned)+"\n                                        ")])]),e._v(" "),t("div",{staticClass:"info"},[t("span",[e._v("收货姓名:"+e._s(n.consignee))]),e._v(" "),t("em",[e._v(e._s(n.consigneePhone))])]),e._v(" "),t("div",{staticClass:"receiving-address"},[e._v("\n                                        "+e._s(n.address)+"\n                                    ")]),e._v(" "),t("div",{staticClass:"express-name"},[e._v("\n                                        "+e._s(n.courier)+"\n                                    ")]),e._v(" "),t("div",{staticClass:"sun"},[t("div",[e._v("终端号:"+e._s(n.terminalNumber))]),e._v(" "),t("div",[e._v("订单号:"+e._s(n.ordernum))]),e._v(" "),t("div",[e._v("下单时间:"+e._s(n.orderTime))])])])}),0)])],1)],1):t("div",{staticClass:"no-data"},[t("img",{attrs:{src:i("dotK"),alt:""}})])])],1)],1)])},staticRenderFns:[]};var d=i("VU/8")(s,o,!1,function(e){i("wbOG")},null,null);n.default=d.exports},wbOG:function(e,n,i){var t=i("T34T");"string"==typeof t&&(t=[[e.i,t,""]]),t.locals&&(e.exports=t.locals);i("rjj0")("5c0ecea8",t,!0,{})}});
//# sourceMappingURL=47.0438ad58f854bcc8b5e7.js.map