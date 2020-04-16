<template>
    <div class="home">
        <Navbar></Navbar>
        <div class="home-main">
            <Carousel></Carousel>
            <Course></Course>
            <Technology></Technology>
            <Videos></Videos>
        </div>
        <Footerbar></Footerbar>
    </div>
</template>
<script>

import Navbar from '@/components/home/Navbar.vue'
import Carousel from '@/components/home/Carousel.vue'
import Course from '@/components/home/Course.vue'
import Technology from '@/components/home/Technology.vue'
import Videos from '@/components/home/Videos.vue'
import Footerbar from '@/components/home/Footerbar.vue'

export default {
    name: 'home',
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