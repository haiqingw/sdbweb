import router from './router'
import store from './store'
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  let islogin = store.state.user.islogin
  if (islogin) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect = $ {to.path}`) // 否则全部重定向到登录页
    }
  }
})