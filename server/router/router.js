
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

// 获取用户的个人信息
router.get('/get_user', (req, res) =>{
    const {userId} = req.query
    // 最新文章
    let insert = `select userAddress, userCode, userEmail, userGender, userId, userName, userSign
                 from users where userId='${userId}';`

    execTrans([getSql(insert, '')], (err, data) =>{

        if(err) return res.json({"msg": "获取失败", "code": 500})


        res.json({"msg": "获取成功", "code":200, userData: {...data[0][0], userCode: null}})
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

// 更新用户名字
router.post('/update_name', (req, res) =>{

    let {userName}  = req.body

    execTrans([getSql(`select userName from users where userName='${userName}';`, '')], (err, findData) =>{

        if(err) return res.json({"msg": "操作失败", "code": 500})
        // 用户名存在
        if(findData[0].length) return res.json({"msg": "用户名存在", "code": 0})

        console.log(findData[0].length)
        console.log(findData[0])

        // 否则修改数据
        const insert = `update users set userName='${userName}' where userId='${req.session.userId}'`
        execTrans([getSql(insert, '')], (err, data) =>{

            if(err) return res.json({"msg": "操作失败", "code": 500})
    
            res.json({"msg": "修改成功", "code": 200})
    
        })

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
        console.log(chunk.path)
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


// 插入视频数据到数据库
router.post('/insert_video', (req, res) =>{
    // 获取数据 filename 为视频的名字 listId 为视频集 唯一id
    const {videoTitle, videoDesc, filename, listId} = req.body
    // 获取id
    const videoId = getId()

    // 视频集添加数据
    const insert1 = `update lists set listVideo=CONCAT(listVideo, '${videoId},') where listId='${listId}'`
    // 添加视频
    const insert2 = `insert into videos(videoId, videoListId, videoTitle, videoDesc, videoUrl) values('${videoId}', '${listId}', '${videoTitle}', '${videoDesc}', '${filename}')`

    console.log([getSql(insert1, ''), getSql(insert2, '')])
    execTrans([getSql(insert1, ''), getSql(insert2, '')], err =>{

        if(err) return res.json({"msg": "操作失败", "code": 500, title: {}})

        res.json({"msg": "创建成功", "code":200})
    })

     
})


// 创建视频集
router.post('/set_title', (req, res) =>{

    const listUserId = req.session.userId
    const listId = getId()
    const posterUrl = `/${listUserId}/poster`


    // 上传 封面 图片
    new multiparty.Form({uploadDir: path.resolve(__dirname, `../upVideo/${posterUrl}`)}).parse(req, function(err, fields, files){
        
        if(!files.listPoster || !fields.listTitle || !fields.listGrade || err){
            return res.json({"msg": "上传失败", "code": 500})
        }
        
        // 获取 切片相关信息
        let [listPoster] = files.listPoster
        let [listType] = fields.listType
        let [listDirection] = fields.listDirection
        let [listTitle] = fields.listTitle
        let [listGrade] = fields.listGrade

        
        // C:\vsCode\edu\server\upVideo\soqhusclecw0000000\poster\xtMn528Vd4adhhzK4UblUK92.jpg
        // 根据 \ 转换为数组 截取最后一个数据即可
        listPoster = `${posterUrl}/${listPoster.path.split('\\').pop()}`

        const insert = `insert into lists(listId, listTitle, listType, listDirection, listUserId, listPoster, listGrade, listTime) 
                        values('${listId}', '${listTitle}', '${listType}', '${listDirection}', '${listUserId}', '${listPoster}', '${listGrade}', '${Date.now()}')`
        
        execTrans([getSql(insert, '')], err =>{
            if(err) return res.json({"msg": "操作失败", "code": 500, title: {}})
    
            res.json({"msg": "创建成功", "code":200, title: {listTitle, listUserId, listId}})
        })

    })    
})

// 对视频进行评论
router.post('/insert_video_commit', jwt, (req, res) =>{
    
    const {commitListId, commitRate, commitVideo, commitContent} = req.body

    const commitUserId = req.session.userId



    // 插入数据
    const insert = `insert into listcommits(commitId, commitListId, commitUserId, commitContent, commitRate, commitVideo, commitTime) 
                    values('${getId()}','${commitListId}', '${commitUserId}', '${commitContent}', '${commitRate}', '${commitVideo}', '${Date.now()}')`

    execTrans([getSql(insert, '')], err =>{

        if(err) return res.json({"msg": "操作失败", "code": 500, title: {}})

        res.json({"msg": "操作成功", "code":200})
    })



})


// 首页获取数据
router.get('/get_home', (req, res) =>{
    // 获取最新的数据
    let newList = `select * from lists where listRelease=1 ORDER BY listTime DESC limit 0, 2`
    // 推荐文章
    let recoArticle= `select articleId, articleTitle, articleTime, userId from articles 
                    left join users on articles.articleUserId = users.userId ORDER BY articleReader DESC limit 5`
    // 最新文章
    let newArticle = `select articleId, articleTitle, articleTime, userId from articles 
                    left join users on articles.articleUserId = users.userId ORDER BY articleTime DESC limit 5`

    const sqlArr = [getSql(newList, ''), getSql(recoArticle, ''), getSql(newArticle, '')]

    execTrans(sqlArr, (err, data) =>{

        if(err) return res.json({"msg": "获取失败", "code": 500, homeData: []})

        let homeData = data[0]
        let recoArticle = data[1]
        let newArticle = data[2]

        res.json({"msg": "获取成功", "code":200, homeData, recoArticle, newArticle})
    })

})

// 获取 视频 详情数据
router.get('/get_vdetail', (req, res) =>{
    const {listId, commit} = req.query

    // 获取最新的数据
    let listDetail = `select listTitle, listClick, listDesc, listPoster, listType, listDirection, listGrade, listTime,
                    userId, userEmail, userName from lists  left join users on lists.listUserId = users.userId  WHERE listId='${listId}';`
    // 视频
    let videoDetail = `select * from videos where videoListId='${listId}';`

    let sqlArr = [getSql(listDetail, ''), getSql(videoDetail, '')]

    if(commit){
        // 评论 前三条数据即可
        let commitDetail = `select commitContent, commitRate, commitId, commitListId, 
                    commitTime, commitUserId, commitVideo, userId, userName from listCommits left 
                    join users on listCommits.commitUserId = users.userId where commitListId='${listId}' limit 3;`
        sqlArr.push(getSql(commitDetail, ''))
    }


    execTrans(sqlArr, (err, detailData) =>{

        if(err) return res.json({"msg": "获取失败", "code": 500, detailData: []})

        res.json({"msg": "获取成功", "code":200, detailData})
    })

})

// 更新视频 集合
router.post('/up_title', (req, res) =>{

    execTrans(getUpdateSql(req.body), (err, data) =>{

        if(err) return res.json({"msg": "更新失败", "code": 500})

        res.json({"msg": "更新成功", "code":200})
    })

})

// 获取视频集合相关内容
router.get('/get_course', (req, res) =>{

    const { courseId, userId} = req.query


    execTrans(getCourseSql(courseId, userId), (err, data) =>{

        if(err) return res.json({"msg": "获取失败", "code": 500, courseData: [], courseTotal: 0})

        res.json({"msg": "获取成功", "code":200, courseData: data[0], courseTotal: data[1][0]['count(listUserId)']})
    })

})


// 搜索视频
router.get('/search_video', (req, res) =>{

    const { listType, listGrade, listTitle, listHeat } = req.query

    execTrans(searchVideo(req.query), (err, data) =>{
        console.log(data)
        console.log(searchVideo(req.query))
        if(err || !data[0].length) return res.json({"msg": "获取失败", "code": 500, searchData: [], searchTotal: 0})
        
        res.json({"msg": "获取成功", "code":200, searchData: data[0], searchTotal: data[1][0]['count(listId)']})
    })

})

// 博客图片上传
router.post('/up_blog_pic', (req, res) =>{

    const listUserId = req.session.userId
    const posterUrl = `/${'soqhusclecw0000000'}/blog`


    // 上传 封面 图片
    new multiparty.Form({uploadDir: path.resolve(__dirname, `../upVideo/${posterUrl}`)}).parse(req, function(err, fields, files){
        
        if(err){
            return res.json({"msg": "上传失败", "code": 500})
        }
        
        // 获取 图片信息
        let [blogPic] = files.blogPic

        
        // C:\vsCode\edu\server\upVideo\soqhusclecw0000000\poster\xtMn528Vd4adhhzK4UblUK92.jpg
        // 根据 \ 转换为数组 截取最后一个数据即可
        blogPic = `${posterUrl}/${blogPic.path.split('\\').pop()}`

        res.json({"msg": "创建成功", "code":200, realName:'http://127.0.0.1:6060', blogPicUrl: blogPic})

    })        
})

// 写文章
router.post('/write', (req, res) =>{

    // const userId = req.session.userId
    const userId = '1'

    const {articleTitle, articleContent, articleDraft} = req.body

    const insert = `insert into articles(articleId, articleUserId, articleTitle, articleContent, articleDraft, articleTime) 
                    values('${getId()}', '${userId}', '${articleTitle}', '${articleContent}', '${articleDraft}', '${Date.now()}')`
    
    execTrans([getSql(insert, '')], err =>{

        if(err) return res.json({"msg": "操作失败", "code": 500})

        res.json({"msg": "提交成功", "code":200})
    })

})

// 获取文章
router.get('/get_write', (req, res) =>{


    const {articleUserId, articleId} = req.query


    // 更新阅读数量
    const insert1 = `UPDATE articles SET articleReader = articleReader+1 where articleId='${articleId}'`
    // 文章内容
    const insert2 = `select * from articles where articleId='${articleId}'`

    // 博主
    const insert3 = `select userId, userName from users where userId='${articleUserId}'`


    // 评论内容
    const insert4 = `select commitArticleId, commitContent, commitId, commitTime, commitUserId, userId, 
                    userName from commits left join users on commits.commitUserId=users.userId 
                    WHERE commitArticleId='${articleId}';`

    // 回复内容 与 回复用户
    const insert5 = `select * from replys left join users on replys.replyUserId=users.userId WHERE replyArticleId='${articleId}';`
    // 回复内容 与 回复目标用户
    const insert6 = `select userName from replys left join users on replys.replyTargetId=users.userId WHERE replyArticleId='${articleId}';`


    // 热门文章
    let recoArticle= `select articleId, articleTitle, articleTime, userId from articles 
                    left join users on articles.articleUserId = users.userId ORDER BY articleReader DESC limit 10`


    const sqlArr = [getSql(insert1, ''), getSql(insert2, ''), getSql(insert3, ''),
                getSql(insert4, ''), getSql(insert5, ''), getSql(insert6, ''), getSql(recoArticle, '')]

    execTrans(sqlArr, (err, data) =>{

        if(err) return res.json({"msg": "获取失败", "code": 500})
        

        const articleData = data[1][0]
        const userData = data[2][0]
        const recoArticle = data[6]

        const commitData = handleCommit(data)

        res.json({"msg": "获取成功", "code":200, articleData, userData, commitData, recoArticle})
    })

})


/***
 * 更新文章
 * 无参数、默认即为修改文章内容
 * 1 修改点赞
 * 2 修改举报
 * 3 修改收藏
 */
router.post('/up_write', (req, res) =>{

    const {articleId, articleContent, articleTitle, readerId} = req.body

    let str = ''
    let userId = 'soqhusclecw0000000'

    switch(readerId){
        // case 1:
        //     str = 'articleCommit = articleCommit+1'
        //     break
        case 1:
            str = `likeList = CONCAT(likeList, '${userId}|')`
            break
        case 2:
            str = `opposeList = CONCAT(opposeList, '${userId}|')`
            break
        case 3:
            str = `collectList = CONCAT(collectList, '${userId}|')`
            break
            // 默认
        default:
            str = `articleContent = ${articleContent}, articleTitle = ${articleTitle}`
    }



    const insert = `UPDATE articles SET ${str} WHERE articleId='${articleId}'`

    execTrans([getSql(insert, '')], (err, data) =>{
        // 发布失败
        if(err) return res.json({"msg": "操作失败", "code": 500})
        // 成功
        res.json({"msg": "更新成功", "code": 200})
    })
})


// 发表评论 以及 插入消息
router.post('/commit', jwt, (req, res) =>{


    const {commitArticleId, commitContent, replyTargetId, replyCommitId} = req.body
    
    
    const commitId =  getId()
    const commitTime =  getTime()
    const userId =  req.session.userId

    // 评论
    let insert1 = `INSERT INTO commits(commitId, commitUserId, commitArticleId, commitContent, commitTime) 
        VALUES('${commitId}', '${userId}', '${commitArticleId}', '${commitContent}', '${commitTime}')`

    // 修改评论数据
    let insert2 = `UPDATE articles SET articleCommit = articleCommit+1 where articleId='${commitArticleId}'`

    // 回复
    if(replyCommitId){
        insert1 = `INSERT INTO replys(replyId, replyUserId, replyTargetId, replyCommitId, replyContent, replyArticleId, replyTime) 
        VALUES('${commitId}', '${userId}', '${replyTargetId}', '${replyCommitId}', '${commitContent}', '${commitArticleId}', '${commitTime}')`
    }
    
    execTrans([getSql(insert1, ''), getSql(insert2, '')], (err, data) =>{

        if(err) return res.json({"msg": "评论失败", "code": 500})
        
        res.json({"msg": "评论成功", "code": 200, commitId, commitTime})

    })
})


// 获取用户的个人文章
router.get('/get_my_write', (req, res) =>{

    const {targetUserId, limit=0, offset=10} = req.query

    // 文章数据
    const insert1 = `select articleId, articleTitle, articleDraft, articleTime, articleReader, 
                    articleCommit, userId, userName from articles  left join users on articles.articleUserId = users.userId 
                        where articleUserId='${targetUserId}' limit ${limit*offset},${offset};`
    // 文章总条数
    const insert2 = `select count(articleId) from articles WHERE articleUserId='${targetUserId}';`


    execTrans([getSql(insert1, ''), getSql(insert2, '')], (err, data) =>{

        if(err) return res.json({"msg": "获取失败", "code": 500, writeData: [], writeTotal: 0})
        res.json({"msg": "获取成功", "code": 200, writeData: data[0], writeTotal: data[1][0]['count(articleId)']})

    })
})
// 搜索文章
router.get('/search_write', (req, res) =>{

    const {articleTitle, limit=0, offset=10} = req.query


    let str = ''

    for(let i=0; i< articleTitle.length; i++){
        str += articleTitle[i] + '|'
    }   

    str = str.substr(0, str.length - 1)



    // 文章数据
    const insert1 = `select articleId, articleTitle, articleContent, articleTime, articleReader, 
                    articleCommit, userId, userName from articles  left join users on articles.articleUserId = users.userId 
                        where articleTitle REGEXP '${str}'  limit ${limit*offset},${offset};`
    // 文章总条数
    const insert2 = `select count(articleId) from articles WHERE articleTitle REGEXP '${str}';`


    execTrans([getSql(insert1, ''), getSql(insert2, '')], (err, data) =>{

        if(err) return res.json({"msg": "获取失败", "code": 500, searchData: []})
        res.json({"msg": "获取成功", "code": 200, searchData: data[0], searchTotal: data[1][0]['count(articleId)']})

    })
})


// 搜索视频
function searchVideo({ listType, listGrade, listTitle, listNew, limit=0, offset=15}){

    // 默认搜索全部 点击量是最多的 难度 全部 每次 最多获取15记录
    // 否则 为最新的 就是时间降序
    let init = listNew? ` ORDER BY listTime DESC limit ${limit*offset},${offset};`: ` ORDER BY listClick DESC limit ${limit*offset},${offset};`
    let condition = '' 

    // 存在分类
    if(listType){
        
        let listTypeStr = ''
        
        listType.forEach(item => {
            listTypeStr += item + '|'
        })
        
        
    
        listTypeStr = listTypeStr.substr(0, listTypeStr.length - 1)

        condition = ` and listDirection REGEXP '${listTypeStr}' `

       
    }
    
    // 存在 难度
    if(listGrade){
        condition += ` and listGrade=${listGrade} ` 
    }

    // 存在 关键字
    if(listTitle){

        let listTitleStr = ''

        for(let i=0; i< listTitle.length; i++){
            listTitleStr += listTitle[i] + '|'
        }   

        listTitleStr = listTitleStr.substr(0, listTitleStr.length - 1)

        condition += ` and listTitle REGEXP '${listTitleStr}' ` 
    }


    let insert1 = `select * from lists where listRelease=1 ${condition? condition: ''} ${init}`
    let insert2 = `select count(listId) from lists where listRelease=1 ${condition? condition: ''}`
    

    return [getSql(insert1, ''), getSql(insert2, '')]
}


// 根据 courseId返回相应的 sql语句 这里都是查询
function getCourseSql(courseId, userId){
    let insert1 = ''
    let insert2 = ''

    switch(courseId){
        // 获取 上传的 但是没有发布
        case '1':
            insert1 = `select * from lists where listUserId='${userId}'`
            insert2 = `select count(listUserId) from lists where listUserId='${userId}'`
            break
        // 获取已经发布的
        case '2':

            insert1 = `select * from lists where listRelease=1 and listUserId='${userId}'`
            insert2 = `select count(listUserId) from lists where listRelease=1 and listUserId='${userId}'`

            break
        // 默认 获取的是视频集合标题
        default:

            insert1 = `select listId, listTitle, listUserId from lists where listUserId='${userId}'`
            insert2 = `select count(listUserId) from lists where listUserId='${userId}'`
            break
    }

    return [getSql(insert1, ''), getSql(insert2, '')]
}

// 根据 updateId 更新视频集 相关信息
function getUpdateSql(body){
    // 获取数据
    const {updateId, listId, listDesc} = body

    let insrt1 = ''
    
    switch(updateId){
        // 更新简介
        case 1:
            insert1 = `update lists set listDesc='${listDesc}', listRelease=${updateId} where listId='${listId}'`
            break
        // 默认 更新视频集
        default:
            insert1 = `update lists set listDesc='${listDesc}', listRelease=${updateId} where listId='${listId}'`
            break
    }

    return [getSql(insert1, '')]
}


// 处理评论内容
function handleCommit(data){

    let commitData = data[3]
    let replyData = data[4]
    let replyTargetData = data[5]

    let replyObj = {}
    

    commitData.forEach((item, index) =>{

        // 看是否存在数组 不存在 创建
        commitData[index].replyData? '': commitData[index].replyData = []

        replyData.forEach((reply, i) =>{
            if(item.commitId === reply.replyCommitId){
                // 回复用户
                const {replyId, replyContent, replyArticleId, 
                        replyCommitId, replyTime, replyUserId, replyTargetId, userName} = reply

                replyObj = {
                    replyId,
                    replyContent,
                    replyUserId,
                    replyTargetId,
                    replyName: userName,
                    replyTargetName: replyTargetData[i].userName,
                    replyAvatar: '',
                    replyTargetAvatar: '',
                    replyArticleId,
                    replyCommitId,
                    replyTime,
                }

                commitData[index].replyData.push(replyObj)
            }
        })
    })

    return commitData
}


// 获取时间
function getTime(){
    const dataTime = new Date()
    return`${dataTime.getFullYear()}-${('0'+(1+dataTime.getMonth())).slice(-2)}-${('0'+dataTime.getDate()).slice(-2)}`
}


// 生成id
function getId(length){
    return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
}

function jwt(req, res, next){

    if(!req.session.userId) return res.json({"msg":"没有权限访问，请先登陆", "code": 401})
    next()
}


module.exports = router