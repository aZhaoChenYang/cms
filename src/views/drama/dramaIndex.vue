<template>
  <div class="dramaIndex">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>剧本</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="dramaIndexBack">
    <dramaIndexSelectTable></dramaIndexSelectTable>
    </div>
  </div>
</template>

<script>
import dramaIndexSelectTable from './components/dramaIndexSelectTable.vue'
export default {
  components: {
    dramaIndexSelectTable
  }
}
</script>

<style>
  .dramaIndex{
    margin-left: 20px;
    margin-top: 20px;
  }
  .dramaIndexBack{
    background-color: white;
    min-height: calc(100vh);
  }
</style>
