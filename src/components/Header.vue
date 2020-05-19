<!--
 * @Autor: YeWei Wang
 * @Date: 2020-04-21 15:56:20
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description: header
 * @LastEditTime: 2020-04-25 21:05:34
 * @Version: 1.0
 * @FilePath: \cloud-music\src\components\Header.vue
 -->
<template>
  <div class="header-container">
    <div class="icon-btn">
      <span class="icon icon-1" @click="toHome()">
        <font-awesome-icon icon="home" class="item" />
      </span>
      <span class=" icon icon-2">
        <font-awesome-icon icon="expand-alt" class="item" />
      </span>
      <span class="icon icon-3" @click="$router.go(-1)">
        <font-awesome-icon icon="reply" class="item" />
      </span>
    </div>
    <div class="serach-box">
      <input type="text"
             class="item"
             :class="{ inclicked:isActive }"
             placeholder="搜索"
             autocomplete="off"
             v-model="inputValue"
             @keyup.enter="toResult">
      <button class="btn" @click="toggleC()"
              :class="{ close:isActive }" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data() {
      return {
        // toggleClass
        isActive: false,
        inputValue: ''
      }
    },
    methods: {
      toggleC() {
        this.isActive = !this.isActive
      },
      toResult() {
        if (this.inputValue == '') {
          this.$message.error("请输入")
        } else {
          this.$router.push(`/index/result?q=${this.inputValue}`)
        }
      },
      toHome() {
        this.$router.push('/index/discovery')
      },
    }
  }
</script>

<style lang="less">
  .header-container {
    height: 70px;
    background: #f1f2f6;
    border-radius: 5px 5px 0 0;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;

    .icon-btn {
      position: absolute;
      left: 12px;
      line-height: 50px;


      .icon {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        display: inline-block;
        margin-right: 7px;
        cursor: pointer;
        position: relative;
        padding: 1px;

        .item {
          position: absolute;
          text-align: center;
          font-size: 12px;
          font-weight: lighter;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          visibility: hidden;
          transition: .1s all linear;
        }


      }

      .icon:hover .item {
        opacity: 1;
        visibility: visible;

      }


      .icon-1 {
        background: #ff7f50;
      }

      .icon-2 {
        background: #eccc68;
      }

      .icon-3 {
        background: #7bed9f;
      }
    }

    .serach-box {
      position: absolute;
      right: 50px;

      .item {
        width: 32px;
        height: 32px;
        background: none;
        border-radius: 50%;
        border: 2px solid #95afc0;
        outline: none;
        box-sizing: border-box;
        transition: width .4s ease-in-out,
          border-radius .8s ease-in-out,
          padding .2s;
        transition-delay: .4s;
        color: #95afc0;
        text-align: center;
        // padding: 2px;
      }



      .btn {
        position: absolute;
        height: 20px;
        width: 20px;
        top: 0;
        right: 0;
        box-sizing: border-box;
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
      }

      .btn::before {
        content: "";
        width: 10px;
        height: 4px;
        background: #95afc0;
        position: absolute;
        display: block;
        right: -7px;
        bottom: -13px;
        transform: rotate(45deg);
        transition: .3s;
        // visibility: hidden;
      }

      .inclicked {
        width: 260px;
        // height: 40px;
        border-radius: 0;
      }

      .close::before,
      .close:after {
        content: "";
        width: 4px;
        height: 19px;
        background: #dd6d60;
        position: absolute;
        // transform: rotate(-45deg);
        bottom: -5px;
        right: 14px;
      }

      .close::before {
        transform: rotate(-45deg);
      }

      .close::after {
        transform: rotate(45deg);
      }
    }



  }
</style>