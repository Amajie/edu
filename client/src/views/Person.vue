<template>
    <div class="person">
        <Navbar></Navbar>
        <div class="person-main">
            <!-- 主页 -->
            <div class="person-info">
                <div class="info">
                    <div v-show="userData.userAvatar" class="user-pic">
                        <div class="avatar">
                            <div class="up">
                                <Upload 
                                    action
                                    @click.native="selectPic"
                                    :before-upload="beforeUpload"    
                                >
                                    <p>上传图片</p>
                                </Upload>
                            </div>
                            <img title="点击更换头像" :src="userData.userAvatar">
                        </div>
                        <div v-if="targetUserId != users.userId" class="concer">
                            <img v-if="!fansFlag" title="关注他吧" @click="handleFans" src="./imgs/concern.png">
                            <img v-else title="已关注" src="./imgs/concern-active.png">
                        </div>
                    </div>
                    <div class="user-desc">
                        <div class="user-desc-wrap">
                            <div class="name">
                                <h2>{{userData.userName}}</h2>
                            </div>
                            <div class="desc-concer">
                                
                                <div class="concer">
                                    <div class="c">
                                        <em>{{concernTotal}}</em>
                                        <span>关注</span>
                                    </div>
                                    <div class="f">
                                        <em>{{userData.userFans | filterNum}}</em>
                                        <span>粉丝</span>
                                    </div>
                                </div>
                                <div class="desc">
                                    <span>
                                        {{userData.userSign? 
                                            userData.userSign:
                                            '这人很神秘，什么也不介绍！！！'
                                        }}
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
                                @click="handlePersonNav(index)" 
                                :class="{active: activeIndex === index}"> 
                                <i class="icon iconfont" v-html="item.icon"></i>
                                <span>{{item.title}}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="show">
                        <components
                            ref="personChild"
                            v-if="showChild" 
                            :userData="userData"
                            :userId="users.userId" 
                            :targetUserId="targetUserId" 
                            :is="childComponent"></components>
                    </div>
                </div>
            </div>
        </div>
        <Footerbar></Footerbar>
    </div>
</template>
<script>

import Navbar from '@/components/com/Navbar.vue'
import Footerbar from '@/components/com/Footerbar.vue'

// 个人中心组件
import User from '@/components/person/User.vue'
import MyCourse from '@/components/person/MyCourse.vue'
import MyEssay from '@/components/person/MyEssay.vue'
import Essay from '@/components/person/Essay.vue'
import Fans from '@/components/person/Fans.vue'

import {mapState, mapMutations} from 'vuex'
import {updateUser, getUser, upAvatarPic} from '@/axios/index.js'
export default {
    name: 'person',
    data(){
        return {
            navList: [
                {title: '个人信息', icon: '&#xe672;', component: User},
                {title: '课程中心', icon: '&#xe609;', component: MyCourse},
                {title: '文章中心', icon: '&#xe617;', component: MyEssay},
                {title: '创作文章', icon: '&#xe8ca;', component: Essay},
                {title: '关注粉丝', icon: '&#xe602;', component: Fans}
            ],
            activeIndex: 0,
            childComponent: User,
            nav: '',
            targetUserId: '',
            // 这是传给User组件的
            userData: {},
            showChild: false,
            concernTotal: 0 // 关注数量
        }
    },
    created(){

        const {users, $route} = this

        // 先获取访问目标用户的id
        this.targetUserId = $route.params.targetUserId
        this.nav = $route.params.nav

        // 发送请求获取
        getUser({userId: this.targetUserId}).then(res =>{

            const {code, userData, concernTotal} = res.data
            if(code === 500) return console.log('服务器错误')

            // 成功
            this.userData = userData
            this.concernTotal = concernTotal
            this.showChild = true

            // 此时有可能粉丝数量有变 因此即使访问自己也要获取一次信息
            if(this.targetUserId === users.userId){
                // 此时有可能粉丝数量有变 因此即使访问自己也要获取一次信息
                this.setUsers(userData)
            }
        })
    },
    computed:{
        ...mapState([
            'users'
        ]),
        fansFlag(){
            return this.userData.userFans && this.userData.userFans.indexOf(this.users.userId) != -1
        }
    },
    watch:{
        nav(newNav, oldNav){
            // 转为number
            newNav = parseInt(newNav)

            this.childComponent = this.navList[newNav].component
            this.activeIndex = newNav
        }
    },
    methods: {
        ...mapMutations(['setUsers']),
        // 处理 点击nav 跳转
        handlePersonNav(index){

            // 设置当前索引
            this.activeIndex = index

            // 设置当前显示的组件
            this.childComponent = this.navList[index].component
            // 路由跳转
            this.$router.replace(`/person/${this.targetUserId}/${index}`)
        },
        // 关注
        handleFans(){

            const {targetUserId, users, $Message, userData, $refs} = this

            // 为true 无需发送请求
            updateUser({
                userId: users.userId,
                targetUserId,
                setKey: 'userFans'
            }).then(res =>{
                // 失败
                if(res.data.code === 500) return $Message.error('关注失败')
                // 成功
                $Message.success(`成功关注${userData.userName}`)

                // 此时当前用户多一个粉丝
                this.userData.userFans = `${userData.userFans + users.userId}|`

                // 此时还要判断 是否 粉丝关注页面，如果在的话，需要把粉丝的数据push到粉丝列表中
                // 或者重新获取粉丝关注数据 这里 直接push
                $refs.personChild.addFans && $refs.personChild.addFans(userData)

            })
        },
        // 在用户修改个人信息后 需要修改userData
        setUserData(userData){
            this.userData = userData
        },
        // 不是本人不能点击上传头像
        selectPic(e){
            if(this.targetUserId != this.users.userId){
               e.preventDefault()
            }
        },
         // 上传图片
        beforeUpload(avatarPic){

            const {$Message, userData} = this
            
            const formData = new FormData()

            formData.append('avatarPic', avatarPic)
            formData.append('userId', userData.userId)

            // 发送请求
            upAvatarPic(formData).then(res=>{

                const {code, avatarPicUrl} = res.data

                // 失败
                if(code === 500){
                    return this.$Message.error('上传失败，请稍后再试')
                }
                
                // 关闭 modal
                this.$Message.success('上传成功')
                // 设置 用户信息
                this.userData = {...userData, userAvatar: avatarPicUrl}
                this.setUsers(this.userData)

            })

            return false
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
        MyCourse,
        // 我的文章
        MyEssay,
        // 写文章
        Essay
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
                        cursor: pointer;
                        > img{
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                        }
                        .up{
                            position: absolute;
                            left: 0;
                            top: 0;
                            opacity: 0;
                            p{
                                width: 180px;
                                height: 180px;
                                border-radius: 50%;
                            }
                        }
                    }
                    .concer{
                        position: absolute;
                        left: 180px;
                        top: 160px;
                        width: 80px;
                        height: 80px;
                        cursor: pointer;
                        overflow: hidden;
                        border-radius: 50%;
                        > img{
                            width: 100%;
                            height: 100%;
                        }
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