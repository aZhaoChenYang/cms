<template>
  <div class="swiperIndex">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>轮播图</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="swiperIndexBack">
      <swiperTable></swiperTable>
    </div>
  </div>
</template>

<script>
import swiperTable from './components/swiperTable.vue'
export default{
  components:{
    swiperTable
  }
}
</script>

<style>
  .swiperIndex{
    margin-left: 20px;
    margin-top: 20px;
  }
  .swiperIndexBack{
    background-color: white;
    min-height: calc(100vh);
  }
</style>
