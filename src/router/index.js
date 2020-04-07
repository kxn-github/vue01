import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloVue from '@/pages/day1/HelloVue'
import homepage from '@/pages/homepage'
import testpage from '@/pages/testpage'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      // name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/pages/homepage',
      name: 'homepage',
      component: homepage
    },
    {
      path:'/pages/day1',
      // name:'HelloVue',
      component:HelloVue
    },
    {
      path:'/pages/testpage',
      // name:'HelloVue',
      component:testpage
    }
  ]
})
