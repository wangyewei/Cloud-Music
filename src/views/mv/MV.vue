<!--
 * @Autor: YeWei Wang
 * @Date: 2020-04-25 21:07:39
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: MV详情页
 * @LastEditTime: 2020-05-19 15:39:36
 * @Version: 野未音乐 v_1.0 pc端
 * @FilePath: \cloud-music\src\views\mv\MV.vue
 -->
<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">MV详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video controls
               :src="url" />
      </div>
      <!-- mv详情 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-info">
            <img :src="icon">
          </div>
          <span class="name">{{mvInfo.artistName}}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{mvInfo.name}}</h2>
          <span class="date">发布： {{ mvInfo.publishTime }}</span>
          <span class="number">播放： {{ mvInfo.playCount | playNumFormat}}</span>
          <p class="desc">
            {{ mvInfo.desc }}
          </p>
        </div>
      </div>
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
    </div>
    <!-- 推荐MV -->
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div class="item" v-for="(item, index) in simiMvs" :key="index" @click="playMv(item.id)">
            <div class="img-wrap">
              <img :src="item.cover+'?param=250y150'" alt="" />
              <font-awesome-icon class="iconfont icon-play icon" icon="play" />
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
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getMvUrl,
    getMvDetail,
    getArtistIcon,
    getMvComment,
    getSimiMvUrl
  } from '../../network/request'

  export default {
    name: 'Mv',
    data() {
      return {
        url: '',
        id: '',
        icon: '',
        mvInfo: {},
        comments: [],
        hotComments: [],
        // 总条数
        total: 20,
        // 页码
        pageNum: 1,
        // 页容量
        pageSize: 10,
      }
    },
    async created() {
      this.id = this.$route.query.id
      this._getMvUrl()
      this._getMvDetail()
      this._getMvComment()
      this._getSimiMvUrl()
    },
    methods: {
      // 获取播放地址
      async _getMvUrl() {
        const { data: resp } = await getMvUrl({
          id: this.id,
          r: 1080
        })
        this.url = resp.data.url
      },
      // 获取详情
      async _getMvDetail() {
        const { data: resp } = await getMvDetail({
          id: this.id
        })
        this.mvInfo = resp.data
        // 获取头像
        const { data: resp1 } = await getArtistIcon(this.mvInfo.artists[0].id)
        this.icon = resp1.artist.picUrl
      },
      // 获取评论
      async _getMvComment() {
        const { data: resp } = await getMvComment(this.id, {
          rid: this.id,
          limit: this.pageSize,
          offset: (this.pageNum - 1) * this.pageSize
        })
        this.comments = resp.comments
        this.hotComments = resp.hotComments
        this.total = resp.total
      },
      // 页码
      handleCurrentChange(val) {
        this.pageNum = val
        this._getMvComment()
      },
      //获取相关MV
      async _getSimiMvUrl() {
        const { data: resp } = await getSimiMvUrl({
          mvid: this.id
        })
        this.simiMvs = resp.mvs
      },
      playMv(id) {
        this.pageNum = 1
        this.id = id
        this._getMvUrl()
        this._getMvDetail()
        this._getSimiMvUrl()
        this._getMvComment()
      }
    }
  }
</script>

