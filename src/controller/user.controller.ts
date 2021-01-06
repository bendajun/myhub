import { Context, Next } from 'koa'
import userService from '../service/user.service'
// 创建用户的中间件
const create = (ctx: Context, next: Next) => {
  const user = ctx.request.body
  console.log(user, 1)
  // 查询数据
  userService.create('1123')
}

export default {
  create
}