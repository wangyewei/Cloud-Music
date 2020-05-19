/*
 * @Autor: YeWei Wang
 * @Date: 2020-04-21 18:15:24
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: Fontawesome
 * @LastEditTime: 2020-04-21 18:30:17
 * @Version: 野未音乐 v_1.0 pc端
 * @FilePath: \cloud-music\src\icon\fontawesome.js
 */
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText }
from '@fortawesome/vue-fontawesome'

library.add(fas, far, fab)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)
Vue.component('font-awesome-layers-text', FontAwesomeLayersText)