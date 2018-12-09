<style lang="less" scoped>
.topList {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: red;
  z-index: 1000;
  padding: 10px;
  h2 {
  }
}
</style>

<template>
  <div class="topList">
    <h2>歌手列表</h2>
  </div>

</template>
<script>
import { getHotMusicList } from "../../api/hot-music/hot-music.js";
import { mapGetters } from "vuex";
import { creatSong } from "../../common/js/creatSong.js";

export default {
  // 从vuex的store中获取topMusicList的id 使用this.$store.getters.****方法
  // 语法糖 把vuex.store中的gettters 映射到vuex提供的一个方法mapGetters(['getters中定义的方法名','方法名2'])
  // 如果要把getters中的方法取一个别的名字,那么mapGetters({top,'topMusicList'})--中使用对象  这样就相当于把topMusicList取名为top
  // 由于getters 相当于vuex中的computed 当依赖发生变化时getter中也会发生变化,
  // 所以通过对象拓展的方法,把getter混入到computed中
  computed: {
    ...mapGetters(["topMusicList"])
  },
  data() {
    return {
      songs: []
    };
  },
  // 初始化获取音乐列表数据
  created() {
    this._getHotMusicList();
  },

  methods: {
    _getHotMusicList() {
      // 如果在当前页面刷新,跳回上一个页面
      if (!this.topMusicList.id) {
        this.$router.push("/find-music/hot-music");
        return;
      }
      // console.log(this.topMusicList.id)
      getHotMusicList(this.topMusicList.id).then(res => {
        if (res.data.code === 0) {
          this.songs = this._normalizeSongs(res.data.songlist);
        }
      });
    },
    // 处理返回的数据,用于列表渲染需要的数据 格式化数据
    _normalizeSongs(list) {
      // 定义一个返回的数组
      let ret = [];
      list.forEach(item => {
        const musicData = item.data;
        if (musicData.songid && musicData.albummid) {
          //  数组中是一个对象,包含有{
          // id:songid,
          // mid:mid,
          // singer:singer,
          // name:name,
          // ablum:ablum,
          // image:image,
          // url:url
          // }
          /**
           * 推荐思路,使用工厂模式 返回构造函数实例对象来批量处理这些数据
           */
          ret.push(creatSong(musicData));
        }
      });
      return ret;
    }
  }
};
</script>

