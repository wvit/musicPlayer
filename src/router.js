import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      redirect: 'index',
      component: () => import('@/views/home.vue'),
      children: [{
        //首页
        path: '/index',
        component: () => import('@/views/index.vue'),
      }, {
        //音乐列表
        path: '/musicList',
        component: () => import('@/views/musicList.vue'),
      }, {
        //发现
        path: '/discovery',
        component: () => import('@/views/discovery.vue'),
      }, {
        //用户中心
        path: '/userCenter',
        component: () => import('@/views/userCenter.vue'),
      }]
    },
    {
      //注册
      path: '/signUp',
      component: () => import('@/views/signUp.vue')
    }, {
      //登录
      path: '/signIn',
      component: () => import('@/views/signIn.vue')
    }
  ]
})