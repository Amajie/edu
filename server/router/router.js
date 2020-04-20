
const express = require('express')
const router = express.Router()
const md5 = require('md5')
const fs = require('fs')
const path = require('path')

const {execTrans, getSql} = require('../mysql/connect.js')


// 登陆 
router.post('/login', (req, res) =>{
    // 获取参数
    const {userName, password} = req.body
    // 先判断用户 是否已经注册

    execTrans([getSql(`select * from users where userName='${userName}';`, '')], (err, data) =>{
        if(err) return res.json({"msg": "操作失败", "code": 0})

        data = data[0]

        res.json({"msg": "登陆成功", "code": 200, data})
    })

    // 已经注册 允许登陆
    // 未注册 询问是否注册
})


// 获取时间
function getTime(){
    const dataTime = new Date()
    return`${dataTime.getFullYear()}-${('0'+(1+dataTime.getMonth())).slice(-2)}-${('0'+dataTime.getDate()).slice(-2)}`
}


// 生成id
function getId(length){
    return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
}


module.exports = router