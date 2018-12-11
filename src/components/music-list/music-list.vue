<template>

  <div class="music-list">
    <!-- 把音乐列表抽离出来做组件 -->
    <h2>这是音乐列表组件</h2>
  </div>
</template>
<script>
export default {
  props:{
    songs:{
      type:Array,
      default:[]
    }
  }
}
</script>



