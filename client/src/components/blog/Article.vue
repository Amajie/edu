<template>
    <div class="article">
        <!-- 作者信息 -->
        <div class="article-wrap">
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
                    <div  v-html="articleData.articleContent"></div>
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
        </div>
        <!-- 评论 -->
        <Commit
            :userName="users.userName"
            :commitData="commitData"
            :commitArticleId="articleId"
            :userId="users.userId"
            :userAvatar="users.userAvatar"
        ></Commit>
    </div>
</template>

<script>

import Commit from '@/components/blog/Commit.vue'


import {getWrite, upWrite} from '@/axios/index.js'

export default {
    name: 'articleinfo',
    data(){
        return {
            likeList: '|',
            opposeList: '|',
            collectList: '|',
        }
    },
    computed:{
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
                articleId,
                userId: users.userId
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
    watch:{
        articleData(newData, oldData){
            this.likeList = newData.likeList
            this.opposeList = newData.opposeList
            this.collectList = newData.collectList
        }
    },
    props:{
        articleData: {
            type: Object,
            default: () => ({})
         },
        userData: {
            type: Object,
            default: () => ({})
        },
        users: {
            type: Object,
            default: () => ({})
        },
        commitData: {
            type: Array,
            default: () => ([])
        },
        articleId: {
            type: String,
            default: ''
        },
    },
    components:{
        Commit
    }
    
}
</script>

<style lang="less" scoped>

.article{
    .article-wrap{
        .blog-info{
            padding-top: 10px;
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
</style>