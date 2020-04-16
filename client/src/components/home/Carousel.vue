<template>
    <div class="carousel">
        <div class="carousel-nav">
            <ul>
                <li><span>学习路线</span></li>
                <li><span>服务器端</span></li>
                <li><span>前端开发</span></li>
            </ul>
        </div>
        <div class="carousel-pic">
            <ul>
                <li><img src="./imgs/i1.png"></li>
                <li><img src="./imgs/i2.png"></li>
                <li><img src="./imgs/i3.jpg"></li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'carousel',
    
}
</script>

<style lang="less" scoped>
.carousel{
    .carousel-nav{
        ul{
            overflow: hidden;
            li{
                float: left;
                cursor: pointer;
                padding: 15px 10px;
                &:hover{
                    color: #666;
                }
            }
        }
    }

    .carousel-pic{
        ul{
            position: relative;
            height: 400px;
            li{
                position: absolute;
                img{
                    width: 1200px;
                    height: 400px;
                }
            }
        }
    }
}
</style>