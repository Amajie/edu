<template>
    <div class="upload">
        <div class="upload-content">
            <!-- 视频上传 -->
            <div class="video">
                <div class="btn-desc">
                    <div class="btn">
                        <span>上传视频</span>
                    </div>
                    <div class="desc">
                        <span>当前审核队列</span>
                        <span class="info">繁忙</span>
                    </div>
                </div>
            </div>
            <!-- 分面设置 -->
            <div class="video-pic">
                <div>
                    <div class="title">
                        <h1>视频封面设置</h1>
                    </div>
                    <div class="content">
                        <div class="left-pic">
                            <input title="上传封面" type="file">
                            <img src="../../home/imgs/i1.png">
                            <span>上传封面</span>
                        </div>
                        <div class="right-pic">
                            <div>
                                <span>可选择以下几个封面</span>
                                <img src="../../home/imgs/i1.png" alt="">
                                <img src="../../home/imgs/i1.png" alt="">
                                <img src="../../home/imgs/i1.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 视频集 -->
            <div class="video-title">
                <div>
                    <div class="title">
                        <h1>视频集</h1>
                    </div>
                    <div class="print">
                        <div class="input">
                            <input placeholder="输入或选择已有的视频集">
                        </div>
                        <p>选择已有</p>
                    </div>
                </div>
            </div>
            <!-- 标题 -->
            <div class="video-title">
                <div>
                    <div class="title">
                        <h1>标题</h1>
                    </div>
                    <div class="print">
                        <div class="input">
                            <input placeholder="请输入标题">
                        </div>
                        <p>20/80</p>
                    </div>
                </div>
            </div>
            <!-- 简介 -->
            <div class="video-desc">
                <div>
                    <div class="title">
                        <h1>简介</h1>
                    </div>
                    <div class="print">
                        <div class="input">
                            <textarea placeholder="请输入相关简介"></textarea>
                        </div>
                        <p>20/80</p>
                    </div>
                </div>
            </div>
            <div class="video-btn">
                <span class="up">立即上传</span>
                <span class="re">取消上传</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {}
    }
}
</script>

<style lang="less" scoped>
.upload{
    .upload-content{
        padding: 20px;
        .video{
            position: relative;
            height: 300px;
            border-radius: 10px;
            border: 1px dashed #e7e7e7;
            .btn-desc{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                .btn{
                    padding: 10px 20px;
                    text-align: center;
                    color: #fff;
                    cursor: pointer;
                    border-radius: 5px;
                    background-color: #00a1d6;
                    &:hover{
                        background-color: #1cade3;
                    }
                }
                .desc{
                    font-size: 13px;
                    color: #ccc;

                    margin-top: 10px;
                    .info{
                        padding: 3px 8px;
                        margin-left: 5px;
                        color: #fff;
                        border-radius: 3px;
                        background-color: #ffbd2d;
                    }
                }
            }
        }

        // 标题统一设置
        .title{
            margin: 20px 0;
            h1{
                font-size: 18px;
                color: #7c8182;
            }
        }
        // 封面
        .video-pic{
            > div{
                .content{
                    position: relative;
                    height: 120px;
                    .left-pic{
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 200px;
                        height: 100%;
                        cursor: pointer;
                        border: 1px dashed #e7e7e7;
                        &:hover span{
                            background-color: #adadad;
                        }
                        input{
                            width: 100%;
                            height: 100%;
                            opacity: 0;
                            cursor: pointer;
                        }
                        span{
                            position: absolute;
                            right: 1px;
                            bottom: 1px;
                            color: #fff;
                            padding: 3px;
                            background-color: #999999;
                        }
                        img{
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            width: 40px;
                            height: 40px;
                            margin: -20px;
                        }
                    }
                    .right-pic{
                        position: absolute;
                        left: 250px;
                        top: 0;
                        min-width: 450px;
                        width: calc(100% - 460px);
                        height: 100%;
                        border: 1px dashed #e7e7e7;
                        > div{
                            padding: 5px;
                            span{
                                display: block;
                                font-size: 13px;
                                color: #787d82;
                                margin-bottom: 10px;
                            }
                            img{
                                width: 120px;
                                height: 80px;
                                border-radius: 10px;
                                margin: 0 10px;
                            }
                        }
                    }
                }
            }
        }
        // 标题
        .video-title{
            .print{
                height: 40px;
                padding: 0 10px;
                border-radius: 5px;
                border: 1px solid #ccd0d7;
                > div{
                    float: left;
                    width: 93%;
                    input{
                        width: 100%;
                        height: 39px;
                        border: none;
                        outline: none;
                    }
                }
                p{
                    float: right;
                    color: #ccd0d7;
                    line-height: 40px;
                }
            }
        }
        // 描述
        .video-desc{
            .print{
                height: 100px;
                padding: 10px 10px;
                border-radius: 5px;
                border: 1px solid #ccd0d7;
                > div{
                    float: left;
                    width: 100%;
                    textarea{
                        width: 100%;
                        height: 60px;
                        border: none;
                        outline: none;
                    }
                }
                p{
                    float: right;
                    color: #ccd0d7;
                    line-height: 40px;
                }
            }
        }
        .video-btn{
            margin-top: 30px;
            span{
                color: #838383;
                padding: 10px 20px;
                margin: 0 10px;
                cursor: pointer;
                border-radius: 5px;
                border: 1px solid #cccccc;
                &.up{
                    color: #fff;
                    background-color: #1aabda;
                    &:hover{
                        background-color: #42b5da;
                    }
                }
                &.re{
                    color: #838383;
                    &:hover{
                        color: #9494b6;
                    }
                }
            }
        }
    }
}
</style>