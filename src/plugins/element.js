/*
 * @Autor: YeWei Wang
 * @Date: 2020-04-20 23:37:07
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: Element UI
 * @LastEditTime: 2020-04-25 13:34:21
 * @Version: 1.0
 * @FilePath: \cloud-music\src\plugins\element.js
 */
import Vue from 'vue'
// 轮播图
import {
  Carousel,
  CarouselItem,
} from 'element-ui'
Vue.use(Carousel).use(CarouselItem)
// 通知信息
import {
  Button,
  Notification,
  Message
} from 'element-ui'
// Vue.use(Message)
Vue.use(Button)
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

// 翻页器
import {
  Pagination,
} from 'element-ui'
Vue.use(Pagination)

// 
import {
  Tabs,
  TabPane
} from 'element-ui'

Vue.use(Tabs).use(TabPane)