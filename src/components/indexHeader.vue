<template>
  <div class="page_indexHeader">
    <el-row>
      <el-col></el-col>
      <el-col :span="1" :offset="23">
        <el-dropdown>
          <span class="el-dropdown-link">
            <img src="../assets/headicon.png" class="headerLogo" />
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="jump_to_login">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>



  </div>
</template>

<script>

export default {
  methods: {
    jump_to_login () {
      localStorage.clear();
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>

<style lang="less">
  .page_indexHeader{
    margin-top: 8px;
    .el-dropdown-link {
      color: #409EFF;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
    .headerLogo{
      width: 40px;
      border-radius: 50%;
    }
    .adminIndex_el_row{
      margin-top: 10px;
    }
  }
</style>
