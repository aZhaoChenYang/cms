<template>
  <div class="page_shoptable">
    <div class="userIndexSearch">
      <el-row class="userIndexSearchRow">
        <el-col :span="4">
          <el-input placeholder="请输入门店名字" v-model="input" clearable>
          </el-input>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="success" size="small" @click="ser_name">查找</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="infor" size="small" @click="get_allUser()">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="dramaIndexSelectTable">
      <el-table
        :data="tableData"
        border
        style="width: 95%" height="700px">
        <el-table-column
          prop="user_id"
          label="序号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="openid"
          label="appid"
          width="180">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="用户名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="vip"
          label="会员等级"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
          <el-button type="success" @click="send_edit(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹出框 -->
    <el-dialog title="修改会员等级" :visible.sync="dialogFormVisible">
      <el-row class="swiperIndex_el_row">
        <el-col :span="4">等级</el-col>
        <el-col :span="13">
          <el-select v-model="vip_id" placeholder="请选择等级">
            <el-option v-for="(item,index) in vip" :label="item.name" :value="item.id" :key="index"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit_user()">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      input: '',
      dialogFormVisible: false,
      vip: [{id:0, name:'普通用户'}, {id:1, name:'银卡用户'}, {id:2, name:'金卡用户'}, {id:3, name:'团体卡用户'}],
      vip_id: 0,
      update_userid: 0
    }
  },
  mounted () {
    this.get_allUser()
  },
  methods: {
    // 获取所有门店
    get_allUser () {
      this.$http.get('user/get_all').then(res => {
        this.tableData = res.data
      })
    },
    // 发送修改数据
    send_edit (row) {
      this.update_userid = row.user_id
      console.log(row)
      this.vip_id = row.vipid
      this.dialogFormVisible = true
    },
    edit_user() {
      this.$http.post('user/up_user', {id: this.update_userid, vip: this.vip_id}).then(res => {
        if(res.errno == 0) {
          this.$message.success(res.errmsg)
          this.dialogFormVisible = false
          this.update_userid = -1
          this.get_allUser()
        }else {
          this.$message.error(res.errmsg)
        }
      })
    },
    // 条件查找
    ser_name () {
      const name = this.input
      const arr = []
      for (const k in this.tableData) {
        const v = this.tableData[k]
        if (v.nickname.indexOf(name) >= 0) {
          arr.push(v)
        }
      }
      this.tableData = arr
    }
  }

}
</script>

<style>
.dramaIndexSelectTable {
  margin-top: 10px;
  margin-left: 40px;
}

.userIndexSearch {
  margin-top: 20px;
  margin-left: 20px;
  padding: 20px;
}

.userIndexSearchRow {
  display: flex;
  align-items: center;
}
</style>
