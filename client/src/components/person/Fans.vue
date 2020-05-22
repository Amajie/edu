<template>
    <div class="fans">
        <div class="fans-wrap">
            <div class="info">
                <h2>关注</h2>
               <ul>
                    <li
                        v-for="item in concerData"
                        :key="item.userId"    
                    >
                            <div class="avatar">
                                <img :src="item.userAvatar">
                            </div>
                            <div class="desc-name">
                                <p>{{item.userName}}</p>
                                <span>
                                    {{item.userSign ? item.userSign: '博主很神秘，什么也不留！！！'}}
                                </span>
                            </div>
                    </li>
               </ul>
            </div>
            <div class="info">
                <h2>粉丝</h2>
                <ul>
                   <li
                        v-for="item in fansData"
                        :key="item.userId"    
                    >
                        <div class="avatar">
                            <img :src="item.userAvatar">
                        </div>
                        <div class="desc-name">
                            <p>{{item.userName}}</p>
                            <span>
                                {{item.userSign ? item.userSign: '博主很神秘，什么也不留！！！'}}
                            </span>
                        </div>
                    </li>
               </ul>
            </div>
        </div>
    </div>
</template>

<script>

import {getFans} from '@/axios/index'

export default {
    name: 'fans',
    data(){
        return{
            concerData: [], 
            fansData: []
        }
    },
    created(){

        const {userData, targetUserId} = this
        
        let userFans = userData.userFans

        if(userFans.length === 1){
            userFans = ''
        }else{
            userFans = userFans.substr(0, userFans.length - 1).substr(1, userFans.length - 1)
        }


        getFans({
            targetUserId,
            userFans
        }).then(res =>{
            const {code, concerData, fansData} = res.data

            if(code === 200){
                this.concerData = concerData
                this.fansData = fansData
            }
        })
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
.fans{
    .fans-wrap{
        overflow: hidden;
        > div{
            float: left;
            width: 50%;
            &.info{
                ul{
                    padding: 10px;
                    li{
                        padding: 5px;
                        height: 90px;
                        border-radius: 10px;
                        border: 1px dashed #e0e0e0;
                        &:hover{
                            border: 1px dashed #787d82;
                        }
                        .avatar{
                            float: left;
                            height: 60px;
                            margin-top: 9px;
                            img{
                                width: 60px;
                                height: 100%;
                                border-radius: 50%;
                            }
                        }
                        .desc-name{
                            height: 100%;
                            margin-left: 70px;
                            span{
                                font-size: 12px;
                            }
                        }
                    }
                }
               
            }
        }
    }
}
</style>