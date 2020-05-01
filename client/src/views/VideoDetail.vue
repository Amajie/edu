<template>
    <div class="video-detail">
        <Navbar></Navbar>
        <div class="detail-main">
            <!-- 视频相关信息 -->
            <div class="detail-wrap">
                <div class="detail-info">
                    <div class="info-pic">
                        <img :src="listData.listPoster">
                    </div>
                    <div class="info-list">
                        <h1 class="title">{{listData.listTitle}}</h1>
                        <div class="video-desc">
                            <span>
                                {{listData.listDesc}}
                            </span>
                        </div>
                        <div class="video-attribute">
                            {{listData.listGrade | grade}} | 共{{videoData.length}}章节 | {{listData.listClick}}次点击量 | 添加时间：{{listData.listTime | dateTime(true)}}
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
                    <div class="user-commit">
                        <!-- 作者信息 -->
                        <div class="user">
                            <div class="user-info">
                                <div class="user-pic">
                                    <img src="./imgs/detail.jpg">
                                </div>
                                <div class="user-name">
                                    <h3>{{listData.userName}}</h3>
                                    <span class="btn">TA的课程</span>
                                </div>
                            </div>
                            <div class="user-desc">
                                <!-- <p>
                                    全栈工程师
                                </p> -->
                                <p>
                                    {{listData.userSign?listData.userSign: '空空如也，他什么也没说！！！'}}
                                </p>
                            </div>
                        </div>
                        <!-- 评论信息 -->
                        <div class="commit">
                            <ul>
                                <li>
                                    <div class="commit-user">
                                        <div class="pic">
                                            <img src="./imgs/detail.jpg">
                                        </div>  
                                        <div class="info">
                                            <div class="name">
                                                <span>车神-黄杰</span>
                                                <p>
                                                    <img src="./imgs/s.png">
                                                    <img src="./imgs/s.png">
                                                    <img src="./imgs/s.png">
                                                    <img src="./imgs/s.png">
                                                    <img src="./imgs/s.png">
                                                </p>
                                            </div>
                                            <div class="study-time">
                                                <span>学习了97个课时评价</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="commit-content">
                                        <span>
                                            课程听了过半~感觉这种教授方式还是挺不错的~必修课基础讲的比较多，
                                            期待实战的课程。
                                        </span>
                                    </div>
                                    <div class="commit-time">
                                        <span>2019-12-6</span>
                                    </div>
                                    <div class="reply-commit">
                                        <p class="reply">
                                            <span>作者回复：</span>感谢支持
                                        </p>
                                        <p class="time">
                                            2019-11-02
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div class="commit-user">
                                        <div class="pic">
                                            <img src="./imgs/detail.jpg">
                                        </div>  
                                        <div class="info">
                                            <div class="name">
                                                <span>车神-黄杰</span>
                                                <p>
                                                    <img src="./imgs/s.png">
                                                    <img src="./imgs/s.png">
                                                    <img src="./imgs/s.png">
                                                    <img src="./imgs/s.png">
                                                    <img src="./imgs/s.png">
                                                </p>
                                            </div>
                                            <div class="study-time">
                                                <span>学习了97个课时评价</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="commit-content">
                                        <span>
                                            课程听了过半~感觉这种教授方式还是挺不错的~必修课基础讲的比较多，
                                            期待实战的课程。
                                        </span>
                                    </div>
                                    <div class="commit-time">
                                        <span>2019-12-6</span>
                                    </div>
                                    <div class="reply-commit">
                                        <p class="reply">
                                            <span>作者回复：</span>感谢支持
                                        </p>
                                        <p class="time">
                                            2019-11-02
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div class="commit-user">
                                        <div class="pic">
                                            <img src="./imgs/detail.jpg">
                                        </div>  
                                        <div class="info">
                                            <div class="name">
                                                <span>车神-黄杰</span>
                                                <p>
                                                    <img src="./imgs/s.png">
                                                    <img src="./imgs/s.png">
                                                    <img src="./imgs/s.png">
                                                    <img src="./imgs/s.png">
                                                    <img src="./imgs/s.png">
                                                </p>
                                            </div>
                                            <div class="study-time">
                                                <span>学习了97个课时评价</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="commit-content">
                                        <span>
                                            课程听了过半~感觉这种教授方式还是挺不错的~必修课基础讲的比较多，
                                            期待实战的课程。
                                        </span>
                                    </div>
                                    <div class="commit-time">
                                        <span>2019-12-6</span>
                                    </div>
                                    <div class="reply-commit">
                                        <p class="reply">
                                            <span>作者回复：</span>感谢支持
                                        </p>
                                        <p class="time">
                                            2019-11-02
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div class="commit-user">
                                        <div class="pic">
                                            <img src="./imgs/detail.jpg">
                                        </div>  
                                        <div class="info">
                                            <div class="name">
                                                <span>车神-黄杰</span>
                                                <p>
                                                    <img src="./imgs/s.png">
                                                    <img src="./imgs/s.png">
                                                    <img src="./imgs/s.png">
                                                    <img src="./imgs/s.png">
                                                    <img src="./imgs/s.png">
                                                </p>
                                            </div>
                                            <div class="study-time">
                                                <span>学习了97个课时评价</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="commit-content">
                                        <span>
                                            课程听了过半~感觉这种教授方式还是挺不错的~必修课基础讲的比较多，
                                            期待实战的课程。
                                        </span>
                                    </div>
                                    <div class="commit-time">
                                        <span>2019-12-6</span>
                                    </div>
                                    <div class="reply-commit">
                                        <p class="reply">
                                            <span>作者回复：</span>感谢支持
                                        </p>
                                        <p class="time">
                                            2019-11-02
                                        </p>
                                    </div>
                                </li>
                            </ul>
                            <div class="more-commit">
                                <span>查看更多...</span>
                            </div>
                        </div>
                    </div>
                    <!-- 课程介绍 -->
                    <div class="section">
                        <h1>课程介绍</h1>
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

