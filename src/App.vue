<template>
  <div id="app">
    <m-header></m-header>
    <router-view></router-view>
    <tab></tab>
  </div>
</template>

<script>
import MHeader from './components/m-header/m-header'
import Tab from './components/tab/tab'
export default {
  components:{
    MHeader,
    Tab
  },
  data(){
    return{

    }
  },

};
</script>
<style lang="less" scoped>
 
</style>


