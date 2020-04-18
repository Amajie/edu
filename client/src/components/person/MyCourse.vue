<template>
    <div class="my-course">
        <div class="my-course-content">
            <div class="nav-item">
                <span class="active">我的发布</span>
                <span>我的收藏</span>
                <span>发布课程</span>
            </div>
            <div class="content">
                asdas
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'myCourse'
}
</script>

<style lang="less" scoped>
.my-course{
    margin-top: 10px;
    .my-course-content{
        .nav-item{
            margin-bottom: 20px;
            span{
                color: #787d82;
                cursor: pointer;
                margin: 0 5px;
                padding: 10px 20px;
                &.active{
                    background-color: #f3f5f7;
                }
            }
        }
    }
}
</style>