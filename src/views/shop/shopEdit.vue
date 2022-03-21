<template>
  <div class="shopEdit">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>门店</el-breadcrumb-item>
      <el-breadcrumb-item>修改门店</el-breadcrumb-item>
    </el-breadcrumb>
    <shopEditTable></shopEditTable>
  </div>
</template>

<script>
import shopEditTable from './components/shopEditTable.vue'
export default {
  components: {
    shopEditTable
  }
}
</script>

<style>
.shopEdit {
  margin-left: 20px;
  margin-top: 20px;
}
</style>
