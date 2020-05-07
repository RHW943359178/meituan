import Router from 'koa-router'
import axios from './utils/axios'

let router = new Router({prefix: '/users'})

// const sign = 'abcd'
router.get('http://127.0.0.1:3000/geo/getPosition', async ctx => {
  let {status, data: {province, city}} = await axios.get('http://cp-tools.cn/geo/getPosition')
  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})

export default router