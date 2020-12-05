// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import bootstrap from 'bootstrap';


Vue.config.productionTip = false

//应用css插件
Vue.use(ElementUI);

//配置公共的url
Axios.defaults.baseURL = 'http://106.52.13.151/port/'
//配置axios
Vue.prototype.$axios = Axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
