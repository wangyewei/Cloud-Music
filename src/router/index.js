/*
 * @Autor: YeWei Wang
 * @Date: 2020-04-20 23:26:24
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: 路由
 * @LastEditTime: 2020-05-04 21:36:34
 * @Version: 1.0
 * @FilePath: \cloud-music\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入一级组件
import Index from '../views/index/Index'

// 懒加载二级组件
const Discovery = () => import('@/views/discovery/Discovery')
const PlayLists = () => import('@/views/playlists/Playlists')
const Songs = () => import('@/views/songs/Songs')
const Mvs = () => import('@/views/mv/Mvs')
const Result = () => import('@/views/result/Result')
const Playlist = () => import('@/views/playlists/Playlist')
const Mv = () => import('@/views/mv/MV')
Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: Index,
    children: [{
        path: '/index',
        redirect: '/index/discovery',
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'discovery',
        component: Discovery,
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'playlists',
        component: PlayLists,
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'songs',
        component: Songs,
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'mvs',
        component: Mvs,
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'result',
        component: Result,
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'playlist',
        component: Playlist,
      },
      {
        path: 'mv',
        component: Mv,
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router