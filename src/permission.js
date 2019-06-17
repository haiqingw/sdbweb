import router from './router'
import store from './store'
<<<<<<< HEAD
const whiteList = ['/login', '/forgetPassword', '/forgetPasswordNext', '/loginoid', '/dataCenter', '/settings', '/modifyInfo', '/home','/mine','/rank']
=======
const whiteList = ['/login', '/forgetPassword', '/forgetPasswordNext', '/loginoid','/accountNumber-cancellation']
>>>>>>> 462e8d149b1fbbd1d50afc54e7ed37dff92249fd
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