

import {getServer} from '@/api/index'

const msg = {
    state: {
        msgNum: window.sessionStorage.getItem('msgNum'),
    },
    mutations: {
        SET_MSGNUM: (state, num) => {
            state.msgNum = num
            window.sessionStorage.setItem('msgNum', num)
        },
    },
    actions: {
        getMsgNum({commit}, data) {
            return new Promise( (resolve, reject) => {
                getServer(data).then( res => {
                    if( res.data.responseStatus === 1 ) {
                        commit('SET_MSGNUM', res.data.data) 
                        resolve()
                    }
                }); 
            })
        },
    }
}

export default msg