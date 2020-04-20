<template>
     <div class="login">
        <div class="bgc"></div>
        <div class="login-main">
            <header>
                <div class="header-wrap">
                    <div class="logo">
                        <img src="./imgs/concern.png" />
                    </div>
                    <div class="logo-text">
                        <span>车神教育</span>
                    </div>
                    <div class="clear"></div>
                </div>
            </header>
            <div class="login-content">
                <div>
                    <div class="name">
                        <input v-model="userName" placeholder="请输入用户名">
                    </div>
                    <div class="password">
                        <input v-model="password" placeholder="请输入密码">
                    </div>
                    <div class="btn">
                        <span @click="handleLogin" class="login-entry">我要登陆</span>
                        <span @click="$router.replace('/')" class="login-no">我是过客</span>
                    </div>
                    <div class="login-detail">
                        <span class="detail">注意：</span>
                        <span>如果用户没注册，登陆成功后视为注册成功</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'login',
    data(){
        return {
            userName: '',
            password: ''
        }
    },
    methods:{
        handleLogin(){
            const {userName, password} = this

            if(!userName || !password){
                return alert('内容不能为空')
            }

            axios({
                url: '/api/login',
                method: 'post',
                data: {
                    userName,
                    password
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.login{
    .login-main{
        header{
            background-color: rgba(25, 50, 81, 0.8);
            .header-wrap{
                width: 1200px;
                height: 60px;
                margin: 0 auto;
                .logo{
                    float: left;
                    padding-top: 12px;
                    img{
                        width: 40px;
                        height: 40px;

                    }
                }
                .logo-text{
                    float: left;
                    color: #fff;
                    font-size: 25px;
                    margin-left: 20px;
                    line-height: 60px;
                }
                .clear{
                    clear: both;
                }
            }
        }
        .login-content{
            > div{
                position: fixed;
                top: 50%;
                left: 50%;
                width: 300px;
                height: 204px;
                margin: -102px -150px;
                padding: 20px 20px 0;
                border-radius: 10px;
                background-color: #fff;
                .name, .password{
                    width: 100%;
                    height: 30px;
                    margin: 5px 0;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                    input{
                        width: 98%;
                        height: 100%;
                        border: none;
                        outline: none;
                        padding-left: 1%;
                    }
                }
                .btn{
                    span{
                        display: block;
                        padding: 7px 0;
                        color: #fff;
                        margin: 2px 0;
                        cursor: pointer;
                        border-radius: 5px;
                        text-align: center;
                        &.login-entry{
                            background-color: #1aabda;
                            &:hover{
                                background-color: #39b0d6;
                            }
                        }
                        &.login-no{
                            background-color: #65ae37;
                            &:hover{
                                background-color: #70bc40;
                            }
                        }
                    }
                }
                .login-detail{
                    color: red;
                    padding: 5px;
                }
            }
        }
    }
    .bgc{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background: url('./imgs/bgc.jpg') no-repeat;
        background-size: 100%;
    }
}
</style>