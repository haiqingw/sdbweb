import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
    routes: [{
        path: '/',
        // name: 'index/:money',
        name: 'index',
        component: resolve => require(['@/views/home/index'], resolve),
        meta: {
            requireAuth: true,
        },
        redirect: '/home'
    },
    {
        path: '/loginoid',
        name: 'loginoid',
        component: () =>
            import('@/views/login/loginoid.vue'),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: resolve => require(['@/views/login/index'], resolve),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/complaint',
        name: 'complaint',
        component: resolve => require(['@/views/msg/complaint/index'], resolve),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/notice/:id',
        name: 'notice',
        component: resolve => require(['@/views/msg/notice/index'], resolve),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/news',
        name: 'news',
        component: resolve => require(['@/views/msg/news/index'], resolve),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/home',  //首页
        name: 'home',
        component: resolve => require(['@/views/home/index'], resolve),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/dataCenter', //数据中心
        name: 'dataCenter',
        component: resolve => require(['@/views/dataCenter/index'], resolve),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/share',  //分享
        name: 'share',
        component: resolve => require(['@/views/share/index'], resolve),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/message', //消息中心
        name: 'message',
        component: resolve => require(['@/views/message/index'], resolve),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/mine',  //个人中心
        name: 'mine',
        component: resolve => require(['@/views/mine/index'], resolve),
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/mall', //在线领取列表
        name: 'mall',
        component: resolve => require(['@/views/mall/mall_list'], resolve),

    },
    {
        path: '/mall/mall_detail/:id', //在线领取详情
        name: 'mallDetail',
        component: resolve => require(['@/views/mall/mall_detail'], resolve),
    },
    {
        path: '/mall/mall_pay/:id', //确认支付
        name: 'mallPay',
        component: resolve => require(['@/views/mall/mall_pay'], resolve),
    },
    {
        path: '/mall/mall_address', //收货地址列表
        name: 'mallAddress',
        component: resolve => require(['@/views/mall/mall_address'], resolve),
    },
    {
        path: '/mall/mall_addAddress/:id', //添加收货地址
        name: 'mallAddAddress',
        component: resolve => require(['@/views/mall/mall_addAddress'], resolve),
    },
    {
        path: '/myOrder', //我的订单
        name: 'myOrder',
        component: resolve => require(['@/views/myOrder/myOrder'], resolve),
    },
    {
        path: '/bindingMplements', //绑定机具
        name: 'bindingMplements',
        component: resolve => require(['@/views/binding-mplements/index'], resolve),
    },
    {
        path: '/myTerminal',
        name: 'myTerminal',
        component: resolve => require(['@/views/my-terminal/index'], resolve),
    },
    {
        path: '/invitationRecord',
        name: 'invitationRecord',
        component: resolve => require(['@/views/invitation-record/index'], resolve),
    },
    {
        path: '/invitationRecordDetailed/:id',
        name: 'invitationRecordDetailed',
        component: resolve => require(['@/views/invitation-record/invitation-record-detailed/index'], resolve),
    },
    {
        path: '/deliverGoods',
        name: 'deliverGoods',
        component: resolve => require(['@/views/deliver-goods/index'], resolve),
    },
    {
        path: '/myOrderDetail/:id', //我的订单详情
        name: 'myOrderDetail',
        component: resolve => require(['@/views/myOrder/myOrderDetail'], resolve),
    },
    {
        path: '/financialDetails', //资金明细
        name: 'financialDetails',
        component: resolve => require(['@/views/financialDetails/financialDetails'], resolve),
    },
    {
        path: '/withdrawal', //提现
        name: 'withdrawal',
        component: resolve => require(['@/views/withdrawal/withdrawal'], resolve),
    },
    {
        path: '/withdrawalRecord', //提现记录
        name: 'withdrawalRecord',
        component: resolve => require(['@/views/withdrawal/withdrawalRecord'], resolve),
    },
    {
        path: '/clickDeliverGoods/:proid/:id', //我的订单详情
        name: 'clickDeliverGoods',
        component: resolve => require(['@/views/deliver-goods/click-deliver-goods/index'], resolve),
    },
    {
        path: '/express', //我的订单详情
        name: 'express',
        component: resolve => require(['@/views/deliver-goods/express/index'], resolve),
    },
    {
        path: '/msg-details/:id', //我的订单详情
        name: 'msgDetails',
        component: resolve => require(['@/views/msg/details/index'], resolve),
    },
    {
        path: '/settings',  //设置中心
        name: 'settings',
        component: resolve => require(['@/views/settings/index'], resolve),
    },
    {
        path: '/tradingReward', //交易奖励
        name: 'tradingReward',
        component: resolve => require(['@/views/tradingReward/index'], resolve),
    },
    {
        path: '/freezeprogress', //待解冻
        name: 'freezeprogress',
        component: resolve => require(['@/views/freezeprogress/index'], resolve),
    },
    {
        path: '/myMerchants', //我的团队
        name: 'myMerchants',
        component: resolve => require(['@/views/myMerchants/index'], resolve),
    },
    {
        path: '/myMerchantsTwo', //我的团队
        name: 'myMerchantsTwo',
        component: resolve => require(['@/views/myMerchants/two/index'], resolve),
    },
    {
        path: '/myMerchantsThree', //我的团队
        name: 'myMerchantsThree',
        component: resolve => require(['@/views/myMerchants/three/index'], resolve),
    },
    {
        path: '/about', //关于我们
        name: 'about',
        component: resolve => require(['@/views/about/index'], resolve),
    },
    {
        path: '/changePhoneNumber', //更换手机号
        name: 'changePhoneNumber',
        component: resolve => require(['@/views/changePhoneNumber/index'], resolve),
    },
    {
        path: '/changePhoneResult', //更换手机号结果
        name: 'changePhoneResult',
        component: resolve => require(['@/views/changePhoneNumber/changePhoneResult'], resolve),
    },
    {
        path: '/changeCard', //更换结算卡
        name: 'changeCard',
        component: resolve => require(['@/views/changeCard/index'], resolve),
    },
    {
        path: '/changePassword', //修改密码
        name: 'changePassword',
        component: resolve => require(['@/views/changePassword/index'], resolve),
    },
    {
        path: '/feedback', //意见反馈
        name: 'feedback',
        component: resolve => require(['@/views/feedback/index'], resolve),
    },
    {
        path: '/certification', //实名认证--个人信息认证
        name: 'certification',
        component: resolve => require(['@/views/certification/index'], resolve),
    },
    {
        path: '/certificationNext', //实名认证--银行卡认证
        name: 'certificationNext',
        component: resolve => require(['@/views/certification/certificationNext'], resolve),
    },
    {
        path: '/organizationChart', //组织架构
        name: 'organizationChart',
        component: resolve => require(['@/views/organizationChart/index'], resolve),
    },
    {
        path: '/certificationComplete', //完成实名认证页面
        name: 'certificationComplete',
        component: resolve => require(['@/views/certification/certificationComplete'], resolve),
    },
    {
        path: '/affiliateTransactions', //下属交易
        name: 'affiliateTransactions',
        component: resolve => require(['@/views/affiliateTransactions'], resolve),
    },
    {
        path: '/helpCenter', //帮助中心
        name: 'helpCenter',
        component: resolve => require(['@/views/helpCenter'], resolve),
    },
    {
        path: '/helpDetail/:id', //帮助中心详情
        name: 'helpDetail',
        component: resolve => require(['@/views/helpCenter/helpDetail'], resolve),
    },
    {
        path: '/ApplyAgent', //申请代理
        name: 'ApplyAgent',
        component: resolve => require(['@/views/ApplyAgent/index'], resolve),
    },
    {
        path: '/organization', //组织架构
        name: 'organization',
        component: resolve => require(['@/views/organizationChart/organization'], resolve),
    },
    {
        path: '/evaluation/:id', //用户评价
        name: 'evaluation',
        component: resolve => require(['@/views/evaluation'], resolve),
    },
    {
        path: '/bindSuccess', //机具绑定成功
        name: 'bindSuccess',
        component: resolve => require(['@/views/binding-mplements/bindSuccess'], resolve),
    },
    {
        path: '/forgetPassword', //忘记密码
        name: 'forgetPassword',
        component: resolve => require(['@/views/forgetPassword'], resolve),
    },
    {
        path: '/forgetPasswordNext', //忘记密码第二部
        name: 'forgetPasswordNext',
        component: resolve => require(['@/views/forgetPassword/forgetPasswordNext'], resolve),
    }, {
        path: '/agentData', //代理商数据统计
        name: 'agentData',
        component: resolve => require(['@/views/agentData'], resolve),
    },
    {
        path: '/application-agent',
        name: 'application-agent',
        component: resolve => require(['@/views/application-agent'], resolve),
    },
    {
        path: '/dial-code',
        name: 'dial-code',
        component: resolve => require(['@/views/dial-code/index/index'], resolve),
    },
    {
        path: '/dial-code-subordinate/:terminalNoId/:id',
        name: 'dial-code-subordinate',
        component: resolve => require(['@/views/dial-code/subordinate'], resolve),
    },
    {
        path: '/application-agent-To-examine',
        name: 'application-agent-To-examine',
        component: resolve => require(['@/views/application-agent-To-examine'], resolve),
    },
    {
        // path: '/dial-code-list/:id',
        path: '/dial-code-list',
        name: 'dial-code-list',
        component: resolve => require(['@/views/dial-code/list'], resolve),
    },
    {
        // path: '/dial-code-list/:id',
        path: '/callback-list',
        name: 'callback-list',
        component: resolve => require(['@/views/dial-code/callback-list'], resolve),
    },
    {
        path: '/modifyInfo', //修改个人信息
        name: 'modifyInfo',
        component: resolve => require(['@/views/modifyInfo'], resolve),
    },
    {
        path: '/merchantsExpand', //商户拓展
        name: 'expand',
        component: resolve => require(['@/views/merchantsExpand'], resolve),
    },
    {
        path: '/modifyInfo', //修改个人信息
        name: 'modifyInfo',
        component: resolve => require(['@/views/modifyInfo'], resolve),
    },
    {
        path: '/accountNumber-cancellation', //账号注销
        name: 'accountNumber-cancellation',
        component: resolve => require(['@/views/accountNumber-cancellation'], resolve),
    },
    {
        path: '/rank', //账号注销
        name: 'rank',
        component: resolve => require(['@/views/rank'], resolve),
    },
    {
        path: '/serverMoneyRechargeOwn', //个人服务费
        name: 'serverMoneyRechargeOwn',
        component: resolve => require(['@/views/serverMoneyRecharge/own/index'], resolve),
    },
    {
        path: '/serverMoneyRechargeOwnRecharge',
        name: 'serverMoneyRechargeOwnRecharge',
        component: resolve => require(['@/views/serverMoneyRecharge/own/recharge'], resolve),
    },
    {
        path: '/serverMoneyRechargeOwnList',
        name: 'serverMoneyRechargeOwnList',
        component: resolve => require(['@/views/serverMoneyRecharge/own/list'], resolve),
    },
    {
        path: '/serverMoneyRechargeCompany', //公司服务费
        name: 'serverMoneyRechargeCompany',
        component: resolve => require(['@/views/serverMoneyRecharge/company'], resolve),
    },
    {
        path: '/online-ordering', //在线订货
        name: 'online-ordering',
        component: resolve => require(['@/views/online-ordering/index'], resolve),
    },
    {
        path: '/online-ordering-address', //在线订货地址
        name: 'online-ordering-address',
        component: resolve => require(['@/views/online-ordering/address'], resolve),
    },
    {
        path: '/online-ordering-detail/:id', //在线订货详细
        // path: "/online-ordering-detail",
        name: 'online-ordering-detail',
        component: resolve => require(['@/views/online-ordering/detail'], resolve),
    },
    {
        //path: '/online-ordering-confirm/:id', //在线订货详细
        path: "/online-ordering-confirm/:id",
        name: 'online-ordering-confirm',
        component: resolve => require(['@/views/online-ordering/confirm'], resolve),
    },
    {
        //path: '/online-ordering-confirm/:id', //在线订货详细
        path: "/bookOrderList",
        name: 'bookOrderList',
        component: resolve => require(['@/views/bookOrderList'], resolve),
    },
    {
        path: "/smsVerification/:state",
        name: 'smsVerification',
        component: resolve => require(['@/views/smsVerification'], resolve),
    },
    {
        path: "/puponVerify",  //安全验证弹窗
        name: 'puponVerify',
        component: resolve => require(['@/views/puponVerify'], resolve),
    },
    {
        path: "/myBusiness",  //我的商户
        name: 'myBusiness',
        component: resolve => require(['@/views/myBusiness'], resolve),
    },
    {
        path: "/adDetail", //广告位详情
        name: 'adDetail',
        component: resolve => require(['@/views/adDetail'], resolve),
    },
    {
        path: "/myBill", //我的账单
        name: 'myBill',
        component: resolve => require(['@/views/myBill'], resolve),
    },
    {
        path: "/setPwd",  //设置提现密码
        name: 'setPwd',
        component: resolve => require(['@/views/set-pwd'], resolve),
    },
    {
        path: "/agreement/:state",  // 协议
        name: 'agreement',
        component: resolve => require(['@/views/agreement'], resolve),
    },
    {
        path: "/etc",  // 协议
        name: 'etc',
        component: resolve => require(['@/views/etc'], resolve),
    },
    {
        path: "/advertisement",  // 广告
        name: 'advertisement',
        component: resolve => require(['@/views/advertisement'], resolve),
    },
    {
        path: "/test",  // 广告
        name: 'test',
        component: resolve => require(['@/views/test'], resolve),
    },
    {
      path: "/merchantsTrade", // 商户交易记录
      name: 'merchantsTrade',
      component: resolve => require(['@/views/merchantsTrade'], resolve),
    },
    {
        path: "/newHelpCenter", // 新版帮助中心分类列表
        name: 'newHelpCenter',
          component: resolve => require(['@/views/newHelpCenter'], resolve),
    },
    {
      path: "/newHelpList/:id", // 新版帮助中心列表
        name: 'newHelpList',
        component: resolve => require(['@/views/newHelpCenter/newHelpList'], resolve),
    },
    {
        path: "/newHelpDetail/id", // 新版帮助中心详情
        name: 'newHelpDetail',
        component: resolve => require(['@/views/newHelpCenter/newHelpDetail'], resolve),
    },
    {
        path: "/newHelpCenter/guideView", // 新版帮助中心详情
        name: 'newHelpCenterGuideView',
        component: resolve => require(['@/views/newHelpCenter/guideView'], resolve),
    },
    {
        path: "/team-profit", // 团队收益
        name: 'teamProfit',
        component: resolve => require(['@/views/team-profit'], resolve),
    },
    {
        path: "/team-profit-list", // 团队收益列表
        name: 'teamProfitList',
        component: resolve => require(['@/views/team-profit/list'], resolve),
    },
    //预约订货开始
    {
        path: "/book/list", // 预约订货产品列表
        name: 'bookList',
        component: resolve => require(['@/views/book/list'], resolve),
    },
    {
        path: "/book/detail/:id", // 预约订货产品详情
        name: 'bookdetail',
        component: resolve => require(['@/views/book/detail'], resolve),
    }
    ]
})
