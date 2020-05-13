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
                        <span>评论 ({{articleData.articleCommit}})</span>
                        <span>点赞 ({{articleData.articleLike}})</span>
                        <span>举报 ({{articleData.articleOppose}})</span>
                        <span>收藏 ({{articleData.articleCollect}})</span>
                    </div>
                    <div class="blog-reader">
                        <div class="blog-body">
                            <div class="blog-title">
                                <h2>{{articleData.articleTitle}}</h2>
                            </div>
                            <div v-html="articleData.articleContent"></div>
                        </div>
                        <div class="blog-opa">
                            <Button ghost icon="ios-heart" type="info">点赞</Button>
                            <Button ghost icon="ios-flash" type="error">举报</Button>
                            <Button ghost icon="ios-flower" type="warning">收藏</Button>
                        </div>
                    </div>
                    <!-- 评论 -->
                    <Commit></Commit>
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


import {getWrite} from '@/axios/index.js'


export default {
    name: 'blog',
    data(){
        return {
            articleData: {},
            userData: {}
        }
    },
    created(){
        getWrite({
            articleUserId: 'soqhusclecw0000000',
            articleId: 't21zuylwbgw0000000'
        }).then(res =>{
            const {code, articleData, userData} = res.data

            // 失败
            if(code === 500) return console.log('获取失败')

            this.articleData = articleData
            this.userData = userData

        })
    },
    methods:{
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