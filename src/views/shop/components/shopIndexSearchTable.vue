<template>
  <div class="page_shoptable">
    <!-- 搜索栏 -->
    <div class="shopIndexSeaarch">
      <el-row class="shopIndexSeaarchRow">
        <el-col :span="2">
          <el-button type="primary" size="small" class="shopFont" @click="jump_shopadd()">添加门店</el-button>
        </el-col>
        <el-col :span="4">
          <el-input placeholder="请输入门店名字" v-model="input" clearable>
          </el-input>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="success" size="small" @click="ser_name">查找</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="infor" size="small" @click="get_response()">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="dramaIndexSelectTable">
      <el-table :data="tableData" border style="width: 90%">
        <el-table-column prop="id" label="编号" width="80" fixed>
        </el-table-column>
        <el-table-column prop="name" label="门店名称" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="180">
        </el-table-column>
        <el-table-column prop="address" label="详细地址">
        </el-table-column>
        <el-table-column label="操作"  fixed="right" width="200">
          <template slot-scope="scope">
            <el-button type="success" @click="jump_to_shopEdit(scope.row)">修改</el-button>
            <el-button type="danger" @click="delete_shop(scope.row.id)">删除</el-button>
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
      tableData: [{
        id: '',
        name: '',
        mobile: '',
        lat: '',
        long: '',
        address: ''
      }],
      input: ''
    }
  },
  mounted () {
    this.get_response()
  },
  methods: {
    // 获取所有店铺
    get_response () {
      this.$http.get('store/get_all').then(res => {
        if (res.errno == 0){
          this.tableData = res.data
          this.input = ''
        } else {
          this.$message.error(res.errmsg)
        }
      })
    },
    jump_to_shopEdit (item) {
      localStorage.setItem('Edit_Data', JSON.stringify(item))
      this.$router.push({
        path: '/shopIndex/shopEdit',
        query: {
          type: 'edit'
        }
      })
    },
    jump_shopadd () {
      this.$router.push({
        path: '/shopIndex/shopAdd'
      })
    },
    // 删除人员
    delete_shop (id) {
      this.$confirm('确定删除该店铺?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('store/del_store?id=' + id).then(res => {
          if (res.errno == 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.get_response()
          } else {
            this.$message.error(res.errmsg)
          }
        })
      })
    },
    // 条件查找
    ser_name () {
      const name = this.input
      const arr = []
      for (const k in this.tableData) {
        const v = this.tableData[k]
        if (v.name.indexOf(name) >= 0) {
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
  .shopIndexSeaarch {
    margin-top: 20px;
    margin-left: 20px;
    padding: 20px;
  }
  .shopIndexSeaarchRow{
    display: flex;
    align-items: center;
  }
  .shopFont{
    color: white;
    text-decoration: none;
  }
</style>
