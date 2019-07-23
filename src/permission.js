import router from './router'
import store from './store'
const whiteList = ['/login', '/forgetPassword', '/forgetPasswordNext', '/loginoid', '/online-ordering', '/online-ordering-address', '/online-ordering-detail', '/online-ordering-confirm']
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样
router.beforeEach((to, from, next) => {
    NProgress.start()
    let islogin = store.state.user.islogin
    if (islogin) {
        if (to.path === '/loginoid') {
            next({
                path: '/'
            })
            NProgress.done() 
        } else {
            next()
            NProgress.done() 
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/loginoid`)
            NProgress.done() 
        }
    }
    next()
})
router.afterEach(() => { 
    NProgress.done() // 结束Progress
})
