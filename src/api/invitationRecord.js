




import request from '../utils/request';
import qs from 'qs'


export function getInvitationRecordList (data) { 
    return request({
        url: process.env.BASE_API,
        method: 'post',
        data: qs.stringify(data)
    })
}

export function getInvitationRecordListTop (data) {
    return request({
        url: process.env.BASE_API,
        method: 'post',
        data: qs.stringify(data)
    })
}

export function getListDetails (data) {
    return request({
        url: process.env.BASE_API,
        method: 'post',
        data: qs.stringify(data)
    })
}