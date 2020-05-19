<!--
 * @Autor: YeWei Wang
 * @Date: 2020-04-21 00:26:31
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: 发现音乐
 * @LastEditTime: 2020-04-28 20:22:25
 * @Version: 1.0
 * @FilePath: \cloud-music\src\views\discovery\Discovery.vue
 -->
<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-button
               plain
               @click="open2">
      <el-carousel :interval="4000" type="card" height="223px">
        <el-carousel-item v-for="(item, index) in banners" :key="index">
          <img :src="item.imageUrl" alt="" />
        </el-carousel-item>
      </el-carousel>
    </el-button>

    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">
        推荐歌单
      </h3>
      <div class="items">
        <div class="item" v-for="(item, index) in playList" :key="index" @click="toPlaylist(item.id)">
          <div class=" img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{ item.copywriter }}</span>
            </div>
            <div class="count-wrap">
              <font-awesome-icon class="icon-playcount" icon="play" />
              <div class="play-count">{{ item.playCount | playNumFormat }}</div>
            </div>
            <img :src="item.picUrl+'?param=200y200'" alt="" />
            <font-awesome-icon class="icon" icon="play" />
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 最新歌曲 -->
    <div class="news">
      <h3 class="title">最新音乐</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in newSongs" :key="index" @click="playMusic(item.id)">
          <div class="img-wrap">
            <img :src="item.picUrl+'?param=130y130'" alt="">
            <font-awesome-icon class="icon" icon="play" />
          </div>
          <div class=" song-wrap">
            <div class="song-name">{{ item.name }}</div>
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="(item,index) in mvs" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl+'?param=250y150'" alt="">
            <font-awesome-icon class="icon-l" icon="play" />
            <div class="num-wrap">
              <font-awesome-icon class="icon-s" icon="play" />
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getBanner, getPersonalizedPlaylist, getPersonalizedNewsong, getMusicUrl, getPersonalizedMv } from '@/network/request'
  export default {
    data() {
      return {
        // 防止轮播图多次点击
        flag: true,
        // 轮播图
        banners: [],
        // 推荐歌单
        playList: [],
        // 最新歌曲
        newSongs: [],
        // 推荐MV
        mvs: []
      }
    },
    async created() {
      // 获取轮播图数据
      const { data: resp0 } = await getBanner({ clientType: 'pc' })
      this.banners = resp0.banners
      // 获取推荐歌单
      const { data: resp1 } = await getPersonalizedPlaylist({ limit: '10' })
      this.playList = resp1.result
      // 获取最新音乐
      const { data: resp2 } = await getPersonalizedNewsong({ type: 'recommend' })
      this.newSongs = resp2.result
      // 获取推荐mv
      const { data: resp3 } = await getPersonalizedMv()
      this.mvs = resp3.result
    },
    methods: {
      open2() {
        if (this.flag) {
          console.log(this.flag)
          this.$notify({
            title: '对不起',
            message: '暂未实现，请前往歌单播放',
            type: 'warning'
          });
          this.flag = false
        }
      },
      async playMusic(id) {
        this.$message({
          message: '播放成功',
          type: 'success'
        });
        const { data: resp } = await getMusicUrl(id)
        if (!resp.data[0].url) {
          return this.$message.error('该资源为VIP专享，暂不支持播放 ！')
        }
        this.$parent.musicUrl = resp.data[0].url
      },
      // 进入歌单详情
      toPlaylist(id) {
        this.$router.push(`/index/playlist?id=${id}`)
      }
    }
  }
