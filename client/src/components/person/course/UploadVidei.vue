<template>
    <div class="upload">
        <div class="upload-content">
            <!-- 视频上传 -->
            <div class="video">
                <div v-if="!progressWidth" class="btn-desc">
                    <div class="btn">
                        <span>上传视频</span>
                        <input @change="getVideo($event)" type="file">
                    </div>
                    <div class="desc">
                        <span>当前审核队列</span>
                        <span class="info">繁忙</span>
                    </div>
                </div>
                <div v-else class="progress">
                    <p>
                        <span>{{uplodaVideoText}}</span>
                    </p>
                    <div>
                        <p>
                            <i :style="{'width': progressWidth, backgroundColor: progressWidth === '100%'? '#43ce5b': '#000'}"></i>
                        </p>
                        <span>{{progressWidth}}</span>
                    </div>
                </div>
            </div>
            <!-- 视频集 -->
            <div class="video-title">
                <div>
                    <div class="title">
                        <h1>视频集</h1>
                        <span @click="titleModal = true">创建</span>
                    </div>
                    <div class="print select-title">
                        <div class="input">
                            <input v-model="selectTitle" readonly placeholder="点击<右侧选择>按钮，选择视频集">
                        </div>
                        <p @click="titleFlag = true">选择</p>
                    </div>
                </div>
            </div>
            <!-- 标题 -->
            <div class="video-title">
                <div>
                    <div class="title">
                        <h1>标题</h1>
                    </div>
                    <div class="print">
                        <div class="input">
                            <input v-model="videoTitle" placeholder="请输入标题">
                        </div>
                        <p>20/80</p>
                    </div>
                </div>
            </div>
            <!-- 简介 -->
            <div class="video-desc">
                <div>
                    <div class="title">
                        <h1>简介</h1>
                    </div>
                    <div class="print">
                        <div class="input">
                            <textarea v-model="videoDesc" placeholder="请输入相关简介"></textarea>
                        </div>
                        <p>20/80</p>
                    </div>
                </div>
            </div>
            <div class="video-btn">
                <span class="up" @click="sendVideo">立即上传</span>
                <span class="re" @click="clearData">一键清空</span>
            </div>
        </div>
        <Modal 
            v-model="titleModal"
            :transfer="false"
            :closable="false"
            :mask-closable="false"
            width="380"
        >
            <p slot="header" style="color:#f60;text-align:center">
                <span>创建视频集</span>
            </p>
            <div class="type">
                <Select v-model="listType" @on-change="getType" placeholder="选择分类" style="width:120px; marginRight:10px">
                    <Option :value="item.title"
                        v-for="(item, index) in typeArr"
                        :key="index"
                    >{{item.title}}</Option>
                </Select>
                <Select v-model="listDirection" placeholder="选择方向" style="width:120px">
                    <Option :value="child"
                        v-for="(child, index) in directionArr"
                        :key="index"
                    >{{child}}</Option>
                </Select>
            </div>

            <div style="text-align:center">
                <input class="create-title" v-model="listTitle" placeholder="请输入视频集标题" />
                <div class="upload-video-pic">
                    <div>
                        <div class="upload">
                            <input @change="getPoster" type="file">
                            <span>上传封面</span>
                        </div>
                        <div class="pic">
                            <img v-if="!showPoster" src="../imgs/page_pic.png">
                            <img v-else class="show-poster" :src="showPoster">
                        </div>
                    </div>
                </div>
            </div>
            <div class="video-grade">
                <RadioGroup v-model="listGrade">
                    <Radio label="1" >初级课程</Radio>
                    <Radio label="2">进阶能手</Radio>
                    <Radio label="3">高级无敌</Radio>
                </RadioGroup>
            </div>
            <div slot="footer">
                <Button @click.native="handleclose">取消</Button>
                <Button @click.native="handleTitle" :loading="titleLoading" type="error">创建</Button>
            </div>
        </Modal>
        <div v-if="titleFlag" @click.stop class="title-list">
            <div class="bg"></div>
           
            <div class="list" >
                <div title="关闭" @click="titleFlag = false" class="close">
                    <Icon size="30" type="md-close" />
                </div>
                <ul v-if="courseData.length">
                    <li v-for="(item, index) in courseData" :key="index"
                        @click="setselectTitle(item)"
                    >{{item.listTitle}}</li>
                </ul>
                <div v-else class="no-title">
                    <!-- 点击创建 关闭当前 打开创建面板 -->
                    <p>
                        <span>没有视频集？</span>
                        <Button type="error" @click.native="titleModal = true; titleFlag = false">点击创建</Button>
                    </p>
                    <p>
                        <span>我有视频集？</span>
                        <Button type="info" @click.native.stop="getTitle">点击刷新</Button>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

