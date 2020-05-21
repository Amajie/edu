<template>
    <div class="my-video">
        <div v-if="courseData.length" class="my-video-content">
            <div class="video-list">
                <ul class="list-wrap">
                    <li
                        v-for="(item, index) in courseData"
                        :key="item.listId"
                    >
                        <h2 class="title">{{item.listTitle}}</h2>
                        <div class="content">
                            <div class="poster">
                                <img :src="item.listPoster">
                            </div>
                            <div class="info">
                                <div class="desc">
                                    简介：
                                    <span>
                                        {{item.listDesc? item.listDesc: '暂无简介'}}
                                    </span>
                                </div>
                                <div class="other">
                                    <span>{{item.listGrade | grade}}</span>
                                    <span>点击量：{{item.listClick}} 次</span>
                                    <span>时间：{{item.listTime | dateTime}}</span>
                                    <span>评论：{{item.listCommit}} 条</span>
                                </div>
                            </div>
                        </div>
                        <div class="op">
                            <Dropdown>
                               <Button >
                                    操作
                                    <Icon type="ios-arrow-down"></Icon>
                                </Button>
                                <DropdownMenu v-show="!activeIndex" slot="list">
                                    <DropdownItem>视频详情</DropdownItem>
                                    <DropdownItem v-if="isUser" >删除视频</DropdownItem>
                                    <DropdownItem v-if="isUser" @click.native="showModal(item, index)">{{item.listRelease === 0? '我要发布': '编辑简介'}}</DropdownItem>
                                </DropdownMenu>
                                <DropdownMenu v-show="activeIndex === 1" slot="list">
                                    <DropdownItem>视频详情</DropdownItem>
                                    <DropdownItem v-if="isUser" @click.native="reCollect(item.listId, index)">取消收藏</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div v-show="!activeIndex" :class="['pro', {success: item.listRelease === 1}]">
                            <span>
                                {{item.listRelease === 0? '未发布': '已发布'}}
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-if="courseTotal" class="page">
                <Page @on-change="handlePage" :current="limit" :total="courseTotal*10" simple />
            </div>
        </div>
        <NoData v-else />
        <!-- 简介框 -->
        <Modal 
            v-model="descModal"
            :transfer="false"
            :closable="false"
            :mask-closable="false"
            width="350"
        >
            <p slot="header" style="color:#f60;text-align:center">
                <span>编写简介</span>
            </p>
            <div style="text-align:center">
                <div class="edit-desc">
                    <textarea v-model="listDesc" placeholder="请输入相关简介" ></textarea>
                </div>
            </div>
            <div slot="footer">
                <Button @click.native="handleclose">取消</Button>
                <Button @click.native="handleSubmit" :loading="loading" type="error">发布</Button>
            </div>
        </Modal>
    </div>
</template>

<script>

import NoData  from '@/components/com/NoData.vue'

import {getCourse, upList, getCollectVideo, reCollectVideo} from '@/axios/index'

