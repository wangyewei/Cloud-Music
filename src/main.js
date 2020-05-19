/*
 * @Autor: YeWei Wang
 * @Date: 2020-04-20 23:26:24
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: 入口
 * @LastEditTime: 2020-04-24 18:44:05
 * @Version: 野未音乐 v_1.0 pc端
 * @FilePath: \cloud-music\src\main.js
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//element ui && reset-css
import 'reset-css'
import './plugins/element'
import 'element-ui/lib/theme-chalk/index.css';
// fontawesome icon
import './icon/fontawesome'
// filter
import './config/filter'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')