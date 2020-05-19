<!--
 * @Autor: YeWei Wang
 * @Date: 2020-04-20 23:31:36
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: Index
 * @LastEditTime: 2020-05-19 15:08:51
 * @Version: 1.0
 * @FilePath: \野未音乐-PC端\cloud-music\src\views\index\Index.vue
 -->
<template>
  <div class="index">
    <div class="index-container">
      <Header />
      <Control />
    </div>
  </div>
</template>
<script>
  import Header from '@/components/Header'
  import Control from '@/components/Control'

  export default {
    name: 'Index',
    components: {
      Header,
      Control,
    }
  }
</script>
<style lang="less">
  .index {
    height: 100vh;
    overflow: hidden; // 
    // background: url('@/images/index/xiedi1.jpg') 50% 50%;
    background: url('../../images/index/xiedi1.jpg') 100% 100%;
    background-size: cover;
    position: relative;
    overflow: hidden;
    z-index: 0;

    .index-container {
      // margin: 10px;
      // z-index: 1;
      height: 95vh;
      width: 98vw;
      // height: 100%;
      // width: 100%;
      margin: 2.5vh auto;
      box-shadow: 2px 2px 2px 1px rgba(5, 5, 5, .3),
        3px 3px 3px 2px rgba(5, 5, 5, .2),
        4px 4px 4px 3px rgba(5, 0, 8, .1),
        -2px -2px 2px 1px rgba(5, 0, 0, .3),
        -3px -3px 3px 2px rgba(5, 0, 0, .2),
        -4px -4px 4px 3px rgba(5, 0, 8, .1);
      border-radius: 5px;
      background: #fff;
      z-index: 1;
      transition: .8s;
      min-width: 1200px;
    }
  }

  .index::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    // filter: blur(20px);
    top: 0;
    background: rgba(0, 0, 0, .6);
  }

  .max {
    width: 100vw;
    height: 100vh;
  }
</style>