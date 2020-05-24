<template>
    <div class="video-show">
        <!-- 课程信息 -->
        <div class="back-list">
            <p @click="$router.replace(`/vdetail/${$route.params.listId}`)">
                <i class="icon iconfont">&#xe697;</i>
                <span>返回课程详情</span>
            </p>
        </div>
        <div class="video-info">
            <p>
                <span>课时</span>
                <i>{{currentVideo.videoIndex + 1}}</i>
                <em class="desc">简介：{{currentVideo.videoDesc}}</em>
            </p>
        </div>
        <div ref="videoWrap" @click="handlePlayBtn" @mouseleave="opShow = true" @mousemove="handleMove" class="video-play">
            <div class="video-url">
                <video ref="video"
                    @canplay="canplay"
                    @timeupdate="timeupdate"
                    @ended="ended"
                    :src="videoUrl"></video>
            </div>
            <transition name="op">
                <div v-show="opShow" @click.stop class="video-op">
                    <div ref="progress" @click="handleProgress" class="progress">
                        <div ref="line" :style="{width: progressWidth}"></div>
                    </div>
                    <div class="op">
                        <div class="play-btn-time">
                            <i v-show="playBtn" @click="handlePlayBtn" title="播放" class="icon iconfont">&#xe611;</i>
                            <i v-show="!playBtn" @click="handlePlayBtn" title="暂停" class="icon iconfont">&#xe63a;</i>
                            <i class="t">{{currentTime}}</i>
                            <i class="t">/</i>
                            <i class="t">{{totalTime}}</i>
                        </div>
                        <div class="play-vioce-form">
                            <div class="vioce">
                                <i title="声音" class="icon iconfont">&#xe852;</i>
                                <div>
                                    <span>{{vioceText}}</span>
                                    <p @click="handleVioce($event)">
                                        <span :style="{height: vioceHeight}"></span>
                                    </p>
                                </div>
                            </div>
                            <div class="speed">
                                <i title="倍率" class="t icon">{{rateText}}x</i>
                                <ul>
                                    <li v-for="rate in rateList" :key="rate"
                                        @click="rateText = rate"
                                    >   
                                        {{rate}}x</li>
                                </ul>
                            </div>
                            <div class="form">
                                <i v-show="fullscreenBtn" @click="fullscreenBtn = !fullscreenBtn" title="全屏" class="icon iconfont">&#xeb99;</i>
                                <i v-show="!fullscreenBtn" @click="fullscreenBtn = !fullscreenBtn" title="缩小" class="icon iconfont">&#xe6fe;</i>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>

export default {
    name: 'videoShow',
    data(){
        return {
            playBtn: true,
            fullscreenBtn: true,
            totalTime: '00:00:00',
            currentTime: '00:00:00',
            progressWidth: 0,
            vioceHeight: '100%',
            rateList: [0.5, 0.75, 1, 1.5, 1.75, 2],
            rateText: 1,
            vioceText: 100,
            opShow: true,
            videoUrl: '',
            currentVideo: {}
        }
    },

    methods:{
        // 资源可以播放事件
        canplay(){
            
            this.totalTime = this.getTime(this.videoDom.duration)
            // 只有播放速度不等于1 才进行赋值操作
            if(this.rateText != 1){
                this.videoDom.playbackRate = this.rateText
            }
        },
        // 播放时间改变
        timeupdate(){
            const {videoDom} = this
            this.progressWidth = videoDom.currentTime / videoDom.duration * 100 + '%'
            this.currentTime = this.getTime(videoDom.currentTime)
        },
        // 播放停止   
        ended(){
            this.playBtn = true
        },
        // 处理播放 暂停按钮
        handlePlayBtn(){
                const {playBtn, videoDom} = this
                // 取反操作即可
                this.playBtn = !playBtn
                // 处理播放和暂停
                // true 即为暂停 false 即为播放
                playBtn? videoDom.play(): videoDom.pause()

        },
        // 处理点击进度条
        handleProgress(ev){
            // 设置播放进度 此时会自己调用
            this.videoDom.currentTime = ev.offsetX / this.progress.clientWidth * this.videoDom.duration
            // 播放
            this.videoDom.play()
            this.playBtn = false
        },
        // 设置声音
        handleVioce(ev){
            // 设置播放进度 此时会自己调用

            const voiceNum = (100 - (ev.offsetY / ev.target.clientHeight)*100).toString().split('.')[0]

            this.vioceText = parseInt(voiceNum)

            this.vioceHeight = voiceNum + '%'

            this.videoDom.volume = parseInt(voiceNum) / 100


        },
        // 处理鼠标移动
        handleMove(){
            
            clearTimeout(this.clearTime)

            // 鼠标停止移动后 隐藏
            this.clearTime = setTimeout(() =>{
                this.opShow = false
            }, 2000)

            if(this.opShow) return

            // 否则显示
            this.opShow = true
        },
        //获取时间的函数 00: 00: 00
        getTime(time){
            //计算的时间最后返回的是 00:00:00的格式

            //一小时 3600s 与当前秒数 / 3600即可 向下取整
            let h = Math.floor(time / 3600)

            //算出小时部分之后还剩多少秒  在算分 f = time%3600
            //f即为 算完小时后剩下的秒数  f = f/60（一分60秒）
            let m = Math.floor(time%3600/60)
            //算秒  即可 对60求余即可
            let s = Math.floor(time%60)

            return (h < 10? '0'+ h: h )+':'+ (m < 10? '0'+ m: m )+':'+ (s < 10? '0'+ s: s )
        },

        // 设置播放内容
        initData(currentVideo, initFlag){


            // 如果是切换路径 就初始化数据 但是保存播放速录
            if(initFlag){
                Object.assign(this.$data, this.$options.data(), {currentVideo, rateText: this.rateText})
            }else{
                this.currentVideo = currentVideo
            }

            // 需要加一个api
            this.videoUrl = `/api/${currentVideo.userId}/merge/${currentVideo.videoUrl}`
        }
        
        
    },

    watch:{
        rateText(newRate, oldRate){
            this.videoDom.playbackRate = newRate
        },
        
        fullscreenBtn(newVal, oldVal){

            if(!newVal){
                const {videoDom, videoWrap} = this
                const rfs = videoDom.requestFullScreen || videoDom.webkitRequestFullScreen || 
                            videoDom.mozRequestFullScreen || videoDom.msRequestFullScreen
                // 全屏 操作 此时 不是直接调用requestFullScreen等方法， 而是调用 下面的方法 使某个元素全屏
                rfs.call(videoWrap)
            }else{

                const cfs = document.cancelFullScreen || document.webkitCancelFullScreen || 
                        document.mozCancelFullScreen || document.exitFullScreen
                
                cfs.call(document)

            }
        }
    },

    mounted(){

        // 在这里获取videoDom对象
        this.$nextTick(() =>{
            this.videoDom = this.$refs.video
            this.progress = this.$refs.progress
            this.line = this.$refs.line
            this.videoWrap = this.$refs.videoWrap
        })
    }

}
</script>

