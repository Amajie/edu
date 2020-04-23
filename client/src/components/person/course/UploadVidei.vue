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
                        <span>取消上传</span>
                    </p>
                    <div>
                        <p>
                            <i :style="{'width': progressWidth}"></i>
                        </p>
                        <span>{{progressWidth}}</span>
                    </div>
                </div>
            </div>
            <!-- 分面设置 -->
            <div class="video-pic">
                <div>
                    <div class="title">
                        <h1>视频封面设置</h1>
                    </div>
                    <div class="content">
                        <div class="left-pic">
                            <img src="../../home/imgs/i1.png">
                            <span>上传封面</span>
                            <input title="上传封面" type="file">
                        </div>
                        <div class="right-pic">
                            <div>
                                <span>可选择以下几个封面</span>
                                <img src="../../home/imgs/i1.png" alt="">
                                <img src="../../home/imgs/i1.png" alt="">
                                <img src="../../home/imgs/i1.png" alt="">
                            </div>
                        </div>
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
                            <input v-model="currentTitle" readonly placeholder="点击<右侧选择>按钮，选择视频集">
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
                            <input placeholder="请输入标题">
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
                            <textarea placeholder="请输入相关简介"></textarea>
                        </div>
                        <p>20/80</p>
                    </div>
                </div>
            </div>
            <div class="video-btn">
                <span class="up" @click="handleMerge">立即上传</span>
                <span class="re">取消上传</span>
            </div>
        </div>
        <Modal 
            v-model="titleModal"
            :transfer="false"
            :closable="false"
            :mask-closable="false"
            width="350"
        >
            <p slot="header" style="color:#f60;text-align:center">
                <span>创建视频集</span>
            </p>
            <div style="text-align:center">
                <input class="create-title" v-model="listTitle" placeholder="请输入视频集标题" />
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
                <ul v-if="listData.length">
                    <li v-for="(item, index) in listData" :key="index"
                        @click="setCurrentTitle(item)"
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

