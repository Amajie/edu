<template>
    <div class="my-essay">
        <div class="my-essay-content">
            <div class="nav-item">
                <span
                    v-for="(item, index) in navData"
                    :key="index" 
                    :class="{active: activeIndex === index}"
                    @click="handleNav(index)">{{item.title}}</span>
            </div>
            <div class="content">
                <Table border :columns="titleData" :data="writeData">
                    <template slot-scope="{ row }" slot="articleTitle">
                        <strong @click="$router.push(`/blog/${row.userId}/${row.articleId}`)" class="articleTitle">{{ row.articleTitle }}</strong>
                    </template>
                    <template slot-scope="{ row }" slot="articleTime">
                        <span>{{ row.articleTime | dateTime }}</span>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <div v-show="activeIndex === 0">
                            <Button type="primary" size="small" style="margin-right: 5px" @click="handleEdArticle(row)">编辑</Button>
                            <Button type="error" size="small" @click="handleDeArticle(index)">删除</Button>
                        </div>
                        <div v-show="activeIndex === 1">
                            <Button type="error" size="small" style="margin-right: 5px" @click="handleReCollect(index)">取消收藏</Button>
                        </div>
                    </template>
                </Table>
                <div v-if="writeData.length" class="page">
                    <Page @on-change="handlePage" :current="limit" :total="total" simple />
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import {getMyWrite, getCollectWrite, reCollectWrite, deCollectWrite} from '@/axios/index.js'

export default {
    name: 'myessay',
    data(){
        return {
            activeIndex: 0,
            navData: [
                {title: '发布'},
                {title: '收藏'}
            ],
            titleData: [
                {
                    title: '标题',
                    slot: 'articleTitle',
                    width: 350
                },
                {
                    title: '状态',
                    key: 'articleDraft'
                },
                {
                    title: '评论',
                    key: 'articleCommit'
                },
                {
                    title: '阅读',
                    key: 'articleReader'
                },
                {
                    title: '时间',
                    slot: 'articleTime'
                },
                {
                    title: 'Action',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            writeData: [
                // {
                //     articleTitle: 'John Brown',
                //     articleDraft: 18,
                //     articleCommit: 770,
                //     articleReader: 2999,
                //     articleTime: '2020-10-30'
                // },
                // {
                //     articleTitle: 'John Brown',
                //     articleDraft: 18,
                //     articleCommit: 770,
                //     articleReader: 2999,
                //     articleTime: '2020-10-30'
                // }
            ],
            total: 1,
            limit: 1,
            offset: 1
        }
    },
    created(){
        this.getWrite()
    },
    methods:{
        handleNav(index){

            if(index === this.activeIndex) return

            this.activeIndex = index
            // 先初始化
            Object.assign(this.$data, this.$options.data, {limit: 1, total: 1, writeData: []})
            // 发送请求
            this.handleSend()
        },

        // 收藏
        getCollect(){
            const {limit, offset, targetUserId} = this

            getCollectWrite({
                limit: limit-1,
                offset,
                targetUserId
            }).then(res =>{
                const {code, writeData, writeTotal} = res.data
                this.writeData = writeData
                this.total = Math.ceil(writeTotal / offset) * 10
            })
        },
        // 取消收藏文章
        handleReCollect(index){

             const {handleReDe, targetUserId, writeData, $Modal} = this


            $Modal.confirm({
                title: '提示',
                content: '再犹豫一下吧，我的内容还是很好的',
                cancelText: '取消',
                okText: '确认',
                onOk: () =>{
                    reCollectWrite({
                        targetUserId,
                        articleId: writeData[index].articleId
                    }).then(res =>{
                        handleReDe(res.data.code, index)
                    })
                }
            })
        },
        // 删除文章
        handleDeArticle(index){

            const {handleReDe, writeData, $Modal} = this

            $Modal.confirm({
                title: '提示',
                content: '一旦删除不可找回，是否继续操作？',
                cancelText: '取消',
                okText: '删除',
                onOk: () =>{
                    deCollectWrite({
                        articleId: writeData[index].articleId
                    }).then(res =>{
                        handleReDe(res.data.code, index)
                    })
                }
            })
        },
        // 编辑文章
        handleEdArticle({articleContent, articleTitle, articleId}){
            
            // 先保存到 sessionStorage
            sessionStorage.setItem('editArticle', JSON.stringify({articleContent, articleTitle, articleId}))
            

            this.$parent.handleNav(3)

        },
        // 动态
        getWrite(){
            
            const {limit, offset, targetUserId} = this

            getMyWrite({
                limit: limit-1,
                offset,
                targetUserId
            }).then(res =>{
                const {code, writeData, writeTotal} = res.data
                this.writeData = writeData
                this.total = Math.ceil(writeTotal / offset) * 10
            })
        },
        // 处理分页
        handlePage(limit){
            this.limit = limit
            this.handleSend()
        },
        // 根据 判断 发送动态请求 还是 收藏请求
        handleSend(){
            const {activeIndex, getWrite, getCollect} = this
            // 动态
            if( activeIndex=== 0){
                getWrite()
            // 收藏
            }else{
                getCollect()
            }
        },
        // 处理 取消收藏 和删除文章请求结果
        handleReDe(code, index){

            const {limit, total, handleSend, writeData, $Message} = this

            // 失败
            if(code === 500) return $Message.error('操作失败，请稍后再试')
            
            // 删除本地数据
            writeData.splice(index, 1)
            $Message.success('取消成功')

            // 此时当前页 没有数据 
            // 恰好 当前页 不等于1 此时需要前往上一页
            // 恰好 当前页 等于 1 此时需要重新获取数据g
            if(!writeData.length){
                if(limit != 1){
                    this.limit = limit - 1
                    handleSend()
                // 此时limit正好为 1 无需重置 1
                }else if(total != 1){
                    // 发送数据
                    handleSend()
                }
            }
        }
    },
    props:{
        targetUserId: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="less" scoped>
.my-essay{
    margin-top: 10px;
    .my-essay-content{
        .nav-item{
            margin-bottom: 20px;
            span{
                color: #787d82;
                cursor: pointer;
                margin: 0 5px;
                padding: 10px 20px;
                &.active{
                    background-color: #f3f5f7;
                }
            }
        }
        .content{
            .page{
                margin: 20px 0;
            }
            .articleTitle{
                cursor: pointer;
            }
        }
    }
}
</style>