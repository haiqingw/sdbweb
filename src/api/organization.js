import request from '../utils/request';
import qs from 'qs'

export function getTeamApi(data) {
  return request({
    url: process.env.BASE_API,
    method: 'post',
    data: qs.stringify(data)
  })
}