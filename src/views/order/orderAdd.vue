<template>
  <div class="dramaAdd">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单</el-breadcrumb-item>
    </el-breadcrumb>
    <orderAddTable></orderAddTable>
  </div>
</template>

<script>
import orderAddTable from './components/orderAddTable.vue'
export default {
  components: {
    orderAddTable
  }
}
</script>

<style>
  .dramaAdd {
    margin-left: 20px;
    margin-top: 20px;
  }
</style>
