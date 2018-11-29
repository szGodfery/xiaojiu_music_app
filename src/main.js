import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'

// 全局样式相关
import 'common/style/reset.css'
import 'common/style/base.css'
// 阿里字体图标用link方式导入
// import 'common/style/fonts/iconfont.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
