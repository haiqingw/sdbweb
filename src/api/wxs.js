





import request from '../utils/request';
import qs from 'qs'



export function getwxs (data) {
    return request({
        url: 'http://ttsplus.xylrcs.cn/index.php/App/Sharecode/jssdks',
        method: 'post',
        data: qs.stringify(data)
    })
}
