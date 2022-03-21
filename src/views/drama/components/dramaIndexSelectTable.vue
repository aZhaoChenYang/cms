<template>
  <div class="page_dramaIndex">
    <div class="dramaIndexSeaarch">
      <el-row class="dramaIndexSeaarchRow">
        <el-col :span="2">
          <el-button type="primary" size="small" @click="jump_add" class="dramaFont">添加剧本</el-button>
        </el-col>
        <el-col :span="4">
          <el-input placeholder="请输入剧本名字" v-model="input" clearable>
          </el-input>
        </el-col>
       <el-col :span="2" :offset="1">
         <el-button type="success" size="small" @click="ser_dra()">查找</el-button>
       </el-col>
       <el-col :span="1">
         <el-button type="infor" size="small" @click="get_script()">重置</el-button>
       </el-col>
      </el-row>
    </div>
    <div class="dramaIndexSelectTable">
      <el-table :data="tableData" border style="width: 95%">
        <el-table-column prop="id" label="编号" width="80">
        </el-table-column>
        <el-table-column prop="title" label="剧本名称" width="180">
        </el-table-column>
        <el-table-column label="剧本封面" width="180">
          <template slot-scope="scope" >
              <img style="width: 40%;height: 40%;" :src="scope.row.url"/>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="预计时长/小时">
        </el-table-column>

        <el-table-column prop="boys" label="男生人数" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="girls" label="女生人数" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="store_name" label="门店">
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="200">
          <template slot-scope="scope">
          <el-button type="success" @click="jump_to_dramaEdit(scope.row)">修改</el-button>
          <el-button type="danger" @click="delete_drama(scope.row.id)">删除</el-button>
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
      tableData: [],
      input: '',
      getimg: this.$getimg
    }
  },
  mounted () {
    this.get_script()
  },
  methods: {
    // 查询全部数据
    get_script () {
      this.$http.get('script/script_all').then(res => {
        if(res.errno == 0){
          this.tableData = res.data
          this.input = ''
        } else {
          this.tableData = []
          this.input = []
        }
      })
    },
    jump_to_dramaEdit (item) {
      const id = item.id
      this.$router.push({
        path: '/dramaIndex/dramaAdd?id=' + id,
        query: {
          type: 'edit'
        }
      })
    },
    jump_add () {
      this.$router.push({
        path: '/dramaIndex/dramaAdd'
      })
    },
    // 条件查找
    ser_dra () {
      const name = this.input
      const arr = []
      for (const k in this.tableData) {
        const v = this.tableData[k]
        if (v.title.indexOf(name) >= 0) {
          arr.push(v)
        }
      }
      this.tableData = arr
    },
    // 删除店铺
    delete_drama (id) {
      this.$confirm('确定删除该剧本吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('script/del_script?id=' + id).then(res => {
          if (res.errno == 0){
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.get_script()
          } else {
            this.$message.error(res.errno)
          }

        })
      })
    }
  }
}
</script>

<style>
  .dramaIndexSelectTable {
    margin-top: 10px;
    margin-left: 40px;
  }
  .dramaIndexSeaarch {
    margin-top: 20px;
    margin-left: 20px;
    padding: 20px;
  }
  .dramaIndexSeaarchRow{
    display: flex;
    align-items: center;
  }
  .dramaFont{
    color: white;
    text-decoration: none;
  }
</style>
