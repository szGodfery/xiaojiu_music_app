<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import { addClass } from "../../common/js/dom.js";
export default {
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      currentPageIndex: 0
    };
  },
  mounted() {
    setTimeout(() => {
      // 设置slider宽度
      this._setSliderWidth();

      
      // 初始化slider
      this._initSlider();
    }, 20);

    if (this.autoPlay) {
      this._play();
    }

    window.addEventListener("resize", () => {
      if (!this.slider) {
        return;
      }
      this._setSliderWidth(true);
      this.slider.refresh();
    });
  },
  methods: {
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 400
      });
      this.slider.on("scrollEnd", () => {
        let pageIndex = this.slider.getCurrentPage().pageX;
        if (this.loop) {
          pageIndex -= 1;
        }
        this.currentPageIndex = pageIndex;

        if (this.autoPlay) {
          clearTimeout(this.timer);
          this._play();
        }
      });
    },
    _setSliderWidth(isResize) {
      // 获取sliderGroup下面所有的子元素
      this.children = this.$refs.sliderGroup.children;

      let sliderGroupWidth = 0;

      // 获取父元素slider的宽度
      let sliderWidth = this.$refs.slider.clientWidth;

      // 遍历给children设置宽度
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        // 动态给元素添加样式
        addClass(child, "slider-item");
        child.style.width = sliderWidth + "px";
        sliderGroupWidth += sliderWidth;
      }
      console.log(sliderGroupWidth);
      // 如果循环,那么宽度就会增加两个sliderwidth
      if (this.loop && !isResize) {
        sliderGroupWidth += 2 * sliderWidth;
      }

      this.$refs.sliderGroup.style.width = sliderGroupWidth + "px";
    },
    _play() {
      let pageIndex = this.currentPageIndex + 1;
      if (this.loop) {
        pageIndex += 1;
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400);
      }, this.interval);
    }
  }
};
</script>
<style lang="less" scoped>
.slider {
  min-height: 1px;
  &-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>


