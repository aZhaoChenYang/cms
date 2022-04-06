<template>
  <div class="pages_swiper">
    <div class="btn">
      <el-button type="primary" size="medium" @click="open_add()">添加轮播图</el-button>
    </div>
    <div class="swiperTable">
      <el-table :data="tableData" border>
        <el-table-column prop="ID" label="编号" width="80">
        </el-table-column>
        <el-table-column label="缩略图" width="180">
          <template slot-scope="scope">
            <img style="width: 40%;height: 40%;" :src="scope.row.imgurl"/>
          </template>
        </el-table-column>
        <el-table-column prop="shopName" label="店铺" width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="medium" type="success" @click="send_edit(scope.row)">修改</el-button>
            <el-button size="medium" type="danger" @click="del_swiper(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹出框 -->
    <el-dialog title="轮播图" :visible.sync="dialogFormVisible">
      <el-row class="swiperIndex_el_row">
        <el-col :span="4">图片</el-col>
        <el-col :span="13">
          <el-upload :action="upFile_url" :on-success="upImg_back_fun"
                     :headers="heads"
                     class="avatar-uploader"
                     :show-file-list="false"
                     name="img">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-row>
      <el-row class="swiperIndex_el_row">
        <el-col :span="4">店铺</el-col>
        <el-col :span="13">
          <el-select v-model="form.shop_name" placeholder="请选择门店">
            <el-option v-for="(item,index) in shop" :label="item.name" :value="item.name" :key="index"></el-option>
          </el-select>
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
import { Api_url } from '../../../common/config'

export default {
  components: {},
  data () {
    return {
      imageUrl: '',
      upFile_url: Api_url + 'upload',
      heads: {
        Authorization: localStorage.getItem('Authorization')
      },
      tableData: [],
      dialogFormVisible: false,
      form: {
        id: '',
        imgurl: '',
        shop_name: ''
      },
      shop: [],
      edit_type: 0,
      formLabelWidth: '120px',
    }
  },
  mounted () {
    this.get_allSwiper()
    this.get_allShop()
  },
  methods: {
    async upImg_back_fun (res) {
      console.log(res)
      if (res.code === 0) {
        this.imageUrl = res.data
      } else {
        this.$message.error(res.message)
      }
    },
    //删除轮播图
    async del_swiper (id) {
      await this.$confirm('确定删除该图片吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await this.$http.delete('swiper?id=' + id)
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
      await this.get_allSwiper()
    },
    // 发送修改数据
    send_edit (row) {
      this.edit_type = 1
      this.form = row
      this.imageUrl = row.img_url
      this.dialogFormVisible = true
    },
    // 确认修改
    async edit_swiper () {
      this.form.img_url = this.imageUrl
      await this.$http.put('swiper', this.form)
      this.$message({
        type: 'success',
        message: '修改成功！'
      })
      this.dialogFormVisible = false
      this.imageUrl = ''
    },
    // 添加轮播图
    async add_swiper () {
      this.form.imgurl = this.imageUrl
      await this.$http.post('swiper', this.form)
      this.$message({
        type: 'success',
        message: '添加成功！'
      })
      this.dialogFormVisible = false
      this.imageUrl = ''
      await this.get_allSwiper()

    },
    // 获取所有门店
    async get_allShop () {
      let res = await this.$http.get('shop')
      this.shop = res.data
    },
    //打开添加
    open_add () {
      this.form = {}
      this.img_list = []
      this.edit_type = 0
      this.dialogFormVisible = true
    },
    // 获取所有轮播图
    async get_allSwiper () {
      let res = await this.$http.get('swiper')
      this.tableData = res.data
    }
  }
}
</script>

<style lang="less">
.pages_swiper {
  margin-top: 20px;
  margin-left: 40px;

  .btn {
    padding-top: 20px;
  }

  .swiperTable {
    width: 70%;
    margin-top: 30px;
  }

  .swiperIndex_el_row {
    display: flex;
    align-items: center;
    padding-top: 10px;
  }

  .picA {
    width: 148px;
    height: 148px;
    position: relative;
    background-color: #FBFDFF;
    border: 1px dashed #C0CCDA;
    border-radius: 6px;
    box-sizing: border-box;
    vertical-align: top;
    text-align: center;
    margin: 6px 6px 6px 10px;


    img {
      width: 144px;
      height: 144px;
      border: 1px solid #BFBFBF;
      border-radius: 3px;
    }

    .el-icon-circle-close {
      position: absolute;
      top: -13px;
      right: -10px;
      color: #7C7C7C;
      font-size: 25px;
      cursor: pointer;
    }
  }
}
</style>
