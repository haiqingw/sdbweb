import router from './router'
import store from './store'
const whiteList = ['/login', '/forgetPassword', '/forgetPasswordNext', '/loginoid','/accountNumber-cancellation','/rank']
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

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
