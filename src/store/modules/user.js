


import {getServer} from '@/api/index'
import { resolve } from 'url';
import response from '@/assets/js/response.js'
import { Indicator, Toast } from 'mint-ui';

const user = {
    state: {
        uid: window.sessionStorage.getItem('uid'),
        pid: window.sessionStorage.getItem('pid'),
        uname: window.sessionStorage.getItem('uname'),
        uphone: window.sessionStorage.getItem('uphone'),
        islogin: window.sessionStorage.getItem('islogin')
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
        }
    },
    actions: {
        Login({commit}, userInfo) {
            Indicator.open()
            window.sessionStorage.clear()
            const queryData = {
                requestType: 'personal', 
                requestKeywords: 'login', 
                account: userInfo.phone, 
                password: userInfo.password
            }
            return new Promise( (resolve, reject) => {
                getServer(queryData).then( res => {
                    // console.log(response[res.data.responseStatus])
                    const data = res.data
                    if(data.responseStatus === 1) {
                        Indicator.close();
                        Toast('登录成功')
                        commit('SET_UID', data.userID)
                        commit('SET_PID', data.platformID)
                        commit('SET_UNAME', data.userName)
                        commit('SET_UPHONE', data.userPhone)
                        commit('SET_ISLOGIN', true)
                        resolve()
                    } else if(data.responseStatus === 200) {
                        Indicator.close()
                        reject(res)
                        Toast(response[res.data.responseStatus])
                    }
                }).catch( err => {
                    reject(err)
                    Toast(response[res.data.responseStatus])
                })
            })
        },
        LogOut({commit}) {
            return new Promise( resolve => {
                window.sessionStorage.clear()
                resolve()
            })
        }
    }
}


export default user