import {getVdetail} from '@/axios/index.js'

export default {
    name: 'vdetail',
    data(){
        return {
            listData: {},
            commitData: [],
            videoData: []
        }
    },
    created(){
        const {listId} = this.$route.params
        // 发送请求
        getVdetail({listId}).then(res =>{
            const {code, detailData} = res.data
            // 获取失败 应该跳转 404
            if(code === 500) return console.log('获取失败')

            this.listData = detailData[0][0]
            this.videoData = detailData[1]
            this.commitData = detailData[2]

            console.log(this.listData)
            console.log(this.videoData)
            console.log(this.commitData)



        })
    },
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
                        min-height: 80px;
                    }
                    .video-attribute{
                        color: #6f6f6f;
                        font-size: 16px;
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
                display: inline-block;
                width: 100%;
                margin-top: 20px;
                .section{
                    padding: 10px;
                    margin-right: 400px;
                    background: #fff;
                    border-radius: 10px;
                }
                .user-commit{
                    float: right;
                    width: 370px;
                    > div {
                        border-radius: 10px;
                        padding: 10px;
                        background: #fff;
                    }
                    .user{
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
                    .commit{
                        margin-top: 10px;
                        ul{
                            li{
                                // 评价用户的信息
                                margin-bottom: 30px;
                                .commit-user{
                                    .pic{
                                        float: left;
                                        img{
                                            width: 45px;
                                            height: 45px;
                                            border-radius: 50%;
                                        }
                                    }
                                    .info{
                                        margin-left: 60px;
                                        .name{
                                            // 用户名
                                            span{
                                                
                                            }
                                            // 评分
                                            p{
                                                float: right;
                                                img{
                                                    width: 20px;
                                                    height: 20px;
                                                    margin: 0 2px;
                                                }
                                            }
                                        }
                                        .study-time{
                                            color: #999;
                                            margin: 5px 0;
                                            font-size: 12px;
                                        }
                                    }
                                }
                                // 评价内容
                                .commit-content{
                                    font-size: 14px;
                                    line-height: 20px;
                                    color: #333;
                                    margin: 10px 0;
                                    padding: 0 10px;
                                }
                                // 评价时间
                                .commit-time{
                                    font-size: 12px;
                                    padding: 0 10px;
                                    color: #999;
                                }
                                // 作者回复
                                .reply-commit{
                                    font-size: 14px;
                                    margin: 5px 15px 0;
                                    padding: 5px;
                                    background: #f2f2f2;
                                    border-radius: 5px;
                                    .reply{
                                        margin-bottom: 5px;
                                        color: #999;
                                        span{
                                            color: #10ae58;
                                        }
                                    }
                                    .time{
                                        font-size: 12px;
                                        color: #999;
                                    }
                                }
                            }

                        }
                        .more-commit{
                            text-align: center;
                            cursor: pointer;
                            &:hover span{
                                text-decoration: underline;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>