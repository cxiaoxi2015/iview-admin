var models = require('../../db/index.js')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')

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
router.get('/login', (req, res) => {
  var sql = `SELECT * FROM userLogin`
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      let data = {}
      data.code = 200
      data.message = '操作成功!'
      data.data = result
      jsonWrite(res, data)
    }
  })
})
module.exports = router