</script>
<style lang="less">
  .discovery-container {
    margin: 0 40px 0 40px;
    // padding: 40px 0;

    .el-carousel {
      height: 300px;
      width: 91%;
      // margin: 0 20px;
    }

    .el-carousel__item {
      border-radius: 10px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .el-button {
      width: 100%;
      border: none;
    }

    .recommend {
      margin: 0 10px;

      .title {
        font-weight: 300;
        letter-spacing: 2px;
        margin-bottom: 30px;
        font-size: 23px;
        margin-top: -60px;
      }

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

          .desc-wrap {
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

          .count-wrap {
            position: absolute;
            right: 4px;
            top: 4px;
            display: flex;
            color: #fff;
            font-size: 13px;
            transition: .3s all;
            visibility: visible;
            overflow: hidden;
            opacity: 1;
          }

          .icon-playcount {
            margin-top: 4px;
            margin-right: 3px;
          }
        }

        .img-wrap:hover .desc-wrap {
          visibility: visible;
          max-height: 40px;
        }

        .img-wrap:hover .count-wrap {
          visibility: hidden;
          opacity: 0;
        }

        .img-wrap:hover:hover .icon {
          visibility: visible;
          // border-radius: 100%;
          opacity: 1;
        }
      }
    }

    .news {
      margin: 0 10px;

      .title {
        font-weight: 300;
        letter-spacing: 2px;
        margin-bottom: 30px;
        font-size: 23px;
        margin-top: 40px;
      }

      .items {
        display: flex;
        flex-wrap: wrap;

        .item {
          width: 47%;
          margin-right: 5px;
          cursor: pointer;
          overflow: hidden;
          margin-bottom: 10px;
          line-height: 20px;
          display: flex;
          transition: .3s linear all;
          padding: 10px;

          .img-wrap {
            height: 80px;
            position: relative;

            img {
              width: 80px;
              height: 100%;
            }



            .icon {
              position: absolute;
              left: 22px;
              top: 32%;
              color: #c23616;
              background: #f5f6fa;
              width: 15px;
              height: 15px;
              padding: 10px 10px 10px 13px;
              border-radius: 50%;
              text-align: center;
              transition: .4s linear all;
              visibility: hidden;
              opacity: 0;
            }


          }



          .song-wrap {
            margin-left: 20px;
            position: relative;

            .song-name {
              font-size: 18px;
              margin-top: 10px;

            }

            .singer {
              font-size: 14px;

              color: #777;
              font-weight: lighter;
              margin-top: 20px;
            }
          }
        }

        .item:hover {
          background: #f5f6fa;
        }
      }

      .img-wrap:hover:hover .icon {
        visibility: visible;
        // border-radius: 100%;
        opacity: 1;
      }
    }

    .mvs {
      margin: 0 10px;

      .title {
        font-weight: 300;
        letter-spacing: 2px;
        margin-bottom: 30px;
        font-size: 23px;
        margin-top: 40px;
      }

      .items {
        display: flex;
        flex-wrap: wrap;

        .item {
          cursor: pointer;
          overflow: hidden;
          // width: 249px;
          margin-right: 20px;

          .img-wrap {
            position: relative;

            img {
              border-radius: 10px;
              width: 273px;
              height: 100%;
            }

            .icon-l {
              font-size: 30px;
              position: absolute;
              left: 110px;
              top: 34%;
              color: #c23616;
              background: #f5f6fa;
              width: 30px;
              height: 30px;
              padding: 10px 10px 10px 13px;
              border-radius: 50%;
              text-align: center;
              transition: .4s linear all;
              opacity: 0;
              visibility: hidden;
            }
          }

          .img-wrap:hover .icon-l {
            opacity: 1;
            visibility: visible;
          }

          .num-wrap {
            display: flex;
            position: absolute;
            top: 5px;
            right: 5px;
            color: #fff;
            // font-weight: lighter;
            font-size: 15px;
            line-height: 15px;
            font-weight: 400;

            .icon-s {
              font-size: 13px;
              margin-right: 7px;
            }
          }

          .info-wrap {
            .name {
              overflow: hidden;
              text-overflow: ellipsis;
              width: 200px;
              transition: .4s all;
              white-space: nowrap;
              position: relative;
            }

            .name:hover {
              text-overflow: clip;
            }

            .singer {
              font-size: 15px;
              font-weight: lighter;
              color: #718093;
              margin-bottom: 20px;
            }
          }
        }
      }
    }
  }
</style>