import Vue from 'vue'
import Router from 'vue-router'
// import FindMusic from '../components/find-music/find-music.vue'
// import Recmusic from '../components/rec-music/rec-music.vue'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/find-music'
    },
    {
      path: '/find-music',
      redirect: '/find-music/rec-music',
      component: r => require(['../components/find-music/find-music.vue'], r),
      children: [{
          path: '/find-music/rec-music',
          component: r => require(['../components/rec-music/rec-music.vue'], r)
        },
        {
          path: '/find-music/hot-music',
          component: r => require(['../components/hot-music/hot-music.vue'], r)
        },
        {
          path: '/find-music/search-music',
          component: r => require(['../components/search-music/search-music.vue'], r)
        }
      ]
    }
  ]
})