<style lang="less">
  .mv-container {
    padding: 20px 80px 40px 40px;
    display: flex;

    .mv-wrap {
      width: 720px;

      h3 {
        font-size: 26px;
        font-weight: 600;
        margin-bottom: 20px;
      }

      .video-wrap {
        position: relative;
        width: 100%;
        height: 390px;

        video {
          border-radius: 5px;
          height: 100%;
          width: 100%;
          outline: none;
        }
      }
    }

    .info-wrap {
      margin: 20px;

      .singer-info {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        .avatar-info {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 20px;

          img {
            height: 100%;
          }
        }
      }

      .mv-info {
        .title {
          font-size: 30px;
          font-weight: bolder;
          margin-bottom: 30px;
        }

        span {
          margin-right: 10px;
          color: #ccc;
          margin-bottom: 7px;
          display: inline-block;
        }

        p {
          color: #ccc;
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

    .title {
      margin-bottom: 20px;
    }

    .mv-wrap {
      width: 700px;
      margin-right: 35px;
    }

    .mv-wrap .date {
      margin-right: 25px;
    }

    .mv-wrap .date,
    .mv-wrap .number {
      color: #bebebe;
      font-size: 14px;
    }

    .mv-wrap .video-wrap {
      width: 100%;
      height: 390px;
      margin-bottom: 20px;
    }

    .mv-wrap .video-wrap video {
      border-radius: 5px;
      height: 100%;
      width: 100%;
      outline: none;
    }

    .mv-wrap .info-wrap {
      margin-bottom: 50px;
    }

    .mv-wrap .info-wrap .singer-info {
      display: flex;
      align-items: center;
      margin-bottom: 35px;
    }

    .mv-wrap .info-wrap .singer-info .avatar-wrap {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin-right: 10px;
      overflow: hidden;
    }

    .mv-wrap .info-wrap .singer-info .avatar-wrap img {
      height: 100%;
    }

    .mv-wrap .info-wrap .mv-info .title {
      font-size: 30px;
    }

    .mv-wrap .info-wrap .mv-info .desc {
      font-size: 15px;
      margin-top: 20px;
    }

    .mv-wrap .comment-wrap {
      margin-bottom: 70px;
    }

    .mv-wrap .comment-wrap .title {
      font-size: 25px;
    }

    .mv-wrap .comment-wrap .title .number {
      color: black;
      font-size: 20px;
    }

    .mv-wrap .comment-wrap .item {
      display: flex;
      padding-top: 20px;
    }

    .mv-wrap .comment-wrap .item .icon-wrap {
      margin-right: 15px;
    }

    .mv-wrap .comment-wrap .item .icon-wrap img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .mv-wrap .comment-wrap .item:not(:last-child) .content-wrap {
      border-bottom: 1px solid #f2f2f1;
    }

    .mv-wrap .comment-wrap .item .content-wrap {
      padding-bottom: 20px;
      flex: 1;
    }

    .mv-wrap .comment-wrap .item .content-wrap .name {
      color: #517eaf;
      font-size: 14px;
    }

    r .mv-wrap .comment-wrap .item .content-wrap .comment {
      font-size: 14px;
    }

    .mv-wrap .comment-wrap .item .content-wrap .content,
    .mv-wrap .comment-wrap .item .content-wrap .re-content {
      margin-bottom: 10px;
    }

    .mv-wrap .comment-wrap .item .content-wrap .re-content {
      padding: 10px;
      background-color: #e6e5e6;
      border-radius: 5px;
    }

    .mv-recommend {
      flex: 1;
    }

    .mv-recommend .mvs .items {
      display: flex;
      flex-wrap: wrap;
    }

    .mv-recommend .mvs .items .item {
      cursor: pointer;
      width: 100%;
      display: flex;
      align-items: center;
      padding: 10px;
      cursor: pointer;
    }

    .mv-recommend .mvs .items .item:hover {
      background-color: #f5f5f5;
    }

    .mv-recommend .mvs .items .item .img-wrap {
      width: 180px;
      position: relative;
      margin-right: 10px;
    }

    .mv-recommend .mvs .items .item .img-wrap>.icon-play {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 40px;
      color: #dd6d60;
      font-size: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.8);
      opacity: 0;
    }

    .mv-recommend .mvs .items .item .img-wrap>.icon-play::before {
      transform: translateX(3px);
    }

    .mv-recommend .mvs .items .item .img-wrap:hover>.icon-play {
      opacity: 1;
    }

    .mv-recommend .mvs .items .item .img-wrap img {
      width: 100%;
      border-radius: 5px;
    }

    .mv-recommend .mvs .items .item .img-wrap .icon {
      // width: 12px;
      // height: 12px;
      // padding: 16px;
      // font-size: 2px;
      padding: 4px;
    }

    .mv-recommend .mvs .items .item .img-wrap .num-wrap {
      position: absolute;
      color: white;
      top: 0;
      right: 0;
      display: flex;
      align-content: center;
      font-size: 15px;
      padding-right: 5px;
      padding-top: 2px;
    }

    .mv-recommend .mvs .items .item .img-wrap .num-wrap .icon-play {
      font-size: 12px;
      display: flex;
      align-items: center;
      margin-right: 5px;
    }

    .mv-recommend .mvs .items .item .img-wrap .time {
      position: absolute;
      bottom: 5px;
      right: 5px;
      color: white;
      font-size: 15px;
    }

    .mv-recommend .mvs .items .item .info-wrap {
      flex: 1;
    }

    .mv-recommend .mvs .items .item .info-wrap .name {
      font-size: 15px;
    }

    .mv-recommend .mvs .items .item .info-wrap .singer {
      font-size: 14px;
      color: #c5c5c5;
    }
  }

  .mv-container .mv-recommend {
    flex: 1;
  }

  .mv-container .mv-recommend .mvs .items {
    display: flex;
    flex-wrap: wrap;
  }

  .mv-container .mv-recommend .mvs .items .item {
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
  }

  .mv-container .mv-recommend .mvs .items .item:hover {
    background-color: #f5f5f5;
  }

  .mv-container .mv-recommend .mvs .items .item .img-wrap {
    width: 180px;
    position: relative;
    margin-right: 10px;
  }

  .mv-container .mv-recommend .mvs .items .item .img-wrap>.icon-play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    color: #dd6d60;
    font-size: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.8);
    opacity: 0;
  }

  .mv-container .mv-recommend .mvs .items .item .img-wrap>.icon-play::before {
    transform: translateX(3px);
  }

  .mv-container .mv-recommend .mvs .items .item .img-wrap:hover>.icon-play {
    opacity: 1;
  }

  .mv-container .mv-recommend .mvs .items .item .img-wrap {
    img {
      width: 100%;
      border-radius: 5px;
    }

  }

  .mv-container .mv-recommend .mvs .items .item .img-wrap .num-wrap {
    position: absolute;
    color: white;
    top: 0;
    right: 0;
    display: flex;
    align-content: center;
    font-size: 15px;
    padding-right: 5px;
    padding-top: 2px;
  }

  .mv-container .mv-recommend .mvs .items .item .img-wrap .num-wrap .icon-play {
    font-size: 12px;
    display: flex;
    align-items: center;
    margin-right: 5px;
  }

  .mv-container .mv-recommend .mvs .items .item .img-wrap .time {
    position: absolute;
    bottom: 5px;
    right: 5px;
    color: white;
    font-size: 15px;
  }

  .mv-container .mv-recommend .mvs .items .item .info-wrap {
    flex: 1;
  }

  .mv-container .mv-recommend .mvs .items .item .info-wrap .name {
    font-size: 15px;
  }

  .mv-container .mv-recommend .mvs .items .item .info-wrap .singer {
    font-size: 14px;
    color: #c5c5c5;
  }
</style>