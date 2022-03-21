<template>
  <div class="dramaAdd">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>剧本</el-breadcrumb-item>
    </el-breadcrumb>
    <dramaAddTable></dramaAddTable>
  </div>
</template>

<script>
import dramaAddTable from './components/dramaAddTable.vue'
export default {
  components: {
    dramaAddTable
  }
}
</script>

<style>
  .dramaAdd {
    margin-left: 20px;
    margin-top: 20px;
  }
</style>
