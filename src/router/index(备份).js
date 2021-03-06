import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [{
      path: '/',
      name: 'index/:money',
      component: () =>
        import('@/views/home/index'),
      meta: {
        requireAuth: true
      },
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import('@/views/login/index'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/complaint',
      name: 'complaint',
      component: () =>
        import('@/views/msg/complaint/index'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/notice/:id',
      name: 'notice',
      component: () =>
        import('@/views/msg/notice/index'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/news',
      name: 'news',
      component: () =>
        import('@/views/msg/news/index'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/home',  //首页
      name: 'home',
      component: () =>
        import('@/views/home/index'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/dataCenter', //数据中心
      name: 'dataCenter',
      component: () =>
        import('@/views/dataCenter/index'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/share',  //分享
      name: 'share',
      component: () =>
        import('@/views/share/index'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/message', //消息中心
      name: 'message',
      component: () =>
        import('@/views/message/index'),
      meta: {
        requireAuth: true
      }
    }, 
    {
      path: '/mine',  //个人中心
      name: 'mine',
      component: () =>
        import('@/views/mine/index'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/mall', //在线领取列表
      name: 'mall',
      component: () =>
        import('@/views/mall/mall_list')
    },
    {
      path: '/mall/mall_detail/:id', //在线领取详情
      name: 'mallDetail',
      component: () =>
        import('@/views/mall/mall_detail')
    },
    {
      path: '/mall/mall_pay/:id', //确认支付
      name: 'mallPay',
      component: () =>
        import('@/views/mall/mall_pay')
    },
    {
      path: '/mall/mall_address', //收货地址列表
      name: 'mallAddress',
      component: () =>
        import('@/views/mall/mall_address')
    },
    {
      path: '/mall/mall_addAddress/:id', //添加收货地址
      name: 'mallAddAddress',
      component: () =>
        import('@/views/mall/mall_addAddress')
    },
    {
      path: '/myOrder', //我的订单
      name: 'myOrder',
      component: () =>
        import('@/views/myOrder/myOrder')
    },
    {
      path: '/bindingMplements', //绑定机具
      name: 'bindingMplements',
      component: () =>
        import('@/views/binding-mplements/index')
    },
    {
      path: '/myTerminal',
      name: 'myTerminal',
      component: () =>
        import('@/views/my-terminal/index')
    },
    {
      path: '/invitationRecord',
      name: 'invitationRecord',
      component: () =>
        import('@/views/invitation-record/index')
    },
    {
      path: '/invitationRecordDetailed/:id',
      name: 'invitationRecordDetailed',
      component: () =>
        import('@/views/invitation-record/invitation-record-detailed/index')
    },
    {
      path: '/deliverGoods',
      name: 'deliverGoods',
      component: () =>
        import('@/views/deliver-goods/index')
    },
    {
      path: '/myOrderDetail/:id', //我的订单详情
      name: 'myOrderDetail',
      component: () =>
        import('@/views/myOrder/myOrderDetail')
    },
    {
      path: '/financialDetails', //资金明细
      name: 'financialDetails',
      component: () =>
        import('@/views/financialDetails/financialDetails')
    },
    {
      path: '/withdrawal', //提现
      name: 'withdrawal',
      component: () =>
        import('@/views/withdrawal/withdrawal')
    }, 
    {
      path: '/withdrawalRecord', //提现记录
      name: 'withdrawalRecord',
      component: () =>
        import('@/views/withdrawal/withdrawalRecord')
    },
    { 
      path: '/clickDeliverGoods/:id', //我的订单详情
      name: 'clickDeliverGoods',
      component: () =>
        import('@/views/deliver-goods/click-deliver-goods/index')
    },
    {
      path: '/express', //我的订单详情
      name: 'express',
      component: () =>
        import('@/views/deliver-goods/express/index')
    },
    {
      path: '/msg-details/:id', //我的订单详情
      name: 'msgDetails',
      component: () =>
        import('@/views/msg/details/index')
    },
    {
      path: '/settings',  //设置中心
      name: 'settings',
      component: () =>
        import('@/views/settings/index')
    },
    {
      path: '/freezeprogress', //待解冻
      name: 'freezeprogress',
      component: () =>
        import('@/views/freezeprogress/index')
    }, 
    {
      path: '/myMerchants', //我的团队
      name: 'myMerchants',
      component: () =>
        import('@/views/myMerchants/index')
    }, 
    {
      path: '/about', //关于我们
      name: 'about',
      component: () =>
        import('@/views/about/index')
    }, 
    {
      path: '/changePhoneNumber', //更换手机号
      name: 'changePhoneNumber',
      component: () =>
        import('@/views/changePhoneNumber/index')
    },
     {
      path: '/changePhoneResult', //更换手机号结果
      name: 'changePhoneResult',
      component: () =>
        import('@/views/changePhoneNumber/changePhoneResult')
    }, 
    {
      path: '/changeCard', //更换结算卡
      name: 'changeCard',
      component: () =>
        import('@/views/changeCard/index')
    }, 
    {
      path: '/changePassword', //修改密码
      name: 'changePassword',
      component: () =>
        import('@/views/changePassword/index')
    }, 
    {
      path: '/feedback', //意见反馈
      name: 'feedback',
      component: () =>
        import('@/views/feedback/index')
    },
    {
      path: '/certification', //实名认证--个人信息认证
      name: 'certification',
      component: () =>
        import('@/views/certification/index')
    }, 
    {
      path: '/certificationNext', //实名认证--银行卡认证
      name: 'certificationNext',
      component: () =>
        import('@/views/certification/certificationNext')
    },
    {
      path: '/organizationChart', //组织架构
      name: 'organizationChart',
      component: () =>
        import('@/views/organizationChart/index')
    },
    {
      path: '/certificationComplete', //完成实名认证页面
      name: 'certificationComplete',
      component: () =>
        import('@/views/certification/certificationComplete')
    },
    {
      path: '/affiliateTransactions', //下属交易
      name: 'affiliateTransactions',
      component: () =>
        import('@/views/affiliateTransactions')
    },
    {
      path: '/helpCenter', //帮助中心
      name: 'helpCenter',
      component: () =>
        import('@/views/helpCenter')
    },
    {
      path: '/helpDetail/:id', //帮助中心详情
      name: 'helpDetail',
      component: () =>
        import('@/views/helpCenter/helpDetail')
    },
    {
      path: '/ApplyAgent', //申请代理
      name: 'ApplyAgent',
      component: () =>
        import('@/views/ApplyAgent/index')
    }, 
    {
      path: '/organization', //组织架构
      name: 'organization',
      component: () =>
        import('@/views/organizationChart/organization')
    }, 
    {
      path: '/evaluation/:id', //用户评价
      name: 'evaluation',
      component: () =>
        import('@/views/evaluation')
    },
    {
      path: '/bindSuccess', //机具绑定成功
      name: 'bindSuccess',
      component: () =>
        import('@/views/binding-mplements/bindSuccess')
    }
  ]
})
