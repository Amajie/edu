<template>
    <div class="no-data">
        <div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'nodata',
    
}
</script>
<style lang="less" scoped>
.no-data{
   position: relative;
   height: 300px;
   > div{
       position: absolute;
       left: 50%;
       top: 50%;
       margin: -125px;
       width: 250px;
       height: 250px;
       background: url('./imgs/no-data.png') no-repeat 50% 50%;
   }
}
</style>