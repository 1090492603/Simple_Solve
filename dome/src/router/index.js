import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/index'
import About from '@/components/about/about'
import Technology from '@/components/technology/technology'
import Punchline from '@/components/punchline/punchline'
import Community from '@/components/community/community'
import Detailed from '@/components/punchline/detailed'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/technology',
      name: 'technology',
      component: Technology
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
    },
    {
      path: '/community',
      name: 'community',
      component: Community
    },
    {
      path: '/detailed',
      name: 'detailed',
      component: Detailed
    }
  ]
})
