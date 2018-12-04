import orginJsonp from 'jsonp'

export default function jsonp(url, params,options) {
  url = addParamsForUrl(url, params)
  return new Promise((resolve,reject)=>{
    orginJsonp(url,options,(err,data)=>{
      if(!err){
        resolve(data)
      }else{
        reject(err)
      }
    })
  })
}

// 给url地址添加参数
function addParamsForUrl(url, params) {
  if (!params) return url
  for (var key in params) {
    if (params[key] && params[key] != 'undefined') {
      if (url.indexOf('?') != -1) {
        url += '&' + '' + key + '=' + params[key] || '' + ''
      } else {
        url += '?' + '' + key + '=' + params[key] || '' + ''
      }
    }
  }
  return url
}
