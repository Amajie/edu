<template>
    <div class="technology">
        <div class="technology-content">
            <div class="technology-left">
                <h1>最新社区</h1>
                <ul>
                    <li>
                        <span class="technology-title">ATOM官网打不开无法下载</span> 
                        <span class="technology-time">2019-02-09</span>
                    </li>
                    <li>
                        <span class="technology-title">ATOM官网打不开无法下载</span> 
                        <span class="technology-time">2019-02-09</span>
                    </li>
                    <li>
                        <span class="technology-title">ATOM官网打不开无法下载</span> 
                        <span class="technology-time">2019-02-09</span>
                    </li>
                    <li>
                        <span class="technology-title">ATOM官网打不开无法下载</span> 
                        <span class="technology-time">2019-02-09</span>
                    </li>
                </ul>
            </div>
            <div class="technology-right">
                <h1>社区推荐</h1>
                    <ul>
                        <li>
                            <span class="technology-title">ATOM官网打不开无法下载</span> 
                            <span class="technology-time">2019-02-09</span>
                        </li>
                        <li>
                            <span class="technology-title">ATOM官网打不开无法下载</span> 
                            <span class="technology-time">2019-02-09</span>
                        </li>
                        <li>
                            <span class="technology-title">ATOM官网打不开无法下载</span> 
                            <span class="technology-time">2019-02-09</span>
                        </li>
                        <li>
                            <span class="technology-title">ATOM官网打不开无法下载</span> 
                            <span class="technology-time">2019-02-09</span>
                        </li>
                    </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'technology',
    
}
</script>
<style lang="less" scoped>
.technology{
    .technology-content{
        overflow: hidden;
        padding: 20px;
        background: #f2f4f6;
        > div{
            float: left;
            width: 575px;
            background: #fff;
            width: calc(100%/2 - 5px);
            h1{
                font-size: 16px;
                color: #343535;
                padding: 5px 10px;
                padding-bottom: 5px;
                border-bottom: 1px dotted #e9e9e9;
            }
            ul{
                padding: 10px 15px;
                li{
                    padding: 3px 0;
                    color: #333333;
                    cursor: pointer;
                    font-size: 14px;
                    &:hover .technology-title{
                         color: #777777;
                    }
                    .technology-time{
                        color: #777777;
                        float: right;
                    }
                }
            }

        }
        .technology-left{
            margin-right: 5px;
        }
        .technology-right{
            margin-left: 5px;
        }
    }
}
</style>