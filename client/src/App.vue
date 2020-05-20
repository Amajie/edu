<template>
  <div id="app">
    <router-view />
    <div class="loading" v-if="$store.state.spinShow">
      <Spin size="large" ></Spin>
    </div>
  </div>
</template>

<style lang="less">
#app{
  position: relative;
  .loading{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    background-color: #fff;
  }
  .ivu-spin-large .ivu-spin-dot{
    position: fixed;
    top: 50%;
    left: 50%;
    margin: -25px;
    width: 50px;
    height: 50px;
  }
}
</style>
