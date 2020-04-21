
const express = require('express')
const router = express.Router()
const md5 = require('md5')
const fs = require('fs')
const path = require('path')

const {execTrans, getSql} = require('../mysql/connect.js')


// 登陆 
router.post('/login', (req, res) =>{
    // 获取参数
    const {userName, userCode} = req.body
    // 先判断用户 是否已经注册

    execTrans([getSql(`select * from users where userName='${userName}';`, '')], (err, data) =>{
        // 报错
        if(err) return res.json({"msg": "操作失败", "code": 500})

        // 获取 数据 格式 [[{}]]
        data = data[0][0]

        // 说明 用户没有注册 询问用户是否 注册
        if(!data) return res.json({"msg": "用户未注册", "code": 0})
        // 判断 用户密码是否正确
        if(data.userCode != md5(userCode) ) return res.json({"msg": "密码错误", "code": 1})

        // 设置 session
        req.session.userId = data.userId

        // 登陆成功
        res.json({"msg": "登陆成功", "code": 200, users: {...data, userCode: null}})
    })

})
// 注册 
router.post('/register', (req, res) =>{
    // 获取参数
    const {userName, userCode} = req.body
    // 先判断用户 是否已经注册
    const userId = getId()
    const insert1 = `insert into users(userId, userName, userCode) values('${userId}', '${userName}', '${md5(userCode)}');`
    const insert2 = `select * from users where userName='${userName}';`

    execTrans([getSql(insert1, ''), getSql(insert2, '')], (err, data) =>{
        // 报错
        if(err) return res.json({"msg": "操作失败", "code": 500})

        // 设置 session
        req.session.userId = data[1][0].userId
        // 数据格式 [ OkPacket {}, [ RowDataPacket {} ]
        res.json({"msg": "登陆成功", "code": 200, users: {...data[1][0], userCode: null}})
    })

})

router.post('/update_user', (req, res) =>{
    let {setVal, setKey}  = req.body

    // 如果是密码 需要md5 加密
    setVal = setKey === 'userCode'? md5(setVal): setVal

    const insert = `update users set ${setKey}='${setVal}' where userId='${req.session.userId}'`


    execTrans([getSql(insert, '')], (err, data) =>{

        if(err) return res.json({"msg": "操作失败", "code": 500})

        res.json({"msg": "修改成功", "code": 200})

    })
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