<style lang="less" scoped>
.pulldown {
  width: 100%;
  height: 50px;
  // margin-top: -50px;
  // background-color: green;
  .clear {
    height: 50px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title {
      color: #000;
    }
  }
}
</style>

<template>
  <div class="scroll" ref="wrapper">
    <!-- 下拉刷新 -->
    <div class="scroll-content">
      <div class="pulldown" v-if="pulldown" :style="`margin-top:${downTip.translate}px`">
          <div class="clear" v-if="downTip.showLoading">
            <img src="./loading.gif" width="30" height="30" alt="" v-show="downTip.isLoading">
            <span class="title">{{downTip.text}}</span>
          </div>
      </div>
      <slot></slot>
    </div>

    <!-- 上拉加载 -->
    <!-- <div class="pullup"> -->

  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  props: {
    probeType: {
      // 当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件
      type: Number,
      default: 1
    },
    click: {
      // better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件
      type: Boolean,
      default: true
    },
    listenScroll: {
      // 是否派发滚动事件
      type: Boolean,
      default: false
    },
    data: {
      // 列表数据
      type: [Object, Array],
      default: null
    },
    pullup: {
      // 是否派发滚动到底部的事件，用于上拉加载
      type: Boolean,
      default: false
    },
    // 是否派发顶部下拉的事件，用于下拉刷新
    pulldown: {
      type: Boolean,
      default: false
    },
    // 是否派发列表滚动开始的事件
    beforeScroll: {
      type: Boolean,
      default: false
    },
    // 当数据更新后，刷新scroll的延时。
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      downTip: {
        text: "下拉刷新",
        translate: -50,
        // 图片加字是否显示
        showLoading: false,
        // 图片是否显示
        isLoading:false
      }
    };
  },
  mounted() {
    setTimeout(() => {
      // 初始化scroll
      this._initScroll();
    }, 1000);
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) return;
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        pulldown: this.pulldown,
        pullup: this.pullup
      });

      // 是否派发顶部下拉事件，用于下拉刷新
      if (this.pulldown) {
        // 下拉过程中的动作
        this.scroll.on("scroll", pos => {
          this.downTip.showLoading = true;
          if (pos.y > 40) {
            this.downTip.text = "释放刷新";
            this.downTip.isLoading = false;
          } else {
            this.downTip.text = "下拉刷新";
            this.downTip.isLoading = false;
          }
        });
        this.scroll.on("touchend", pos => {
          // 下拉结束动作
          if (pos.y > 40) {
            this.downTip.translate = 0;
            this.downTip.text = "刷新中......";
            this.downTip.isLoading = true;
            this.$emit("pulldown");
          }
        });
      }

      // 是否派发滚动到底部事件，用于上拉加载
      if (this.pullup) {
        this.scroll.on("scrollEnd", () => {
          // 滚动到底部
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit("pullup");
          }
        });
      }
    },
     resetParams(){
      setTimeout(() => {
        this.isLoading = false;
        this.isDone = false;
        this.dragTip = {
          text:"下拉刷新",
          translate:-50,
          showLoding:false
        }
      },600)
     },
    // 代理better-scroll的disable方法
    disable() {
      this.scroll && this.scroll.disable();
    },
    // 代理better-scroll的disable方法
    enable() {
      this.scroll && this.scroll.enable();
    },
    // 代理better-scroll的refresh方法
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    // 代理better-scroll的scrollTo方法
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    // 代理better-scroll的scrollToElement方法
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    }
  },
  // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
  watch: {
    data() {
      setTimeout(() => {
        this.refresh();
      }, this.refreshDelay);
    }
  }
};
</script>

