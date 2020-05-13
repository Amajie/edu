<template>
    <div class="commit">
        <div class="show-title">
            <h3 class="title-text">评论区</h3>
        </div>
        <div class="show-content">
            <div class="send-commit"> 
                <div class="send-center">
                    <textarea value={commitContent}  class="commit-comtent"></textarea>
                </div>
                <div class="send-bottom">
                    <div class="send-btn">
                        <span>
                            还能输入
                            <span :style="{color: maxFlag? '#000': 'red'}">{{maxFlag}}</span>
                            个字
                        </span>
                        <Button type="primary" :disabled="replyFlag" danger>取消回复</Button>
                        <Button type="primary" danger>发表评论</Button>
                    </div>
                </div>
            </div>
            <div class="show-commit">
                <!-- <div class="no-commit"> 暂无评论数据 </div> -->
                <div class="show-list">
                    <ul>
                        <li>
                            <div class="commit-content">
                                <div class="commit-top">
                                    <div class="user-info">
                                        <img src="../home/imgs/i1.png" />
                                        <span>车神我也:</span>
                                    </div>
                                    <div class="time-info">
                                        <span id="position">1楼</span>
                                        <span>&lt;---&gt;</span>
                                        <span id="time">2020-02-12</span>
                                    </div>
                                </div>
                                <div class="commit-center">
                                    你好呀哈哈哈
                                    <span class="commit-reply">回复</span>
                                </div>
                            </div>
                            <!-- 回复列表 -->
                            <ul>
                                <li key={replyObj.replyId}>
                                    <div class="reply-top">
                                        <div>
                                            <img src="../home/imgs/i1.png" />
                                            <span>黄家驹</span>
                                        </div>
                                        <span>回复</span>
                                        <div>
                                            <img src="../home/imgs/i1.png" />
                                            <span>刘德华</span>
                                        </div>
                                        <span class="reply-time">
                                            2020-02-12
                                        </span>
                                    </div>
                                    <div class="reply-center">
                                        不呼啦
                                        <span class="commit-reply">回复</span>
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
export default {
    name: 'blog',
    data(){
        return {
            maxFlag: 0,
            replyFlag: true
        }
    },
    methods:{
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