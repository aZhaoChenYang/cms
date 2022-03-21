<template>
  <div class="shopIndex">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>门店</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="shopIndexBack">
    <shopIndexSearchTable></shopIndexSearchTable>
    </div>
  </div>
</template>

<script>
import shopIndexSearchTable from './components/shopIndexSearchTable.vue'
export default {
  components: {
    shopIndexSearchTable
  }
}
</script>

<style>
  .shopIndex{
    margin-left: 20px;
    margin-top: 20px;
  }
  .shopIndexBack{
    background-color: white;
    min-height: calc(100vh);
  }
</style>
