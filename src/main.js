import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
// 图片懒加载
import VueLazyload from 'vue-lazyload'



// 全局样式相关
import 'common/style/reset.css'
import 'common/style/base.css'
// 阿里字体图标用link方式导入
// import 'common/style/fonts/iconfont.css'

Vue.use(VueLazyload, {
  loading: require('./common/image/default.png')
})

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
