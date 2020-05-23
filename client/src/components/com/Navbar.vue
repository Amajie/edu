<template>
    <div class="navbar">
        <div class="navbar-content">
            <!-- logo 图片 -->
            <div class="logo">
                <a href="" title="前端车神网"></a>
            </div>
            <!-- 导航栏 -->
            <div class="nav">
                <ul>
                    <li @click="handleNav('/')"><span>首页</span></li>
                    <li @click="handleNav('/teach')"><span>视频教程</span></li>
                    <li @click="handleNav('/blog/article/search')"><span>技术博客</span></li>
                </ul>
            </div>
            <!-- 搜索插槽 -->
            <slot></slot>
            <!-- 账号状态 -->
            <div class="conut">
                <div v-if="!users.userId" @click="handleNav('/login')" class="count-login">
                    <span title="前往登陆">登陆</span>
                </div>
                <div v-else @click="handleNav(`/person/${users.userId}/0`)" class="avatar">
                    <img :src="users.userAvatar">
                    <div class="count-nav">
                        <ul class="count-list">
                            <li 
                                v-for="(item, index) in navList"
                                :key="index"
                                :title="item.title"
                                @click.stop="handleList(index)"> 
                                <i class="icon iconfont" v-html="item.icon"></i>
                                <span>{{item.title}}</span>
                            </li>
                        </ul>
                        <div @click.stop="logout" class="logout">
                            <i class="icon iconfont">&#xe659;</i>
                            <span>退出登陆</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    name: 'navbar',
    data(){
        return {
            navList: [
                {title: '个人信息', icon: '&#xe672;'},
                {title: '课程中心', icon: '&#xe609;'},
                {title: '文章中心', icon: '&#xe617;'},
                {title: '创作文章', icon: '&#xe8ca;'},
                // {title: '关注粉丝', icon: '&#xe602;'}
            ],
        }
    },
    computed:{
        ...mapState([
            'users'
        ])
    },
    methods:{
        handleNav(url){
            this.$router.replace(url)
        },

        // 因为此时如果 在个人中心点击 是不会跳转的 
        // 因为个人中心不是路由跳转 需要手动设置 s
        handleList(index){

            if(this.$parent.handlePersonNav){
                this.$parent.handlePersonNav(index)
            }else{
                this.$router.replace(`/person/${this.users.userId}/${index}`)
            }
        },

        // 退出登陆
        logout(){
             this.$Modal.confirm({
                title: '提示',
                content: '当前账号还在登陆，是否退出当前账号？',
                cancelText: '取消',
                okText: '确认',
                onOk: () =>{
                    this.$router.replace('/login')
                    this.$store.commit('setUsers', {})
                    this.$cookies.remove('users')
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.navbar{
    background-color: #000;
    .navbar-content{
        width: 1200px;
        height: 60px;
        margin: 0 auto;
        > div{
            float: left;
        }
        // logo
        .logo{
            width: 170px;
            height: 100%;
            background: url('./imgs/logo.png') no-repeat;
            background-position: 100%;
        }
        // 导航栏
        .nav{
            color: #b3b3b3;
            margin-left: 20px;
            line-height: 60px;
            overflow: hidden;
            li{
                float: left;
                cursor: pointer;
                padding: 0 10px;
                &:hover{
                    color: #fff;
                }
            }
        }
        .search{
            margin-top: 14px;
            margin-left: 20px;
        }
        .conut{
            float: right;
            position: relative;
            right: 10px;
            .count-login{
                line-height: 60px;
                span{
                    display: inline-block;
                    padding: 0 10px;
                    cursor: pointer;
                    color: #b3b3b3;
                    &:hover{
                        background: #363c41;
                    }
                }
            }
            .avatar{
                position: relative;
                height: 60px;
                cursor: pointer;
                &:hover .count-nav{
                    display: block;
                }
                > img{
                    display: inline-block;
                    margin-top: 10px;
                    height: 40px;
                    width: 40px;
                    border-radius: 50%;
                }
                .count-nav{
                    position: absolute;
                    right: -10px;
                    top: 60px;
                    width: 280px;
                    padding: 10px 36px;
                    z-index: 1000;
                    display: none;
                    background-color: #f45546;
                    .count-list{
                        overflow: hidden;
                        li{
                            float: left;
                            width: 100px;
                            padding: 5px;
                            margin: 2px;
                            color: #fff;
                            border-radius: 5px;
                            line-height: 34px;
                            background-color: #f56255;
                            &:hover{
                                color: #ede8e8;
                            }
                            span{
                                padding-left: 5px;
                            }
                        }
                    }
                    .logout{
                        margin: 10px 0;
                        color: #fff;
                        float: right;
                        span{
                            padding-left: 5px;
                        }
                        &:hover{
                            color: #ede8e8;
                        }
                    }
                }
            }
        }
    }
}
</style>