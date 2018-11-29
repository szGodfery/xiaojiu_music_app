<template>
  <div class="scroll" ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  props: {
    probeType: {
      //1 滚动的时候会派发scroll事件，会截流
      type: Number,
      default: 1
    },
    
  }
};
</script>

