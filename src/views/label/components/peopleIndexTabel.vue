<template>
  <!-- 开头 -->
  <div class="labelIndexSelectTable">
    <div>
      <el-button size="medium" type="primary" @click="dialogVisible = true">添加人数</el-button>
    </div>
    <!-- 添加标签对话框 -->
    <el-dialog title="添加人数" :visible.sync="dialogVisible">
      <el-form>
        <el-form-item label="人数" :label-width="formLabelWidth" placeholder="请输入人数">
          <el-input v-model.number="form.number" autocomplete="off" type="number" :rows="6"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add_people()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 显示列表 -->
    <div class="xia">
      <el-tag v-for="item in peopledata" closable @close="del_data(item.id)">{{ item.number }}人</el-tag>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        number: 0,
      },
      dialogVisible: false,
      formLabelWidth: '120px',
      peopledata: []
    }
  },
  methods: {
    // 添加标签
    async add_people () {
      this.dialogVisible = false
      await this.$http.post('people', this.form)
      this.$message({
        type: 'success',
        message: '添加成功'
      })
      this.form.number = 0
      await this.get_people()
    },
    // 获取全部标签
    async get_people () {
      let res = await this.$http.get('people')
      this.peopledata = res.data

    },
    // 删除标签
    async del_data (id) {
      await this.$confirm('确定删除该标签吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await this.$http.delete('people?id=' + id)
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
      await this.get_people()
    },
    cancel () {
      this.dialogVisible = false
      this.form.number = 0
    }
  },
  mounted () {
    this.get_people()
  }
}
</script>

<style lang="less">
.labelIndexSelectTable {
  margin-top: 20px;
  margin-left: 20px;
  padding: 20px;

  .xia {
    width: 48%;
    margin-top: 20px;
  }

  .items {
    margin-left: 10px;
  }
}
</style>
