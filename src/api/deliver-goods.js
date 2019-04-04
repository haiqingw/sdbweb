


import requerst from '../utils/request'
import qs from 'qs'

export function getDeliverGoodsList (data) {
    return requerst({
        url: process.env.BASE_API,
        method: 'post',
        data: qs.stringify(data)
    })
}