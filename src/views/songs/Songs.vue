<!--
 * @Autor: YeWei Wang
 * @Date: 2020-04-21 00:40:14
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: 
 * @LastEditTime: 2020-04-24 17:15:08
 * @Version: 1.0
 * @FilePath: \cloud-music\src\views\songs\Songs.vue
 -->
<template>
  <div class="songs-container">
    <!-- tab -->
    <div class="tab-bar">
      <span class="item"
            v-for="(item,index) in tabs"
            :key="index"
            :class="{select: tag == item.tag}"
            @click="tag = item.tag">
        {{ item.name }}</span>
    </div>
    <!-- table -->
    <table class="el-table playlit-table">
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr class="el-table__row" v-for="(item, index) in songs" :key="index" @click="playMusic(item.id)">
          <td>{{ index + 1 }}</td>
          <td>
            <div class=" img-wrap">
              <img :src="item.album.picUrl+'?param=130y130'" alt="" />
              <font-awesome-icon class="icon-play" icon="play" />
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{ item.name }}</span>
                <font-awesome-icon class="icon-mv" icon="film" @click="err" />
              </div>
            </div>
          </td>
          <td>{{ item.album.artists[0].name }}</td>
          <td>{{ item.album.name }}</td>
          <td>{{ item.duration | playTimeFormat }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { getNewSongs, getMusicUrl } from '@/network/request'
  export default {
    name: 'Songs',
    data() {
      return {
        tag: 0,
        songs: [],
        tabs: [
          // tab选项卡
          {
            name: '全部',
            tag: 0
          },
          {
            name: '华语',
            tag: 7
          },
          {
            name: '欧美',
            tag: 96
          },
          {
            name: '日本',
            tag: 8
          },
          {
            name: '韩国',
            tag: 16
          }
        ]
      }
    },
    async created() {
      this._getNewsongs()
    },
    methods: {
      async _getNewsongs() {
        const { data: resp } = await getNewSongs({ areaId: this.tag })
        this.songs = resp.data.slice(0, 50)
      },
      err() {
        this.$message.error('暂未实现该方法播放MV')
      },
      async playMusic(id) {
        const { data: resp } = await getMusicUrl(id)
        if (!resp.data[0].url) {
          return this.$message.error('该资源为VIP专享，暂不支持播放 ！')
        }
        // 设置给父组件的播放地址
        this.$parent.musicUrl = resp.data[0].url
        this.$message({
          message: '正在播放',
          type: 'success'
        });
      }
    },
    watch: {
      tag() {
        this._getNewsongs()
      }
    }
  }
</script>

<style lang="less">
  .songs-container {
    padding: 20px 120px 20px 50px;

    .tab-bar {
      display: flex;
      justify-content: flex-end;
      margin: 10px 0 40px 0;

      .item {
        color: gray;
        margin-right: 9px;
        font-weight: 400;
        cursor: pointer;
        transition: .3s all linear;
      }

      .select {
        color: #dd6d60;
      }
    }

    .el-table {
      border-bottom: none;
      border-collapse: collapse;

      tbody {
        border-bottom: none;

        td {
          border-bottom: none;
        }

        td:first-child {
          padding-left: 10px;
        }

        th {
          font-weight: normal;
        }

        tr {
          cursor: pointer;
        }

        th:first-child {
          width: 50px;
        }
      }
    }

    .el-table.playlit-table th:nth-child(2) {
      width: 130px;
    }

    .el-table.playlit-table th:nth-child(3) {
      width: 300px;
    }

    .el-table.playlit-table th:nth-child(4) {
      width: 200px;
    }







    .el-table th:nth-child(2) {
      width: 300px;
    }

    .el-table th:nth-child(3) {
      width: 200px;
    }

    .el-table .song-wrap>span {
      margin-top: 20px;
      display: inline-block;
      color: #bebebe;
    }

    .el-table .song-wrap .icon-mv {
      padding-left: 5px;
      color: #dd6d60;
    }

    .el-table .img-wrap {
      position: relative;
      width: 70px;
      height: 70px;
    }

    .el-table .img-wrap img {
      width: 70px;
      height: 70px;
      border-radius: 5px;
    }

    .el-table .img-wrap .icon-play {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #dd6d60;
      font-size: 16px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.8);
      padding: 5px;
      width: 16px;
      height: 16px;
    }

    .el-table .img-wrap .icon-play::before {
      transform: translateX(1px);
    }

    .el-table tr:nth-child(2n) {
      background-color: #fafafa;
    }

    .el-table tr:hover {
      background-color: #f5f7fa;
    }
  }
</style>