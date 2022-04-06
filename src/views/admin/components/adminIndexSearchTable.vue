<template>
  <div class="page_admin">
    <div class="adminIndexSearch">
      <el-row class="adminIndexSearchRow">
        <el-col :span="2">
          <el-button size="small" type="primary" @click="dialogVisible = true; type = 1">添加管理员</el-button>
        </el-col>
      </el-row>
      <!-- 弹出框:添加用户-->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <el-row class="adminIndex_el_row">
          <el-col :span="4">用户名</el-col>
          <el-col :span="13">
            <el-input v-model="newAdmin.username" placeholder="请输入内容" clearable
                      :readonly="this.type!==1"></el-input>
          </el-col>
        </el-row>
        <el-row class="adminIndex_el_row">
          <el-col :span="4">昵称</el-col>
          <el-col :span="13">
            <el-input v-model="newAdmin.nickname" placeholder="请输入内容" clearable></el-input>
          </el-col>
        </el-row>
        <el-row class="adminIndex_el_row">
          <el-col :span="4">密码</el-col>
          <el-col :span="13">
            <el-input v-model="newAdmin.password" placeholder="请输入内容" show-password></el-input>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button v-if="this.type === 1" type="primary" @click="add_admin()">确 定</el-button>
          <el-button v-if="this.type === 2" type="primary" @click="up_admin()">修改</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 管理员列表 -->
    <div class="adminIndexSelectTable">
      <el-table
        :data="tableData"
        style="width: 100%"
        border>
        <el-table-column
          prop="ID"
          label="序号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="昵称"
          width="180">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="success" @click="send_editData(scope.row)">修改</el-button>
            <el-button type="danger" @click="del_admin(scope.row.ID)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      tableData: [],
      newAdmin: {
        id: 0,
        username: '',
        password: '',
        nickname: ''
      },
      input: '',
      type: 1,
    }
  },
  mounted () {
    this.get_allAdmin()
  },
  methods: {
    // 查找全部管理员
    async get_allAdmin () {
      this.input = ''
      let res = await this.$http.get('admin')
      if (res.code === 0) {
        this.tableData = res.data
      }
    },
    // 发送修改数据
    send_editData (row) {
      this.type = 2
      this.newAdmin = row
      this.dialogVisible = true
    },
    // 修改管理员信息
    async up_admin () {
      if (this.newAdmin.password === '') {
        this.$message('请输入密码')
        return
      }
      await this.$http.put('admin', this.newAdmin)
      this.$message({
        type: 'success',
        message: '修改成功!'
      })
      this.dialogVisible = false
      await this.get_allAdmin()

    },
    // 添加管理员
    async add_admin () {
      this.type = 1
      if (this.newAdmin.username === '') {
        this.$message('请输入用户名')
        return
      }
      if (this.newAdmin.password === '') {
        this.$message('请输入密码')
        return
      }
      await this.$http.post('admin', this.newAdmin)
      this.$message({
        type: 'success',
        message: '添加成功'
      })
      this.dialogVisible = false
      this.newAdmin.nickname = ''
      this.newAdmin.username = ''
      this.newAdmin.password = ''
      await this.get_allAdmin()
    },
    // 删除管理员
    async del_admin (id) {
      await this.$confirm('确定删除该管理员吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await this.$http.delete('admin?id=' + id)
      this.$message({
        type: 'success',
        message: '删除成功'
      })
      this.dialogVisible = false
      await this.get_allAdmin()

    }
  }

}
</script>

<style>
.adminIndexSelectTable {
  margin-top: 10px;
  margin-left: 40px;
  width: 70%;
}

.adminIndexSearch {
  margin-top: 20px;
  margin-left: 20px;
  padding: 20px;
}

.adminIndexSearchRow {
  display: flex;
  align-items: center;
}

.adminIndex_el_row {
  display: flex;
  align-items: center;
  padding-top: 6px;
}

</style>
