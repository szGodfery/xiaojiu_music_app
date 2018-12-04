<template>
  <div class="nav">
    <router-link class="nav-item" tag="div" to="/find-music/rec-music">
      <span>推荐音乐</span>
    </router-link>
    <router-link class="nav-item" tag="div" to="/find-music/hot-music">
      <span>排行榜</span>
    </router-link>
    <router-link class="nav-item" tag="div" to="/find-music/search-music">
      <span>搜索</span>
    </router-link>
  </div>
</template>
<style lang="less" scoped>
.nav {
  display: flex;
  height: 40px;
  align-items: center;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  color: #333;
  .nav-item {
    height: 100%;
    line-height: 40px;
    text-align: center;
    width: 33.33%;
    font-size: 16px;
    span{
      display:inline-block;
      height: 98%;
      line-height: 40px;
      padding: 0 10px;
    }
    &.router-link-active {
      color: #d23c30;
      span{
        box-shadow: 0 2px red;
      }
    }
  }
}
</style>

