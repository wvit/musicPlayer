import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: () => import('@/views/home.vue')
    },
    {
      path: '/signUp',
      component: () => import('@/views/signUp.vue')
    }, {
      path: '/signIn',
      component: () => import('@/views/signIn.vue')
    }
  ]
})