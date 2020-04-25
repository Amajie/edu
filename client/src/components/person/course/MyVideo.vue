<template>
    <div class="my-video">
        <div class="my-video-content">
            <div class="video-list">
                <ul class="list-wrap">
                    <li>
                        <h2 class="title">仿腾讯视频电视剧首页</h2>
                        <div class="content">
                            <div class="poster">
                                <img src="../imgs/test.png">
                            </div>
                            <div class="info">
                                <div class="desc">
                                    简介：
                                    <span>
                                        php中文网-朱老师( Peter Zhu)
                                    </span>
                                </div>
                                <div class="other">
                                    <span>中级</span>
                                    <span>点击量：1233</span>
                                    <span>时间：2020-02-21</span>
                                    <span>评论：1233</span>
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
                                    <DropdownItem>再次编辑</DropdownItem>
                                    <DropdownItem>我要发布</DropdownItem>
                                    <DropdownItem>编辑简介</DropdownItem>
                                    <DropdownItem>我要收藏</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </li>
                    <li>
                        <h2 class="title">仿腾讯视频电视剧首页</h2>
                        <div class="content">
                            <div class="poster">
                                <img src="../imgs/test.png">
                            </div>
                            <div class="info">
                                <div class="desc">
                                    简介：
                                    <span>
                                        php中文网-朱老师( Peter Zhu) 时间：2019.10.17 晚 
                                        20:00-22:00 主题：如何高效的学习一门新技术？ 具体内容：
                                        1. 2020了, 还有哪些值得学习的新技术? 2.如何高效的学习前端开发? 
                                        3.如果高效的学习PHP开发?
                                    </span>
                                </div>
                                <div class="other">
                                    <span>中级</span>
                                    <span>点击量：1233</span>
                                    <span>时间：2020-02-21</span>
                                    <span>评论：1233</span>
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
                                    <DropdownItem>编辑</DropdownItem>
                                    <DropdownItem>发布</DropdownItem>
                                    <DropdownItem>收藏</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="page">
                <Page :current="2" :total="500" simple />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {}
    },
    created(){
        console.log(111)
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
}
</style>