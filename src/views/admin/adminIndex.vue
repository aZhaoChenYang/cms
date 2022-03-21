<template>
  <div class="adminIndex">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="adminIndexBack">
      <adminIndexSearchTable></adminIndexSearchTable>
    </div>
  </div>
</template>

<script>
import adminIndexSearchTable from './components/adminIndexSearchTable.vue'
export default {
  components: {
    adminIndexSearchTable
  }
}
</script>

<style>
  .adminIndex{
    margin-left: 20px;
    margin-top: 20px;
  }
  .adminIndexBack{
    background-color: white;
    min-height: calc(100vh);
  }
</style>
