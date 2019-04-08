import request from '../utils/request';
import qs from 'qs'


export function isCerApi(data) { //判断是否实名认证
  return request({
    url: process.env.BASE_API,
    method: 'post',
    data: qs.stringify(data)
  })
}

export function personInfoCerApi(data) { //个人信息认证
  return request({
    url: process.env.BASE_API,
    method: 'post',
    data: qs.stringify(data)
  })
}

export function isBindBankCardApi(data) { //判断是否绑卡
  return request({
    url: process.env.BASE_API,
    method: 'post',
    data: qs.stringify(data)
  })
}

export function realNameApi(data) { //获取真实姓名
  return request({
    url: process.env.BASE_API,
    method: 'post',
    data: qs.stringify(data)
  })
}


export function bindBankCardApi(data) { //绑定银行卡
  return request({
    url: process.env.BASE_API,
    method: 'post',
    data: qs.stringify(data)
  })
}

export function bankName(data) { //获取开户行
  return request({
    url: process.env.BASE_API,
    method: 'post',
    data: qs.stringify(data)
  })
}



