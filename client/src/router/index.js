import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Polls/'
import Register from '@/components/Authentication/Register'
import Login from '@/components/Authentication/Login'
import CreatePoll from '@/components/Polls/CreatePoll'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
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
    },
    {
      path: '/polls/create',
      name: 'polls-create',
      component: CreatePoll
    }
  ]
})
