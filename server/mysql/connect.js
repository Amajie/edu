
// 引入包
// 参考文章 https://www.jb51.net/article/115043.htm
const mysql = require('mysql')
const async = require("async")

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'edu'
})

function execTrans(sqlparamsEntities, callback) {
    pool.getConnection(function (err, connection) {
      
        if (err) return callback(err, null)

        connection.beginTransaction(function (err) {

            if (err) return callback(err, null)

            var funcAry = []

            sqlparamsEntities.forEach(function (sql_param) {
                var temp = function (cb) {
                    connection.query(sql_param.sql, sql_param.params, function (tErr, rows, fields) {
                        if(tErr){
                            // 事务回滚
                            connection.rollback(function () {
                                console.log("事务失败，" + sql_param + "，ERROR：" + tErr)
                                // 返回数据
                                callback(tErr, {msg: "事务失败", error: tErr})
                            })
                        }else{
                            // rows  即为 结果
                            return cb(null, rows)
                        }
                    })
                }
                funcAry.push(temp)
            })

            // 事务操作
            async.series(funcAry, function (err, result) {
                // 也要事务回滚
                if(err){
                    connection.rollback(function (err) {
                        connection.release()
                        return callback(err, null)
                    })
                }else{
                    connection.commit(function (err, info) {
                        if (err) {
                            // 事务回滚
                            connection.rollback(function (err) {
                                connection.release()
                                return callback(err, null)
                            })
                        } else {
                            // 返回结果
                            connection.release()
                            return callback(null, result)
                        }
                    })
                }
            })
        })
    })
}

// 合成 mysql语句 集合
function getSql(sql, params, callback) {
    if (callback) {
      return callback(null, {
        sql: sql,
        params: params
      })
    }
    return {
      sql: sql,
      params: params
    };
  }


module.exports = {execTrans, getSql}
