import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home.vue'
import Login from '@/components/login.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
      // redirect: {
      //   name: 'login'
      // }
    },
    {
      name: 'login',
      path: '/login',
      component: Login

    }
  ]
})
