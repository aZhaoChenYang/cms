<template>
  <div class="orderIndex">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>剧本</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="orderIndexBack">
    <orderIndexSelectTable></orderIndexSelectTable>
    </div>
  </div>
</template>

<script>
import orderIndexSelectTable from './components/orderIndexSelectTable.vue'
export default {
  components: {
    orderIndexSelectTable
  }
}
</script>

<style>
  .orderIndex{
    margin-left: 20px;
    margin-top: 20px;
  }
  .orderIndexBack{
    background-color: white;
    min-height: calc(100vh);
  }
</style>
