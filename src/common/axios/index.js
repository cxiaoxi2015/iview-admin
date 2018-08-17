/**
 * @description: Axios封装
 * @author: xx
 * @date: 2018-08-14 16:56:09
 */
const axios = require('axios')
axios.defaults.headers['Authorization'] = sessionStorage.token || ''

/**
 * @description: FormData
 * @author: xx
 * @date: 2018-08-14 16:57:48
 */
let formData = (data) => {
  let _formData = new FormData()
  for (let i in data) {
    _formData.append(i, data[i])
  }
  return _formData
}
axios.defaults.timeout = 5000
axios.defaults.headers['Content-type'] = 'application/json'
module.exports = {
  /**
   * @description: post方法
   * @config: {
   *    _this : this (vue原型)
   *    loading: data中定义的 loading('字符串格式 例如data定义的myloading config:{ _this: this, loading: 'myloading' }')
   * }
   * @author: xx
   * @date: 2018-08-14 16:59:56
   */
  post(url,param,config,thenFun,exeFun){
    var _formData = formData(param)
    let _this = config._this
    _this[config.loading] = true
    axios.post('/api/' + url,_formData).then( res => {
      const code = res.data.code
      _this[config.loading] = false
      if (code !== undefined) {
        let type = code === 200 ? 'success' : 'warning'
        _this.$Message[type](res.data.message)
        if (code === 200){
          thenFun.call(this,res.data)
        }
      }
    }).catch( err => {
      _this[config.loading] = false
      _this.$Notice.error({
        title: '错误',
        desc: '网络连接错误'
      })
      exeFun.call(this,err)
    })
  },

  /**
   * @description: get方法
   * @config: {
   *    _this : this (vue原型)
   *    loading: data中定义的 loading('字符串格式 例如data定义的myloading config:{ _this: this, loading: 'myloading' }')
   * }
   * @author: xx
   * @date: 2018-08-14 16:59:56
   */
  get(url,param,config,thenFun,exeFun){
    let _this = config._this
    _this[config.loading] = true
    axios.get('/api/' + url,param).then( res => {
      const code = res.data.code
      _this[config.loading] = false
      // 返回data对象
      if (code !== undefined) {
        if (code === 200){
          thenFun.call(this,res.data)
        }
      } else {
        // 返回data数组
        if (res.data.data.length > 0) {
          thenFun.call(this,res.data)
        }
      }
    }).catch( err => {
      _this[config.loading] = false
      _this.$Notice.error({
        title: '错误',
        desc: '网络连接错误'
      })
      exeFun.call(this,err)
    })
  },
}
