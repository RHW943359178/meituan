<template>
  <div class="page-register">
    <body class="header">
      <header>
        <a href="/" class="site-logo"></a>
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <a href="/login">
          <el-button type="primary" size="small">登录</el-button></a>
        </span>
      </header>
    </body>
    <div class="section">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" clearable></el-input>
          <el-button size="mini" round @click="sendMsg">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" maxlength="4" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleForm.pwd" type="password" clearable></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input v-model="ruleForm.cpwd" type="password" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">同意以下协议并注册</el-button>
          <div class="error">{{ error }}</div>
        </el-form-item>
        <el-form-item>
          <a href="http://www.meituan.com/about/terms" target="_blank" class="f1">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'blank',
  data() {
    return {
      statusMsg: '',
      error: '',
      ruleForm: {
        name: '',
        email: '',
        code: '',
        pwd: '',
        cpwd: ''
      },
      rules: {
        name: [
          {required: true, type: 'string', message: '请输入昵称', trigger: 'blur'}
        ],
        email: [
          {required: true, type: 'string', message: '请输入邮箱', trigger: 'blur'},
          {required: true, type: 'email', message: '邮箱格式错误', trigger: 'blur'},
        ],
        code: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ],
        pwd: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        cpwd: [
          {required: true, message: '请再次输入密码', trigger: 'blur'},
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if(value !== this.ruleForm.pwd) {
                callback(new Error('两次输入密码不一致'))
              } else {
                callback()
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    sendMsg() {
      let namePass, emailPass
      
      // if (this.timerid) {
      //   return false
      // }
      this.$refs['ruleForm'].validateField('name', valid => {
        namePass = valid
      })
      this.statusMsg = ''
      if (namePass) {
        return false
      }
      this.$refs['ruleForm'].validateField('email', valid => {
        emailPass = valid
      })      
      if (!namePass && !emailPass) {
        this.$axios.post('/users/verify', {
          username: encodeURIComponent(this.ruleForm.name),
          email: this.ruleForm.email
        }).then(({status, data}) => {
          console.log(status);
          console.log(data);
          
          if (status === 200 && data && data.code === 0) {
            let count = 60
            this.statusMsg = `验证码已发送，剩余${count --}秒`
            let timerid = setInterval(() => {
              this.statusMsg = `验证码已发送，剩余${count --}秒`
              if (count === 0) {
                clearInterval(timerid)
                this.statusMsg = ''
              }
            }, 1000);
          } else {
            this.statusMsg = data.message
          }
        })
      }
    },
    register() {

    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/css/register/index.scss';
</style>