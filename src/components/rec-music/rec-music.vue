<template>
  <div class="rev-music">
    <scroll class="rev-content" :data="recList" ref="scroll" @pulldown="_pullDown" @pullup="_pullUp" :pulldown="isPull" :pullup="isPull">
      <div v-if="recList.slider">
        <div class="slider-wraper" v-if="recList.slider">
          <s-lider>
            <div v-for="item in recList.slider" :key="item.id">
              <a :href="item.linkUrl">
                <img class="needsclick" :src="item.picUrl" alt="">
              </a>
            </div>
          </s-lider>
        </div>
        <div class="radio-station-wraper">
          <h2 class="title">电台</h2>
          <div class="radio-list">
            <div class="list-item" v-for="item in recList.radioList" :key="item.radioid">
              <a>
                <img :src="item.picUrl" alt="">
                <i class="play iconfont icon-play"></i>
              </a>
              <span class="list-info">{{item.Ftitle}}</span>
            </div>
          </div>
        </div>
        <div class="hot-music-wraper">
          <h2 class="title">热门歌单</h2>
          <div class="hot-list">
            <div class="list-item" v-for="item in recList.songList" :key="item.id">
              <a :href="`//y.qq.com/w/taoge.html?ADTAG=myqq&from=myqq&channel=10007100&id=${item.id}`">
                <!-- 图片的load事件 由于图片是异步请求,且DOM的宽度是由图片自动撑开的,所以数据回来之后需要刷新一下BScroll -->
                <img :src="item.picUrl" @load="loadImage" alt="">
                <i class="play iconfont icon-play"></i>
                <i class="listen_count iconfont icon-yinle2">{{_format(item.accessnum)}}</i>
              </a>
              <span class="list-info">
                <span class="song-desc">{{item.songListDesc}}</span>
                <span class="song-author">{{item.songListAuthor}}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <loading v-show="!recList.slider"></loading>
    </scroll>
  </div>
</template>
<script>
import Scroll from "../../base/scroll/scroll";
import SLider from "../../base/slider/slider";
import Loading from "../../base/loading/loading";
import { getRecList } from "../../api/rec-music/rec-music.js";
import { format } from "../../common/js/tools.js";

export default {
  components: {
    Loading,
    SLider,
    Scroll
  },
  data() {
    return {
      // 页面数据
      recList: {},
      isPull: true
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
          this.timer = setTimeout(() => {
            this.$refs.scroll.downTip = {
              isLoading: false,
              showLoading: false,
              text: "下拉刷新",
              translate: -50
            };
          }, 1000);
        }
      });
    },
    _pullDown() {
      this._getRecList();
    },
    _pullUp() {
      console.log("上拉加载");
    },
    loadImage() {
      // 标记法,检查图片loaded 确保逻辑只执行一次
      if (!this.checkloaded) {
        this.checkloaded = true;
        // 调用Bscroll 刷新
        this.$refs.scroll.refresh();
      }
    },
    _format(num){
      return format(num)
    }
    // format(num) {
    //   let temp = String(num).split("");
    //   if (temp.length > 4) {
    //     let test4 = temp.slice(-4).join("");
    //     let test = temp.slice(0, temp.length - 4).join("");
    //     let total = `${test}.${test4}`;
    //     num = (Math.round(total * 100) / 100).toFixed(1) + "万";
    //     test4 = null;
    //     test = null;
    //   }
    //   temp = null;
    //   return num;
    // }
  }
};
</script>
<style lang="less" scoped>
.rev-music {
  position: fixed;
  bottom: 60px;
  width: 100%;
  top: 86px;
  .rev-content {
    height: 100%;
    overflow: hidden;
  }
}
.slider-wraper {
  width: 100%;
  overflow: hidden;
  position: relative;
  margin-bottom: 8px;
}
.radio-station-wraper,
.hot-music-wraper {
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  .radio-list,
  .hot-list {
    color: #000;
    display: flex;
    flex-wrap: wrap;
  }
}

// 电台和热门歌单公共样式部分开始
.title {
  height: 44px;
  font-size: 16px;
  color: #000;
  line-height: 44px;
}
.list-item {
  width: 50%;
  box-sizing: border-box;
  padding-right: 4px;
  // margin-right: 8px;

  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  a {
    display: block;
    position: relative;

    .play,
    .listen_count {
      position: absolute;
      bottom: 12px;
      right: 8px;
      font-size: 24px;
      color: #fff;
    }
    .listen_count {
      right: 0;
      left: 8px;
      font-size: 14px;
    }
  }
  .list-info {
    box-sizing: border-box;
    padding: 8px;
    height: 45px;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff;
    .song-desc {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .song-author {
      font-size: 12px;
    }
  }
  &:nth-child(2n) {
    // margin-right: 0;
    padding-left: 4px;
    padding-right: 0;
  }
}
// 公共样式部分结束
</style>


