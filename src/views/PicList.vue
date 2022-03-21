<template>
  <div class="about">
    <el-drawer title="图库管理" :visible.sync="drawer" direction="rtl" size="35%" :before-close="close_box">
      <span>
        <div class="rltan">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="全部" :name="0 + ''"></el-tab-pane>
          </el-tabs>
          <div class="con">
            <el-upload :action="upfile_url" :on-success="upimg_back_fun"
                       :on-progress="before_up_img"
                       :headers="upfile_head" :limit="9" multiple :show-file-list="false"
                       :file-list="upfile_banner_list" name="img"
                       list-type="picture-card">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisiblea"></el-dialog>
            <div style="height: 25px"></div>
            <el-row :gutter="18">
              <template>
                <!-- 全部图片 -->
                <el-col :span="6" v-for="(item, index) of img_list" :key="item.id">
                  <div :class="tab_css(index)">
                    <img :src="item.url" @click="choose_img(index)"/>
                  </div>
                </el-col>
              </template>
            </el-row>
            <div style="height:300px;"></div>
          </div>
          <div class="footbtn">
            <el-button @click="close_box">取消</el-button>
            <el-button @click="del_img" type="warning">删除</el-button>
            <el-button @click="add_img" type="primary">确定</el-button>
          </div>
        </div>
      </span>
    </el-drawer>
  </div>
</template>
<script>
import {
  Api_url
} from '@/common/config'

export default {
  data () {
    return {
      activeName: '0',
      form: {
        name: '',
        banner_imgs: ''
      },
      dialogVisibleadd: false,
      dialogVisiblea: false,
      cate_form: {
        category_name: ''
      },
      img_category: '', // 图片所有分类
      img_list: [], // 图库所有图片
      checkList: [], // 已选择的图片列表index
      add_img_list: [], // 已选完传递到父组件的对象{id,url}
      upfile_url: Api_url + 'cms/upload_img',
      upfile_head: {
        token: localStorage.getItem('token')
      },
      upfile_list: [], // 上传文件列表
      upfile_list_sku: [], // 上传文件列表--规格
      upfile_banner_list: [] // 上传幻灯片列表
    }
  },
  props: {
    drawer: '',
    length: '',
    ishead: '',
    father_fun: Function,
    iscg: ''
  },
  components: {},
  mounted () {
    this._load()
    this.checkList = []
  },
  methods: {
    get_cate_id (id) {
      this.cate_id = id
    },
    async _load () {
      await this.$http.get('cms/img_all').then(res => {
        console.log(res)
        this.img_list = res.data
      })
    },
    // 图片上传后的钩子
    async upimg_back_fun (res) {
      if (res.errno == 0) {
        await this._load()
      } else {
        this.$message.error(res.errmsg)
      }
    },
    // 图片上传前的钩子
    before_up_img () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 1000)
    },
    // 选完图片-确定完成
    add_img () {
      const that = this
      for (const k in this.checkList) {
        const index = this.checkList[k]
        for (const xb in this.img_list) {
          if (index == xb) {
            that.add_img_list.push({
              id: this.img_list[xb].id,
              url: this.img_list[xb].url
            })
          }
        }
      }
      if (this.add_img_list.length <= this.length) {
        // eslint-disable-next-line camelcase
        const add_img_list = this.add_img_list
        this.add_img_list = []
        this.checkList = []
        this.father_fun(add_img_list)
        this.drawer = false
      } else {
        this.$message({
          message: '最多选择' + this.length + '张图片',
          type: 'warning'
        })
      }
    },
    // 选中图片时的样式
    tab_css (index) {
      if (this.checkList.indexOf(index) > -1) {
        return 'pic-box'
      } else {
        return 'pic-default'
      }
    },
    // 选择一张图片进入选择列表
    choose_img (inde) {
      console.log('choose_img', inde, this.length)
      const that = this
      if (that.checkList.indexOf(inde) > -1) {
        const index = that.checkList.indexOf(inde)
        that.checkList.splice(index, 1)
      } else {
        if (that.checkList.length < that.length) {
          that.checkList.push(inde)
        } else {
          this.$message({
            message: '最多选择' + this.length + '张图片',
            type: 'warning'
          })
        }
      }
    },
    // 删除图片
    del_img () {
      const that = this
      const ids = []
      for (const k in this.checkList) {
        const index = this.checkList[k]
        for (const xb in this.img_list) {
          if (index == xb) {
            ids.push(this.img_list[xb].id)
          }
        }
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.http.post_show('image/cms/del_image', {
          id: ids
        }).then(res => {
          that.$message({
            type: 'success',
            message: res.msg
          })
          that.checkList = []
          if (that.cate_id != 0) {
            for (const k in that.imgB) {
              const v = that.imgB[k]
              for (const g of ids) {
                if (v.id == g) {
                  that.imgB.splice(k, 1)
                }
              }
            }
          }
          that._load()
        })
      })
    },
    // 取消并关闭
    close_box () {
      console.log('xxx')
      this.add_img_list = []
      this.checkList = []
      this.add_img()
    }
  }
}
</script>
<style lang="less">
.about {
  text-align: left;
  padding: 20px;
}

.rltan {
  padding: 0 20px 0px;

  .el-upload--picture-card {
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn {
    margin-bottom: 20px;
  }

  .pic-default {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 10px 0;

    img {
      width: 110px;
      height: 110px;
      border: 1px solid #bfbfbf;
      border-radius: 3px;
    }
  }

  .pic-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 10px 0;

    img {
      width: 106px;
      height: 106px;
      border: 3px solid #409eff !important;
      border-radius: 3px;
      background: #409eff !important;
    }

    .black {
      background-color: #000000;
      position: absolute;
      top: 4px;
      left: 4px;
      opacity: 0.6;
      width: 104px;
      height: 104px;
      z-index: 999;
    }
  }

  .con {
    overflow-y: scroll;
    overflow-x: hidden;
    height: 600px;
    width: 100%;
  }

  .footbtn {
    text-align: right;
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #fff;
    z-index: 99;
  }
}
</style>
