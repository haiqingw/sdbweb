





import request from '../utils/request';
import qs from 'qs'



export function getWxs (data) {
    return request({
        url: 'http://ttsplus.xylrcs.cn/index.php/App/Sharecode/jssdks',
        method: 'post',
        data: qs.stringify(data)
    })
}

export function getWx (url) {
    return request({
        url: url,
        method: 'post'
    })
}
