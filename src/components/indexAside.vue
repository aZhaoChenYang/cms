<template>
  <div>
    <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
             background-color="black" text-color="white">
      <el-menu-item disabled="">
      </el-menu-item>
      <el-menu-item index="1" class="indexAside" @click="jump_to_index">
        <i class="el-icon-house"></i>
        <span class="indexAsideFont">首页</span>
      </el-menu-item>
      <el-menu-item index="2" class="indexAside" @click="jump_to_drama">
        <i class="el-icon-reading"></i>
        <span class="indexAsideFont">剧本</span>
      </el-menu-item>
      <el-menu-item index="3" class="indexAside" @click="jump_to_shop">
        <i class="el-icon-map-location"></i>
        <span slot="title" class="indexAsideFont">门店</span>
      </el-menu-item>
      <el-menu-item index="4" class="indexAside" @click="jump_to_user">
        <i class="el-icon-s-custom"></i>
        <span slot="title" class="indexAsideFont">用户</span>
      </el-menu-item>
      <el-menu-item index="5" class="indexAside" @click="jump_to_label">
        <i class="el-icon-discount"></i>
        <span slot="title" class="indexAsideFont">标签</span>
      </el-menu-item>
      <el-menu-item index="7" class="indexAside" @click="jump_to_admin">
        <i class="el-icon-user-solid"></i>
        <span slot="title" class="indexAsideFont">管理员</span>
      </el-menu-item>
      <el-menu-item index="8" class="indexAside" @click="jump_to_swiper">
        <i class="el-icon-picture-outline-round"></i>
        <span slot="title" class="indexAsideFont">轮播图</span>
      </el-menu-item>
      <el-menu-item index="6" class="indexAside" @click="jump_to_set">
        <i class="el-icon-setting"></i>
        <span slot="title" class="indexAsideFont">配置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {

    },
    handleClose (key, keyPath) {

    },
    jump_to_index () {
      this.$router.push({
        path: '/'
      })
    },
    jump_to_drama () {
      this.$router.push({
        path: '/dramaIndex'
      })
    },
    jump_to_shop () {
      this.$router.push({
        path: '/shopIndex'
      })
    },
    jump_to_user () {
      this.$router.push({
        path: '/userIndex'
      })
    },
    jump_to_label () {
      this.$router.push({
        path: '/labelIndex'
      })
    },
    jump_to_set () {
      this.$router.push({
        path: '/setIndex'
      })
    },
    jump_to_admin () {
      this.$router.push({
        path: '/adminIndex'
      })
    },
    jump_to_swiper () {
      this.$router.push({
        path: '/swiper'
      })
    }
  }
}
</script>

<style>
.indexAside {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

.el-menu-vertical-demo {
  height: calc(120vh);
}

.indexAsideFont {
  text-decoration: none;
}
</style>
