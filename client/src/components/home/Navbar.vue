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
                    <li><span>社区问答</span></li>
                </ul>
            </div>
            <!-- 搜索插槽 -->
            <slot></slot>
            <!-- 账号状态 -->
            <div class="conut">
                <div class="count-login">
                    <span @click="$router.replace('/login')" title="前往登陆">登陆</span>
                </div>
                <!-- <div class="avatar">
                    <img src="./imgs/user_avatar.jpg">
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'navbar',
    methods:{
        handleNav(url){
            this.$router.replace(url)
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
        
        overflow: hidden;
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
            line-height: 60px;
            position: relative;
            right: 10px;
            .count-login{
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
                height: 60px;
                cursor: pointer;
                > img{
                    margin-top: 10px;
                    height: 40px;
                    width: 40px;
                    border-radius: 50%;
                }
            }
        }
    }
}
</style>