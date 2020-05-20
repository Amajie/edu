<template>
    <div class="my-course">
        <div class="my-course-content">
            <div class="nav-item">
                <span
                    v-for="(item, index) in navData"
                    :key="index" 
                    :class="{active: activeIndex === index}"
                    @click="handleNav(item, index)">{{item.title}}</span>
            </div>
            <div class="content">
                <components :key="activeIndex" :activeIndex="activeIndex" :is="childComponent"></components>
            </div>
        </div>
    </div>
</template>
<script>

import UploadVideo  from './course/UploadVidei.vue'
import MyVideo  from './course/MyVideo.vue'

export default {
    name: 'myCourse',
    data(){
        return {
            childComponent: MyVideo,
            MyVideo: MyVideo,
            UploadVideo: UploadVideo,
            activeIndex: 0,
            navData: [
                {title: '动态', component: MyVideo, type: 1},
                {title: '收藏', component: MyVideo, type: 2},
                {title: '发布视频', component: UploadVideo}
            ]
        }
    },
    methods:{
        handleNav({component, type}, index){
            this.childComponent = component
            this.activeIndex = index
        }
    },
    components:{
        // 视频上传
        UploadVideo,
        // 我的视频
        MyVideo
    }
}
</script>

<style lang="less" scoped>
.my-course{
    margin-top: 10px;
    .my-course-content{
        .nav-item{
            margin-bottom: 20px;
            span{
                color: #787d82;
                cursor: pointer;
                margin: 0 5px;
                padding: 10px 20px;
                &.active{
                    background-color: #f3f5f7;
                }
            }
        }
    }
}
</style>