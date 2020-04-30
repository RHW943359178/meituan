<template>
  <div class="page-login">
    <div class="login-header">
      <a href="/" class="logo"/>
    </div>
    <div class="login-panel">
      <div class="banner">
        <img src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg" width="400" height="370" alt="美团网">
      </div>
      <div class="form">
        <h4 v-if="error" class="tips"><i>{{error}}</i></h4>
        <p><span>账号登录</span></p>
        <el-input v-model="username" prefix-icon="profile" clearable></el-input>
        <el-input v-model="password" prefix-icon="password" type="password" clearable></el-input>
        <div class="foot">
          <el-checkbox v-model="checked">7天内自动登录</el-checkbox>
          <b>忘记密码</b>
        </div>
        <el-button class="btn-login" type="success" size="mini" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  data () {
    return {
      checked: '',
      username: '',
      password: '',
      error: ''
    }
  },
  layout: 'blank',
  methods: {
    login() {
      this.$axios.post('users/signin', {
        username: encodeURIComponent(this.username),
        password: CryptoJS.MD5(this.password)
      }).then(({status, data}) => {
        if (status === 2000) {
          if (data && data.code === 0) {
            location.href = '/'
          } else {
            this.err = data.message
          }
        } else {
          this.error = `服务器出错，${data.message}`
        }
      })

      //  定时器清除错误信息
      setTimeout(() => {
        this.error = ''
      }, 1500)
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/login/index.scss";
</style>