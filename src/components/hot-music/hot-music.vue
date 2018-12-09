<style lang="less" scoped>
.hot-music {
  box-sizing: border-box;
  padding: 8px;
  position: fixed;
  bottom: 60px;
  width: 100%;
  top: 86px;
  .hot-content {
    height: 100%;
    overflow: hidden;
  }
}
.hot-list {
  display: flex;
  width: 100%;
  height: 100px;
  margin-bottom: 8px;
  align-items: center;
  position: relative;
  .icon-img {
    width: 100px;
    height: 100%;
    position: relative;
    .listenCount{
      position: absolute;
      bottom: 8px;
      left: 4px;
      color: #fff;
      opacity: .5;
      font-size: 10px;
    }
  }
  .listInfo {
    flex: 1;
    height: 100%;
    width: 100%;
    background-color: #fff;
    color: #000;
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-sizing: border-box;
    overflow: hidden;
    .info-title {
      font-size: 16px;
      line-height: 16px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .info-singer {
      flex: 1;
      width: 100%;
      flex-direction: column;
      margin-top: 4px;
      li {
        width: 100%;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
        .sign{
          color: rgba(0, 0, 0, .5)
        }
      }
    }
  }
  .icon-jiantou{
    position: absolute;
    top:50%;
    right: 4px;
    transform: translateY(-50%);
    color: rgba(0, 0, 0, .5);
    font-size: 12px;
  }
}
</style>

<template>
  <div class="hot-music">
    <scroll class="hot-content" ref="scroll" :data="topMusicList" :pulldown="isPull" :pullup="isPull" @pulldown="_pullDown">
      <div>
        <div class="hot-list" v-for="item in topMusicList" :key="item.id" @click="selectItem(item)" >
          <div class="icon-img">
            <img :src="item.picUrl" alt="">
            <i class="iconfont icon-yinle2 listenCount">{{_format(item.listenCount)}}</i>
          </div>
          <div class="listInfo">
            <h3 class="info-title">{{item.topTitle}}</h3>
            <ul class="info-singer">
              <li v-for="(subitem,subindex) in item.songList" :key="subitem.songname">
                <span class="sign">{{subindex+1}}</span>&nbsp;
                <span>{{subitem.songname}}</span>
                <span class="sign"> - {{subitem.singername}}</span>
              </li>
            </ul>
          </div>
          <i class="iconfont icon-jiantou"></i>
        </div>
      </div>
      <loading v-show="topMusicList.length===0"></loading>
    </scroll>
    <router-view></router-view>

  </div>
</template>
<script>
import Loading from "../../base/loading/loading";
import Scroll from "../../base/scroll/scroll";
import { getTopMusicList } from "../../api/hot-music/hot-music.js";
import {format} from "../../common/js/tools.js"
export default {
  components: {
    Loading,
    Scroll
  },
  data() {
    return {
      topMusicList: [],
      isPull: true
    };
  },
  created() {
    this._getTopMusicList();
  },
  methods: {
    // 点击列表进行跳转
    selectItem(item){
      this.$router.push({path:`/find-music/hot-music/${item.id}`})
    // 通过mutation 改变vuex的state状态,第二个参数是传递过去的值.SET_SINGER是一个函数里面写了改变state的方式
      this.$store.commit('SET_TOP_MUSIC_LIST',item)
    },
    // 格式化数字,转换成万
    _format(num){
      return format(num)
    },
    // 下拉刷新
    _pullDown() {
      this._getHotMusicList();
    },
    // 获取音乐列表
    _getTopMusicList() {
      getTopMusicList().then(res => {
        if (res.code === 0) {
          this.topMusicList = res.data.topList;
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
    }
  }
};
</script>

