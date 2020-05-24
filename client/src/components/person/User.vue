<template>
    <div class="user">
        <div class="user-wrap">
            <div class="info">
               <ul>
                   <li>
                        <em>用户名</em>
                        <span>{{userData.userName? userData.userName: '暂无用户'}}</span>
                   </li>
                   <li>
                        <em>密码</em>
                        <span>********</span>
                   </li>
                   <li>
                        <em>性别</em>
                        <span>{{userData.userGender === 1 ? '男': '女'}}</span>
                   </li>
                   <li>
                        <em>个性签名</em>
                        <span>{{userData.userSign ? userData.userSign: '暂无个性签名'}}</span>
                   </li>
                   <li>
                        <em>个人邮箱</em>
                        <span>{{userData.userEmail ? userData.userEmail: '暂无邮箱'}}</span>
                   </li>
                   <li>
                        <em>居住地址</em>
                        <span>{{userData.userAddress ? userData.userAddress: '暂无地址'}}</span>
                   </li>
               </ul>
            </div>
            <div v-if="targetUserId === users.userId" class="change">
                <ul>
                    <li>
                        <input v-model="userName" placeholder="请输入用户名">
                        <span @click="changeUsersName()">修改</span>
                    </li>
                    <li>
                        <input v-model="userCode" type="password" placeholder="请输入密码">
                        <span @click="changeUsers('userCode')">修改</span>
                    </li>
                    <li class="gender">
                        <div>
                            <em @click="userGender = 1" :class="{active: userGender === 1}">男</em>
                            <em @click="userGender = 2" :class="{active: userGender === 2}">女</em>
                        </div>
                        <span @click="changeUsers('userGender')">修改</span>
                    </li>
                    <li>
                        <input v-model="userSign" placeholder="请输入个性签名">
                        <span @click="changeUsers('userSign')">修改</span>
                    </li>
                    <li>
                        <input v-model="userEmail" placeholder="请输入个人邮箱">
                        <span @click="changeUsers('userEmail')">修改</span>
                    </li>
                    <li>
                        <input v-model="userAddress" placeholder="请输入居住地址">
                        <span @click="changeUsers('userAddress')">修改</span>
                    </li>
               </ul>
            </div>
        </div>
    </div>
</template>

<script>

import {updateUser, updateName} from '@/axios/index'
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'user',
    data(){
        return{
            userName: '',
            userGender: 0,
            userEmail: '',
            userCode: '',
            userSign: '',
            userAddress: '',
            cloneUsers: {}
        }
    },
    computed:{
        ...mapState(['users'])
    },
    methods:{

        ...mapMutations([
            'setUsers'
        ]),
        // 修改用户信息
        changeUsers(key){

            const {users, $Modal, $Message, handleData} = this

            const value = this[key]

            if(!value){
                return $Modal.warning({
                    title: '提示',
                    content: '内容不能为空'
                })
            }

            // 如果性别 与设置之前 一样无需发送请求 直接提示成功
            if(key === 'userGender' && value === users.userGender){
                return $Message.success('修改成功')
            }
            
            // 发送请求
            updateUser({
                setVal: value,
                setKey: key,
                userId: users.userId
            }).then(res =>{

                handleData(res.data, key, value)

            })
        },
        // 修改用户名
        changeUsersName(){

            const {users, userName, $Modal, $Message, handleData} = this

            if(!userName){
                return $Modal.warning({
                    title: '提示',
                    content: '内容不能为空'
                })
            }


             // 如果性别 与设置之前 一样无需发送请求 直接提示成功
            if(userName === users.userName){
                return $Message.success('修改成功')
            }
            
            // 发送请求
            updateName({
                userName,
                userId: users.userId
            }).then(res =>{
                handleData(res.data, 'userName', userName)
            })
        },
        // 处理 修改的数据
        handleData({code}, key, value){

            const {users, setUsers, $Message} = this

            // 修改失败
            if(code === 500){
                return $Message.error('服务错误，请稍后再试')
            }else if(!code){
                return $Message.error('用户名已经存在，请重新修改')
            }

            // 更新 vuex 数据 密码不需要更新
            key === 'userCode' || setUsers({...users, [key]: value})
            // 清空数据
            this[key] = ''
            // 这个userData 不可被修改 只能在父组件被修改 因此调用父组件的
            this.$parent.setUserData(this.users)
            $Message.success('修改成功')
        }
    },
    props:{
        userData: {
            type: Object,
            default: () =>({})
        },
        targetUserId: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="less" scoped>
.user{
    .user-wrap{
        overflow: hidden;
        > div{
            float: left;
            width: 50%;
            &.info{
                ul{
                    li{
                        height: 50px;
                        overflow: hidden;
                        font-size: 17px;
                        margin: 15px 0;
                        line-height: 50px;
                        em{
                            display: block;
                            float: left;
                            height: 100%;
                            width: 120px;
                            font-style: normal;
                            font-weight: 700;
                            color: #3c3a3a;
                            padding: 0 20px;
                            background-color: #f3f5f7;
                            border-left: 3px solid #d9dde1;
                        }
                        span{
                            display: block;
                            height: 100%;
                            color: #787d82;
                            padding-left: 170px;
                        }
                    }
                }
               
            }
            &.change{
                ul{
                    li{
                        height: 50px;
                        margin: 15px 0;
                        padding-left: 20px;
                        input{
                            height: 30px;
                            width: 80%;
                            color: #787d82;
                            padding-left: 10px;
                            margin-top: 10px;
                            border-radius: 5px;
                            border: 1px solid #d9dde1;
                        }
                        span{
                            padding: 7px 20px;
                            margin-left: 5px;
                            border-radius: 5px;
                            color: #787d82;
                            cursor: pointer;
                            background-color: #f3f5f7;
                            &:hover{
                                color: #555;
                            }
                        }
                        &.gender{
                            > div{
                                display: inline-block;
                                width: 80%;
                                em{
                                    display: inline-block;
                                    width: 60px;
                                    height: 30px;
                                    color: #787d82;
                                    font-style: normal;
                                    cursor: pointer;
                                    text-align: center;
                                    line-height: 30px;
                                    margin: 10px 5px;
                                    border-radius: 5px;
                                    border: 1px solid #d9dde1;
                                    &.active{
                                        border: 1px solid #3b6add;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        
    }
}
</style>