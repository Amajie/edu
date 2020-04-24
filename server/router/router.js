
const express = require('express')
const router = express.Router()
const md5 = require('md5')
const fs = require('fs')
const path = require('path')
const multiparty = require('multiparty')

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

// 更新用户 的信息 除了头像
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


// 用户视频上传
router.post('/upload_video_cut', (req, res) =>{

    // 获取 切片文件夹 路径
    const cutDir = path.resolve(__dirname, '../upVideo/soqhusclecw0000000/cut')

    new multiparty.Form({uploadDir: cutDir}).parse(req, function(err, fields, files){


        if(err){
            return res.json({"msg": "上传失败", "code": 500})
        }
        
        // 获取 切片相关信息
        const [chunk] = files.chunk
        const [filename] = fields.filename
        const [index] = fields.index
        
        const writeDir = path.resolve(__dirname, '../upVideo/soqhusclecw0000000/merge')
        
        fs.appendFileSync(`${writeDir}/${filename}`, fs.readFileSync(chunk.path))
        // 删除文件
        fs.unlinkSync(chunk.path)
        // 成功
        res.json({"msg": "切片上传成功", "code": 200, index: Number(index) + 1})


        // const readStream = fs.createReadStream(chunk.path)
        // const writeStream = fs.createWriteStream(`${writeDir}/${filename}`)
        // // 此时应该要判断 chunk.path存在与否
        // readStream.pipe(writeStream)

        // readStream.on('end', function(err, data) {
        //     // 删除文件
        //     fs.unlinkSync(chunk.path)
        //     res.json({"msg": "切片上传成功", "code": 200, index: Number(index) + 1})
        // })
    })        
})


// 创建视频集
router.post('/set_title', (req, res) =>{

    const {listTitle} = req.body
    const listUserId = req.session.userId
    const listId = getId()
    const insert = `insert into lists(listId, listTitle, listUserId) values('${listId}','${listTitle}', '${listUserId}')`

    execTrans([getSql(insert, '')], err =>{
        if(err) return res.json({"msg": "操作失败", "code": 500, title: {}})

        res.json({"msg": "创建成功", "code":200, title: {listTitle, listUserId, listId}})
    })


})
// 获取视频集
router.post('/get_title', (req, res) =>{

    const insert = `select listId, listTitle, listUserId from lists where listUserId='${req.session.userId}'`

    execTrans([getSql(insert, '')], (err, data) =>{
        if(err) return res.json({"msg": "获取失败", "code": 500, listData: []})
        
        res.json({"msg": "获取成功", "code":200, listData: data[0]})
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