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
  .icon-img{
    width: 100px;
    height: 100%;
  }
  .listInfo {
    flex: 1;
    height: 100%;
    background-color: #fff;
    color: #000;
    display: flex;
    flex-direction: column;
    padding: 14px;
    box-sizing: border-box;
    .info-title{
      font-size: 16px;
      line-height: 16px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      margin-bottom: 4px;
    }
    
  }
}
</style>

<template>
  <div class="hot-music">
    <scroll class="hot-content">
      <div>
        <div class="hot-list" v-for="item in hotMusicList" :key="item.id">
          <div class="icon-img">
            <img :src="item.picUrl" alt="">
          </div>
          
          <div class="listInfo">
              <h3 class="info-title">{{item.topTitle}}</h3>
              <ul>
                <li v-for="subitem in item" :key="subitem.id">{{subitem.songname}}</li>
              </ul>
          </div>
        </div>
      </div>
      <loading v-show="hotMusicList.length===0"></loading>
    </scroll>

  </div>
</template>
<script>
import Loading from "../../base/loading/loading";
import Scroll from "../../base/scroll/scroll";
import { getHotMusicList } from "../../api/hot-music/hot-music.js";
export default {
  components: {
    Loading,
    Scroll
  },
  data() {
    return {
      hotMusicList: []
    };
  },
  created() {
    this._getHotMusicList();
  },
  methods: {
    _getHotMusicList() {
      getHotMusicList().then(res => {
        if (res.code === 0) {
          this.hotMusicList = res.data.topList;
        }
      });
    }
  }
};
</script>

