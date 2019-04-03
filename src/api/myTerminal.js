



import request from '../utils/request';
import qs from 'qs'


export function getChoiceProduct (data) { 
    return request({
        url: process.env.BASE_API,
        method: 'post',
        data: qs.stringify(data)
    })
}


export function getChoiceBatch (data) {
    return request({
        url: process.env.BASE_API,
        method: 'post',
        data: qs.stringify(data)
    })
}

export function getTerminalList (data) {
    return request({
        url: process.env.BASE_API,
        method: 'post',
        data: qs.stringify(data)
    })
}