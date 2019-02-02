import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home.vue'
import Login from '@/components/login.vue'
import Users from '@/components/users.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [{
              name: 'users',
              path: '/users',
              component: Users
          }]
    },
    {
      name: 'login',
      path: '/login',
      component: Login

    }
  ]
})
