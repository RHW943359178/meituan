import Router from 'koa-router';
import Redis from 'koa-redis';
import NodeMailer from 'nodemailer';
import User from '../dbs/modules/users';
import Passport from './utils/passport';
import Email from '../dbs/config'
import axios from './utils/axios'

//  获取路由实例
let router = new Router({
  prefix: '/users'
})

//  获取Redis客户端
let Store = new Redis().client

//  post 方法获取数据
/**
 * 注册
 */
router.post('/signup', async ctx => {
  let {
    username,
    password,
    email,
    code
  } = ctx.request.body
  
  /**
   * 校验验证码
   */
  if (code) {
    const saveCode = await Store.hget(`nodemail: ${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail: ${username}`, 'expire')
    //  判断请求体中的code和redis中的code是否一致
    if (code === saveCode) {
      //  判断验证码是否过期
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          message: '验证码已过期，请重试'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        message: '请填写正确的验证码'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      message: '请输入验证码'
    }
  }

  /**
   * 校验用户名和密码
   */

  let user = await User.find({
    username
  })
  //  判断用户名是否已经被注册
  if (user.length) {
    ctx.body = {
      code: -1,
      message: '该用户名已被注册'
    }
    return
  }
  //  写入数据库
  let nuser = await User.create({
    username,
    password,
    email
  })
  //  校验写库的状态
  if (nuser) {
    let result = axios.post('/users/signin', {
      username,
      password
    })
    if (result.date && result.data.code === 0) {
      ctx.body = {
        code: 0,
        message: '注册成功',
        user: result.data.user
      }
    } else {
      ctx.body = {
        code: -1,
        message: 'error'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      message: '注册失败'
    }
  }
})

/**
 * 登录
 */
router.post('/signin', (ctx, next) => {
  return Passport.authenticate('local', (err, user, info, status) => {
    if (err) {
      ctx.body = {
        code: -1,
        message: err
      }
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          message: '登录成功'
        }
        //  登录动作
        return ctx.login(user)
      } else {
        ctx.body = {
          code: 1,
          message: info
        }
      }
    }
  })(ctx, next)
})

/**
 * 邮箱验证
 */
router.post('/verify', (ctx, next) => {
  let username = ctx.request.body.username
  const saveExpire = Store.hget(`nodemail: ${username}`, 'expire')
  //  限制频繁请求验证，一分钟一次
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      message: '验证请求过于频繁，1分钟一次'
    }
  }
})