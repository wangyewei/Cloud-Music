<!--
 * @Autor: YeWei Wang
 * @Date: 2020-04-20 23:26:47
 * @WeChat: wj826036
 * @Motto: 求知若渴，虚心若愚
 * @Description
 * @LastEditTime: 2020-05-19 17:36:04
 * @Version: 野未音乐 v_1.0 pc端
 * @FilePath: \cloud-music\README.md
--> 
# Vue + element ui web仿网易云音乐 PC端

## 基于Vue(2.x) + Element ui + vue-router + vue-axios + less + ES6等实现网页版网易云音乐PC端


## 预览

### 发现音乐、推荐歌单、最新音乐、推荐MV、搜索页

![image](https://gitee.com/wang_ye_wei_gitee/Vue_music_player/blob/master/img-folder/index-discovery.jpg)

![image](https://gitee.com/wang_ye_wei_gitee/Vue_music_player/blob/master/img-folder/index-playlist.jpg)

![image](https://gitee.com/wang_ye_wei_gitee/Vue_music_player/blob/master/img-folder/index-newsong.jpg)

![image](https://gitee.com/wang_ye_wei_gitee/Vue_music_player/blob/master/img-folder/index-mv.jpg)

![image](https://gitee.com/wang_ye_wei_gitee/Vue_music_player/blob/master/img-folder/index-result.jpg)


### 歌单详情、mv详情

![image](https://gitee.com/wang_ye_wei_gitee/Vue_music_player/blob/master/img-folder/playlist.jpg)

![image](https://gitee.com/wang_ye_wei_gitee/Vue_music_player/blob/master/img-folder/mv.jpg

## 开发目的

通过学习开发一个Vue全家桶项目，让自己熟练使用Vue、模块化开发、ES6等等知识、提高自己的技术能力

## 技术栈

- vue
- vue-router
- element ui
- less
- ES6
- axios
- vue-cli

## 实现功能

播放器内核、发现音乐页面、新歌页面、推荐歌单页面、MV页面、歌单详情、MV详情、搜索功能

### 发现音乐页面

发现音乐分成四个部分，分别是banner轮播图、推荐歌单、最新音乐、推荐MV，数据都是由axios请求

轮播图：使用element ui 自带轮播图

推荐歌单：使用axios请求到数据并展示，采用hover动画，使得更有交互感，不美观的数据采用filter将其过滤成更容易展的示形式

### 推荐歌单
推荐歌分为四部分，精品歌单，筛选器，歌单，翻页器

监听筛选器变化从新获取对应筛选的歌单展示，翻页同理

### 最新歌单
筛选、歌曲

### MV
多条筛选

### 播放器
播放、暂停来自HTML5的audio标签

数据采用组件传递

#### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

