var models = require('../../db/index.js')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var token = require('../../token')
var UUID = require('uuid')

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

// 条件获取用户列表
router.get('/queryUserByPagination', (req, res) => {
  var param = req.query || req.params
  var pageNum = parseInt(param.page || 1) // 页码
  var end = parseInt(param.rows || 10) // 默认页数
  var start = (pageNum - 1) * end
  var username = param.username
  var startTm = param.startTm
  var endTm = param.endTm
  var sql = `SELECT
                t1.user_id as USER_ID,
                t1.cname as USER_CNAME,
                t1.user_name as USER_NAME, 
                t1.sex as USER_SEX, 
                t1.user_address as USER_ADDRESS, 
                t1.age as USER_AGE, 
                t1.register_date as USER_REGISTER_DATE 
                    FROM user t1 WHERE 1 = 1`
  var paramList = []
  if (username !== '' && username !== undefined){
    sql += ' and user_name = ?'
    paramList.push(username)
  }
  if (startTm !== '' && startTm !== undefined){
    sql += ' and register_date between ? and ?'
    paramList.push(startTm, endTm)
  }
  sql += ' LIMIT ?, ?'
  paramList.push(start, end)
  var userToken = req.headers.authorization
  userToken = userToken.substring(userToken.indexOf(' '))
  // console.log(token.decodeToken(userToken))
  conn.query(sql, paramList,function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result.length > 0) {
      let data = {}
      for(let i=0; i<result.length; i++){
        // UTC时间转年月日
        var dt = new Date(result[i].USER_REGISTER_DATE);
        var date = [
          [dt.getFullYear(), dt.getMonth() + 1, dt.getDate()].join('-'),
          [dt.getHours(), dt.getMinutes(), dt.getSeconds()].join(':')
        ].join(' ').replace(/(?=\b\d\b)/g, '0'); // 正则补零
        result[i].USER_REGISTER_DATE = date
        // 查询用户下的所有设备
        var sql1 = `SELECT COUNT(*) AS TOTAL_DEVICE FROM device WHERE own_user = ?`
        conn.query(sql1,[result[i].USER_ID], function (err, result1) {
          if (err) {
            console.log(err)
          }
          if (result1) {
            result[i].TOTAL_DEVICE = result1[0].TOTAL_DEVICE
          }
        })
      }
      data.data = result
      data.pageNum = parseInt(req.query.page || 1)
      data.pageSize = parseInt(req.query.rows || 10)
      var sql = `SELECT COUNT(*) AS total FROM user`
      conn.query(sql, function (err, result) {
        if (err) {
          console.log(err)
        }
        if (result) {
          data.total = result[0].total
          jsonWrite(res, data)
        }
      })
    } else {

    }
  })
})

// 新增用户
router.post('/userAdd', (req, res) => {
  var userId = UUID.v1()
  var sql = `INSERT INTO user (user_id,user_name,user_pass,user_address) VALUES (?,?,'123456',?)`
  var param = req.body
  conn.query(sql, [userId,param.username, param.address], function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      let data = {}
      data.code = 200
      data.message = '操作成功'
      jsonWrite(res, data)
    }
  })
})

// 删除用户
router.post('/deleteUserById', (req, res) => {
  var sql = `DELETE FROM user WHERE user_id = ?`
  var param = req.body
  if(param.userId == 1001) {
    let errData = {
      code: 401,
      message: '删除失败'
    }
    jsonWrite(res, errData)
    return
  }
  conn.query(sql,[param.userId],function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      let data = {}
      data.code = 200
      data.message = '删除成功'
      jsonWrite(res, data)
    }
  })
})

// 更新用户
router.post('/updateUser', (req, res) => {
  var sql = `UPDATE user SET user_address = ? WHERE user_id = ?`
  var param = req.body
  conn.query(sql, [param.address,param.userId], function (err, result) {
    if (err) {
      jsonWrite(res , {
        code: 401,
        message: '更新失败'
      })
    }
    if (result) {
      jsonWrite(res , {
        code: 200,
        message: '更新成功'
      })
    }
  })
})
module.exports = router
