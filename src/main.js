import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
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
})
