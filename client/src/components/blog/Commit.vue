<template>
    <div class="commit">
        <div class="show-title">
            <h3 class="title-text">评论区</h3>
        </div>
        <div class="show-content">
            <div class="send-commit"> 
                <div class="send-center">
                    <textarea v-model="commitContent" :placeholder="placeholderCommit"  class="commit-comtent"></textarea>
                </div>
                <div class="send-bottom">
                    <div class="send-btn">
                        <span>
                            还能输入
                            <span :style="{color: surplusLen? '#000': 'red'}">{{surplusLen}}</span>
                            个字
                        </span>
                        <Button type="error" :disabled="!replyUser" @click.native="() => {replyUser=false; commitContent=''}" danger>取消回复</Button>
                        <Button type="primary" danger @click="handleCommit">发表评论</Button>
                    </div>
                </div>
            </div>
            <div class="show-commit">
                <div v-if="!commitData.length" class="no-commit"> 暂无评论数据 </div>
                <div v-else class="show-list">
                    <ul>
                        <li
                            v-for="(commit, index) in commitData"
                            :key="index"
                        >
                            <div class="commit-content">
                                <div class="commit-top">
                                    <div class="user-info">
                                        <img src="../home/imgs/i1.png" />
                                        <span>{{commit.userName}}:</span>
                                    </div>
                                    <div class="time-info">
                                        <span id="position">{{index+1}}楼</span>
                                        <span>&lt;---&gt;</span>
                                        <span id="time">{{commit.commitTime | dateTime}}</span>
                                    </div>
                                </div>
                                <div class="commit-center">
                                    {{commit.commitContent}}
                                    <span class="commit-reply" @click="getReplyInfo(commit, index)">回复</span>
                                </div>
                            </div>
                            <!-- 回复列表 -->
                            <ul>
                                <li 
                                    v-for="(reply, i) in commit.replyData"
                                    :key="i"
                                >
                                    <div class="reply-top">
                                        <div>
                                            <img src="../home/imgs/i1.png" />
                                            <span>{{reply.replyName}}</span>
                                        </div>
                                        <span>回复</span>
                                        <div>
                                            <img src="../home/imgs/i1.png" />
                                            <span>{{reply.replyTargetName}}</span>
                                        </div>
                                        <span class="reply-time">
                                            {{reply.replyTime | dateTime}}
                                        </span>
                                    </div>
                                    <div class="reply-center">
                                        {{reply.replyContent}}
                                        <span class="commit-reply" @click="getReplyInfo(reply, index)">回复</span>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {commit} from '@/axios/index.js'

