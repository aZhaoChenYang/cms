<template>
  <div class="page_dramaIndex">
    <div class="dramaIndexSeaarch">
      <el-row class="dramaIndexSeaarchRow">
        <el-col :span="2">
          <el-button type="primary" size="small" @click="jump_add" class="dramaFont">添加订单</el-button>
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
        <el-table-column prop="script_name" label="剧本名称" width="180">
        </el-table-column>
        <el-table-column prop="dateTime" label="时间">
        </el-table-column>
        <el-table-column prop="shop_name" label="门店">
        </el-table-column>
        <el-table-column label="拼单人">
          <template slot-scope="scope">
<!--            <el-avatar :size="size" :src="circleUrl"></el-avatar>-->
<!--            <el-avatar :size="size" :src="circleUrl"></el-avatar>-->
<!--            <el-avatar :size="size" :src="circleUrl"></el-avatar>-->
<!--            <el-avatar :size="size" :src="circleUrl"></el-avatar>-->
<!--            <el-avatar :size="size" :src="circleUrl"></el-avatar>-->
<!--            <el-avatar :size="size" :src="circleUrl"></el-avatar>-->
<!--            <el-avatar :size="size" :src="circleUrl"></el-avatar>-->
<!--            <el-avatar :size="size" :src="circleUrl"></el-avatar>-->
<!--            <el-avatar :size="size" :src="circleUrl"></el-avatar>-->

          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="200">
          <template slot-scope="scope">
          <el-button type="success" @click="jump_to_dramaEdit(scope.row)">修改</el-button>
          <el-button type="danger" @click="delete_drama(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹出框 -->
    <el-dialog title="订单" :visible.sync="dialogFormVisible">
      <el-row class="swiperIndex_el_row">
        <el-col :span="4">剧本</el-col>
        <el-col :span="13">
          <el-select v-model="form.script_id" placeholder="请选择剧本">
            <el-option v-for="(item,index) in script" :label="item.title" :value="item.id" :key="index"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="swiperIndex_el_row">
        <el-col :span="4">门店</el-col>
        <el-col :span="13">
          <el-select v-model="form.shop_id" placeholder="请选择门店">
            <el-option v-for="(item,index) in shop" :label="item.name" :value="item.id" :key="index"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="swiperIndex_el_row">
        <el-col :span="4">时间</el-col>
        <el-col :span="13">
            <el-date-picker
              v-model="form.time"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add_swiper()" v-if="edit_type === 0">确 定</el-button>
        <el-button type="primary" @click="edit_swiper()" v-if="edit_type === 1">修改</el-button>
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
      dialogFormVisible:false,
      shop: [],
      script: [],
      form: {},
      edit_type: 0,
      value1: '',
    }
  },
  mounted () {
    this.get_shop()
    this.get_script()
    this.get_order()
  },
  methods: {
    async get_shop(){
      let res =  await this.$http.get('shop')
      this.shop = res.data
    },
    // 查询全部数据
    get_script () {
      this.$http.get('script').then(res => {
          this.script = res.data
      })
    },
    // 获取订单列表
    async get_order () {
      let res = await this.$http.get('order')
      this.tableData = res.data
      this.tableData.forEach(item => {
        this.shop.forEach(item1 => {
          if (item.shop_id === item1.id) {
            item.shop_name = item1.name
          }
        })
        this.script.forEach(item2 => {
          if (item.script_id === item2.id) {
            item.script_name = item2.title
          }
        })
        if (item.status === 0) {
          item.status = '拼车中'
        } else if (item.status === 1) {
          item.status = '已锁车'
        } else if (item.status === 2) {
          item.status = '已开车'
        } else if (item.status === 3) {
          item.status = '已完成'
        } else if (item.status === 4) {
          item.status = '已取消'
        }
      })
    },
    jump_add () {
      this.dialogFormVisible = true
    },
    add_swiper() {
      this.$http.post('order', this.form).then(res => {
        this.dialogFormVisible = false
      })
      console.log(this.form)
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
        this.$http.delete('script?id=' + id).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.get_script()


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
