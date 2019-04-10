import request from '../utils/request';
import qs from 'qs';


export function checkcerApi(data) { //判断是否实名认证
  return request({
    url: process.env.BASE_API,
    method: 'post',
    data: qs.stringify(data)
  })
}

export function checkbankcardApi(data) { //判断是否绑定银行卡
  return request({
    url: process.env.BASE_API,
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getInfo (data) {
  return request({
    url: process.env.BASE_API,
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getAbout(data) {
  return request({
    url: process.env.BASE_API,
    method: 'post',
    data: qs.stringify(data)
  })
}