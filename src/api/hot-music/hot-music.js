import jsonp from '../../common/js/jsonp'
import axios from 'axios'

import {commonParams} from '../config'
export function getTopMusicList() {
  // Object.assign(target, ...sources) 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象
  const data = Object.assign({}, commonParams, {
    uin: 0,
    platform: 'h5',
    needNewCode: 1,
    format: 'jsonp'
  })
  // jsonp 方式 第三个参数需要写 回调函数 { param: 'jsonpCallback'}
  // 也可以用axios.get(url,{params:data})方式
  return jsonp('/topMusicList',data,{ param: 'jsonpCallback'})
}


export function getHotMusicList(topid){
  const data = Object.assign({},commonParams,{
    topid:topid,
    needNewCode: 1,
    uin: 0,
    tpl: 3,
    page: 'detail',
    type: 'top',
    platform: 'h5'
  })
  
 return axios.get('/hotMusicList',{params:data})
}