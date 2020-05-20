<template>
    <div class="play">
        <div class="play-content">
            <!-- 导航栏 -->
            <div class="video-nav">
                <div class="commit">
                    <div class="rate">
                        <Rate allow-half icon="ios-heart" v-model="commitRate" />
                    </div>
                    <div>
                        <textarea v-model="commitContent" placeholder="对课程的评价"></textarea>
                    </div>
                    
                    <Button @click.native="handleCommit" long>提交</Button>
                </div>
                <div class="nav">
                    <ul>
                        <li :class="{active: index === videoIndex}"
                            :title="video.videoTitle"
                            v-for="(video, index) in videoData"
                            :key="video.videoId"
                            @click="handlePlay(video, index)"
                        >
                            <em>{{index + 1}}</em>
                            <span>{{video.videoTitle}}</span>
                            <!-- <i class="icon iconfont">{{index === videoIndex?'&#xe63a;' :'&#xe611;'}}</i> -->
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 视频播放内容 -->
            <VideoShow ref="videoShow"></VideoShow>
        </div>
    </div>
</template>
<script>

import Navbar from '@/components/com/Navbar.vue'
import Footerbar from '@/components/com/Footerbar.vue'
import VideoShow from '@/components/play/VideoShow.vue'

import {getVdetail, insertVideoCommit} from '@/axios/index.js'

export default {
    name: 'play',
    data(){
        return {
            videoData: [],
            listData: {},
            videoIndex: 0,
            commitContent: '',
            commitRate: 0
        }
    },
    created(){

        this.listId = this.$route.params.listId
        // 此时
        this.videoIndex = parseInt(this.$route.params.videoIndex) - 1

        // 发送请求
        getVdetail({listId: this.listId}).then(res =>{
            const {code, detailData} = res.data
            // 获取失败 应该跳转 404
            if(code === 500) return console.log('获取失败')

            this.listData = detailData[0][0]
            this.videoData = detailData[1]

            // 为当前 视频 添加属性
            this.currentVideo = this.videoData[this.videoIndex]
            this.currentVideo.userId = this.listData.userId
            this.currentVideo.videoIndex = this.videoIndex
            
            this.$refs.videoShow.initData(this.currentVideo)
        })
    },

    methods:{
        // 点击列表播放
        handlePlay(video, index){

            const {videoIndex, listData, listId, $router} = this

            if(index === videoIndex) return console.log('点击同一项')

            this.videoIndex = index

            this.currentVideo = {...video, userId: listData.userId, videoIndex: index}

            this.$refs.videoShow.initData(this.currentVideo, true)

            $router.push(`/play/${listId}/${index+1}`)

        },
        // 发表评论
        handleCommit(){
            const {commitContent, commitRate, $Message, videoIndex, listId} = this

            if(!commitContent) return $Message.info('请输入评论内容')
            if(!commitRate) return $Message.info('请选择评分哟')

            // 发送请求
            insertVideoCommit({
                commitContent, 
                commitRate,
                commitVideo: videoIndex + 1, 
                commitListId: listId
            }).then(res =>{

                if(res.data.code === 500) return $Message.error('提交失败，请稍后再试')
                
                $Message.success('感谢您的评论')

                this.commitContent = ''
                this.commitRate = 0


            })

        }
    },

    // watch:{
    //     videoIndex: {
    //         handler(newIndex, oldIndex) {
    //             console.log(newIndex)
    //         },
    //         // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
    //         immediate: false
    //     }
    // },

    components:{
        // 头部
        Navbar,
        // 底部
        Footerbar,
        // 视频播放
        VideoShow
    }
}
</script>
<style lang="less" scoped>
.play{
    width: 100%;
    height: 100%;
    background-color: #68696e;
    .play-content{
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        .video-nav{
            float: right;
            width: 250px;
            height: 100%;
            background-color: #f5f7fa;
            .commit{
                padding: 5px;
                > div{
                    textarea{
                        width: 100%;
                        height: 70px;
                        outline: none;
                        resize: none;
                        padding: 5px;
                        border-radius: 5px;
                        background-color: #f5f7fa;
                        border: 1px solid #ccc;
                    }
                }
            }
            .nav{
                height: calc(100% - 150px);
                overflow: hidden;
                overflow-y: auto;
                ul{
                    padding: 0 5px;
                    font-size: 18px;
                    li{
                        cursor: pointer;
                        margin: 10px 0;
                        &:hover span{
                            color: #2d8cf0;
                        }
                        em{
                            font-style: normal;
                            display: block;
                            float: left;
                            width: 25px;
                            height: 25px;
                            color: #fff;
                            text-align: center;
                            border-radius: 50%;
                            background-color: #21a557;
                        }
                        span{
                            margin: 0 3px;
                        }

                        i{
                            float: right;
                        }
                    }
                    .active{
                        em{
                            background-color: #ed4014;
                        }
                        span{
                            color: #e96900;
                        }
                    }
                }
            }
        }
    }
}
</style>