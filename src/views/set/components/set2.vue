<template>
  <div class="set1">
    <el-row class="set1-el-row" v-for="(item, index) in set" :key="index">
      <el-col :span="2">{{ item.desc }}</el-col>
      <el-col :span="6">
        <el-input v-model="item.value" placeholder="请输入内容">
          <template slot="prepend">基础费折扣</template>
        </el-input>
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="6">
        <el-input v-model="item.value1" placeholder="请输入内容">
          <template slot="prepend">附加费折扣</template>
        </el-input>
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
    <el-button type="primary" class="class_bt" @click="edit_set()">修改</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      set: [],
    }
  },
  methods: {
    get_allSet () {
      this.$http.get('admin/get_member').then(res => {
        this.set = res.data
      })
    },

    edit_set () {
      this.$http.post('admin/update_member', this.set).then(res => {
        if (res.errno == 0) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        } else {
          this.$message.error(res.errmsg)
        }
      })
    }
  },
  mounted () {
    this.get_allSet()
  }
}
</script>

<style lang="less">
.set1 {
  background-color: white;
  min-height: calc(100vh);
  font-size: 14px;

  .set1-el-row {
    margin-left: 60px;
    padding-top: 30px;
    display: flex;
    align-items: center;
  }

  .class_bt {
    width: 200px;
    margin-top: 20px;
    margin-left: 300px;
  }
}

</style>
