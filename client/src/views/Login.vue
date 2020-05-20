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
                        <input type="password" v-model="userCode" placeholder="请输入密码">
                    </div>
                    <div class="btn">
                        <span @click="handleLogin" class="login-entry">我要登陆</span>
                        <span @click="noLogin" class="login-no">我是过客</span>
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
import {login, register} from '@/axios/index'
import {mapState, mapMutations} from 'vuex' 
export default {
    name: 'login',
    data(){
        return {
            userName: '1111',
            userCode: '111111',
            modal: false,
            modelMsg: ''
        }
    },
    computed:{
        ...mapState([
            'users'
        ])
    },
    methods:{
        ...mapMutations([
            'setUsers'
        ]),
        // 处理登陆
        handleLogin(){
            const {userName, userCode, $Message, $Modal, onOk} = this
            
            // 用户名 密码为空
            if(!userName) return $Message.warning('用户名不能为空')
            if(!userCode) return $Message.warning('密码不能为空')
            if(userName.length < 4 ||  userName.length > 8) return $Message.warning('用户名长度需在4~8之间')
            if(userCode.length < 6 ||  userCode.length > 12) return $Message.warning('密码长度需在6~12之间')

            login({userName, userCode}).then(res =>{
                // 获取数据
                const {code, users} =res.data

                if(code === 500){
                    return $Modal.error({
                        title: '提示',
                        content: '服务器错误，请稍后再试'
                    })
                }else if(code === 0){
                    return $Modal.confirm({
                        title: '提示',
                        content: '该用户名，没有被注册，是否现在注册？',
                        onOk,
                        onCancel: () =>{
                            this.userName = ''
                            this.userCode = ''
                        }
                    })
                }else if(code === 1){
                   return $Modal.warning({
                        title: '提示',
                        content: '密码错误，请重新输入'
                   })
                }


                this.toHome('登陆成功，即将前往首页...', users)

            })
        },

        // 此时发送请求 注册该用户
        onOk(){
            const {userName, userCode, $Modal} = this
            
            register({
                userName, userCode
            }).then(res =>{
                 // 获取数据
                const {code, users} =res.data
                // 为什么使用定时器 因为 这里已经嵌套了两层 modal 会出现一闪一闪的结果
                if(code === 500){
                    clearTimeout(this.time)
                    return this.time = setTimeout(() =>{
                        $Modal.warning({
                            title: '提示',
                            content: '服务器错误，请稍后再试'
                        })
                    }, 500)
                }

                // 成功
                this.toHome('注册成功，即将前往首页...', users)
            })
        },

        // 登陆 或者注册成功 前往首页
        toHome(content, users){

            this.$Message.success({
                content,
                duration: 2,
                onClose: () =>{
                    // 设置 用户信息 保存到 vuex中
                    this.setUsers(users)
                    localStorage.setItem('users', JSON.stringify(users))

                    this.$cookies.set('users', users, 60*60*4)
                    
                    this.$router.replace('/')
                }
            })
        },

        // 不注册 直接前往首页
        noLogin(){
            this.$Modal.confirm({
                title: '我好伤心',
                content: '真的不登陆在走？好伤心，再考虑考虑呗！',
                cancelText: '留下',
                okText: '离开',
                onOk: () =>{
                    this.$router.replace('/')
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
                height: 220px;
                margin: -110px -150px;
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