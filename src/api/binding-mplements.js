


import request from '../utils/request';
import qs from 'qs'


export function wxSweepCode(data) {
    return request({
      url: process.env.BASE_API,
      method: 'get',
      data: qs.stringify(data)
    })
}
