


import { getServer } from '@/api/index'
import { resolve } from 'url';
import response from '@/assets/js/response.js'
import { Indicator, Toast, MessageBox } from 'mint-ui';

const user = {
    state: {
        uid: window.sessionStorage.getItem('uid'),
        pid: window.sessionStorage.getItem('pid'),
        uname: window.sessionStorage.getItem('uname'),
        uphone: window.sessionStorage.getItem('uphone'),
        islogin: window.sessionStorage.getItem('islogin'),
        plat: window.sessionStorage.getItem('plat'),
        opid: window.sessionStorage.getItem('opid')
    },
    mutations: {
        SET_UID: (state, uid) => {
            state.uid = uid
            window.sessionStorage.setItem('uid', uid)
        },
        SET_PID: (state, pid) => {
            state.pid = pid
            window.sessionStorage.setItem('pid', pid)
        },
        SET_UNAME: (state, uname) => {
            state.uname = uname
            window.sessionStorage.setItem('uname', uname)
        },
        SET_UPHONE: (state, uphone) => {
            state.uphone = uphone
            window.sessionStorage.setItem('uphone', uphone)
        },
        SET_ISLOGIN: (state, islogin) => {
            state.islogin = islogin
            window.sessionStorage.setItem('islogin', islogin)
        },
        SET_PLAT: (state, plat) => {
            state.plat = plat
            window.sessionStorage.setItem('plat', plat)
        },
        SET_OPID: (state, opid) => {
            state.opid = opid
            window.sessionStorage.setItem('opid', opid)
        }
    },
    actions: {
        Login({ commit }, userInfo) {
            Indicator.open()
            window.sessionStorage.clear()
            const queryData = {
                // requestType: 'personal', 
                // requestKeywords: 'login', 
                // account: userInfo.phone, 
                // password: userInfo.password
                requestType: 'buslogin',
                requestKeywords: 'buslogins',
                account: userInfo.phone,
                password: userInfo.password,
                plat: userInfo.plat
            }
            commit('SET_PLAT', userInfo.plat)
            // commit('SET_PLAT', 187)
            return new Promise((resolve, reject) => {
                getServer(queryData).then(res => {
                    // console.log(res)
                    // console.log(response[res.data.responseStatus])
                    const data = res.data
                    if (data.responseStatus === 1) {
                        Indicator.close();
                        // Toast('登录成功')
                        commit('SET_UID', data.userID)
                        commit('SET_PID', data.platformID)
                        commit('SET_UNAME', data.userName)
                        commit('SET_UPHONE', data.userPhone)
                        commit('SET_ISLOGIN', true)
                        resolve()
                    } else if (data.responseStatus === 200) {
                        Indicator.close()
                        reject(res)
                        Toast(response[res.data.responseStatus])
                    } else {
                        Indicator.close()
                        reject(res)
                        Toast(response[res.data.responseStatus])
                    }
                }).catch(err => {
                    reject(err)
                    Toast(response[res.data.responseStatus])
                })
            })
        },
        autoLogin({ commit }, autoLoginData) {
            Indicator.open()
            window.sessionStorage.clear()
            const crodeUser = {
                requestType: 'buslogin',
                requestKeywords: 'crodeuser',
                openid: autoLoginData.code
            }
            commit('SET_PLAT', autoLoginData.plat)
            return new Promise((resolve, reject) => {
                getServer(crodeUser).then(res => {
                    Indicator.close();
                    if (res.data.responseStatus === 1) {
                        Indicator.close();
                        Toast('登录成功')
                        commit('SET_UID', res.data.userID)
                        commit('SET_PID', res.data.platformID)
                        commit('SET_UNAME', res.data.userName)
                        commit('SET_UPHONE', res.data.userPhone)
                        commit('SET_ISLOGIN', true)
                        resolve()
                    } else if (res.data.responseStatus === 201) {
                        Indicator.close()
                        reject(res)
                    }
                })
                    .catch(err => {
                        reject(err)
                        Toast(response[res.data.responseStatus])
                    })
            })
        },
        LogOut({ commit }, data) {
            return new Promise((resolve, reject) => {
                getServer(data).then(res => {
                    if (res.data.responseStatus === 1) {
                        // window.sessionStorage.clear()
                        // alert(123)
                        window.localStorage.removeItem('uid');
                        window.localStorage.removeItem('pid');
                        window.localStorage.removeItem('uname');
                        window.localStorage.removeItem('uphone');
                        commit('SET_ISLOGIN', false)
                        resolve()
                    }
                });
            })
        },
        SetOpid({ commit }, opid) {
            commit('SET_OPID', opid)
            return new Promise((resolve, reject) => {
                resolve()
            })
        },
        Cancellation({ commit }, data) {
            return new Promise((resolve, reject) => {
                getServer(data).then(res => {
                    if (res.data.responseStatus === 1) {
                        Toast('账号注销成功')
                        window.localStorage.removeItem('pid');
                        window.localStorage.removeItem('uname');
                        window.localStorage.removeItem('uphone');
                        commit('SET_ISLOGIN', false)
                        resolve()
                    } else {
                        Toast(response[res.data.responseStatus])
                    }
                })

            })
        }
    }
}


export default user