<template>
  <div class="find-music">
    <nav-tip></nav-tip>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>

</template>
<script>
import NavTip from "../nav/nav";

export default {
  components: {
    NavTip
  },
  data() {
    return {};
  }
};
</script>

