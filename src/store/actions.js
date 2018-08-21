/**
 * @description: actions
 * @author: xx
 * @date: 2018-08-07 16:31:35
 */
export default {
  // 设置token
  setToken (content, token) {
    content.commit('setToken', token)
  },
  // 退出登录
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('logout')
      resolve()
    })
  }
}
