import request from '../utils/request';
import qs from 'qs'


export function modifyPassword(data) {  //修改密码
  return request({
    url: process.env.BASE_API,
    method: 'post',
    data: qs.stringify(data)
  })
}

export function servicePhone(data) { //意见反馈-客服电话
  return request({
    url: process.env.BASE_API,
    method: 'post',
    data: qs.stringify(data)
  })
}

export function feedbackFn(data) { //意见反馈
  return request({
    url: process.env.BASE_API,
    method: 'post',
    data: qs.stringify(data)
  })
}