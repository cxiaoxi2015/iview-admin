var models = require('../../db/index.js')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var token = require('../../token')

// 连接数据库
var conn = mysql.createConnection(models.mysql)
conn.connect()
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}
// 用户登录
router.post('/login', (req, res) => {
  var sql = `SELECT cname,role_id,sex,age FROM user WHERE user_name = ? AND user_pass = ? `
  var params = req.body
  conn.query(sql, [params.username, params.userpass],function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result.length > 0) {
      let data = {}
      data.token = token.createToken()
      data.code = 200
      data.message = '操作成功!'
      data.data = result[0]
      setTimeout(()=>{
        jsonWrite(res, data)
      },3000)
    } else {
      let data = {}
      data.code = 501
      data.message = '账号或密码错误'
      jsonWrite(res, data)
    }
  })
})
module.exports = router
