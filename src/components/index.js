/**
 * @description: 自定义全局组件
 * @author: xx
 * @date: 2018-08-08 15:42:21
 */
import contentHeader from './contentHeader'
import contentFooter from './contentFooter'
import contentContainer from './contentContainer'
import myModal from './myModal'
const install = function (Vue) {
  if (install.installed) return
  install.installed = true
  Vue.component('contentHeader', contentHeader)
  Vue.component('contentFooter', contentFooter)
  Vue.component('contentContainer', contentContainer)
  Vue.component('myModal', myModal)
}
export default {
  install
}
