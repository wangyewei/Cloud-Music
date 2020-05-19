/*
 * @Autor: YeWei Wang
 * @Date: 2020-04-24 00:58:05
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: 过滤器
 * @LastEditTime: 2020-04-30 17:55:47
 * @Version: 野未音乐 v_1.0 pc端
 * @FilePath: \cloud-music\src\config\filter.js
 */
import Vue from 'vue'
// 播放量超过十万显示中文
Vue.filter('playNumFormat', function (playCount) {
  if (playCount > 100000) {
    return parseInt(playCount / 10000) + '万'
  }
  return playCount
})
// 歌曲时长
Vue.filter('playTimeFormat', function (originVal) {
  let duration = originVal
  let min = parseInt(duration / 1000 / 60)
  if (min < 10) {
    min = '0' + min
  }
  let sec = parseInt((duration / 1000) % 60)
  if (sec < 10) {
    sec = '0' + sec
  }
  return `${min}:${sec}`
})
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})