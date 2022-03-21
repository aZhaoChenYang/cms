<template>
  <div class="userIndexSeaarch">
    <el-row class="userIndexSeaarchRow">
      <el-col :span="4">
        <el-input placeholder="请输入用户名字" v-model="input" clearable>
        </el-input>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="info" size="small">查找</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: ''
    }
  }
}
</script>

<style>
  .userIndexSeaarch {
    margin-top: 20px;
    margin-left: 20px;
    padding: 20px;
  }
  .userIndexSeaarchRow{
    display: flex;
    align-items: center;
  }
  .userFont{
    color: white;
    text-decoration: none;
  }
</style>
