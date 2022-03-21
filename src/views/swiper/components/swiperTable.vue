<template>
  <div class="pages_swiper">
    <div class="btn">
      <el-button type="primary" size="medium" @click="open_add()">添加轮播图</el-button>
    </div>
    <div class="swiperTable">
      <el-table :data="tableData" border>
        <el-table-column prop="id" label="编号" width="80">
        </el-table-column>
        <el-table-column prop="" label="缩略图" width="180">
          <template slot-scope="scope">
              <img style="width: 40%;height: 40%;" :src="scope.row.url"/>
          </template>
        </el-table-column>
        <el-table-column prop="store_name" label="店铺" width="180">
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
          <el-upload :action="upfile_url" :on-success="upimg_back_fun"
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
          <el-select v-model="form.store_id" placeholder="请选择门店">
            <el-option v-for="(item,index) in shop" :label="item.name" :value="item.id" :key="index"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add_swiper()" v-if="edit_type == 0">确 定</el-button>
        <el-button type="primary" @click="edit_swiper()" v-if="edit_type == 1">修改</el-button>
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
      upfile_url: Api_url + 'cms/upload_img',
      tableData: [],
      dialogFormVisible: false,
      form: {
        id: "",
        store_id: '',
        img_id: ''
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
    async upimg_back_fun (res) {
      if (res.errno == 0) {
        this.imageUrl = res.data.url
        this.form.img_id = res.data.id
        this.$message.success(res.errmsg)
      } else {
        this.$message.error(res.errmsg)
      }
    },
    //删除轮播图
    del_swiper (id) {
      this.$confirm('确定删除该图片吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('banner/del_banner?id=' + id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.get_allSwiper()
        })
      })
    },
    // 发送修改数据
    send_edit (row) {
      this.edit_type = 1
      this.form = row
      this.imageUrl = row.url
      this.dialogFormVisible = true
    },
    // 确认修改
    edit_swiper () {
      console.log(this.form)
      this.$http.post('banner/up_banner', this.form).then(res => {
        if (res.errno == 0) {
          this.$message({
            type: 'success',
            message: '修改成功！'
          })
          this.dialogFormVisible = false
          this.get_allSwiper()
        }
      })
    },
    // 添加轮播图
    add_swiper () {
      this.$http.post('banner/add_banner', this.form).then(res => {
        if (res.errno == 0) {
          this.$message({
            type: 'success',
            message: '添加成功！'
          })
          this.dialogFormVisible = false
          this.get_allSwiper()
        } else {
          this.$message.error(res.errmsg)
        }
      })
    },

    del_img (index) {
      this.img_list.splice(index, 1)
    },
    // 获取所有门店
    get_allShop () {
      this.$http.get('store/get_all').then(res => {
        this.shop = res.data
      })
    },
    //打开添加
    open_add () {
      this.form = {}
      this.img_list = []
      this.edit_type = 0
      this.dialogFormVisible = true
    },
    // 获取所有轮播图
    get_allSwiper () {
      this.$http.get('banner/banner_all').then(res => {
        if (res.errno == 0) {
          this.tableData = res.data
        } else {
          this.$message.error(res.errmsg)
        }
      })
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
