<!--
 * @Autor: YeWei Wang
 * @Date: 2020-04-21 00:40:46
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: MV
 * @LastEditTime: 2020-05-04 21:32:21
 * @Version: 1.0
 * @FilePath: \cloud-music\src\views\mv\Mvs.vue
 -->
<template>
  <div class="mvs-container">
    <!-- 筛选框 -->
    <div class="filter-wrap">
      <!-- 地区筛选 -->
      <div class="section-wrap">
        <span class="section-type">地区：</span>
        <ul class="tabs-wrap">
          <li class="tab"
              v-for="(item,index) in sectionType"
              :key="index">
            <span class="title"
                  @click="area = item.area"
                  :class="{ active: area === item.area }">{{ item.area }}</span>
          </li>
        </ul>
      </div>
      <!-- 类型筛选 -->
      <div class="type-wrap">
        <span class="type-type">类型：</span>
        <ul class="tabs-wrap">
          <li class="tab"
              v-for="(item,index) in typeType"
              :key="index">
            <span class="title"
                  @click="type = item.type"
                  :class="{ active:type === item.type }">
              {{ item.type }}
            </span>
          </li>
        </ul>
      </div>
      <!-- 排序筛选 -->
      <div class="order-wrap">
        <div class="order-type">排序：</div>
        <ul class="tabs-wrap">
          <li class="tab"
              v-for="(item,index) in orderType"
              :key="index">
            <span class="title"
                  @click="order = item.order"
                  :class="{ active: order === item.order }">
              {{ item.order }}
            </span>
          </li>
        </ul>
      </div>
    </div>
    <!-- mv列表 -->
    <div class="mvs">
      <div class="items">
        <div class="item"
             v-for="(item, index) in mvs"
             :key="index"
             @click="toMV(item.id)">
          <div class="img-wrap">
            <img :src="item.cover+'?param=250y150'" alt="" />
            <div class="num-wrap">
              <font-awesome-icon class="iconfont icon-play" icon="play" />
              <div class="num">{{ item.playCount | playNumFormat }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="total" :current-page="pageNum" :page-size="pageSize">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { getMvs } from '@/network/request'
  export default {
    name: 'Mvs',
    data() {
      return {
        // 总条数
        total: 20,
        // 页码
        pageNum: 1,
        pageSize: 8,
        area: '全部',
        type: '全部',
        order: '最热',
        sectionType: [
          //地区tab筛选栏 
          {
            area: '全部'
          },
          {
            area: '内地'
          },
          {
            area: '港台'
          },
          {
            area: '欧美'
          },
          {
            area: '日本'
          },
          {
            area: '韩国'
          }
        ],
        typeType: [
          // 类型tab
          {
            type: '全部'
          },
          {
            type: '官方版'
          },
          {
            type: '原声'
          },
          {
            type: '现场版'
          },
          {
            type: '网易出品'
          }
        ],
        orderType: [
          // 排序tabs
          {
            order: '上升最快'
          },
          {
            order: '最热'
          },
          {
            order: '最新'
          }
        ],
        mvs: []
      }
    },
    async created() {
      this._getMvs()
    },
    methods: {
      // 获取MV列表
      async _getMvs() {
        const { data: resp } = await getMvs({
          tags: JSON.stringify({
            地区: this.area,
            类型: this.type,
            排序: this.order
          }),
          limit: this.pageSize,
          offset: (this.pageNum - 1) * this.pageSize
        })
        if (resp.count) {
          this.total = resp.count
        }
        this.mvs = resp.data
      },
      // 翻页器
      handleCurrentChange(val) {
        // 保存页码
        this.pageNum = val
        this._getMvs()
      },
      toMV(id) {
        this.$router.push(`/index/mv?id=${id}`)
      }
    },
    watch: {
      area() {
        this.pageNum = 1
        this._getMvs()
      },
      type() {
        this.pageNum = 1
        this._getMvs()
      },
      order() {
        this.pageNum = 1
        this._getMvs()
      }
    }
  }
</script>

<style lang="less">
  .mvs-container {
    padding: 20px 80px 20px 50px;
    margin-left: 40px;

    .filter-wrap>div {
      margin-bottom: 30px;
      vertical-align: baseline;
      display: flex;
      align-items: center;

      span {
        font-size: 14px;
        height: 100%;
      }

      span.title {
        margin: 20px;
        color: gray;
        cursor: pointer;
        padding: 5px 20px;
      }

      span.title.active {
        color: #dd6d60;
        background-color: #fcf6f5;
        border-radius: 20px;
      }

      span.title::before {
        content: '', pos;
      }

      ul {
        display: flex;

        li:not(:last-child) {
          border-right: 1px solid #f2f2f1;
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

    .mvs .items {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;

      .item {
        width: 250px;
        cursor: pointer;
        margin-right: 25px;
        margin-bottom: 30px;

        .img-wrap {
          width: 100%;
          position: relative;

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
            align-content: center;
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

        .info-wrap {
          .name {
            font-size: 15px;
            margin: 4px 0;

          }

          .singer {
            font-size: 14px;
            color: #c5c5c5;
          }
        }
      }
    }
  }
</style>