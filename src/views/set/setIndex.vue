<template>
  <div class="setIndex">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">微信配置</el-menu-item>
      <el-menu-item index="2">会员配置</el-menu-item>
      <el-menu-item index="3">上传配置</el-menu-item>
    </el-menu>
    <set1 v-if="show1 == 1" class="set"></set1>
    <set2 v-else-if="show1 == 2" class="set"></set2>
    <set3 v-else class="set"></set3>
  </div>
</template>

<script>
import set1 from './components/set1.vue'
import set2 from './components/set2.vue'
import set3 from './components/set3.vue'

export default {
  components: {
    set1,
    set2,
    set3
  },
  data () {
    return {
      activeIndex: '1',
      show1: '1'
    }
  },
  methods: {
    handleSelect (key) {
      this.show1 = key
    }
  }
}
</script>

<style lang="less">
.setIndex {
  margin-left: 20px;
  margin-top: 20px;

  .el-menu-demo {
    margin-top: 20px;
  }
}
</style>
