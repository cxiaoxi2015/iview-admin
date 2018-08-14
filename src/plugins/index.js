/**
 * @description: 自定义插件
 * @author: xx
 * @date: 2018-08-08 15:41:26
 */
import dateFormat from './date'
import modal from './modal'
import getDay from './getDayByYearMonth'
const install = function (Vue) {
  if (install.installed) return
  install.installed = true
  // 定义属性到Vue原型中
  Object.defineProperties(Vue.prototype, {
    $dateFormat: {
      get () {
        return dateFormat
      }
    }
  })
  Object.defineProperties(Vue.prototype, {
    $confirm: {
      get () {
        return modal
      }
    }
  })
  Object.defineProperties(Vue.prototype, {
    $getDay: {
      get () {
        return getDay
      }
    }
  })
}
export default {
  install
}
