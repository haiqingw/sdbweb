


import request from '../utils/request';
import qs from 'qs'

export function getMallBanner(data) {
    return request({
      url: process.env.BASE_API,
      method: 'post',
      data: qs.stringify(data)
    })
}

export function getPopularProduct(data) {
    return request({
        url: process.env.BASE_API,
        method: 'post',
        data: qs.stringify(data)
    })
}

export function getProductIndexList(data) {
    return request({
        url: process.env.BASE_API,
        method: 'post',
        data: qs.stringify(data)
    })
}

export function getMall_detailBanner(data) {
    return request({
        url: process.env.BASE_API,
        method: 'post',
        data: qs.stringify(data)
    })
}

export function getMall_payOrder (data) {
    return request({
        url: process.env.BASE_API,
        method: 'post',
        data: qs.stringify(data)
    })
}

export function getMall_payListDetail (data) {
    return request({
        url: process.env.BASE_API,
        method: 'post',
        data: qs.stringify(data)
    })
}


export function getAddressList(data) {
    return request({
        url: process.env.BASE_API,
        method: 'post',
        data: qs.stringify(data)
    })
}

export function getAddAddress(data) {
    return request({
        url: process.env.BASE_API,
        method: 'post',
        data: qs.stringify(data)
    })
}

export function getDeleteAddress(data) {
    return request({
        url: process.env.BASE_API,
        method: 'post',
        data: qs.stringify(data)
    })
}

export function getSetDefault(data) {
    return request({
        url: process.env.BASE_API,
        method: 'post',
        data: qs.stringify(data)
    })
}

export function getEditInfo (data) {
    return request({
        url: process.env.BASE_API,
        method: 'post',
        data: qs.stringify(data)
    })
}

export function getEditAddress (data) {
    return request({
        url: process.env.BASE_API,
        method: 'post',
        data: qs.stringify(data)
    })
}