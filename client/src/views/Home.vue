<template>
    <div class="home">
        <Navbar></Navbar>
        <div class="home-main">
            <!-- <Carousel></Carousel> -->
            <Course v-if="courseData.length" :courseData="courseData"></Course>
            <Technology v-if="recoArticle.length" :recoArticle="recoArticle" :newArticle="newArticle"></Technology>
            <Videos v-if="videoData.length" :videoData="videoData"></Videos>
        </div>
        <Footerbar></Footerbar>
    </div>
</template>
<script>

import Navbar from '@/components/com/Navbar.vue'
import Footerbar from '@/components/com/Footerbar.vue'
import Carousel from '@/components/home/Carousel.vue'
import Course from '@/components/home/Course.vue'
import Technology from '@/components/home/Technology.vue'
import Videos from '@/components/home/Videos.vue'

// 请求数据
import {getHome} from '@/axios/index.js'

export default {
    name: 'home',
    data(){
        return {
            courseData: [],
            newArticle: [],
            recoArticle: [],
            videoData: []
        }
    },
    created(){

        getHome().then(res =>{
            const {code, homeData, newArticle, recoArticle, oneVideo, twoVideo, threeVideo} = res.data
            if(code === 500) return console.log('暂无数据')

            this.courseData = homeData
            this.newArticle = newArticle
            this.recoArticle = recoArticle
            this.videoData = [oneVideo, twoVideo, threeVideo]
        })
    },
    components:{
        // 头部
        Navbar,
        // 轮播图
        Carousel,
        // 最新课程
        Course,
        // 技术文章
        Technology,
        // 课程列表
        Videos,
        // 底部
        Footerbar
    }
}
</script>
<style lang="less" scoped>
.home{
    .home-main{
        background: #f2f4f6;
        padding-top: 10px;
        // 这里是为了解决边距重叠
        padding-bottom: 1px;
        > div{
            width: 1200px;
            background: #fff;
            border-radius: 10px;
            overflow: hidden;
            margin: 20px auto;
        }
    }
}
</style>