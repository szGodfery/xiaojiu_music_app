<template>
  <div class="m-heder">
    <div class="log iconfont icon-luyin" ></div>
    <div class="search-box">
      <i class="search-icon iconfont icon-sousuo"></i>
      <input type="text" placeholder="搜索音乐、视频、歌词、电台">
    </div>
    <div class="mine iconfont icon-ziyuanldpi"></div>
  </div>
</template>
<style lang="less" scoped>
.m-heder {
  display: flex;
  border-bottom: 1px dashed gold;
  background-color: #d23c30;
  align-items: center;
  .log,.mine{
    width: 44px;
    height: 44px;
    line-height: 40px;
    text-align: center;
    font-size: 26px;
  }
  .search-box {
    flex: 1;
    font-size: 20px;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    background-color: #fff;
    border-radius: 20px;
    display: flex;
    padding-left: 50px;
    position: relative;
    input{
      flex:1;
      color:#b0afad;
    }
    .search-icon{
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      position: absolute;
      top:0;
      left: 22px;
      color:#b0afad;
    }
    input:focus{
      color:#333;
    }
    
  }
}
</style>

