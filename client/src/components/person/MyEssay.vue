<template>
    <div class="my-essay">
        <div class="my-essay-content">
            <div class="nav-item">
                <span
                    v-for="(item, index) in navData"
                    :key="index" 
                    :class="{active: activeIndex === index}"
                    @click="handleNav(index, item.id)">{{item.title}}</span>
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
                        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button>
                        <Button type="error" size="small" @click="remove(index)">删除</Button>
                    </template>
                </Table>
                <div v-if="writeData.length" class="page">
                    <Page :current="limit" :total="total" simple />
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import {getMyWrite} from '@/axios/index.js'

export default {
    name: 'myessay',
    data(){
        return {
            activeIndex: 0,
            navData: [
                {title: '发布', id: 0},
                {title: '收藏', id: 1}
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
            total: 0,
            limit: 1,
            offset: 10
        }
    },
    created(){
        this.getWrite()
    },
    methods:{
        handleNav(index, id){
            this.activeIndex = index
        },

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