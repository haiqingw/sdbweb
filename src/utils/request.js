import axios from 'axios'

// create an axios instance
const service = axios.create({
  //baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 60000, // request timeout
})



// response interceptor
// service.interceptors.response.use(
//   response => response,
//   error => {
//     console.log('err' + error) // for debug
//     // Message({
//     //   message: error.message,
//     //   type: 'error',
//     //   duration: 5 * 1000
//     // })
//     return Promise.reject(error)
//   }
// )
service.interceptors.response.use(
    response =>  response,
    // {
       
    //     alert(window.sessionStorage.getItem('opid'))
    //     const res = response.data
    //     if (res.code !== 200) {
    //         if(res.code === 301) {
    //             MessageBox.confirm(
    //                 '你已被登出，可以取消继续留在该页面，或者重新登录',
    //                 '确定登出', {
    //                     confirmButtonText: '重新登录',
    //                     cancelButtonText: '取消',
    //                     type: 'warning'
    //                 }
    //             ).then(() => {
    //                 store.dispatch('FedLogOut').then(() => {
    //                     location.reload() // 为了重新实例化vue-router对象 避免bug
    //                 })
    //             })
    //         }
    //         return Promise.reject('error')
    //     } else {
    //         return response.data
    //     }
    // },
    error => {
        return Promise.reject(error)
    }
)

export default service