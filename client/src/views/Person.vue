<template>
    <div class="person">
        <Navbar></Navbar>
        <div class="person-main">
            <!-- 主页 -->
            <div class="person-info">
                <div class="info">
                    <div class="user-pic">
                        <img class="avatar" src="./imgs/user_avatar.jpg">
                        <img class="concer" src="./imgs/concern.png">
                    </div>
                    <div class="user-desc">
                        <div class="user-desc-wrap">
                            <div class="name">
                                <h2>车神-黄杰</h2>
                            </div>
                            <div class="desc-concer">
                                
                                <div class="concer">
                                    <div class="c">
                                        <em>234</em>
                                        <span>关注</span>
                                    </div>
                                    <div class="f">
                                        <em>1000</em>
                                        <span>粉丝</span>
                                    </div>
                                </div>
                                <div class="desc">
                                    <span>
                                        PHP中文网讲师,欢迎选择我的课程，让我们一起见证您的进步~~
                                        PHP中文网讲师,欢迎选择我的课程，让我们一起见证您的进步~~
                                        PHP中文网讲师,欢迎选择我的课程，让我们一起见证您的进步~~
                                        PHP中文网讲师,欢迎选择我的课程，让我们一起见证您的进步~~
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 个人中心 -->
            <div class="person-wrap">
                <div>
                    <div class="nav">
                        <ul>
                            <li 
                                v-for="(item, index) in navList"
                                :key="index"
                                :title="item.title"
                                @click="handleNav(index, item.component)" 
                                :class="{active: activeIndex === index}"> 
                                <i class="icon iconfont" v-html="item.icon"></i>
                                <span>{{item.title}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="show">
                        <components :is="childComponent"></components>
                    </div>
                </div>
            </div>
        </div>
        <Footerbar></Footerbar>
    </div>
</template>
<script>

import Navbar from '@/components/home/Navbar.vue'
import Footerbar from '@/components/home/Footerbar.vue'

// 个人中心组件
import User from '@/components/person/User.vue'
import MyCourse from '@/components/person/MyCourse.vue'

export default {
    name: 'person',
    data(){
        return {
            navList: [
                {title: '个人信息', icon: '&#xe7bb;', component: User},
                {title: '课程中心', icon: '&#xe613;', component: MyCourse},
                {title: '社区中心', icon: '&#xe61f;', component: User},
                {title: '创建社区', icon: '&#xe61f;', component: User},
                {title: '关注粉丝', icon: '&#xe61f;', component: User},
            ],
            activeIndex: 0,
            childComponent: User
        }
    },
    methods: {
        // 处理 点击nav 跳转
        handleNav(index, component){
            // 设置当前索引
            this.activeIndex = index

            // 设置当前显示的组件
            this.childComponent = component


        }
    },
    components:{
        // 头部
        Navbar,
        // 底部
        Footerbar,
        // 个人中心
        User,
        // 我的课程
        MyCourse
    }
}
</script>
<style lang="less" scoped>
.person{
    .person-main{
        .person-info{
            width: 100%;
            height: 220px;
            background: url('./imgs/bg-teacher.png') no-repeat center top;
            background-size: cover;
            .info{
                position: relative;
                width: 1200px;
                height: 100%;
                margin: 0 auto;
                .user-pic{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 300px;
                    height: 100%;
                    .avatar{
                        position: absolute;
                        left: 50px;
                        top: 50px;
                        width: 180px;
                        height: 180px;
                        border-radius: 50%;
                    }
                    .concer{
                        position: absolute;
                        left: 180px;
                        top: 160px;
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                    }
                }
                .user-desc{
                    position: absolute;
                    left: 300px;
                    top: 0;
                    width: 900px;
                    height: 100%;
                    .user-desc-wrap{
                        padding-top: 60px;
                        color: #fff;
                        .name{
                            margin-bottom: 10px;
                        }
                        .desc-concer{
                            overflow: hidden;
                            .concer{
                                float: right;
                                margin-top: 45px;
                                div{
                                    float: left;
                                    cursor: pointer;
                                    text-align: center;
                                    margin: 0 20px;
                                    em{
                                        display: block;
                                        font-size: 18px;
                                        padding: 5px 0;
                                        font-style: normal;
                                    }
                                    span{
                                        font-size: 14px;
                                        color: #ccc;
                                    }
                                }
                            }
                            .desc{
                                margin-right: 250px;
                                line-height: 26px;
                                font-size: 13px;
                                span{
                                    color: #ccc;
                                }
                            }
                        }
                    }
                }
            }
        }
        .person-wrap{
            width: 1200px;
            margin: 30px auto 0;
            > div{
                display: inline-block;
                width: 100%;
                .nav{
                    width: 200px;
                    float: left;
                    ul{
                        li{
                            position: relative;
                            color: #787d82;
                            cursor: pointer;
                            height: 50px;
                            margin-bottom: 10px;
                            &.active{
                                background: #242424;
                                color: #fff;
                            }
                            &.active .icon{
                                color: #fff;
                            }
                            &.active:after {
                                display: block;
                                content: "";
                                position: absolute;
                                bottom: 0;
                                right: 0;
                                width: 0;
                                height: 0;
                                border-top: 25px solid #fff;
                                border-bottom: 25px solid #fff;
                                border-left: 15px solid transparent; 
                            }
                            .icon{
                                position: absolute;
                                top: 7px;
                                left: 20px;
                                font-size: 25px;
                                color: #787d82;
                            }
                            span{
                                font-size: 20px;
                                padding-left: 70px;
                                line-height: 50px;
                            }
                        }
                    }
                }
                .show{
                    margin-left: 250px;
                }
            }
        }
    }
}
</style>