import Vue from 'vue'
import Router from 'vue-router'
import FindMusic from '../components/find-music/find-music.vue'
import Recmusic from '../components/rec-music/rec-music.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/find-music'
  },
  {
    path: '/find-music',
    redirect: '/find-music/rec-music',
    component: FindMusic,
    children: [{
      path: '/find-music/rec-music',
      component: Recmusic
    }]
  }
  ]
})
