


import request from '../utils/request';

export function fetchList(data) {
    return request({
      url: process.env.BASE_API + '/admin/Login/captcha',
      method: 'post',
    //   params: data
    })
  }
  