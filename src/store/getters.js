// 唯一获取store中的state的数据,相当于computed属性, 第一个参数是state,需要返回状态中的某一个数据
export const topMusicList = (state)=>{
  return state.topMusicList
}
