<template>
    <div class="course">
        <div class="course-content">
            <h1>最新课程</h1>
            <div class="course-list">
                <ul>
                    <li 
                        v-for="(item, index) in courseData"
                        :key="index"
                        @click="$router.replace(`/vdetail/${item.listId}`)"
                    >
                        <div class="course-pic">
                            <img :src="item.listPoster">
                        </div>
                        <div class="course-title">
                            <span class="grade">{{item.listGrade | grade}}</span>
                            <span class="title">{{item.listTitle}}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'course',
    props:{
        courseData: Array
    }
    
}
</script>

<style lang="less" scoped>
.course{
    margin-top: 10px;
    .course-content{
        padding: 20px;
        h1{
            font-size: 16px;
            color: #343535;
            padding-bottom: 5px;
            border-bottom: 1px dotted #e9e9e9;
        }
        .course-list{
            margin-top: 10px;
            ul{
                li{
                    width: 200px;
                    height: 166px;
                    margin: 15px;
                    cursor: pointer;
                    float: left;
                    overflow: hidden;
                    border-radius: 10px;
                    box-shadow: 0 5px 10px 0 rgba(0,0,0,0.1);
                    .course-pic{
                        img{
                            width: 100%;
                            height: 100px;
                        }
                    }
                    .course-title{
                        line-height: 25px;
                        padding: 5px;
                        .grade{
                            color: #fff;
                            padding: 2px;
                            border-radius: 3px;
                            font-size: 12px;
                            background: #93999f;
                        }
                        .title{
                            font-size: 14px;
                            padding-left: 10px;
                        }
                    }
                }
            }
        }
    }
}
</style>