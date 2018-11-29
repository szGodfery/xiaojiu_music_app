<template>
  <div class="find-music">
    <nav-tip></nav-tip>
    <router-view></router-view>
    
  </div>

</template>
<script>
import NavTip from '../nav/nav'

export default {
  components:{
    NavTip
  },
  data(){
    return{}
  }
  
}
</script>

