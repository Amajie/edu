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
                    <li><span>首页</span></li>
                    <li><span>视频教程</span></li>
                    <li><span>社区问答</span></li>
                    <li><span>创建社区</span></li>
                </ul>
            </div>
            <!-- 账号状态 -->
            <div class="conut">
                <div class="count-login">
                    <span title="前往登陆">登陆</span>
                    <span title="快注册吧，精彩不断">注册</span>
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
    
}
</script>

<style lang="less" scoped>
.navbar{
    background-color: #000;
    .navbar-content{
        width: 1200px;
        height: 60px;
        margin: 0 auto;
        line-height: 60px;
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
        .conut{
            float: right;
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