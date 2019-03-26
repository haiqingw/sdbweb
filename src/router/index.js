import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => 
        import('@/views/index/index'),
      meta: {
        requireAuth: true
      }
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
      path: '/notice',
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
      path: '/mall',  //在线领取列表
      name: 'mall',
      component: () => 
        import('@/views/mall/mall_list')
    },
    {
      path: '/mall/mall_detail',  //在线领取详情
      name: 'mallDetail',
      component: () =>
        import('@/views/mall/mall_detail')
    },
    {
      path: '/mall/mall_pay', //确认支付
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
      path: '/mall/mall_addAddress', //添加收货地址
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
      path: '/bindingMplements',  //绑定机具
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
      path: '/invitationRecordDetailed',
      name: 'invitationRecordDetailed',
      component: () =>
        import('@/views/invitation-record-detailed/index')
    },
    {
      path: '/deliverGoods',
      name: 'deliverGoods',
      component: () =>
        import('@/views/deliver-goods/index')
    }, 
    {
      path: '/myOrderDetail', //我的订单详情
      name: 'myOrderDetail',
      component: () =>
        import('@/views/myOrder/myOrderDetail')
    },
    {
      path: '/mine', //个人中心
      name: 'mine',
      component: () =>
        import('@/views/mine/mine')
    },
    {
      path: '/dataCenter', //数据中心
      name: 'dataCenter',
      component: () =>
        import('@/views/dataCenter/dataCenter')
    }

  ]
})