import {setTitle, getCourse, insertVideo} from '@/axios/index'
import axios from 'axios'
export default {
    data(){
        return {
            titleModal: false,
            selectTitle: '',
            listTitle: '',
            listId: '',
            listGrade: '1',
            listPoster: '',
            showPoster: '',
            listType: '',
            listDirection: '',
            filename: '',
            videoDesc: '',
            videoTitle:'',
            titleFlag: false,
            titleLoading: false,
            courseData: [],
            // 每个切片的长度
            cutSize:  1000000*200, // 200m 一个切片
            cutNum: 5, // 最多切片的个数
            cutList: [],
            currentLoad: 0, // 当前下载的量
            fileSize: 0, // 视频的大小
            uplodaVideoText: '取消上传',
            typeArr:[
                {
                    title: '前端开发',
                    child: ['HTML5', 'CSS', 'javascript', 'Vue.js', 'React', 'Angular', 'jQuuery', '移动端开发']
                },
                {
                    title: '服务器开发',
                    child: ['node', 'java', 'python', 'php', 'ASP', 'JSP', 'C语言', 'C++', 'C#']
                },
                {
                    title: '数据库开发',
                    child: ['Oracle', 'MySQL', 'SQL Server', 'MongoDB']
                },
            ],
            directionArr: []
        }
    },
    created(){
        getCourse().then(res =>{
            this.courseData = res.data.courseData
        })
    },
    methods:{

        // 获取视频
        getVideo(ev){

            let {cutSize, cutNum} = this

            const file = ev.target.files[0]
            // 设置大小
            this.fileSize = file.size
            // 先清除数据
            this.cutList = []

            // 先判断 切片 个数是否大于 cutNum
            // 判断file.size  cutSize*cutNum 的大小即可
            if(file.size <= cutSize*cutNum){
                // 切片个数
                cutNum = Math.ceil(file.size/cutSize)
            // 否则切片个数为 cutNum 求 cutSize
            }else{
                cutSize = file.size/cutNum
            }


            let index = 0
            // 切片起点
            let cutStart = 0
            // 设置文件名字
            this.filename = Date.now() + file.name

            while(index < cutNum) {
                this.cutList.push({
                    chunk: file.slice(cutStart, cutStart + cutSize),
                    filename: this.filename,
                    index,
                    lastLoaded: 0
                })
                // 切片 七点增加
                cutStart += cutSize

                index++
            }


            this.sendVideoCut(this.cutList[0])

        },


        // 发送 切片
        sendVideoCut(videoData){
            
            const formData = new FormData()
            formData.append('chunk', videoData.chunk)
            formData.append('filename', videoData.filename)
            formData.append('index', videoData.index)

            axios({
                url: '/api/upload_video_cut',
                method: 'post',
                data: formData,
                onUploadProgress: progress =>{

                    let cutLoaded = progress.loaded - videoData.lastLoaded
                    
                    this.currentLoad += cutLoaded

                    // // 保存当前 上传大小
                    videoData.lastLoaded = progress.loaded
                }
            }).then(res =>{
                const {code, index} = res.data
                if(code === 200){
                    this.cutList[index] && this.sendVideoCut(this.cutList[index])
                }else{
                    // 说明 失败了 发送请求 删除切片

                }                        
            })
        },

        // 提交视频信息内容
        sendVideo(){
            const {listId, filename, videoDesc, videoTitle, $Message} = this
            // 默认为false
            let msg = false
            // 一旦有数据不符合 相当于设置 为true
            if(!filename){
                msg = '还没上传视频哦'
            }else if(!listId){
                msg = '请选择视频集'
            }else if(!videoTitle){
                msg = '请输入视频标题'
            }

            // 为 true 提示相应的信息
            if(msg) return $Message.warning(msg)

            // 发送请求
            insertVideo({
                listId, filename, videoDesc, videoTitle
            }).then(res =>{
                if(res.data.code === 200){
                   this.clearData()
                   $Message.success('提交成功')
                }
            })
        },

        // 初始化数据
        clearData(){
            Object.assign(this.$data, this.$options.data(), {courseData: this.courseData})
        },

        // 创建视频集合
        handleTitle(){

            const {listTitle, listPoster, listGrade, listType, listDirection, $Message} =this

            if(!listType) return $Message.warning('请选择分类')
            if(!listDirection) return $Message.warning('请选择方向')
            if(!listTitle) return $Message.warning('请输入标题')
            if(!listPoster) return $Message.warning('请上传封面')

            // 否则显示loading
            this.titleLoading = true


            const formData = new FormData()

            formData.append('listTitle', listTitle)
            formData.append('listPoster', listPoster)
            formData.append('listGrade', listGrade)
            formData.append('listType', listType)
            formData.append('listDirection', listDirection)

            // 发送请求
            setTitle(formData).then(res=>{

                const {code, title} = res.data

                // 失败
                if(code === 500){
                    this.titleLoading = false
                    return $Message.error('创建失败，请稍后再试')
                }
                
                // 关闭 modal
                this.handleclose()
                this.courseData.unshift(title)
                $Message.success('创建成功')

            })
        },

        // 获取封面
        getPoster(ev){

            this.listPoster = ev.target.files[0]
            const WURL = window.URL || window.webkitURL || window.mozURL
            
            this.showPoster = WURL.createObjectURL(this.listPoster)


        },
        // modal关闭回调
        handleclose(){
            this.titleLoading = false
            this.titleModal = false
            this.showPoster = ''
            this.listGrade = '1'
            this.listTitle = ''
        },
        // 再次获取数据
        getTitle(){
             getTitle().then(res =>{

                const courseData = res.data.courseData

                if(!courseData.length) return this.$Message.warning('还是没数据呢')
                // 否则设置数据
                this.courseData = courseData

                this.$Message.success('还真有数据，刚刚应该是迷路了')

            })
        },
        // 获取分类
        getType(name){

            const index = this.typeArr.findIndex(item => item.title === name)

            this.directionArr = this.typeArr[index].child

            console.log(this.directionArr)
        },
        // 选择 视频集
        setselectTitle({listUserId, listTitle, listId}){
            // 设置
            this.selectTitle = listTitle
            this.listId = listId
            // 关闭
            this.titleFlag = false
        }
    },
    computed:{
        progressWidth(){
            
            // 如果为 0 表示没上传文件 返回 0 即可
            if(!this.fileSize) return 0
            // 否则 获取百分比 this.currentLoad 为当前下载量 this.fileSize为视频大小
            const progressNum = (Math.round(this.currentLoad/this.fileSize*100)/100)*100
            // 这里需要注意 总的 currentLoad 是比 file.size大的
            // 因此这里四舍五入  有可能 会超过百分之百 因此这里判断 有没有超过 100
            return (progressNum < 100? progressNum.toString().split('.')[0]: 100) + '%'     
        }
    },
    watch:{
        progressWidth(newVal, oldVal){
           // 此时 判断是否上传完毕
           if(newVal === '100%'){
               this.uplodaVideoText = '删除视频'
           }
        }
    }
}
</script>

