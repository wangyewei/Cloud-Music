<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title" :keywords="(keywords = $route.query.q)">{{ $route.query.q }}</h2>
      <span class="sub-title">{{ count }}</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <thead>
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
                <div class="song-wrap">
                  <div class="name-wrap">
                    <!-- 名称 -->
                    <span>{{ item.name }}</span>
                    <!-- mv图标 -->
                    <font-awesome-icon v-if="item.mvid !== 0" class="iconfont icon-mv" icon="film" />
                  </div>
                  <!-- 二级标题 -->
                  <span v-if="item.alias.length !== 0">{{ item.alias[0] }}</span>
                </div>
              </td>
              <td>{{ item.artists[0].name }}</td>
              <td>{{ item.album.name }}</td>
              <td>{{ item.duration | playTimeFormat }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>

      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div class="item" v-for="(item, index) in playlists" :key="index" @click="toPlaylist(item.id)">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount | playNumFormat }}</span>
              </div>
              <img :src="item.coverImgUrl+'?param=200y200'" alt="" />
              <font-awesome-icon class="iconfont icon-play" icon="play" />
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div class="item" v-for="(item, index) in mvs" :key="index" @click="toMv(item.id)">
            <div class="img-wrap">
              <img :src="item.cover+'?param=250y150'" alt="" />
              <font-awesome-icon class="iconfont icon-play" icon="play" />
              <div class="num-wrap">
                <font-awesome-icon class="iconfont icon-play" icon="play" />
                <div class="num">{{ item.playCount | playNumFormat }}</div>
              </div>
              <span class="time">{{ item.duration | playTimeFormat }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 分页器 -->
    <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="total" :current-page="pageNum" :page-size="pageSize">
    </el-pagination>
  </div>
</template>

<script>
  import { getMusicUrl, search } from '@/network/request'

  export default {
    name: 'result',
    data() {
      return {
        // 总条数
        total: 0,
        // 页码
        pageNum: 1,
        pageSize: 10,
        keywords: '',
        activeIndex: 'songs',
        songs: [],
        count: 0,
        playlists: [],
        mvs: [],
        songId: 0,
        type: 1
      }
    },

    async created() {

    },
    watch: {
      keywords() {
        this.pageNum = 1
        this._search()
      },
      activeIndex() {
        switch (this.activeIndex) {
        case 'songs':
          this.type = 1
          this.pageNum = 1
          break
        case 'lists':
          this.type = 1000
          this.pageNum = 1
          break
        case 'mv':
          this.type = 1004
          this.pageNum = 1
          break

        default:
          break
        }
        this._search()
      }
    },
    methods: {
      // 翻页器
      handleCurrentChange(val) {
        this.pageNum = val
        this._search()
      },
      async _search() {
        const { data: resp } = await search({
          s: this.keywords,
          type: this.type,
          limit: this.type === 1004 ? 8 : 10,
          offset: (this.pageNum - 1) * (this.type === 1004 ? 8 : 10)
        })
        if (resp.code !== 200) {
          return
        }
        if (this.type === 1) {
          this.songs = resp.result.songs
          this.count = resp.result.songCount
        } else if (this.type === 1000) {
          this.playlists = resp.result.playlists
          this.count = resp.result.playlistCount
        } else if (this.type === 1004) {
          this.mvs = resp.result.mvs
          this.count = resp.result.mvCount
        }
        this.total = this.count
      },
      async playMusic(id) {
        this.$message({
          message: '正在播放',
          type: 'success'
        });
        const { data: resp } = await getMusicUrl(id)
        if (!resp.data[0].url) {
          return this.$message.error('该资源为VIP专享，暂不支持播放 ！')
        }
        this.$parent.musicUrl = resp.data[0].url
      },
      toPlaylist(id) {
        this.$router.push(`/index/playlist?id=${id}`)
      },
      toMv(id) {
        this.$router.push(`/index/mv?id=${id}`)
      }
    }
  }
</script>

<style lang="less">
  .result-container {
    padding: 20px 120px 50px 60px;

    .title-wrap {
      display: flex;
      align-items: flex-end;
      margin-bottom: 30px;

      .title {
        margin-right: 10px;
        font-weight: bolder;
        font-size: 20px;
      }

      .sub-title {
        font-size: 15px;
        color: #bebebe;
      }
    }

    .el-tabs__item {
      font-size: 18px;
    }

    .el-table td,
    .el-table th.is-leaf {
      border-bottom: none;
    }

    .items {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;

      .item {
        width: 200px;
        cursor: pointer;
        margin-right: 20px;
        margin-bottom: 20px;

        .img-wrap {
          width: 100%;
          position: relative;

          .icon-play {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 30px;
            height: 30px;
            color: #dd6d60;
            font-size: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.8);
            opacity: 0;
            padding: 10px;
          }

          img {
            width: 100%;
            border-radius: 5px;
          }

          .num-wrap {
            position: absolute;
            color: white;
            top: 0;
            right: 0;
            display: flex;
            align-items: center;
            font-size: 15px;
            padding-right: 5px;
            padding-top: 2px;

            .icon-play {
              font-size: 12px;
              display: flex;
              align-items: center;
              margin-right: 5px;
            }
          }


        }

        .img-wrap>.icon-play::before {
          transform: translateX(3px);
        }

        .img-wrap:hover>.icon-play {
          opacity: 1;
        }

        .name {
          font-size: 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .time {
          position: absolute;
          bottom: 5px;
          right: 5px;
          color: white;
          font-size: 15px;
        }

        .singer {
          font-size: 14px;
          color: #c5c5c5;
        }

      }
    }

    .items.mv .item {
      width: 250px;
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

    .el-table tr {
      cursor: pointer;
    }

    .el-table tr:nth-child(2n) {
      background-color: #fafafa;
    }

    .el-table tr:hover {
      background-color: #f5f7fa;
    }

    .el-pagination {
      margin-top: 50px;
      text-align: center;
      margin-bottom: 50px;
      margin-right: 240px;
    }

    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: #dd6d60;
    }

    .el-pagination.is-background .el-pager li:not(.disabled):hover {
      color: #dd6d60;
    }

    .el-tabs__active-bar {
      background-color: #dd6d60;
    }

    .el-tabs__item.is-active {
      color: #dd6d60;
    }

    .el-tabs__item:hover {
      color: #dd6d60;
    }
  }
</style>