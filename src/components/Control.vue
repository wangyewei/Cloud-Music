<!--
 * @Autor: YeWei Wang
 * @Date: 2020-04-21 16:00:51
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: 主体文件
 * @LastEditTime: 2020-04-30 18:46:09
 * @Version: 野未音乐 v_1.0 pc端
 * @FilePath: \cloud-music\src\components\Control.vue
 -->
<template>
  <div class="index-control_container">
    <ul class="index-contorl_container_aside">
      <li v-for="(item,index) in tabbars"
          :key="index"
          @click="tab(index,item.path)"
          :class="{select:index==current}"
          class="index-control_container_aside_li">
        <font-awesome-icon
                           class="index-control_container_aside_li_icon"
                           :icon="item.icon" />
        <span>{{ item.name }}</span>
      </li>
    </ul>
    <div class="main">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
    </div>
    <div class="player">
      <audio :src="musicUrl" autoplay controls></audio>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Control',
    data() {
      return {
        current: 0,
        tabbars: [{
            name: '发现音乐',
            path: '/index/discovery',
            icon: ['fab', 'soundcloud']
          },
          {
            name: '推荐歌单',
            path: '/index/playlists',
            icon: ['fab', 'playstation']
          },
          {
            name: '最新音乐',
            path: '/index/songs',
            icon: ['fas', 'music']
          },
          {
            name: '推荐MV',
            path: '/index/mvs',
            icon: ['fas', 'video']
          }
        ],
        musicUrl: ''
      };
    },
    methods: {
      tab(index, val) {
        this.current = index
        this.$router.push(val)
      },
    }
  }
</script>

<style lang="less">
  .index-control_container {
    display: block;
    height: 77vh;
    width: 100%;
    display: flex;
    overflow: auto;
    flex-wrap: wrap;

    .index-contorl_container_aside {
      width: 10vw;
      background: #f5f6fa;
      position: fixed;
      height: 79vh;

      .index-control_container_aside_li {
        cursor: pointer;
        font-size: 1.1rem;
        font-weight: 400;
        margin: 5px 0;
        text-align: center;
        padding: 20px 0;
        transition: .3s linear all;

        position: relative;
        overflow: hidden;
        background: none;
        z-index: 1;

        .index-control_container_aside_li_icon {
          margin-right: 8px;
          font-weight: 400;
        }
      }

      .index-control_container_aside_li::before {
        content: '';
        position: absolute;
        left: 0;
        width: 100%;
        height: 0%;
        background: #ced6e0;
        z-index: -1;
        transition: .8s;
        bottom: 0;
        opacity: .4;
        // border-radius: 0 20% 20% 0;
      }

      .index-control_container_aside_li:hover::before {
        height: 100%;
        // width: 100%;
      }
    }

    .main {
      margin-left: 14vw;
      flex: 1;
      margin-bottom: 2vh;
    }

    .player {
      // background-color: #fcfcfc;
      width: 98%;
      background: #f1f3f4;
      position: fixed;
      bottom: 3vh;

      // display: none;

      audio {
        height: 9vh;
        width: 100%;
        outline: none;
      }
    }
  }

  .index-control_container::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }

  .index-control_container::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }

  .index-control_container::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }

  .select {
    color: #dd6d60;
  }
</style>