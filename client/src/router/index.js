import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Polls/'
import Register from '@/components/Authentication/Register'
import Login from '@/components/Authentication/Login'
import CreatePoll from '@/components/Polls/CreatePoll'
import ViewPoll from '@/components/Polls/ViewPoll'
import UserPolls from '@/components/Polls/UserPolls'

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
      name: 'poll-create',
      component: CreatePoll
    },
    {
      path: '/polls/:pollId',
      name: 'poll-view',
      component: ViewPoll
    },
    {
      path: '/polls/user/0',
      name: 'poll-user',
      component: UserPolls
    }
  ]
})
