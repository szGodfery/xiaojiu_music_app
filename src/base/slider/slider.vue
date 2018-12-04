<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :key="index" :class="{active:currentPageIndex===index}"></span>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import { addClass } from "../../common/js/dom.js";
export default {
  props: {
    // 循环
    loop: {
      type: Boolean,
      default: true
    },
    // 自动播放
    autoPlay: {
      type: Boolean,
      default: true
    },
    // 播放时间
    interval: {
      type: Number,
      default: 3000
    },
    click: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    };
  },
  mounted() {
    setTimeout(() => {
      // 设置sliderGroup宽度
      this._setSliderWidth();

      // 初始化小圆点
      this._initDots();

      // 初始化slider
      this._initSlider();
    }, 20);

    if (this.autoPlay) {
      this._play();
    }

    // 监听屏幕窗口改变事件(resize),重新设置sliderGroup的宽度,并刷新slider
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
        snapSpeed: 400,
        click: this.click
      });

      //每次切换一张会触发一个scrollEnd事件,在回调中调用 Bscoll的方法,获取当前元素的index
      this.slider.on("scrollEnd", () => {
        let pageIndex = this.slider.getCurrentPage().pageX;
        // 如果循环,那么会在前面添加多一个,所以需要减1
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
        // goToPage是Bscroll提供的api接口,跳转到那一页
        this.slider.goToPage(pageIndex, 0, 400);
      }, this.interval);
    },

    _initDots() {
      this.dots = new Array(this.children.length);
    }
  },
  destroyed(){
    // 当组件有计时器的时候,组件销毁时,把计时器都清除
    clearTimeout(this.timer)
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
  .dots {
    position: absolute;
    bottom: 12px;
    left: 0;
    right: 0;
    text-align: center;
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: rgba(144, 144, 144, 0.8);
      display: inline-block;
      margin: 0 4px;
      &.active {
        width: 20px;
        border-radius: 5px;
        background-color: #fff;
      }
    }
  }
}
</style>


