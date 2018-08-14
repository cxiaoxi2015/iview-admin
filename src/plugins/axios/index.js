/**
 * @description: Axios封装
 * @author: xx
 * @date: 2018-08-14 16:56:09
 */
const axios = require('axios')
const preUrl = require('../../../config/global.config')

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

module.exports = {
  /**
   * @description: post方法
   * @author: xx
   * @date: 2018-08-14 16:59:56
   */
  post(url,param,thenFun,exeFun){
    var _formData = formData(param);
    // axios.defaults.headers.common['Authorization']=sessionStorage.getItem("token")||localStorage.getItem("token")
    axios.post(preUrl.interfaceUrl + url,_formData).then( res => {
      thenFun.call(this,res.data);
    }).catch( err => {
      exeFun.call(this,err);
    });
  },

  /**
   * @description: get方法
   * @author: xx
   * @date: 2018-08-14 17:01:15
   */
  get (url,param,thenFun,exeFun){
    // axios.defaults.headers.common['Authorization']=sessionStorage.getItem("token")||localStorage.getItem("token")
    axios({
      method: 'get',
      url: preUrl.interfaceUrl+url,
      params: param
    }).then( res => {
      thenFun.call(this,res.data);
    }).catch( err => {
      exeFun.call(this,err);
    });
  }
}
