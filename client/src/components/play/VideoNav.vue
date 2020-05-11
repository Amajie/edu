<template>
    <div class="video-nav">
        <div class="commit">
            <div>
                <textarea placeholder="对课程的评价"></textarea>
            </div>
            
            <Button long>提交</Button>
        </div>
        <div class="nav">
            <ul>
                <li class="active"
                    :title="video.videoTitle"
                    v-for="(video, index) in videoData"
                    :key="video.videoId"
                    @click="$router.push('/play/rv0h7cdegz40000000/2')"
                >
                    <em>{{index + 1}}</em>
                    <span>{{video.videoTitle}}</span>
                    <i class="icon iconfont">&#xe611;</i>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>

export default {
    name: 'videoNav',
    data(){
        return {}
    },
    props:{
        videoData: {
            type: Array,
            default: []
        }
    },
}
</script>
<style lang="less" scoped>
.video-nav{
    float: right;
    width: 250px;
    height: 100%;
    background-color: #f5f7fa;
    .commit{
        margin-top: 20px;
         padding: 5px;
        > div{
            textarea{
                width: 100%;
                height: 70px;
                outline: none;
                resize: none;
                padding: 5px;
                border-radius: 5px;
                background-color: #f5f7fa;
                border: 1px solid #ccc;
            }
        }
    }
    .nav{
        height: calc(100% - 140px);
        overflow: hidden;
        overflow-y: auto;
        ul{
            padding: 0 5px;
            font-size: 18px;
            li{
                cursor: pointer;
                margin: 10px 0;
                 &:hover span{
                    color: #2d8cf0;
                }
                em{
                    font-style: normal;
                    display: block;
                    float: left;
                    width: 25px;
                    height: 25px;
                    color: #fff;
                    text-align: center;
                    border-radius: 50%;
                    background-color: #21a557;
                }
                span{
                    margin: 0 3px;
                }

                i{
                    float: right;
                }
            }
            .active{
                em{
                    background-color: #ed4014;
                }
                span{
                    color: #e96900;
                }
            }
        }
    }
}
</style>