import {setTitle, getTitle, uploadVideoCut, mergeCut} from '@/axios/index'
import axios from 'axios'
export default {
    data(){
        return {
            titleModal: false,
            currentTitle: '',
            listTitle: '',
            titleFlag: false,
            titleLoading: false,
            listData: [],
            // 每个切片的长度
            cutSize:  1000000*10, // 200m 一个切片
            progressWidth: ''
        }
    },
    created(){
        getTitle().then(res =>{
            this.listData = res.data.listData
        })
    },
    methods:{

        // 处理 视频封面
        // 前端应用canvas获取video
        creatImg(video){

            // const canvas = document.createElement('canvas')
            // const ctx = canvas.getContext('2d')
            // const imgHeight = video.videoHeight
            // const imgWidth = video.videoWidth

            // ctx.drawImage(video, 0, 0, imgWidth, imgHeight)

            // const imgSrc = canvas.toDataURL('image/png')

            console.log(video.videoHeight)
        },

        // 获取视频
        getVideo(ev){

            const {cutSize} = this
            const file = ev.target.files[0]
            // 切片起点
            let cutStart = 0
            // 切片个数
            let cutNum = Math.ceil(file.size/cutSize)

            console.log(cutNum)



            let cutList = []
            let index = 0
            let currentLoad = 0

            while(index < cutNum) {
                cutList.push({
                    chunk: file.slice(cutStart, cutStart + cutSize),
                    filename: `${index}-${file.name}`,
                    lastLoaded: 0
                })
                // 切片 七点增加
                cutStart += cutSize

                index++
            }

            cutList = cutList.map(item => {
                const formData = new FormData()
                formData.append('chunk', item.chunk)
                formData.append('filename', item.filename)
                
                return axios({
                    url: '/api/upload_video_cut',
                    method: 'post',
                    data: formData,
                    onUploadProgress: progress =>{

                        let cutLoaded = progress.loaded - item.lastLoaded
                        
                        currentLoad += cutLoaded
                        // 这里需要注意 总的 currentLoad 是比 file.size大的
                        // 因此这里四舍五入  有可能 会超过百分之百 因此这里判断 有没有超过 100
                        const progressNum = (Math.round(currentLoad/file.size*100)/100)*100                     
                        this.progressWidth = (progressNum < 100 ? progressNum.toString().split('.')[0]: 100) + '%' 
                        console.log(file.size, currentLoad)
                        item.lastLoaded = progress.loaded
                    }
                }).then(res =>{
                    // console.log(res)
                    if(res.data.code === 200){
                        index--
                    }

                    // 说明 切片已经发送完毕
                    if(index === 0){
                        // this.handleMerge()
                        console.log('切片上传完毕')
                    }

                })
            })
        },

        // 处理合并切片
        handleMerge(){
            mergeCut().then(res =>{
                console.log(res)
            })
        },


        // 创建视频集合
        handleTitle(){

            const {listTitle, $Message} =this

            if(!listTitle) return $Message.warning('请输入标题')

            // 否则显示loading
            this.titleLoading = true

            // 发送请求
            setTitle({
                listTitle
            }).then(res=>{

                const {code, title} = res.data

                // 失败
                if(code === 500) return $Message.error('创建失败，请稍后再试')
                
                // 关闭 modal
                this.handleclose()
                this.listData.unshift(title)
                $Message.success('创建成功')

            })
        },
        // modal关闭回调
        handleclose(){
            this.titleLoading = false
            this.titleModal = false
            this.listTitle = ''
        },
        // 再次获取数据
        getTitle(){
             getTitle().then(res =>{

                const listData = res.data.listData

                if(!listData.length) return this.$Message.warning('还是没数据呢')
                // 否则设置数据
                this.listData = listData

                this.$Message.success('还真有数据，刚刚应该是迷路了')

            })
        },
        // 选择 视频集
        setCurrentTitle({listUserId, listTitle}){
            // 设置
            this.currentTitle = listTitle
            // 关闭
            this.titleFlag = false
        }
    }
}
</script>

<style lang="less" scoped>
.upload{
    .create-title{
        width: 100%;
        height: 30px;
        margin: 10px 0;
        padding-left: 10px;
        color: #ccd0d7;
        border: 1px solid #ccd0d7;
        border-radius: 5px;
        outline: none;
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
                        i{
                            display: block;
                            position: absolute;
                            left: 0;
                            top: 0;
                            height: 100%;
                            background-color: #000;
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
        // 封面
        .video-pic{
            > div{
                .content{
                    position: relative;
                    height: 120px;
                    .left-pic{
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 200px;
                        height: 100%;
                        cursor: pointer;
                        overflow: hidden;
                        border: 1px dashed #e7e7e7;
                        &:hover span{
                            background-color: #adadad;
                        }
                        input{
                            position: absolute;
                            left: -80px;
                            top: 0;
                            width: 300%;
                            height: 300%;
                            opacity: 0;
                            cursor: pointer;
                        }
                        span{
                            position: absolute;
                            right: 1px;
                            bottom: 1px;
                            color: #fff;
                            padding: 3px;
                            background-color: #999999;
                        }
                        img{
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            width: 40px;
                            height: 40px;
                            margin: -20px;
                        }
                    }
                    .right-pic{
                        position: absolute;
                        left: 250px;
                        top: 0;
                        min-width: 450px;
                        width: calc(100% - 460px);
                        height: 100%;
                        border: 1px dashed #e7e7e7;
                        > div{
                            padding: 5px;
                            span{
                                display: block;
                                font-size: 13px;
                                color: #787d82;
                                margin-bottom: 10px;
                            }
                            img{
                                width: 120px;
                                height: 80px;
                                border-radius: 10px;
                                margin: 0 10px;
                            }
                        }
                    }
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