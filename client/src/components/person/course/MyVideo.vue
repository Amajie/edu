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
                                <DropdownMenu slot="list">
                                    <DropdownItem>视频详情</DropdownItem>
                                    <DropdownItem>删除视频</DropdownItem>
                                    <DropdownItem @click.native="showModal(item, index)">{{item.listRelease === 0? '我要发布': '编辑简介'}}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div :class="['pro', {success: item.listRelease === 1}]">
                            <span>
                                {{item.listRelease === 0? '未发布': '已发布'}}
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-if="courseTotal" class="page">
                <Page :current="limit" :total="courseTotal*10" simple />
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

import {getCourse, upTitle} from '@/axios/index'

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
            courseId: 1
        }
    },
    created(){
        // 获取用户的id
        const {targetUserId} = this.$route.params
        this.targetUserId = targetUserId
        
        const {activeIndex, sendRequest, sendCollect, $store} = this
        const users = this.$cookies.get('users')

        if(this.activeIndex === 0){

            // 如果users 不存在 或者 不是用户自己访问 则不能获取未发布的的视频
            // 设置 courseId = =2 即可
            this.courseId = users && users.userId === targetUserId? 1: 2

            // 发送请求
            sendRequest()
        }else{
            sendCollect()
        }
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

            upTitle({
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
        // 获取收藏的
        sendCollect(){
            console.log('搜藏')
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