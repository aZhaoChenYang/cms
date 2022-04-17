<template>
  <!-- 开头 -->
  <div class="labelIndexSelectTable">
    <div>
      <el-button size="medium" type="primary" @click="dialogVisible = true">添加标签</el-button>
    </div>
    <!-- 添加标签对话框 -->
    <el-dialog title="添加标签" :visible.sync="dialogVisible">
      <el-form>
        <el-form-item label="标签" :label-width="formLabelWidth" placeholder="请输入标签">
          <el-input v-model="form.name" autocomplete="off" type="text" :rows="6"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add_tag()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 显示列表 -->
    <div class="xia">
      <el-tag v-for="item in tagsdata" closable @close="del_data(item.id)">{{ item.name }}</el-tag>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        id: 0,
        name: '',
      },
      dialogVisible: false,
      formLabelWidth: '120px',
      tagsdata: []
    }
  },
  methods: {
    // 添加标签
    async add_tag () {
      this.dialogVisible = false
      await this.$http.post('tag', this.form)
      this.$message({
        type: 'success',
        message: '添加成功'
      })
      this.form.name = ''
      await this.get_tag()
    },
    // 获取全部标签
    async get_tag () {
      let res = await this.$http.get('tag')
      this.tagsdata = res.data
    },
    // 删除标签
    async del_data (id) {
      await this.$confirm('确定删除该标签吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await this.$http.delete('tag?id=' + id)
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
      await this.get_tag()
    },
    cancel () {
      this.dialogVisible = false
      this.form.name = ''
    }
  },
  mounted () {
    this.get_tag()
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
