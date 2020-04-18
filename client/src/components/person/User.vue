<template>
    <div class="user">
        <div class="user-wrap">
            <div class="info">
               <ul>
                   <li>
                        <em>用户名</em>
                        <span>车神-黄杰</span>
                   </li>
                   <li>
                        <em>密码</em>
                        <span>**********</span>
                   </li>
                   <li>
                        <em>性别</em>
                        <span>男</span>
                   </li>
                   <li>
                        <em>个性签名</em>
                        <span>我是车神哈哈哈哈我是车神哈哈哈哈我是车神哈哈哈哈我是车神哈哈哈哈我是车神哈哈哈哈我是车神哈哈哈哈</span>
                   </li>
                   <li>
                        <em>个人邮箱</em>
                        <span>651762920@qq.com</span>
                   </li>
                   <li>
                        <em>居住地址</em>
                        <span>广东深圳</span>
                   </li>
               </ul>
            </div>
            <div class="change">
                <ul>
                    <li>
                            <input placeholder="请输入用户名">
                    </li>
                    <li>
                        <input placeholder="请输入密码">
                    </li>
                    <li class="gender">
                        <span class="active">男</span>
                        <span>女</span>
                    </li>
                    <li>
                            <input placeholder="请输入个性签名">
                    </li>
                    <li>
                            <input placeholder="请输入个人邮箱">
                    </li>
                    <li>
                        <input placeholder="请输入居住地址">
                    </li>
               </ul>
            </div>
        </div>
        <div class="btn">
            <span title="修改信息">点击修改</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'user'
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
                            width: 75px;
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
                        padding: 0 20px;
                        input{
                            height: 30px;
                            width: 100%;
                            color: #787d82;
                            padding-left: 10px;
                            margin-top: 10px;
                            border-radius: 5px;
                            border: 1px solid #d9dde1;
                        }
                        &.gender{
                            span{
                                display: block;
                                width: 60px;
                                height: 30px;
                                float: left;
                                color: #787d82;
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
    .btn{
        margin: 10px 0;
        span{
            display: block;
            margin: 0 auto;
            width: 90px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            border-radius: 5px;
            color: #787d82;
            cursor: pointer;
            background-color: #f3f5f7;
            &:hover{
                color: #555;
            }
        }
    }
}
</style>