<template>
  <div id="app">
    <m-header></m-header>
    <!-- 加keep-alive 是为了把保存好的dom缓存到内存中,避免切换不停发送请求 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- <div class="space-common"></div> -->
    <tab></tab>
  </div>
</template>

<script>
import MHeader from "./components/m-header/m-header";
import Tab from "./components/tab/tab";
export default {
  components: {
    MHeader,
    Tab
  },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
</style>


