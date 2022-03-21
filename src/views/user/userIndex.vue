<template>
  <div class="userIndex">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="userIndexBack">
      <userIndexSearchTable></userIndexSearchTable>
    </div>
  </div>
</template>

<script>
import userIndexSearch from './components/userIndexSearch.vue'
import userIndexSearchTable from './components/userIndexSearchTable.vue'

export default {
  components: {
    userIndexSearch,
    userIndexSearchTable
  }
}
</script>

<style>
.userIndex {
  margin-left: 20px;
  margin-top: 20px;
}

.userIndexBack {
  background-color: white;
  min-height: calc(100vh);
}
</style>
