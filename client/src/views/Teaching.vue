<template>
    <div class="teaching">
        <Navbar>
            <div class="search">
                <Input search style="width: 350px"
                    @on-search="initSearch(true)" 
                    v-model="listTitle" enter-button 
                    placeholder="请输入关键字" 
                />
            </div>
        </Navbar>
        <div class="teaching-content">
            <div class="teaching-type">
                <div class="type">   
                    <ul>
                        <!-- <li class="title">服务器开发</li> -->
                        <li @click="selectAll" :class="{active: allType}"><span>全部</span></li>
                        <li 
                            v-for="(item, index) in directionArr"
                            :key="index"
                            :class="{active: index === item.key}"
                            @click="handleSelectType(item.direction, index)"
                        ><span>{{item.direction}}</span></li>
                    </ul>
                </div>
            </div>
            <div class="teaching-videos">
                <div class="teaching-select">
                    <ul class="l">
                        <li @click="listNew=''" :class="{active: !listNew}">最热</li>
                        <li @click="listNew=1" :class="{active: listNew === 1}">最新</li>
                    </ul>
                    <ul class="r">
                        <li class="grade">难度:</li>
                        <li @click="listGrade=''" :class="{active: !listGrade}">全部</li>
                        <li @click="listGrade=1" :class="{active: listGrade === 1}">初级</li>
                        <li @click="listGrade=2" :class="{active: listGrade === 2}">中等</li>
                        <li @click="listGrade=3" :class="{active: listGrade === 3}">高级</li>
                    </ul>
                </div>
                <div v-if="searchData.length" class="teaching-list">
                    <ul class="teaching-search">
                        <li 
                            v-for="item in searchData"
                            :key="item.listId"
                            @click="$router.replace(`/vdetail/${item.listId}`)"
                        >
                            <div class="list-top">
                                <img :src="item.listPoster">
                            </div>
                            <div class="list-bottom">
                                <div class="video-title">
                                    <span class="grade">{{item.listGrade | grade}}</span>
                                    <span class="title">{{item.listTitle}}</span>
                                </div>
                                <div class="video-num">
                                    {{item.listClick}} 次播放
                                </div>
                            </div>
                        </li>

                    </ul>
                    <div class="teaching-page">
                        <ul>
                            <!-- 大于1 不能上一页了 -->
                            <li @click="handlePrevNext(false)" :class="['prev', `${limit === 1? 'no-active': 'btn'}`]">上一页</li>
                            <!-- 最大页 不能 下一页 -->
                            <li @click="handlePrevNext(true)"  :class="['next', `${limit === searchTotal? 'no-active': 'btn'}`]">下一页</li>
                            <li class="page-total">
                                <span>当前：{{limit}}/{{searchTotal}} 页</span>
                            </li>
                            <li class="print">
                                <input v-model="printPage" />
                                <span @click="handlePage" class="print-btn">跳转</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <NoData v-else />
            </div>
            
        </div>
        
        <Footerbar></Footerbar>
    </div>
</template>
<script>

import Navbar from '@/components/com/Navbar.vue'
import Footerbar from '@/components/com/Footerbar.vue'
import NoData  from '@/components/com/NoData.vue'

import {searchVideo} from '@/axios/index.js'

