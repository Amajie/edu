<template>
     <div class="blog">
        <Navbar>
            <div class="search">
                <Input search style="width: 350px"
                    @on-search="initSearch(true)" 
                    v-model="articleTitle" enter-button 
                    placeholder="请输入关键字" 
                />
            </div>
        </Navbar>
        <div class="blog-main">
            <!-- 推荐技术文章 -->
            <div class="blog-reco">
                <div class="reco">
                    <div @click="toWrite" class="write">
                        <span>写博客</span>
                    </div>
                    <div class="reco-reader">
                        <div class="title">
                            <span>热门博文</span>
                        </div>
                        <ul>
                            <li
                                v-for="item in recoArticle"
                                :key="item.articleId"
                                @click="handleNav(item)"
                            >
                                <i class="icon iconfont">&#xeb99;</i>
                                <span>{{item.articleTitle}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 文章显示 -->
            <div class="blog-content">
                <div v-show="articleFalg" class="blog-article">
                    <!-- 返回阅读列表 -->
                    <span @click="articleFalg = false" 
                        v-show="searchData.length" 
                        class="back-to"
                    >搜索列表</span>
                    <!-- 一开始 是显示搜索界面-->
                    <Article
                        :userData="userData"
                        :commitData="commitData"
                        :articleData="articleData"
                        :users="users"
                        :articleId="articleId"
                    ></Article>
                </div>
                <div v-show="!articleFalg" class="blog-search">
                    <!-- 返回阅读列表 -->
                    <span @click="articleFalg = true" 
                        v-show="articleData.articleId" 
                        class="back-to"
                    >返回阅读</span>
                    <Search 
                        :searchData="searchData" 
                        :searchTotal="searchTotal"
                        @handleNav="handleNav"
                    ></Search>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Navbar from '@/components/com/Navbar.vue'
import Footerbar from '@/components/com/Footerbar.vue'
import Article from '@/components/blog/Article.vue'
import Search from '@/components/blog/Search.vue'


import {getWrite, searchWrite} from '@/axios/index.js'
import {mapState} from 'vuex'

export default {
    name: 'blog',
    data(){
        return {
            articleData: {},
            userData: {},
            commitData: [],
            recoArticle: [],
            searchData: [],
            searchTotal: 0,
            articleId: '',
            articleTitle: '',
            articleFalg: false
        }
    },
    created(){

        // 获取数据
        const {userId, articleId} = this.$route.params
        // 获取这个 文章的id
        this.articleId = articleId

        // 搜索
        if(userId === 'article' && articleId === 'search'){
            this.getArticle()
        }else{
            this.getArticle(userId, articleId)
        }
        
    },
    computed:{
        ...mapState([
            'users'
        ])
    },

    watch:{
        searchData(newData, oldData){
            this.articleFalg = false
        }
    },
    methods:{
        // 非搜索界面的文章 和热门话题
        getArticle(userId, articleId){
            // 发送请求
            getWrite({
                articleUserId: userId,
                articleId
            }).then(res =>{
                const {code, articleData, userData, commitData, recoArticle} = res.data

                // 失败 
                if(code === 500) return console.log('获取失败')

                // userId 存在 才设置 否则 就只要获取热门话题即可
                if(userId){
                    this.articleData = articleData
                    this.userData = userData
                    this.commitData = commitData
                    this.articleFalg = true
                }
                this.recoArticle = recoArticle

            })
        },

        // 点击热门列表文章 获取内容
        handleNav({userId, articleId}){
            console.log(12321321)
            // 查看同一篇文章 无需在发生
            if(articleId === this.articleId) return this.articleFalg = true

            this.getArticle(userId, articleId)
            this.articleId = articleId
            this.$router.replace(`/blog/${userId}/${articleId}`)
        },
        // 搜索
        initSearch(){
            
            const {articleTitle, $Message} = this

            if(!articleTitle) return $Message.info('请输入关键字')

            // 发送搜索请求
            searchWrite({
                articleTitle
            }).then(res =>{

                const {searchData, searchTotal} = res.data

                this.searchData = searchData

                // token存在 才需要设置
                searchTotal && (this.searchTotal = searchTotal)

            })
        },
        // 前往写博客
        toWrite(){
            this.$router.push(`/person/${this.users.userId}/3`)
        }
    },
    components:{
        Navbar,
        Footerbar,
        Article,
        Search
    }
    
}
</script>

<style lang="less" scoped>
.blog{
    min-height: 100%;
    background: #f2f4f6;
    .blog-main{
        width: 1200px;
        margin: 0 auto;
        padding: 20px 0;
        .blog-reco{
            width: 280px;
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
            .blog-article{
                padding: 20px;
            }
            .blog-search{
                padding: 20px;
            }
            .back-to{
                color: #9999a6;
                cursor: pointer;
                &:hover{
                    text-decoration: underline;
                }
            }
        }
    }
}
</style>