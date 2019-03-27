



import request from '../utils/request';
import qs from 'qs'

export function messagemanage(data) {
    return request({
      url: process.env.BASE_API,
      method: 'post',
      data: qs.stringify(data)
    })
}

export function msgList(data) { 
  return request({
    url: process.env.BASE_API,
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getMsgDetails(data) { 
  return request({
    url: process.env.BASE_API,
    method: 'post',
    data: qs.stringify(data)
  })
}
