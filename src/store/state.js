/**
 * @description: 全局状态
 * @author: xx
 * @date: 2018-08-07 16:31:18
 */
let defaultRouterMap = [{
  path: '/',
  name: 'home-index',
  title: '主页'
}]
try {
  if (sessionStorage.routerMap) {
    defaultRouterMap = JSON.parse(sessionStorage.routerMap)
  }
} catch (e) {}
export default {
  // 路由记录
  routerMap: defaultRouterMap,
  isCollapsed: false
}
