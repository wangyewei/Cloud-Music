<!--
 * @Autor: YeWei Wang
 * @Date: 2020-04-25 21:07:08
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: 歌单详情页
 * @LastEditTime: 2020-04-30 19:49:51
 * @Version: 野未音乐 v_1.0 pc端
 * @FilePath: \cloud-music\src\views\playlists\Playlist.vue
 -->
<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <!-- 封面 -->
        <img :src="playlist.coverImgUrl" alt="" />
      </div>
      <div class="info-wrap">
        <!-- 名字 -->
        <p class="title">{{ playlist.name }}</p>
        <div class="author-wrap">
          <!-- 头像 -->
          <!-- 神经病VUE,不加v-if="playlist.creator !== undefined" 报错 -->
          <img class="avatar" :src="playlist.creator.avatarUrl" v-if="playlist.creator !== undefined" alt="" />
          <!-- 名字 -->
          <span class="name" v-if="playlist.creator !== undefined">{{ playlist.creator.nickname }}</span>
          <!-- 时间 -->
          <span class="time">{{ playlist.createTime | dateFormat }}</span>
        </div>
        <div class="play-wrap">
          <font-awesome-icon class="iconfont icon-circle-play" icon="play" />
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="(item, index) in playlist.tags" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc">{{ playlist.description }}</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
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
            <tr class="el-table__row" v-for="(item, index) in playlist.tracks" :key="index" @click="playMusic(item.id)">
              <td>{{ index + 1 }}</td>
              <td>
                <div class="img-wrap">
                  <img :src="item.al.picUrl+'?param=130y130'" alt="" />
                  <!-- <span class="iconfont icon-play"></span> -->
                  <font-awesome-icon class="iconfont icon-play" icon="play" />
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <!-- 名称 -->
                    <span>{{ item.name }}</span>
                    <!-- mv图标 -->
                    <!-- <span v-if="item.mvid !== 0" class="iconfont icon-mv"></span> -->
                    <font-awesome-icon v-if="item.mvid !== 0" class="iconfont icon-mv" icon="film" />
                  </div>
                </div>
              </td>
              <td>{{ item.ar[0].name }}</td>
              <td>{{ item.al.name }}</td>
              <td>{{ item.dt | playTimeFormat }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane :label="`评论(${total})`" name="2">
        <!-- 精彩评论 -->
        <div class="comment-wrap" v-if="hotComments !== undefined && hotComments.length !== 0">
          <p class="title">
            精彩评论<span class="number">({{ hotComments.length }})</span>
          </p>
          <div class="comments-wrap">
            <!-- 评论 -->
            <div class="item" v-for="(item, index) in hotComments" :key="index">
              <div class="icon-wrap">
                <!-- 头像 -->
                <img :src="item.user.avatarUrl+'?param=50y50'" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{ item.user.nickname }}</span>
                  <span class="comment">：{{ item.content }}</span>
                </div>
                <!-- 回复 -->
                <div class="re-content" v-if="item.beReplied.length !== 0">
                  <span class="name">{{ item.beReplied[0].user.nickname }}</span>
                  <span class="comment">：{{ item.beReplied[0].content }}</span>
                </div>
                <div class="date">{{ item.time | dateFormat }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 最新评论 -->
        <div class="comment-wrap">
          <p class="title">
            最新评论<span class="number">({{ total }})</span>
          </p>
          <div class="comments-wrap">
            <!-- 评论 -->
            <div class="item" v-for="(item, index) in comments" :key="index">
              <div class="icon-wrap">
                <!-- 头像 -->
                <img :src="item.user.avatarUrl+'?param=50y50'" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{ item.user.nickname }}</span>
                  <span class="comment">：{{ item.content }}</span>
                </div>
                <!-- 回复 -->
                <div class="re-content" v-if="item.beReplied.length !== 0">
                  <span class="name">{{ item.beReplied[0].user.nickname }}</span>
                  <span class="comment">：{{ item.beReplied[0].content }}</span>
                </div>
                <div class="date">{{ item.time | dateFormat }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页器 -->
        <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="total" :current-page="pageNum" :page-size="pageSize">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { getMusicUrl, getPlaylistDetail, getPlaylistComments } from '@/network/request'

  export default {
    name: 'playlist',
    data() {
      return {
        id: '',
        activeIndex: '1',
        // 总条数
        total: 0,
        // 页码
        pageNum: 1,
        pageSize: 10,

        playlist: {},
        hotComments: [],
        comments: []
      }
    },
    created() {
      this.id = this.$route.query.id
      this._getPlaylistDetail()
      this._getPlaylistComments()
    },
    methods: {
      handleCurrentChange(val) {
        this.pageNum = val
        this._getPlaylistComments()
      },

      // 获取歌单详情
      async _getPlaylistDetail() {
        const { data: resp } = await getPlaylistDetail({
          id: this.id,
          n: 100000
        })
        this.avatarUrl = resp.playlist.creator.avatarUrl
        this.nickname = resp.playlist.creator.nickname
        this.playlist = resp.playlist
      },


      // 获取歌单评论
      async _getPlaylistComments() {
        const { data: resp } = await getPlaylistComments(this.id, {
          rid: this.id,
          limit: this.pageSize,
          offset: (this.pageNum - 1) * this.pageSize
        })
        this.comments = resp.comments
        this.hotComments = resp.hotComments
        this.total = resp.total
      },

      async playMusic(id) {

        const { data: resp } = await getMusicUrl(id)
        if (!resp.data[0].url) {
          return this.$message.error('该资源为VIP专享，暂不支持播放 ！')
        }

        this.$parent.musicUrl = resp.data[0].url
      }
    }
  }
</script>

<style lang="less">
  .playlist-container {
    padding: 40px 120px 40px 40px;

    .top-wrap {
      display: flex;

      span {
        font-size: 17px;
      }

      .img-wrap {
        margin-right: 30px;

        img {
          width: 230px;
          height: 230px;
        }
      }



      .info-wrap {
        .title {
          margin-bottom: 17px;
        }

        .author-wrap {
          display: flex;
          align-items: center;
          margin-bottom: 25px;

          img {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            margin-right: 10px;
          }

          .name {
            margin-right: 10px;
          }

          .time {
            font-size: 14px;
          }
        }

        .play-wrap {
          width: 120px;
          height: 35px;
          border-radius: 4px;
          background: linear-gradient(to right, #e85e4d, #c6483c);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 25px;
          cursor: pointer;

          span {
            color: white;
          }

          .iconfont {
            margin-right: 8px;
            color: white;
            border: 2px solid #fff;
            border-radius: 50%;
            padding: 4px 4px 4px 6px;
            font-size: 10px;
          }

          .text {
            font-size: 16px;
          }
        }

        .tag-wrap {
          display: flex;
          margin-bottom: 15px;

          span {
            margin: 0;
          }

          ul {
            display: flex;
            align-items: center;

            li {
              font-size: 15px;
            }

            li:not(:last-child)::after {
              content: '/';
              margin: 0 4px;
            }

          }
        }

        span:first-child {
          margin-right: 10px;
        }
      }
    }

    .song-wrap {
      .icon-mv {
        margin-left: 10px;
        color: #dd6d60;
      }
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

    tr {
      cursor: pointer;
      transition: background .2s;

      .img-wrap {
        position: relative;

        img {
          width: 80px;
          height: 80px;
        }

        .iconfont {
          position: absolute;
          top: 50%;
          left: 45%;
          transform: translate(-50%, -50%);
          cursor: pointer;
          color: #dd5d60;
          background-color: rgba(255, 255, 255, .9);
          width: 20px;
          height: 20px;
          border-radius: 50%;
          padding: 7px 7px 7px 9px;
          // overflow: hidden;
          visibility: hidden;
          opacity: 0;
          transition: opacity .4s;
        }
      }

      .img-wrap:hover .iconfont {
        visibility: visible;
        opacity: 1;
      }
    }

    tr:nth-child(odd) {
      background: rgba(122, 122, 122, .1);
    }

    tr:hover {
      background: rgba(54, 74, 82, 0.2);
    }


    .comment-wrap {
      margin-bottom: 70px;

      .title {
        font-size: 20px;

        .number {
          color: black;
          font-size: 18px;
        }
      }

      .item {
        display: flex;
        padding-top: 20px;

        .icon-wrap {
          margin-right: 15px;

          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
          }
        }

        .date {
          color: #bebebe;
          font-size: 14px;
        }

        .content-wrap {
          padding-bottom: 20px;
          flex: 1;

          .name {
            color: #517eaf;
            font-size: 14px;
            cursor: pointer;
          }

          .name:hover {
            color: #517eaf;
            font-size: 14px;
            text-decoration: underline;
          }

          .comment {
            font-size: 14px;
          }

          .content,
          .re-content {
            margin-bottom: 10px;
          }

          .re-content {
            padding: 10px;
            background-color: #e6e5e6;
            border-radius: 5px;
          }
        }
      }

      .item:not(:last-child) .content-wrap {
        border-bottom: 1px solid #f2f2f1;
      }
    }

  }
</style>