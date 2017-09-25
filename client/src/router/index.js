import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Vote/'
import Register from '@/components/Authentication/Register'
import Login from '@/components/Authentication/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Index
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
