<template>
  <div class="rev-music">
    <div class="slider-wraper" v-if="recList.slider">
      <s-lider>
        <div v-for="item in recList.slider" :key="item.id">
          <a :href="item.linkUrl">
            <img class="needsclick" :src="item.picUrl" alt="">
          </a>
        </div>
      </s-lider>
    </div>
    <loading v-show="false"></loading>
  </div>
</template>
<script>
import SLider from "../../base/slider/slider";
import Loading from "../../base/loading/loading";
import { getRecList } from "../../api/rec-music/rec-music.js";
export default {
  components: {
    Loading,
    SLider
  },
  data() {
    return {
      // 页面数据
      recList: {}
    };
  },
  created() {
    this._getRecList();
  },
  methods: {
    _getRecList() {
      getRecList().then(res => {
        if (res.data.code === 0) {
          this.recList = res.data.data;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.slider-wraper{
  width: 100%;
  overflow: hidden;
  position: relative;
}
</style>


