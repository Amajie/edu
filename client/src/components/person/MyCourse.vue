<template>
    <div class="my-course">
        <div class="my-course-content">
            <div class="nav-item">
                <span
                    v-for="(item, index) in navData"
                    :key="index" 
                    :class="{active: activeIndex === index}"
                    @click="handleNav(index, item.component)">{{item.title}}</span>
            </div>
            <div class="content">
                <components :is="childComponent"></components>
            </div>
        </div>
    </div>
</template>
<script>

import UploadVideo  from './course/UploadVidei.vue'
import MyVideo  from './course/MyVideo.vue'

export default {
    name: 'fdgfdg',
    data(){
        return {
            childComponent: MyVideo,
            MyVideo: MyVideo,
            UploadVideo: UploadVideo,
            activeIndex: 0,
            navData: [
                {title: '我的上传', component: MyVideo},
                {title: '我的审核', component: MyVideo},
                {title: '我的发布', component: MyVideo},
                {title: '我的收藏', component: MyVideo},
                {title: '发布课程', component: UploadVideo}
            ]
        }
    },
    methods:{
        handleNav(index, component){
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