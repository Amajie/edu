<template>
    <div class="carousel">
        <div class="carousel-pic">
            <Carousel :autoplay-speed="5000" autoplay v-model="carousel" loop>
                <CarouselItem>
                    <div class="demo-carousel">
                        <img src="./imgs/i1.png">
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div class="demo-carousel">
                        <img src="./imgs/i2.png">
                    </div>
                </CarouselItem>
                <CarouselItem>
                    <div class="demo-carousel">
                        <img src="./imgs/i3.jpg">
                    </div>
                </CarouselItem>
            </Carousel>
        </div>
    </div>
</template>
<script>
export default {
    name: 'carousel',
    data(){
        return {
            carousel: 0
        }
    }
}
</script>

<style lang="less" scoped>
.carousel{
    .carousel-pic{
        .ivu-carousel{
            height: 400px;
            img{
                height: 400px;
                width: 100%;
            }
        }
    }
}
</style>