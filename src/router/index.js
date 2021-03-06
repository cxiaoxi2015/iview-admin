import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Login from '@/pages/login/Login'
import store from '@/store'
Vue.use(Router)
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      requireAuth: true,
      title: '主页'
    },
    children: [{
      path: '/',
      name: 'home-index',
      component: resolve => require(['@/pages/home/components/Index'], resolve),
      meta: {
        requireAuth: true,
        title: '主页'
      }
    }, {
      path: 'user',
      name: 'user-manage',
      component: resolve => require(['@/pages/user/User'], resolve),
      meta: {
        requireAuth: true,
        title: '用户管理'
      }
    }, {
      path: 'admin',
      name: 'admin-manage',
      component: resolve => require(['@/pages/admin/Admin'], resolve),
      meta: {
        requireAuth: true,
        title: '管理员'
      }
    }, {
      path: 'unlock',
      name: 'unlock',
      component: resolve => require(['@/pages/unlock/Unlock'], resolve),
      meta: {
        requireAuth: true,
        title: '开锁记录'
      }
    }, {
      path: 'analysis',
      name: 'analysis',
      component: resolve => require(['@/pages/analysis/Analysis'], resolve),
      meta: {
        requireAuth: true,
        title: '数据分析'
      }
    }]
  }, {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requireAuth: false,
      title: '登录'
    }
  }
]
const router = new Router({
  routes,
  mode: 'history', //default: hash ,history
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

router.beforeEach((to, from, next) => {
  NProgress.done().start()
  next()
  let toName = to.name
  let token = store.state.token

  //返回值为登录状态
  if ((token === null || token === '') && (toName !== 'Login' && to.meta.requireAuth)) {
    router.push({
      path: 'login'
    })
  }else {
    if (token !== null && token !=='' && toName === 'login') {
      router.push({
        path:'/'
      })
    } else {
      next()
    }
  }
})
router.afterEach(route => {
  NProgress.done()
})

export default router
