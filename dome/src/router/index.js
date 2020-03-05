import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/index/index'
import About from '@/components/about/about'
import Technology from '@/components/technology/technology'
import Punchline from '@/components/punchline/punchline'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/technology',
      name: 'technology',
      component: Technology
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/punchline',
      name: 'punchline',
      component: Punchline
    }
  ]
})
