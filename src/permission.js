import router from './router'
import store from './store'
const whiteList = ['/login', '/forgetPassword', '/forgetPasswordNext', '/loginoid', '/dataCenter','/settings']
router.beforeEach((to, from, next) => {
    let islogin = store.state.user.islogin
    if (islogin) {
        if (to.path === '/loginoid') {
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
            next(`/loginoid`) // 否则全部重定向到登录页
        }
    }
})