export default {
    name: 'blog',
    data(){
        return {
            commitContent: '',
            replyUser: false,
            placeholderCommit: '',
            maxCommitLen: 88,// 最大的评论长度
            surplusLen: 88// 剩余的评论长度

        }
    },
    methods:{
        handleCommit(){
            const {commitArticleId, commitContent, replyUser, $Message, $store} = this
            
            if(!commitContent) return $Message.error('评论不能为空')

            let data = {
                commitArticleId,
                commitContent,
                userId: $store.state.users.userId
            }

            if(replyUser){
                data = {
                    ...data, 
                    replyTargetId: replyUser.userId, 
                    replyCommitId: replyUser.commitId
                }
            }

            // 发送请求
            commit(data).then(res =>{

                const {code, commitId, commitTime} = res.data

                if(res.data.code === 500){
                    return $Message.error('评论失败，请稍后再试')
                }else if(res.data.code === 200){
                    this.commutSuccess(commitId, commitTime)
                    $Message.success('感谢您的评论')
                }
            })
        },
        // 评论成功
        commutSuccess(commitId, commitTime){
            const {replyUser, commitContent, commitArticleId, userName, userId} = this

            this.commitContent = ''

            // 默认是新评论
            let commit = {
                commitArticleId,
                commitContent,
                commitId,
                commitTime,
                commitUserId: userId,
                replyData: [],
                userId,
                userName
            }
            // 说明是回复
            if(replyUser){
                commit = {
                    replyArticleId: commitArticleId,
                    replyAvatar: '',
                    replyCommitId: replyUser.commitId,
                    replyContent: commitContent,
                    replyId: commitId,
                    replyName: replyUser.userName,
                    replyTargetAvatar: '',
                    replyTargetId: replyUser.userId,
                    replyTargetName: userName,
                    replyTime: commitTime,
                    replyUserId: userId,
                }

                this.commitData[replyUser.index].replyData.unshift(commit)
            }else{
                this.commitData.unshift(commit)
            }
        },
        // 获取回复目标用户信息
        getReplyInfo({commitId, userId, userName, replyCommitId, replyUserId, replyName}, index){

            // 情况评论信息
            this.commitContent = ''
            //这是回复楼主的
            if(commitId){
                this.replyUser = {commitId, userId, userName, index}
            // 这是回复楼主评论下面的其他用户
            }else{
                this.replyUser = { commitId: replyCommitId, userId: replyUserId, userName: replyName, index}
            }
        }
    },
    watch:{
        replyUser:{
            handler(newVal, oldVal) {
                if(newVal){
                    this.placeholderCommit = `@${newVal.userName}`
                }else{
                    this.placeholderCommit = '请输入评论内容'
                }
            },
            immediate: true
        },
        commitContent(newContent, oldContent){

            if(newContent.length > this.maxCommitLen){
                this.commitContent = oldContent
            }

            this.surplusLen = this.maxCommitLen - this.commitContent.length
            
        }
    },

    props: {
        commitArticleId: {
            type: String,
            default: ''
        },
        commitData: {
            type: Array,
            default: () => ([])
        },
        userName: {
            type: String,
            default: ''
        },
        userId: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="less" scoped>
@replyH: 18px;
@commtH: 22px;
.commit{
    .show-content{
        // 评论发表区域
        .send-commit{
            .send-center{
                input{
                    width: 98%;
                    height: 30px;
                    padding-left: 2%;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    display: none;
                }
                .commit-comtent{
                    width: 98%;
                    height: 80px;
                    resize: none;
                    border-radius: 5px;
                    outline: none;
                    padding: 1%;
                }
            }
            .send-bottom{
                overflow: hidden;
                .send-btn{
                    float: right;
                    button{
                        margin: 0 5px;
                    }
                }
            }
        }
        // 评论展示区
        .show-commit{
            margin-top: 30px;
            border: 1px dashed #e0e0e0;
            .no-commit{
                text-align: center;
                padding: 20px;
            }
            .show-list{
                padding: 10px;
                ul{
                    padding: 10px 20px 0;
                    li{
                        //博主评论内容
                        .commit-content{
                            // 博主信息
                            font-size: 14px;
                            .commit-top{
                                // 此时这个行高即为图片高度加上 图片上下margin和
                                display: flex;
                                justify-content: space-between;
                                border-bottom: 1px dashed #e3e3e3;
                                .user-info{
                                    display: flex;
                                    align-items: center;
                                    cursor: pointer;
                                    &:hover span{
                                        color: #d64033;
                                        text-decoration: underline;
                                    }
                                    img{
                                        width: @commtH;
                                        height: @commtH;
                                        margin: 5px 5px 5px 0;
                                        border-radius: 50%;
                                    }
                                }
                                .time-info{
                                    span{
                                        display: inline;
                                        color: #777;
                                    }
                                }
                            }
                            // 博主评论内容
                            .commit-center{
                                padding-left: 10px;
                                margin-top: 10px;
                                line-height: 23px;
                                color: #4d4d4d;
                            }
                        }
                        // 博主评论回复内容
                        ul{
                            li{
                                margin-bottom: 10px;
                                .reply-top{
                                    display: flex;
                                    position: relative;
                                    align-items: center;
                                    margin-bottom: 5px;
                                    > div{
                                        cursor: pointer;
                                        &:hover span{
                                            color: #169fe6;
                                            text-decoration: underline;
                                        }
                                        img{
                                            float: left;
                                            width: @replyH;
                                            height: @replyH;
                                            border-radius: 50%;
                                            margin: 0 5px;
                                        }
                                    }
                                    > span{
                                        margin-left: 5px;
                                    }
                                    .reply-time{
                                        position: absolute;
                                        right: 0;
                                    }
                                }
                                .reply-center{
                                    font-size: 15px;
                                    color: #777;
                                    padding-left: 20px;
                                    margin-bottom: 6px;
                                    line-height: 20px;
                                }
                            }
                        }
                        .commit-reply{
                            color: #ccc;
                            padding-left: 20px;
                            font-size: 12px;
                            cursor: pointer;
                            &:hover{
                                text-decoration: underline;
                                color: #666;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>