<template>
    <div class="video-detail">
        <Navbar></Navbar>
        <div class="detail-main">
            <!-- 视频相关信息 -->
            <div class="detail-wrap">
                <div class="detail-info">
                    <div class="info-pic">
                        <img src="./imgs/detail.jpg">
                    </div>
                    <div class="info-list">
                        <h1 class="title">最新ThinkPHP 5.1全球首发视频教程(60天成就PHP大牛线上培训班课)</h1>
                        <div class="video-desc">
                            <span>
                                60天可以学会PHP编程吗？看了PHP中文网的教学计划,你就不会再怀疑啦！ 
                                紧凑的课程安排,新颖的教学模式,全程学习监督,确保你的每一点进步,都将获得惊喜的回报~~
                            </span>
                        </div>
                        <div class="video-attribute">
                            中等 | 共79章节 | 852360次播放 | 添加时间：2018-01-17 15:00
                        </div>
                        <div class="video-btn">
                            <span class="study">开始学习</span>
                            <span class="download">课件下载</span>
                            <span class="collect">收藏视频</span>
                            <span class="tel">联系老师</span>
                        </div>
                    </div>
                </div>
                <!-- 章节 以及作者信息 -->
                <div class="section-user">
                    <!-- 作者 以及评论 -->
                    <div class="user">
                        <div class="user-info">
                            <div class="user-pic">
                                <img src="./imgs/detail.jpg">
                            </div>
                            <div class="user-name">
                                <h3>车神-黄杰</h3>
                                <span class="btn">TA的课程</span>
                            </div>
                        </div>
                        <div class="user-desc">
                            <p>
                                全栈工程师
                            </p>
                            <p>
                                PHP中文网讲师,欢迎选择我的课程，让我们一起见证您的进步~~
                            </p>
                        </div>
                    </div>
                    <!-- 章节 -->
                    <div class="section">
                        <h1>课程目录</h1>
                        <ul>
                            <li>第1章 ThinkPHP安装与运行流程</li>
                            <li>第1章 ThinkPHP安装与运行流程</li>
                            <li>第1章 ThinkPHP安装与运行流程</li>
                            <li>第1章 ThinkPHP安装与运行流程</li>
                            <li>第1章 ThinkPHP安装与运行流程</li>
                            <li>第1章 ThinkPHP安装与运行流程</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <Footerbar></Footerbar>
    </div>
</template>
<script>

import Navbar from '@/components/home/Navbar.vue'
import Footerbar from '@/components/home/Footerbar.vue'

export default {
    name: 'home',
    components:{
        // 头部
        Navbar,
        // 底部
        Footerbar
    }
}
</script>
<style lang="less" scoped>
.video-detail{
    .detail-main{
        background: #f2f4f6;
        padding: 20px 0;
        .detail-wrap{
            width: 1200px;
            margin: 0 auto;
            .detail-info{
                padding: 20px;
                background-color: #fff;
                border-radius: 10px;
                overflow: hidden;
                .info-pic{
                    float: left;
                    img{
                        width: 450px;
                        height: 250px;
                    }
                }
                .info-list{
                    margin-left: 480px;
                    .title{
                        font-family: inherit;
                        font-weight: 500;
                        font-size: 27px;
                    }
                    .video-desc{
                        color: #6f6f6f;
                        margin: 20px 0;
                        font-size: 15px;
                        line-height: 26px;
                    }
                    .video-attribute{
                        color: #6f6f6f;
                        margin-bottom: 20px;
                    }
                    .video-btn{
                        span{
                            color: #fff;
                            cursor: pointer;
                            margin-right: 10px;
                            padding: 10px 15px;
                            &:hover{
                                color: #f3f5f7;
                            }
                            &.study{
                                background: #ff5722;
                            }
                            &.download{
                                background: #393d49;
                            }
                            &.collect{
                                background: #000000;
                            }
                            &.tel{
                                background: #009688;
                            }
                        }
                    }
                }
            }

            .section-user{
                margin-top: 20px;
                > div{
                    border-radius: 10px;
                    padding: 10px;
                }
                .section{
                    margin-right: 400px;
                    background: #fff;
                }
                .user{
                    float: right;
                    width: 350px;
                    background: #fff;
                    .user-info{
                        position: relative;
                        height: 100px;
                        .user-pic{
                            position: absolute;
                            top: 50%;
                            left: 20px;
                            margin-top: -35px;
                            img{
                                width: 70px;
                                height: 70px;
                                border-radius: 50%;
                            }
                        }
                        .user-name{
                            position: absolute;
                            top: 50%;
                            left: 120px;
                            margin-top: -35px;
                            text-align: center;
                            h3{
                                font-weight: 500;
                            }
                            .btn{
                                margin-top: 10px;
                                display: block;
                                width: 100px;
                                height: 35px;
                                color: #fff;
                                line-height: 35px;
                                cursor: pointer;
                                background: #009688;
                                &:hover{
                                    background: #33aba0;
                                }
                            }
                        }
                    }
                    .user-desc{
                        color: #787d82;
                        font-size: 15px;
                        line-height: 23px;
                        p{
                            margin: 5px 0;
                        }
                    }
                }
            }
        }
    }
}
</style>