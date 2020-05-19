/*
 * @Autor: YeWei Wang
 * @Date: 2020-04-22 13:24:06
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: vueconfig
 * @LastEditTime: 2020-05-19 15:32:38
 * @Version: 野未音乐 v_1.0 pc端
 * @FilePath: \cloud-music\vue.config.js
 */
module.exports = {
  outputDir: 'dist',
  assetsDir: 'assets',
  lintOnSave: false,
  devServer: {
    open: false,
    host: 'localhost',
    port: '80',
    https: false,
    hotOnly: true,
    proxy: {
      '/api': {
        target: 'https://music.163.com/api/', //API服务器的地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
        // 突破host和origin的限制
        headers: {
          referer: 'http://music.163.com',
          origin: 'http://music.163.com',
          host: 'music.163.com'
        }
      },
    }
  }
}