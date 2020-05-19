<!--
 * @Autor: YeWei Wang
 * @Date: 2020-04-21 00:37:01
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: 推荐歌单
 * @LastEditTime: 2020-04-28 20:15:07
 * @Version: 野未音乐 v_1.0 pc端
 * @FilePath: \cloud-music\src\views\playlists\Playlists.vue
 -->
<template>
  <div class="playlists-container">
    <!-- 精选歌单 -->
    <div class="top-card">
      <!-- 封面 -->
      <div class="cover-wrap">
        <img :src="topPlaylist.coverImgUrl+'?param=170y170'" alt="" @click="Mess()">
      </div>
      <!-- 内容 -->
      <div class="content-wrap">
        <h3 class="tag">推荐歌单</h3>
        <div class="desc">{{ topPlaylist.description }}</div>
      </div>
      <!-- 背景 -->
      <img :src="topPlaylist.coverImgUrl" alt="" class="bg">
      <!-- 背景蒙板 -->
      <div class="bg-mask"></div>
    </div>
    <!-- tab选项卡 -->
    <div class="tab-container">
      <div class="tab-bar">
        <div class="item"
             :class="{select: tag == '全部'}"
             @click="tag = '全部'">全部</div>
        <div class="item"
             v-for="(item,index) in tabPlayList"
             :key="index"
             :class="{select: tag == item.tag}"
             @click="tag = item.tag">
          {{ item.tag }}
        </div>
      </div>
    </div>
    <!-- tab区域 -->
    <div class="tab-content">
      <div class="items">
        <div class="item" v-for="(item, index) in playlists" :key="index" @click="toPlaylist(item.id)">
          <div class="img-wrap">
            <div class="num-wrap">
              播放量:
              <span class="num">{{ item.playCount | playNumFormat }}</span><br />
              分类:
              <span v-for="(items,index) in item.tags" :key="index">
                {{ items}}
              </span>
            </div>
            <img :src="item.coverImgUrl+'?param=200y200'" alt="" />
            <font-awesome-icon class="icon" icon="play" />
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 分页器 -->
    <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="total" :current-page="pageNum" :page-size="pageSize">
    </el-pagination>
  </div>
</template>

<script>
  import { getTopPlaylist, getPlayList } from '@/network/request'
  export default {
    name: 'Playlist',
    data() {
      return {
        tag: '全部',
        topPlaylist: {},
        tabPlayList: [],
        // 总条数
        total: 0,
        // 页码
        pageNum: 1,
        pageSize: 10,
        playlists: []
      }
    },
    async created() {
      this._getTopPlaylist()
      this._getTabPlayList()
      this._getPlayList()
    },
    methods: {
      // 获取精品歌单
      async _getTopPlaylist() {
        const { data: resp } = await getTopPlaylist({ cat: this.tag, limit: 1 })
        this.topPlaylist = resp.playlists[0]
      },
      // 随便获取一个tab选项卡
      async _getTabPlayList() {
        const { data: resp1 } = await getTopPlaylist({ cat: this.tag })
        // 数组内对象去重
        let obj = {}
        this.tabPlayList = resp1.playlists.map(item => ({
          tag: item.tag
        })).reduce((cur, next) => {
          obj[next.tag] ? "" : obj[next.tag] = true && cur.push(next);
          return cur;
        }, [])
        // 删除'古典'，因为我不喜欢听
        this.tabPlayList.splice(this.tabPlayList.findIndex(item => item.tag === '古典'), 1)
      },
      // 获取歌单列表
      async _getPlayList() {
        const { data: resp } = await getPlayList({
          cat: this.tag,
          limit: this.pageSize,
          total: true,
          offset: (this.pageNum - 1) * this.pageSize,
          order: 'hot'
        })
        this.playlists = resp.playlists
        this.total = resp.total
      },
      Mess() {
        this.$message.error('暂未实现该方法进入歌单，请从歌单列表进入')
      },
      // 页码改变事件
      handleCurrentChange(val) {
        // 保存页码
        this.pageNum = val
        // 重新获取数据
        this._getPlayList()
      },
      // 进入歌单详情
      toPlaylist(id) {
        this.$router.push(`/index/playlist?id=${id}`)
      }
    },
    watch: {
      tag() {
        this._getTopPlaylist()
        this._getPlayList()
        this.pageNum = 1
      }
    }
  }
</script>

<style lang="less">
  .playlists-container {
    margin-left: 70px;

    .top-card {
      display: flex;
      position: relative;
      border-radius: 5px;
      overflow: hidden;
      height: 170px;
      padding: 20px;
      margin-top: 15px;
      margin-right: 116px;

      .cover-wrap {
        z-index: 1;
        margin-right: 20px;

        img {
          cursor: pointer;
        }
      }

      .content-wrap {
        z-index: 1;
        flex: 1;
        color: #fff;

        .tag {
          border: 1px solid #dfac67;
          border-radius: 5px;
          color: #dfac67;
          width: 100px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          cursor: pointer;
          transition: .3s all linear;
        }

        .tag:hover {
          color: #fa983a;
          border: 1px solid #fa983a;
        }

        .desc {
          color: #888482;
          font-size: 14px;
          padding-top: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
          line-height: 23px;
        }
      }



      .bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;

        z-index: 0;
        filter: blur(20px);
      }

      .bg-mask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
        background: rgba(0, 0, 0, .5);
      }
    }

    .tab-container {
      .tab-bar {
        display: flex;
        justify-content: flex-end;
        margin-top: 40px;
        margin-right: 95px;
        font-weight: lighter;

        .item {
          font-size: 15px;
          color: gray;
          margin-right: 20px;
          cursor: pointer;
        }

        .select {
          color: #dd6d60;
        }
      }
    }

    .tab-content {
      margin-top: 40px;

      .items {
        display: flex;
        flex-wrap: wrap;

        .item {
          width: 220px;
          margin-right: 5px;
          cursor: pointer;
          overflow: hidden;
          margin-bottom: 10px;
          line-height: 20px;

          p {
            overflow: hidden;
            text-overflow: ellipsis;
            width: 200px;
            transition: .4s all;
            white-space: nowrap;
            position: relative;
          }

          p:hover {
            text-overflow: clip;
            // white-space: none !important;
            // white-space: none;
            animation: textm 5s infinite;
            overflow: visible;
          }

          @keyframes textm {
            0% {
              left: 0;
            }

            100% {
              left: -100px;
            }
          }
        }



        .img-wrap {
          position: relative;
          overflow: hidden;
          width: 200px;

          img {
            border-radius: 10px;

          }

          .num-wrap {
            position: absolute;
            width: 200px;
            background: rgba(0, 0, 0, .6);
            color: #fff;
            padding: 2px 2px 5px 4px;
            max-height: 0;
            transition: .2s linear all;
            overflow: hidden;
            line-height: 20px;
            visibility: hidden;
            font-size: 15px;
          }

          .icon {
            position: absolute;
            bottom: 20px;
            right: 20px;
            color: #c23616;
            background: #f5f6fa;
            padding: 10px 10px 10px 15px;
            border-radius: 50%;
            font-size: 25px;
            text-align: center;
            transition: .4s linear all;
            visibility: hidden;
            opacity: 0;
          }

        }

        .img-wrap:hover .num-wrap {
          visibility: visible;
          max-height: 40px;
        }

        .img-wrap:hover:hover .icon {
          visibility: visible;
          // border-radius: 100%;
          opacity: 1;
        }

        .icon:hover {
          box-shadow: 1px 1px 5px #000;
        }
      }
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


  }
</style>