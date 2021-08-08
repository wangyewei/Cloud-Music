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
        target: 'Please enter your server address here',  //API服务器的地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
        // 突破host和origin的限制
        headers: {
          referer: 'Please enter your sever address here',
          origin: 'Please enter your server address here',
          host: 'Please enter your server addrsxs here'
        }
      },
    }
  }
}
