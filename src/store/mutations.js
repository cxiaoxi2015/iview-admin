/**
 * @description: mutations
 * @author: xx
 * @date: 2018-08-07 16:31:46
 */
export default {
  // 设置路由记录
  setRouterMap (state, router) {
    let delFalg = router.delFlag
    let map = router.router
    if (!delFalg) {
      state.routerMap.push(map)
    }
    try {
      sessionStorage.routerMap = JSON.stringify(state.routerMap)
    } catch (e) {}
  },
  // 边栏展开状态
  siderChange (state, isCollapsed) {
    state.isCollapsed = isCollapsed
  }
}
