<template>
  <div class="shopAdd">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>剧本</el-breadcrumb-item>
      <el-breadcrumb-item>添加门店</el-breadcrumb-item>
    </el-breadcrumb>
    <shopAddTable></shopAddTable>
  </div>
</template>

<script>
import shopAddTable from './components/shopAddTable.vue'
export default {
  components: {
    shopAddTable
  }
}
</script>

<style>
  .shopAdd {
    margin-left: 20px;
    margin-top: 20px;
  }
</style>