<style lang="less" scoped>
.upload{
    .create-title{
        width: 100%;
        height: 30px;
        margin-bottom: 10px;
        padding-left: 10px;
        color: #ccd0d7;
        border: 1px solid #ccd0d7;
        border-radius: 5px;
        outline: none;
    }
    .type{
        margin-bottom: 16px;
    }
    .video-grade{
        margin-top: 16px;
    }
    .upload-video-pic{
        > div{
            height: 100px;
            padding: 5px;
            border: 1px dashed #e7e7e7;
            .upload{
                position: relative;
                width: 130px;
                height: 90px;
                float: left;
                overflow: hidden;
                border: 1px dashed #e7e7e7;
                input{
                    position: absolute;
                    left: -80px;
                    top: 0;
                    width: 300%;
                    height: 300%;
                    opacity: 0;
                    z-index: 3;
                    cursor: pointer;
                }
                span{
                    line-height: 90px;
                    font-size: 13px;
                }
            }
            .pic{
                position: relative;
                float: left;
                width: 130px;
                height: 90px;
                margin-left: 10px;
                background-color: #f3f5f7;
                border: 1px dashed #e7e7e7;
                img{
                    width: 30px;
                    height: 30px;
                    margin: 30px 50px;
                }
                .show-poster{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    margin: 0;
                }
            }
        }
    }
     // 视频集合
    .title-list{
        position: fixed;
        left: 0;
        top: 0;
        top: 0;
        width: 100%;
        height: 100%;
        .bg{
            width: 100%;
            height: 100%;
            opacity: 0.75;
            background-color: #3b3b3b;
        }
        .list{
            position: absolute;
            top: 50%;
            left: 50%;
            width: 520px;
            height: 270px;
            overflow: hidden;
            margin-left: -260px;
            margin-top: -135px;
            padding: 20px;
            border-radius: 10px;
            background-color: #fff;
            ul{
                width: 480px;
                height: 220px;
                padding: 0 10px;
                overflow: hidden;
                overflow-y: auto;
                li{
                    cursor: pointer;
                    color: #515a6e;
                    margin: 5px 0;
                    border-radius: 5px;
                    padding: 5px 0 5px 10px;
                    font-size: 14px;
                    &:hover{
                        background-color: #f3f3f3;
                    }
                }
            }
            .no-title{
                width: 200px;
                margin: 70px auto 0;
                p{
                    margin: 10px 0;
                }
            }
        }
        .close{
            position: absolute;
            right: 0;
            top: 0;
            cursor: pointer;
            padding: 1px;
        }
    }
    .upload-content{
        padding: 20px;
        .video{
            position: relative;
            height: 170px;
            border-radius: 10px;
            border: 1px dashed #e7e7e7;
            .btn-desc{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                .btn{
                    position: relative;
                    width: 130px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    color: #fff;
                    cursor: pointer;
                    border-radius: 5px;
                    overflow: hidden;
                    background-color: #00a1d6;
                    &:hover{
                        background-color: #1cade3;
                    }
                    input{
                        position: absolute;
                        width: 300%;
                        height: 300%;
                        left: -80px;
                        top: 0px;
                        opacity: 0;
                        cursor: pointer;;
                    }
                }
                .desc{
                    font-size: 13px;
                    color: #ccc;

                    margin-top: 10px;
                    .info{
                        padding: 3px 8px;
                        margin-left: 5px;
                        color: #fff;
                        border-radius: 3px;
                        background-color: #ffbd2d;
                    }
                }
            }
            .progress{
                padding: 0 10px;
                width: 100%;
                height: 50px;
                position: absolute;
                top: 50%;
                left: 0;
                margin-top: -25px;
                > p{
                    text-align: right;
                    margin-bottom: 10px;
                    // 取消上传
                    span{
                        cursor: pointer;
                        &:hover{
                            text-decoration: underline;
                        }
                    }
                }
                > div{
                    height: 20px;
                    > p{
                        position: relative;
                        width: 95%;
                        height: 6px;
                        margin-top: 7px;
                        float: left;
                        border-radius: 5px;
                        overflow: hidden;
                        background-color: #e7e7e7;
                        // 进度条颜色
                        i{
                            display: block;
                            position: absolute;
                            left: 0;
                            top: 0;
                            height: 100%;
                        }
                        // 成功颜色
                        .success{
                            background-color: #43ce5b;
                        }
                    }
                    
                    > span{
                        display: block;
                        float: right;
                    }
                }
            }
        }

        // 标题统一设置
        .title{
            margin: 20px 0;
            h1{
                display: inline-block;
                font-size: 18px;
                color: #7c8182;
            }
            > span{
                float: right;
                color: #ccd0d7;
                padding: 4px 10px;
                cursor: pointer;
                border-radius: 5px;
                background-color: #f3f5f7 ;
                &:hover{
                    color: #7c8182;
                }
            }
        }
        // 标题
        .video-title{
            margin: 40px 0;
            position: relative;
            .print{
                height: 40px;
                padding: 0 10px;
                border-radius: 5px;
                border: 1px solid #ccd0d7;
                > div{
                    float: left;
                    width: 93%;
                    input{
                        width: 100%;
                        height: 36px;
                        border: none;
                        outline: none;
                    }
                }
                p{
                    float: right;
                    color: #ccd0d7;
                    line-height: 40px;
                }
            }
            // 选择视频集
            .select-title{
                padding-right: 0;
                p{
                    cursor: pointer;
                    padding: 0 10px;
                    &:hover{
                        color: #666;
                    }
                }
            }
        }
        // 描述
        .video-desc{
            .print{
                height: 100px;
                padding: 10px 10px;
                border-radius: 5px;
                border: 1px solid #ccd0d7;
                > div{
                    float: left;
                    width: 100%;
                    textarea{
                        width: 100%;
                        height: 60px;
                        border: none;
                        outline: none;
                    }
                }
                p{
                    float: right;
                    color: #ccd0d7;
                }
            }
        }
        .video-btn{
            margin-top: 30px;
            span{
                color: #838383;
                padding: 10px 20px;
                margin: 0 10px;
                cursor: pointer;
                border-radius: 5px;
                border: 1px solid #cccccc;
                &.up{
                    color: #fff;
                    background-color: #1aabda;
                    &:hover{
                        background-color: #42b5da;
                    }
                }
                &.re{
                    color: #838383;
                    &:hover{
                        color: #9494b6;
                    }
                }
            }
        }
    }
}
</style>