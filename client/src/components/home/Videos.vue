<template>
    <div class="videos">
        <div class="videos-content">
            <!-- 初级 -->
            <div class="videos-list">
                <h1>小白入门课程</h1>
                <div class="videos-wrap">
                    <div class="videos-wrap-title">
                        <img src="./imgs/one.jpg">
                    </div>
                    <div class="videos-wrap-right">
                        <ul>
                            <li
                                v-for="index in 8"
                                :key="index"
                                @click="toDetail(oneVideo.listId)"
                            >
                                <div class="list-top">
                                    <img :src="oneVideo.listPoster">
                                </div>
                                <div class="list-bottom">
                                    <div class="video-title">
                                        <span class="grade">{{oneVideo.listGrade | grade}}</span>
                                        <span class="title">{{oneVideo.listTitle}}</span>
                                    </div>
                                    <div class="video-num">
                                        {{oneVideo.listTitle}}点击
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 进阶 -->
            <div class="videos-list">
                <h1>进阶学习课程</h1>
                <div class="videos-wrap">
                    <div class="videos-wrap-title">
                        <img src="./imgs/two.jpg">
                    </div>
                    <div class="videos-wrap-right">
                        <ul>
                            <li
                                v-for="index in 8"
                                :key="index"
                                @click="toDetail(twoVideo.listId)"
                            >
                                <div class="list-top">
                                    <img :src="twoVideo.listPoster">
                                </div>
                                <div class="list-bottom">
                                    <div class="video-title">
                                        <span class="grade">{{twoVideo.listGrade | grade}}</span>
                                        <span class="title">{{twoVideo.listTitle}}</span>
                                    </div>
                                    <div class="video-num">
                                        {{twoVideo.listTitle}}点击
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 高级 -->
            <div class="videos-list">
                <h1>高级学习课程</h1>
                <div class="videos-wrap">
                    <div class="videos-wrap-title">
                        <img src="./imgs/three.jpg">
                    </div>
                    <div class="videos-wrap-right">
                        <ul>
                            <li
                                v-for="index in 8"
                                :key="index"
                                @click="toDetail(threeVideo.listId)"
                            >
                                <div class="list-top">
                                    <img :src="threeVideo.listPoster">
                                </div>
                                <div class="list-bottom">
                                    <div class="video-title">
                                        <span class="grade">{{threeVideo.listGrade | grade}}</span>
                                        <span class="title">{{threeVideo.listTitle}}</span>
                                    </div>
                                    <div class="video-num">
                                        {{threeVideo.listTitle}}点击
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'videos',
    data(){
        return{
            oneVideo: {}, // 初级
            twoVideo:{},// 进阶
            threeVideo: {}// 高级
        }
    },
    created(){

        const {videoData} = this

        // 因为 数据不够 所以 初级 进阶 高级 各获取一条视频，渲染十次就行了
        this.oneVideo = videoData[0][0]
        this.twoVideo = videoData[1][0]
        this.threeVideo = videoData[2][0]

    },
    methods:{
        // 前往视频详情
        toDetail(listId){
            this.$router.replace(`/vdetail/${listId}`)
        }
    },
    props:{
        videoData: {
            type: Array,
            default: () =>([])
        }
    }
}
</script>

<style lang="less" scoped>
.videos{
    .videos-content{
        background: #f2f4f6;
        .videos-list{
            background: #fff;
            overflow: hidden;
            border-radius: 10px;
            margin-bottom: 30px;
            h1{
                font-size: 20px;
                color: #343535;
                text-align: center;
                padding: 20px 0;
            }
            .videos-wrap{
                height: 440px;
                .videos-wrap-title{
                    width: 220px;
                    height: 100%;
                    float: left;
                    img{
                        width: 220px;
                        height: 100%;
                        border-radius: 10px;
                    }
                }
                .videos-wrap-right{
                    float: left;
                    width: 970px;
                    height: 100%;
                    margin-left: 10px;
                    ul{
                        height: 100%;
                        overflow: hidden;
                        li{
                            width: 220px;
                            height: 170px;
                            margin-right: 20px;
                            margin-top: 20px;
                            padding-bottom: 10px;
                            cursor: pointer;
                            overflow: hidden;
                            float: left;
                            box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
                            border-radius: 10px;
                            &:hover .list-bottom .video-title{
                                top: -100px;
                            }
                            .list-top{
                                height: 130px;
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            .list-bottom{
                                position: relative;
                                line-height: 25px;
                                height: 100px;
                                .video-title{
                                    position: absolute;
                                    background: #fff;
                                    top: -50px;
                                    left: 0;
                                    width: 100%;
                                    font-size: 14px;
                                    border-radius: 10px;
                                    padding: 20px 10px 70px;
                                    transition: 0.3s top;
                                    .grade{
                                        color: #fff;
                                        padding: 2px;
                                        border-radius: 3px;
                                        font-size: 12px;
                                        background: #93999f;
                                    }
                                    .title{
                                        padding-left: 10px;
                                    }
                                }
                                .video-num{
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    padding: 10px;
                                    font-size: 12px;
                                    
                                    color: #93999f;
                                    width: 100%;
                                    background: #fff;
                                }
                            }
                        }
                    }
                }
            }

        }
    }
}
</style>