export default {
    name: 'teaching',
    data(){
        return {
            typeArr:[
                {
                    title: '前端开发',
                    child: ['HTML5', 'CSS', 'javascript', 'Vue.js', 'React', 'Angular', 'jQuuery', '移动端开发']
                },
                {
                    title: '服务器开发',
                    child: ['node', 'java', 'python', 'php', 'ASP', 'JSP', 'C语言', 'C++', 'C#']
                },
                {
                    title: '数据库开发',
                    child: ['Oracle', 'MySQL', 'SQL Server', 'MongoDB']
                },
            ],
            directionArr: [],
            allType: true,
            // 条件
            selectType: [],
            listTitle: '',
            listGrade: '',
            listNew: '',
            searchData: [],
            searchTotal: 2,
            limit: 1,
            printPage: '',
            offset: 15
        }
    },
    created(){
        
        // 首先获取最新数据
        this.handleSearch()

        this.typeArr.forEach(item => {
            item.child.forEach(child => {
                this.directionArr.push({direction: child, key: -1})
            })
        })
    },
    methods:{
        // 搜索数据
        handleSearch(needTitle){
            const { selectType, listTitle, listGrade, 
                    limit, offset, listNew, $Message} = this

            // 点击搜索按钮 则需要输入关键字
            if(needTitle && !listTitle) return $Message.info('请输入关键字')

            // 发送请求
            searchVideo({
                listTitle, 
                listGrade, 
                listNew,
                limit: limit - 1,
                offset,
                listType: selectType.length? selectType: '' //长度为0 发送空即可
            }).then(res =>{
                const {code, searchData, searchTotal} = res.data


                if(code === 500) return this.searchData = []

                this.searchData = searchData
                this.searchTotal = Math.ceil(searchTotal / offset)

            })

        },
        // 获取分类
        handleSelectType(direction, index){
            // 查看是否已经选择
            const i = this.selectType.findIndex(item => item === direction)

            // 没选择
            if(i === -1){
                // 也就是 说当 分别选择了每一项，达到最高数量 则表示选择全部 
                // 这里减 1 是 表示在添加一项 达到最高数量
                if(this.selectType.length === this.directionArr.length - 1){
                    this.selectAll()
                }else{// 否则 就是选择 再添加一项 选择
                    this.selectType.push(direction)
                    this.directionArr[index].key = index
                }
            }else{
                this.selectType.splice(i, 1)
                this.directionArr[index].key = -1
            }
        },
        // 选择全部
        selectAll(){
            this.directionArr.forEach(item =>{
                if(item.key != -1) item.key = -1
            })

            this.selectType = []
        },

        // 处理上下一张
        handlePrevNext(flag){

            let {limit, handleSearch, searchTotal} = this

            // 上一张 下一张到底
            if((!flag && limit === 1) || (flag && limit === searchTotal)){
                return console.log('到底了')
            }

            // flag true 为下一张 否则上一张
            this.limit = flag? ++limit: --limit

            // 搜索数据
            handleSearch()
            
        },

        // 输入页码
        handlePage(){

            let {printPage, searchTotal, handleSearch, limit} = this

            // 如果 输入页码 过大 现实最大即可 或者输入的不是数字
            if(printPage > searchTotal || isNaN(printPage)){
                this.printPage = searchTotal
            }

            // 获取当前页码
            this.limit = parseInt(this.printPage)

            if(this.limit != limit){
                // 发送数据
                handleSearch()
            }
        },
        initSearch(needTitle){
            this.limit = 1
            this.limit = 1
            this.handleSearch(needTitle)
        }
    },

    watch:{
        selectType(newType, oldType){
            if(!newType.length || newType.length === this.directionArr.length){
                this.allType = true
            }else{
                this.allType = false
            }
        },
        // 最新 最热 变化
        listNew(newVal, oldVal){
            this.initSearch()
        },
        // 难度变化
        listGrade(newVal, oldVal){
            this.initSearch()
        }
    },
    components:{
        // 头部
        Navbar,
        Footerbar,
        NoData
    }
}
</script>
<style lang="less" scoped>
.teaching{
    .teaching-content{
        width: 1200px;
        margin: 0 auto;
        .teaching-type{
            ul{
                overflow: hidden;
                padding: 15px 0;
                border-bottom: 1px solid #edf1f2;
                li{
                    float: left;
                    padding: 7px 20px;
                    margin: 10px 5px;
                    border-radius: 20px;
                    cursor: pointer;
                    span{
                        color: #333333;
                        font-size: 14px;
                    }
                    &.title{
                        font-weight: 700;
                        width: 110px;
                        margin-right: 20px;
                    }
                    &.active{
                        background: #000;
                        span{
                            color: #fff;
                        }
                    }
                }
            }
        }
        .teaching-videos{
            margin-top: 30px;
            .teaching-select{
                overflow: hidden;
                padding-bottom: 15px;
                border-bottom: 1px solid #edf1f2;
                li{
                    float: left;
                    cursor: pointer;
                    padding: 5px 20px;
                    margin-right: 20px;
                    border-radius: 20px;
                    background: #f3f5f7;
                    &.active{
                        background: #000;
                        color: #fff;
                    }
                }
                .l{
                    float: left;
                }
                .r{
                    float: right;
                    .grade{
                        background: #fff;
                        color: #8e9192;
                    }
                }
            }
            // 列表
            .teaching-list{
                background: #fff;
                overflow: hidden;
                border-radius: 10px;
                .teaching-search{
                    height: 100%;
                    overflow: hidden;
                    li{
                        width: 210px;
                        height: 170px;
                        margin: 20px 30px 20px 0;
                        padding-bottom: 10px;
                        cursor: pointer;
                        overflow: hidden;
                        float: left;
                        box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
                        border-radius: 10px;
                        &:hover .list-bottom .video-title{
                            top: -100px;
                        }
                        .list-top{
                            height: 130px;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .list-bottom{
                            position: relative;
                            line-height: 25px;
                            height: 100px;
                            .video-title{
                                position: absolute;
                                background: #fff;
                                top: -50px;
                                left: 0;
                                width: 100%;
                                font-size: 14px;
                                border-radius: 10px;
                                padding: 20px 10px 70px;
                                transition: 0.3s top;
                                .grade{
                                    color: #fff;
                                    padding: 2px;
                                    border-radius: 3px;
                                    font-size: 12px;
                                    background: #93999f;
                                }
                                .title{
                                    padding-left: 10px;
                                }
                            }
                            .video-num{
                                position: absolute;
                                top: 0;
                                left: 0;
                                padding: 10px;
                                font-size: 12px;
                                
                                color: #93999f;
                                width: 100%;
                                background: #fff;
                            }
                        }
                    }
                }
                // 分页
                .teaching-page{
                    height: 70px;
                    margin-top: 20px;
                    position: relative;
                    ul{
                        position: absolute;
                        left: 50%;
                        top: 0;
                        transform: translateX(-50%);
                        overflow: hidden;
                        li{
                            float: left;
                            padding: 5px;
                            margin: 0 10px;
                            &.print{
                                input{
                                    width: 50px;
                                    height: 18px;
                                    border-radius: 3px;
                                    border: 1px solid #ccc;
                                }
                                .print-btn{
                                    color: #fff;
                                    cursor: pointer;
                                    border-radius: 10px;
                                    padding: 2px 10px;
                                    margin-left: 5px;
                                    background: #2189ff;
                                    &:hover{
                                        color: #ebebeb;
                                    }
                                }
                            }
                            // 按钮
                            &.btn{
                                cursor: pointer;
                                color: #787d82;
                                border-radius: 5px;
                                
                                background: #ebeced;
                                &:hover{
                                    color: #93999f;
                                }
                            }
                            &.no-active{
                                cursor: not-allowed;
                                background: #f3f5f7;
                            }
                            &.page-total{
                                color: #93999f;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>