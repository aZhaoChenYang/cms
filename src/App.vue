<template>
  <div id="app">
    <el-container>
      <el-aside width="200px" :class="{qaside:HideLeftNav}">
        <indexAside></indexAside>
      </el-aside>
      <el-container>
        <el-header :class="{qaside:HideLeftNav}">
          <indexHeader></indexHeader>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import indexHeader from './components/indexHeader.vue'
import indexAside from './components/indexAside.vue'

export default {
  name: 'App',
  components: {
    indexHeader,
    indexAside
  },
  watch: {
    // 方法1
    '$route' (to, from) { // 监听路由是否变化
      if (to.name == 'login') { // 跳转到哪个页面
        this.HideLeftNav = true
      } else {
        this.HideLeftNav = false
      }
    }
  },
  data () {
    return {
      HideLeftNav: false
    }
  }
}
</script>

<style>
body {
  margin: 0PX;
}

#app {

}

.el-aside {
  background-color: black;
}

.el-container {
  width: 100%;
  margin: 0;
}

.el-header {
  border-bottom: 1px solid #BEBEBE;
}

.el-main {
  background-color: #F5F7F9;
  margin: 0px;
  padding: 0px;
}

.qaside {
  display: none;
}
</style>
