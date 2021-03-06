import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import store from './store'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import Swiper from "vue-awesome-swiper"
import 'swiper/dist/css/swiper.css'
import Vant from 'vant';
import 'vant/lib/index.css';
import wx from 'weixin-js-sdk'
import Cube from 'cube-ui'

import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)

import '@/permission'
import '@/icons'
import '@/assets/css/reset.css'
import '@/assets/css/common.css'
import '@/assets/css/xiaoyu.css'
import '@/assets/css/online-ordering.css'

import Vue2OrgTree from 'vue2-org-tree'

import infiniteScroll from 'vue-infinite-scroll'



import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(ElementUI)
Vue.use(Swiper)
Vue.use(Vant);
Vue.use(infiniteScroll);
Vue.use(Vue2OrgTree)
Vue.use(Cube)
// Vue.use(Axios)
// Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    // components: { App },
    // template: '<App/>',
    render: h => h(App)
});
//兼容性：字体大小，全局尺寸(rem)
!(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function (e) {
            e.preventDefault();
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 750) {
                docEl.style.fontSize = '100px';
            } else {
                var fontSize = 50 * (clientWidth / 375);
                window.xPixelRatio = 100 / fontSize;
                docEl.style.fontSize = fontSize + 'px';
            }
        };

    // Abort if browser does not support addEventListener
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window)
