import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/Login'
import register from '@/components/Register'
import news from '@/components/News'
import posting from '@/components/Posting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/news',
      name: 'news',
      component: news
    },
    {
      path: '/posting',
      name: 'posting',
      component: posting
    }
  ]
})
