// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui'
import Http from '@/plugins/http'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/index.css'
import router from './router'

Vue.config.productionTip = false
// 目的 把一个独立的不是vue插件的axios变成vue插件
Vue.use(Http)
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
