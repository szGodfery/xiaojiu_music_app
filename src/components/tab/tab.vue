<template>
  <div class="tab">
    <router-link tag="div" to="/find-music" class="tab-bar">
      <span class="icon iconfont icon-yinyue"></span>
      <span class="icon-des">发现音乐</span>
    </router-link>
    <router-link tag="div" to="/mine-music" class="tab-bar">
      <span class="icon iconfont icon-yinle"></span>
      <span class="icon-des">我的音乐</span>
    </router-link>
    <router-link tag="div" to="/friend" class="tab-bar">
      <span class="icon iconfont icon-mn_pengyou"></span>
      <span class="icon-des">朋友</span>
    </router-link>
    <router-link tag="div" to="/account" class="tab-bar">
      <span class="icon iconfont icon-zhanghao"></span>
      <span class="icon-des">账号</span>
    </router-link>
  </div>

</template>
<style lang="less" scoped>
.tab {
  display: flex;
  position: fixed;
  z-index: 100;
  bottom: 0;
  left: 0;
  width: 100%;
  .tab-bar {
    width: 25%;
    height: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #1a1214;
    color:#b0afad;
    .icon{
      font-size: 26px;
      padding: 14px;
    }
    &.router-link-active{
      color:#fff;
    }
    
  }
}
</style>

