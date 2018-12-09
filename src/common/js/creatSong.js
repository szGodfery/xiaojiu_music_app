/**
 * 工厂模式创建
 * @param {*} musicData 为对象 
 */
export function creatSong(musicData){
  return new Song({
    id:musicData.songid,
    mid:musicData.songmid,
    // 由于后台返回的singer是一个数组,所以需要处理定义一个函数filter
    singer:filterSinger(musicData.singer),
    name:musicData.songname,
    album:musicData.albumname,
    duration:musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
  })
}

/**
 * 创建Song的一个类 es6语法  ==== 相当于es5的构造函数写法
 */
class Song {
  // 构造器
  constructor({id,mid,singer,name,album,duration,image,url}){
    this.id=id
    this.mid=mid
    this.singer=singer
    this.name=name
    this.album=album
    this.duration=duration
    this.image=image
    this.url=url
  }
}

function filterSinger(singer){
  let ret = []
  if(!singer){
    return ''
  }
  singer.forEach(s=>{
    ret.push(s.name)
  })

  return ret.join('/')
}