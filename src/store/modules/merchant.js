import {getServer} from '@/api/index'
import { resolve } from 'url';
import response from '@/assets/js/response.js'
import { Indicator, Toast } from 'mint-ui';

const merchant = {
    state: {
        title: ''
    },
    mutations: {
        SET_TITLE: (state, title) => {
            state.title = title
            window.sessionStorage.setItem('title', title)
        }
    },
    actions: {
        merchantInfo({commit}, plat) {
            // alert(plat)
            Indicator.open()
            window.sessionStorage.clear()
            const queryData = {
                requestType: 'buslogin',
                requestKeywords: 'getplatinfo',
                plat: plat
            }
            return new Promise( (resolve, reject) => {
                getServer(queryData).then( res => {
                    // console.log(res)
                    // console.log(response[res.data.responseStatus])
                    if(res.data.responseStatus === 1) {
                        Indicator.close();
                        commit('SET_TITLE', res.data.data.title)
                    } else if(res.data.responseStatus === 200) {
                        Indicator.close()
                        reject(res)
                        Toast(response[res.data.responseStatus])
                    } else {
                        Indicator.close()
                        reject(res)
                        Toast(response[res.data.responseStatus])
                    }
                }).catch( err => {
                    reject(err)
                    Toast(response[res.data.responseStatus])
                })
            })
        }
    }
}

export default merchant