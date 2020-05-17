<template>
     <div class="blog">
        <Navbar></Navbar>
        

        <div class="blog-main">
            <!-- 推荐技术文章 -->
            <div class="blog-reco">
                <div class="reco">
                    <div class="write">
                        <span>写博客</span>
                    </div>
                    <div class="reco-reader">
                        <div class="title">
                            <span>热门话题</span>
                        </div>
                        <ul>
                            <li>
                                <i class="icon iconfont">&#xeb99;</i>
                                <span>行业大牛 ，细说PHP作者，现身PHP中文网直播送书300本，PHP中文网学员超级福利！</span>
                            </li>
                            <li>
                                <i class="icon iconfont">&#xeb99;</i>
                                <span>行业大牛 ，细说PHP作者，现身PHP中文网直播送书300本，PHP中文网学员超级福利！</span>
                            </li>
                            <li>
                                <i class="icon iconfont">&#xeb99;</i>
                                <span>行业大牛 ，细说PHP作者，现身PHP中文网直播送书300本，PHP中文网学员超级福利！</span>
                            </li>
                            <li>
                                <i class="icon iconfont">&#xeb99;</i>
                                <span>行业大牛 ，细说PHP作者，现身PHP中文网直播送书300本，PHP中文网学员超级福利！</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 文章显示 -->
            <div class="blog-content">
                <div class="blog-wrap">
                    <!-- 作者信息 -->
                    <div class="blog-info">
                        <span>作者：{{userData.userName}}</span>
                        <span>时间：{{articleData.articleTime | dateTime}}</span>
                        <span>阅读 ({{articleData.articleReader}})</span>
                        <span>评论 ({{articleData.articleCommit }})</span>
                        <span>点赞 ({{likeList | filterNum}})</span>
                        <span>举报 ({{opposeList | filterNum}})</span>
                        <span>收藏 ({{collectList | filterNum}})</span>
                    </div>
                    <div class="blog-reader">
                        <div class="blog-body">
                            <div class="blog-title">
                                <h2>{{articleData.articleTitle}}</h2>
                            </div>
                            <div v-html="articleData.articleContent"></div>
                        </div>
                        <div class="blog-opa">
                            <Button :ghost="!likeFlag" icon="ios-heart" @click.native="handleUpWrite(1)" type="info">
                                {{likeFlag? '已': ''}}点赞
                            </Button>
                            <Button :ghost="!opposeFlag" icon="ios-flash" @click.native="handleUpWrite(2)" type="error">
                                {{opposeFlag? '已': ''}}举报
                            </Button>
                            <Button :ghost="!collectFlag" icon="ios-flower" @click.native="handleUpWrite(3)" type="warning">
                                {{collectFlag? '已': ''}}收藏
                            </Button>
                        </div>
                    </div>
                    <!-- 评论 -->
                    <Commit
                        :userName="users.userName"
                        :commitData="commitData"
                        :commitArticleId="articleId"
                        :userId="users.userId"
                    ></Commit>
                </div>
            </div>
        </div>
        <Footerbar></Footerbar>
    </div>
</template>

<script>

import Navbar from '@/components/home/Navbar.vue'
import Footerbar from '@/components/home/Footerbar.vue'
import Commit from '@/components/blog/Commit.vue'


import {getWrite, upWrite} from '@/axios/index.js'
import {mapState} from 'vuex'

export default {
    name: 'blog',
    data(){
        return {
            articleData: {},
            userData: {},
            commitData: [],
            likeList: '',
            opposeList: '',
            collectList: '',
            articleId: ''
        }
    },
    created(){

        // 获取数据
        const {userId, articleId} = this.$route.params
        // 获取这个 文章的id
        this.articleId = articleId
        // 发送请求
        getWrite({
            articleUserId: userId,
            articleId
        }).then(res =>{
            const {code, articleData, userData, commitData} = res.data

            // 失败 
            if(code === 500) return console.log('获取失败')

            this.articleData = articleData
            this.userData = userData
            this.commitData = commitData

            this.likeList = articleData.likeList
            this.opposeList = articleData.opposeList
            this.collectList = articleData.collectList
        })
    },
    computed:{
        ...mapState([
            'users'
        ]),
        likeFlag(){
            return this.likeList.indexOf(this.users.userId) != -1    
        },
        opposeFlag(){
            return this.opposeList.indexOf(this.users.userId) != -1
        },
        collectFlag(){
            return this.collectList.indexOf(this.users.userId) != -1
        },
    },
    methods:{
        // 发送请求
        handleUpWrite(readerId){

            const {likeList, opposeList, collectList, articleId,
                likeFlag, opposeFlag, collectFlag, users, $Message} = this

            // 无需进行重复操作
            if((readerId === 1 && likeFlag) || (readerId === 2 && opposeFlag) || 
                (readerId === 3 && collectFlag)) return console.log('重复')

            // 否则发送请求
            upWrite({
                readerId,
                articleId
            }).then(res =>{
                // 失败
                if(res.data.code === 500) 
                    return $Message.error('操作失败，请稍后再试')
                // 点赞操作
                if(readerId === 1){
                    $Message.success('感谢点赞')
                    this.likeList += `${users.userId}|`
                // 举报操作
                }else if(readerId === 2){
                    $Message.success('举报成功')
                    this.opposeList += `${users.userId}|`
                // 收藏操作
                }else{
                    $Message.success('感谢收藏')
                    this.collectList += `${users.userId}|`
                }
            })
        }
    },

    filters:{
        filterNum(list){

            return list.split('|').filter(n => n).length

        }
    },
    components:{
        Navbar,
        Footerbar,
        Commit
    }
    
}
</script>

<style lang="less" scoped>
.blog{
    min-height: 100%;
    background: #f2f4f6;
    .blog-main{
        width: 1200px;
        margin: 20px auto;
        min-height: 100%;
        .blog-reco{
            width: 280px;
            height: 300px;
            float: right;
            .reco{
                .write{
                    cursor: pointer;
                    color: #fff;
                    text-align: center;
                    padding: 5px 0;
                    margin-bottom: 10px;
                    background-color: #5fb878;
                    &:hover{
                        background-color: #7cc390;
                    }
                }
                .reco-reader{
                    background-color: #fff;
                    .title{
                        padding: 0 15px;
                        height: 50px;
                        line-height: 50px;
                        border-bottom: 1px solid #f0f0f0;
                        background-color: #fbfbfb;
                    }
                    ul{
                        li{
                            height: 35px;
                            padding: 0 3px;
                            cursor: pointer;
                            line-height: 35px;
                            &:hover span{
                                color: #000;
                            }
                            i{
                                float: left;
                                margin-right: 10px;
                            }
                            span{
                                display: block;
                                width: 240px;
                                color: #9999a6;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
                    }
                }
            }
        }
        .blog-content{
            margin-right: 300px;
            background-color: #fff;
            .blog-wrap{
                padding: 20px;
                .blog-info{
                    span{
                        margin-right: 20px;
                    }
                }
                .blog-reader{
                    .blog-body{
                        .blog-title{
                            margin: 15px 0;
                        }
                    }
                    .blog-opa{
                        margin: 30px 0;
                        button{
                            margin-right: 20px;
                        }
                    }
                }
            }
        }
    }
}
</style>