export default {
    data(){
        return {
            courseData: [],
            courseTotal: 0,
            descModal: false,
            loading: false,
            listDesc: '',
            listId: '', // 编辑简介视频集 id
            listIndex: '', // 编辑简介视频集 索引
            limit: 1,
            offset: 5,
            courseId: 1,
            users: {},
            isUser: false
        }
    },
    created(){

        // 获取用户的id
        this.targetUserId = this.$route.params.targetUserId
        
        const {activeIndex, sendRequest, sendCollect, $store} = this

        // 获取users
        this.users = this.$cookies.get('users')


        if(this.users && this.users.userId === this.targetUserId){
            this.isUser = true
        }

        if(this.activeIndex === 0){
            // 如果不是用户本人 则不能获取未发布的的视频
            // 设置 courseId = =2 即可
            this.courseId = this.isUser? 1: 2
        }else{
            // 获取收藏
            this.courseId = 3
        }

         // 发送请求
        sendRequest()
    },
    methods:{
        handleclose(){
            this.descModal = false
            this.listDesc = ''
        },

        // 发布视频
        handleSubmit(){
            const {courseData, listDesc, listIndex, courseTotal, $Message, listId} = this
            // 内容为空
            if(!listDesc) return $Message.warning('请输入相关简介')

            upList({
                listId, listDesc, updateId: 1
            }).then(res =>{

                const {code} = res.data

                if(code === 500) return $Message.success('发布成功')

                this.listDesc = ''
                this.courseData.splice(listIndex, 1)
                this.courseTotal = courseTotal - 1

                $Message.success('发布成功')

            })
        },

        // 发送请求获取数据
        sendRequest(){

            const {limit, offset, targetUserId, courseId} = this

            getCourse({
                courseId,
                limit: limit - 1,
                offset,
                userId: targetUserId
            }).then(res =>{

                const {code, courseData, courseTotal} = res.data

                if(code === 200){
                    this.courseData = courseData
                    this.courseTotal = Math.ceil(courseTotal/offset)
                }
            })
        },

        // 取消收藏
        reCollect(listId, index){
            const {targetUserId, courseId, users, handleReDe, $Modal} = this

            $Modal.confirm({
                title: '提示',
                content: '再犹豫一下吧，我的内容还是很好的',
                cancelText: '取消',
                okText: '确认',
                onOk: () =>{
                    reCollectVideo({
                        listId,
                        targetUserId: users.userId
                    }).then(res =>{
                        handleReDe(res.data.code, index)
                    })
                }
            })
        },

        // 处理 取消收藏 和删除文章请求结果
        handleReDe(code, index){

            const {limit, courseTotal, sendRequest, courseData, $Message} = this

            // 失败
            if(code === 500) return $Message.error('操作失败，请稍后再试')
            
            // 删除本地数据
            courseData.splice(index, 1)
            $Message.success('取消成功')

            // 此时当前页 没有数据 
            // 恰好 当前页 不等于1 此时需要前往上一页
            // 恰好 当前页 等于 1 此时需要重新获取数据g
            if(!courseData.length){
                if(limit != 1){
                    this.limit = limit - 1
                    sendRequest()
                }else if(courseTotal != 1){
                    // 发送数据
                    sendRequest()
                }
            }
        },

        // 处理分页
        handlePage(limit){
            this.limit = limit
            this.sendRequest()
        },
        // 显示 简介 对话框
        showModal({listId}, listIndex){
            this.listId = listId
            this.listIndex = listIndex
            this.descModal = true
        }
    },
    props: {
        activeIndex: {
            type: Number,
            default: 0
        }
    },
    components:{
        NoData
    }
}
</script>

<style lang="less" scoped>
.my-video{
    .my-video-content{
        .video-list{
            .list-wrap{
                > li{
                    position: relative;
                    padding: 0 20px 20px;
                    margin: 5px 0;
                    border: 1px dashed #e7e7e7;
                    .title{
                        margin: 5px 0;
                    }
                    > .content{
                        min-height: 125px;
                        .poster{
                            float: left;
                            > img{
                                width: 200px;
                                height: 120px;
                                border-radius: 5px;
                            }
                        }
                        .info{
                            margin-left: 220px;
                            margin-right: 120px;
                            .desc{
                                font-size: 15px;
                                height: 80px;
                                line-height: 25px;
                            }
                            .other{
                                margin-top: 10px;
                                span{
                                    margin-right: 20px;
                                    font-size: 16px;
                                }
                            }
                        }
                    }
                    .op{
                        position: absolute;
                        right: 20px;
                        top: 50%;
                        z-index: 1;
                        transform: translateY(-50%);
                    }
                    .pro{
                        position: absolute;
                        right: 10px;
                        top: 10px;
                        color: #fff;
                        border-radius: 10px;
                        padding: 5px 10px;
                        background-color: red;
                    }
                    .success{
                        background-color: #4bb895;
                    }
                }
            }
        }
        .page{
            margin: 20px 0;
            height: 30px;
            position: relative;
            ul{
                position: absolute;
                left: 50%;
                top: 0;
                transform: translateX(-50%);
                display: inline-block;
            }
        }
    }
    .edit-desc{
        height: 100px;
        padding: 5px;
        border: 1px dashed #ccc;
        textarea{
            width: 100%;
            height: 100%;
            color: #555;
            border: none;
            outline: none;
            resize: none;
        }
    }
}
</style>