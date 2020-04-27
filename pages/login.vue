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

    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/login/index.scss";
</style>