import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import '@/assets/css/reset.css'
import '@/assets/css/common.css'
import router from './router'
// import axios from 'axios'
 
Vue.config.productionTip = false
Vue.use(MintUI)
// Vue.use(Axios)
// Vue.prototype.$http = axios
 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
//兼容性：字体大小，全局尺寸(rem)
(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      if (clientWidth >= 750) {
        docEl.style.fontSize = '20px';
      } else {
        docEl.style.fontSize = 24 * (clientWidth / 750) + 'px';
      }
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window)
