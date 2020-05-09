<template>
    <div class="play">
        <div class="play-content">
            <!-- 导航栏 -->
            <div class="video-nav"></div>
            <!-- 视频播放内容 -->
            <div class="video-wrap">
               
                <!-- 课程信息 -->
                <div class="back-list">
                    <p>
                        <i class="icon iconfont">&#xeb99;</i>
                        <span>返回课程详情</span>
                    </p>
                </div>
                <div class="video-info">
                    <p>
                        <span>课时</span>
                        <i>1</i>
                    </p>
                </div>
                <div class="video-play">
                    <div class="video-url">
                        <video src="/soqhusclecw0000000/merge/1588321821478测试.mp4"></video>
                    </div>
                    <div class="video-op">
                        <div class="progress">
                           <div></div>
                        </div>
                        <div class="op">
                            <div class="play-btn-time">
                                <i title="播放" class="icon iconfont">&#xe611;</i>
                                <!-- <i title="暂停" class="icon iconfont">&#xe63a;</i> -->
                                <i class="t">00:21</i>
                                <i class="t">/</i>
                                <i class="t">11:20</i>
                            </div>
                            <div class="play-vioce-form">
                                <div class="vioce">
                                    <i title="声音" class="icon iconfont">&#xe852;</i>
                                </div>
                                <div class="speed">
                                    <i title="倍率" class="t icon">1x</i>
                                </div>
                                <div class="form">
                                    <i title="全屏" class="icon iconfont">&#xeb99;</i>
                                    <!-- <i title="缩小" class="icon iconfont">&#xe6fe;</i> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import Navbar from '@/components/home/Navbar.vue'
import Footerbar from '@/components/home/Footerbar.vue'

export default {
    name: 'play',
    data(){
        return {}
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
.play{
    width: 100%;
    height: 100%;
    background-color: #68696e;
    .play-content{
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        .video-wrap{
            height: 100%;
            margin-right: 270px;
            .back-list{
                
                overflow: hidden;
                p{
                    float: left;
                    padding: 3px 10px;
                    margin-top: 10px;
                    cursor: pointer;
                    background-color: #aaacaf;
                    &:hover{
                        background-color: #b5b7b9;
                    }
                    span{
                        margin-left: 5px;
                    }
                }
            }
            .video-info{
                margin-top: 20px;
                p{
                    position: relative;
                    span{
                        background-color: #aaacaf;
                        padding: 3px 20px;
                        border-radius: 10px;
                    }
                    i{
                        position: absolute;
                        left: 50px;
                        top: -2px;
                        font-style: normal;
                        display: block;
                        width: 25px;
                        height: 25px;
                        line-height: 25px;
                        text-align: center;
                        border-radius: 50%;
                        background-color: #21a557;
                    }
                }
            }
            .video-play{
                position: relative;
                height: calc(100% - 110px);
                margin-top: 20px;
                background: #000;
                // 视频内容去
                .video-url{
                    height: 100%;
                    video{
                        width: 100%;
                        height: 100%;
                        outline: none;
                    }
                }
                // 视频操作
                .video-op{
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    background-color: #000;
                    .progress{
                        height: 5px;
                        cursor: pointer;
                        background-color: #555555;
                        > div{
                            width: 50%;
                            height: 100%;
                            background-color: #2aa126;
                        }
                    }
                    .op{
                        overflow: hidden;
                        padding: 0 10px;
                        height: 45px;
                        line-height: 45px;
                        // 暂停 时间
                        .play-btn-time{
                            float: left;
                            i{
                                font-style: normal;
                                font-size: 25px;
                                margin: 0 5px;
                                &.t{
                                    font-size: 20px;
                                }
                            }
                        }
                        // 声音全屏速度
                        .play-vioce-form{
                            float: right;
                            > div{
                                float: left;
                                margin: 0 10px;
                                i{
                                    font-style: normal;
                                    font-size: 25px;
                                    &.t{
                                        font-size: 20px;
                                    }
                                }
                            }
                        }

                        // 所有的图标 手形状
                        .icon{
                            cursor: pointer;
                        }
                    }
                }
            }
        }
        .video-nav{
            float: right;
            width: 250px;
            height: 100%;
            background-color: #f5f7fa;
        }
    }
}
</style>