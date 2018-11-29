<template>
  <div class="loading">
    <img width="30" height="30" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "正在载入..."
    }
  }
};
</script>
<style lang="less" scoped>
.loading {
  width: 100%;
  text-align: center;
  .desc {
    line-height: 20px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>