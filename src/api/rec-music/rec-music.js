import axios from 'axios'
import {commonParams} from '../config'

export function getRecList() {
  //const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
 return  axios.get('/rec',data)
}