<style lang="less" scoped>

 .video-show{
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
            .desc{
                font-style: normal;
                margin-left: 20px;
                color: #fff;
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
            position: absolute;
            z-index: 9;
            height: 100%;
            video{
                width: 100%;
                height: 100%;
            }
            /*全屏操作后  自带的控制栏会显示  在显示的时候隐藏*/
            video::-webkit-media-controls {
                display: none !important;
            }
        }
        // 视频操作
        .video-op{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            z-index: 10;
            background-color: #000;
            .progress{
                height: 5px;
                cursor: pointer;
                background-color: #555555;
                > div{
                    height: 100%;
                    background-color: #2aa126;
                }
            }
            .op{
                padding: 0 10px;
                height: 45px;
                
                // 暂停 时间
                .play-btn-time{
                    float: left;
                    i{
                        font-style: normal;
                        font-size: 25px;
                        margin: 0 5px;
                        line-height: 45px;
                        &.t{
                            font-size: 20px;
                        }
                    }
                }
                // 声音全屏速度
                .play-vioce-form{
                    float: right;
                    > div{
                        position: relative;
                        float: left;
                        margin: 0 10px;
                        i{
                            font-style: normal;
                            font-size: 25px;
                            line-height: 45px;
                            &.t{
                                font-size: 20px;
                            }
                        }
                    }
                    .vioce{
                        &:hover > div{
                            display: block;
                        }
                        > div{
                            position: absolute;
                            bottom: 45px;
                            left: 50%;
                            width: 30px;
                            height: 100px;
                            display: none;
                            text-align: center;
                            margin-left: -15px;
                            background: #141516;
                            P{
                                position: absolute;
                                left: 50%;
                                bottom: 0;
                                margin-left: -5px;
                                width: 10px;
                                height: 79%;
                                cursor: pointer;
                                background: #ccc;
                                span{
                                    position: absolute;
                                    left: 0;
                                    bottom: 0;
                                    display: block;
                                    width: 100%;
                                    height: 20px;
                                    background: #00a1d6;
                                }
                            }
                            span{
                                color: #fff;
                            }
                        }
                    }
                    .speed{
                        &:hover ul{
                            display: block;
                        }
                        ul{
                            position: absolute;
                            bottom: 45px;
                            left: 50%;
                            margin-left: -70px;
                            display: none;
                            background-color: #333333;
                            width: 120px;
                            transition: 0.5s opacity;
                            li{
                                float: left;
                                color: #999;
                                cursor: pointer;
                                padding: 5px 7px;
                                &:hover{
                                    color: #fff;
                                }
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

    // 控制条的动画
    .op-enter,
    .op-leave-to{
        opacity: 0;
    }
    .op-enter-active,
    .op-leave-active{
        transition: opacity 2s;
    }
}
</style>