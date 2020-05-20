<template>
    <div class="video-play">
        <h2>视频播放</h2>
        <Footerbar></Footerbar>
    </div>
</template>
<script>

import Footerbar from '@/components/com/Footerbar.vue'

export default {
    name: 'vplay',
    components:{
        // 底部
        Footerbar
    }
}
</script>
<style lang="less" scoped>
.video-play{
}
</style>