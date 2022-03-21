<template>
  <div class="login">
    <div class="loginBox">
      <div class="shang">
        <el-row>
          <el-col :span="24" class="loginFont">剧本杀管理平台</el-col>
        </el-row>
      </div>
      <div class="xia">
        <el-input v-model="admin.user" prefix-icon="el-icon-user-solid" class="loginInput">
        </el-input>
      </div>
      <div class="xia">
        <el-input v-model="admin.password" show-password prefix-icon="el-icon-view" class="loginInput">
        </el-input>
      </div>
      <div class="xia">
        <el-button type="primary" class="loginBtn" @click="jump_to_index">登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Message
} from 'element-ui'

export default {
  data () {
    return {
      admin: {
        user: '',
        password: ''
      }
    }
  },
  methods: {
    jump_to_index () {
      if (this.admin.user === '') {
        this.$message('请输入用户名')
        return
      }
      if (this.admin.password === '') {
        this.$message('请输入密码')
        return
      }
      this.$http.post('admin/login', this.admin).then(res => {
        if (res.errno == 0) {
          this.$router.push({
            path: '/'
          })
        } else {
          Message({
            message: res.data.errmsg,
            type: 'error',
            duration: 5 * 1000
          })
        }
      })
    }
  }
}
</script>

<style>
.login {
  background-color: #2d3a4b;
  min-height: calc(100vh);
  color: white;
}

.loginBox {
  padding-top: 200px;
}

.shang {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}

.xia {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.loginFont {
  font-size: 30px;
  font-weight: bold;
}

.loginInput {
  width: 300px;
}

.loginBtn {
  width: 300px;
}
</style>
