<template>
    <div class="search">
        <!-- 作者信息 -->
        <div v-if="searchData.length" class="artile-content">
            <div class="artile-list">
                <div class="artile-item"
                    v-for="item in searchData"
                    :key="item.articleId"
                >
                    <div @click="handleClick(item)" class="artile-title">
                        <div class="title">{{item.articleTitle}}</div>
                    </div>
                    <div class="artile-remark">
                        摘要：
                        <span>
                            {{item.articleContent | filterHtml}}
                        </span>
                        <a class="reader-more" @click="handleClick(item)">阅读更多</a>
                    </div>
                    <div class="artile-copy">
                        <span>posted @ {{item.articleTime | dateTime}}</span>
                        <span>作者 ({{item.userName }})</span>
                        <span>阅读 ({{item.articleReader}})</span>
                        <span>评论 ({{item.articleCommit}})</span>
                        <a class="artile-edit">编辑</a>
                    </div>
                </div>
            </div>
            <!-- 分页 -->
            <div class="blog-pagination">
                <Page :current="1" :total="searchTotal*10" simple />
            </div>
        </div>
        <NoData v-else></NoData>
    </div>
</template>

<script>

import NoData from '@/components/com/NoData.vue'

export default {
    name: 'search',
    data(){
        return {
        }
    },
    methods:{
        // 跳转到阅读列表
        handleClick({userId, articleId}){
            this.$emit('handleNav', {userId, articleId})
        }
    },
    props:{
        searchData: {
            type: Array,
            default: () => ([])
        },
        searchTotal: {
            type: Number,
            default: 0
        },
        handleNav: Function
    },

    components:{
        NoData
    },
    filters:{
        filterHtml(html_str){
            // 摘要截取 200个字符
            return html_str.replace(/<[^<>]+>/g,"").substr(0, 200)
        }
    }
}
</script>

<style lang="less" scoped>

.search{
    .artile-content{
        padding: 10px;
        .artile-list{
            .artile-item{
                border: 1px solid #dedede;
                padding: 10px;
                margin-bottom: 5px;
                &:hover{
                    border: 1px solid #1ea57a;
                }
                .artile-title{
                    margin: 7px 0;
                    .title{
                        cursor: pointer;
                        color: #7e8c8d;
                        font-size: 20px;
                        &:hover{
                            color: #2295ff;
                            text-decoration: underline;
                        }
                    }
                }
                .artile-remark{
                    font-size: 14px;
                    color: #333;
                    line-height: 200%;
                    .reader-more{
                        color: #2295ff;
                        padding-left: 20px;
                        &:hover{
                            color: #1ea57a;
                            text-decoration: underline;
                        }
                    }
                }
                .artile-copy{
                    font-size: 14px;
                    padding: 5px 0;
                    span{
                        padding: 0 5px;
                    }
                    .artile-edit{
                        color: #1ea57a;
                        &:hover{
                            color: #2295ff;
                            text-decoration: underline;
                        }
                    }
                }
            }
        }
        .blog-pagination{
            margin-top: 20px;
        }
    }
}
</style>