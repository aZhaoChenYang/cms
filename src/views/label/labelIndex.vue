<template>
  <div class="labelIndex">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>标签</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="labelIndexBack">
      <peopleIndexTabel></peopleIndexTabel>
      <hr />
      <labalIndexTable></labalIndexTable>
    </div>
  </div>
</template>

<script>
import labalIndexTable from './components/labelIndexTabel.vue'
import peopleIndexTabel from './components/peopleIndexTabel'
export default {
  components: {
    labalIndexTable,
    peopleIndexTabel
  }
}
</script>

<style>
  .labelIndex{
    margin-left: 20px;
    margin-top: 20px;
  }
  .labelIndexBack{
    background-color: white;
    min-height: calc(100vh);
  }
</style>
