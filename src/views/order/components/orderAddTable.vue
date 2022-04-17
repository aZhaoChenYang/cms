<template>
  <div class="dramaAddTable">
    <el-button @click="jump_to_drama" size="small" class="dramareturn">返回</el-button>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="剧本名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-upload :action="upfile_url" :on-success="upimg_back_fun"
                   :headers="heads"
                   class="avatar-uploader"
                   :show-file-list="false"
                   name="img">
          <img v-if="form.imgurl" :src="form.imgurl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item id='quillEditorQiniu' label="剧本简介">
        <el-upload :action="upfile_url" :on-success="upimg_back_func"
                   :headers="heads"
                   :accept="'image/*'"
                   class="avatar-uploader"
                   :show-file-list="false"
                   name="img" style="display: none"/>
        <quill-editor ref="customQuillEditor" v-model="form.describe" :options="editorOption"
                      style="height: 400px; margin-bottom: 50px"></quill-editor>
      </el-form-item>
      <el-row>
        <el-col :span="6">
          <el-form-item label="剧本人数">
            <el-select v-model="form.peoples" multiple placeholder="请选择">
              <el-option
                v-for="item in peopleoptions"
                :key="item.ID"
                :label="item.number + '人'"
                :value="item.ID">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="男">
            <el-input-number v-model.number="form.boys" :min="0"/>
            人
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="女">
            <el-input-number v-model.number="form.girls" :min="0"/>
            人
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="剧本标签">
            <el-select v-model="form.tags" multiple placeholder="请选择">
              <el-option
                v-for="item in tagsoption"
                :key="item.ID"
                :label="item.name"
                :value="item.ID">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="门店">
            <el-select v-model="form.shop_id" placeholder="请选择门店">
              <el-option v-for="(item,index) in store" :label="item.name" :value="item.ID" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="预计时长">
            <el-input type="number" v-model.number="form.time" style="width: 200px;">
              <template slot="append">小时</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="基础费">
              <el-input-number v-model.number="form.price1" :precision="2" :min="1">
              </el-input-number>
              元
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="附加费">
              <el-input-number v-model.number="form.price2" :precision="2" :min="0"/>
              元
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" v-if="this.edit_id == null">立即创建</el-button>
          <el-button type="primary" @click="onEdit" v-if="this.edit_id != null">修改</el-button>
          <el-button @click="jump_to_drama">取消</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { Api_url } from '../../../common/config'

const toolbarOption = [
  ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
  [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }], //列表
  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  ['image']
]
export default {
  components: {},
  data () {
    return {
      form: {
        id: 0,
        title: '',
        imgurl: '',
        describe: '',
        time: 0,
        shop_id: '',
        peoples: [],
        tags: [],
        boys: 0,
        girls: 0,
        price1: 0,
        price2: 0
      },
      value: [],
      peopleoptions: [],
      tagsoption: [],
      upfile_url: Api_url + 'upload',
      heads: {
        Authorization: localStorage.getItem('Authorization')
      },
      formLabelWidth: '120px',
      edit_id: null,
      store: [],
      editorOption: {
        placeholder: '请输入剧本描述内容',
        modules: {
          toolbar: {
            container: toolbarOption,
            handlers: {
              'image': function (value) {
                if (value) {
                  document.querySelector('#quillEditorQiniu .avatar-uploader input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        },
      }
    }
  },
  mounted () {
    this.edit_id = this.$route.query.id
    this.get_allshop()
    this.get_people()
    this.get_tag()
    if (this.edit_id !== undefined) {
      this.send_editdata()
    }
  },
  methods: {
    get_people () {
      this.$http.get('people').then(res => {
        this.peopleoptions = res.data
      })
    },
    get_tag () {
      this.$http.get('tag').then(res => {
        this.tagsoption = res.data
      })
    },
    // 获取所有店铺
    get_allshop () {
      this.$http.get('shop').then(res => {
        this.store = res.data
      })
    },
    // 发送数据
    send_editdata () {
      this.$http.get('script/get?id=' + this.edit_id).then(res => {
          this.form = res.data
          this.imageUrl = res.data.url
      })
    },
    // 点击修改
    onEdit () {
      if (this.form.title == '') {
        this.$message('请填写剧本名称')
        return
      }
      if (this.form.describe == '') {
        this.$message('请填写剧本简介')
        return
      }
      if (this.form.img_id == '') {
        this.$message('请上传剧本封面')
        return
      }
      if (this.form.store_id == '') {
        this.$message('请选择剧本门店')
        return
      }
      this.$http.put('script', this.form).then(res => {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.$router.go(-1)
      })
    },
    // 点击提交
    onSubmit () {
      if (this.form.title === '') {
        this.$message('请填写剧本名称')
        return
      }
      if (this.form.describe === '') {
        this.$message('请填写剧本简介')
        return
      }
      if (this.imageUrl === '') {
        this.$message('请上传剧本封面')
        return
      }
      if (this.form.store_id === '') {
        this.$message('请选择剧本门店')
        return
      }
      this.$http.post('script', this.form).then(res => {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.$router.go(-1)


      })
    },
    async upimg_back_fun (res) {
        this.form.imgurl = res.data
        this.$message.success('上传成功')
    },
    async upimg_back_func (res) {
        // 获取富文本组件实例
        let quill = this.$refs.customQuillEditor.quill
        // 获取光标所在位置
        let length = quill.getSelection().index
        // 插入图片  res.info为服务器返回的图片地址
        quill.insertEmbed(length, 'image', res.data)
        // 调整光标到最后
        quill.setSelection(length + 1)
    },
    // 返回首页
    jump_to_drama () {
      this.$router.push({
        path: '/dramaIndex'
      })
    },
  }
}

</script>

<style lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.dramaAddTable {
  background-color: white;
  margin-top: 20px;
  margin-left: 20px;
  padding: 20px;

  .item11 {
    float: left;
    margin-left: 10px;
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

  .dramareturn {
    margin: 10px;
  }

  .dramaTextArea {
    width: 40vw;
  }

}
</style>
