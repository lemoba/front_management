<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form ref="userForm" :model="user" status-icon :rules="rules">
        <div class="title">Management</div>
        <el-form-item prop="username">
          <el-input type="text" prefix-icon="User" placeholder="用户名" v-model="user.username"></el-input>
        </el-form-item>
   
        <el-form-item prop="password">
          <el-input type="password" prefix-icon="View" placeholder="密码" v-model="user.password"></el-input>
        </el-form-item>
 
        <el-button type="primary" class="login-btn" @click="login">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'

export default {
  data() {
    return {
      user: {
        username: "lemoba@qq.com",
        password: "123456"
      },
      rules: {
        username: [
          {
            required: true, message: "请输入用户名", trigger: "blur"
          }
        ],
        password: [
          {
            required: true, message: "请输入密码", trigger: "blur"
          }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
         this.$api.login(this.user).then((res) => {
          this.$store.commit('saveAccessToken', res.access_token)
          ElMessage.success('登录成功')
          setTimeout(() =>{
            this.$router.push('/welcome')
          }, 2000) 
         })
        }else {
          return false
        }
      })
    },
    goHome() {
      this.$router.push('/welcome')
    }
  }
}
</script>

<style lang="scss">
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F9FCFF;
  width: 100vw;
  height: 100vh;
  .modal {
    width: 500px;
    padding: 50px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 0px 10px 3px #CFC9CB;
    .login-btn {
      width: 100%
    }
    .title {
      font-size: 20px;
      margin-bottom: 30px;
      text-align: center;
    }
  }
}
</style>
