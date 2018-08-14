// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'assets/my-theme/index.less'
import '@style/reset.css'
import '@style/iconfont.css'
import 'vue2-animate/dist/vue2-animate.min.css'
import '@style/main.less'
import echarts from 'echarts'
Vue.use(iView)
// 自定义插件
import plugins from './plugins'
Vue.use(plugins)
Vue.prototype.echarts = echarts
// 自定义全局组件
import components from './components'
Vue.use(components)
import $ from 'jquery'
import store from './store'
import globalConfig from '../config/global.config'
document.title = globalConfig.windowTitle
Vue.prototype.logoName = globalConfig.logoName
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
