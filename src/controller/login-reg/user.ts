import { Context } from 'koa'
import userService from '../../service/login-reg/user'
import { User} from '../../interface/index'

// 创建用户的中间件
const create = async (ctx: Context) => {
  const user: User = ctx.request.body
  // 创建用户
  const res = await userService.create(user)
  ctx.body = res
}

const login = async (ctx: Context) => {
  console.log(123)
  const { name } = ctx.request.body
  ctx.body = '登录成功'
}

export default {
  create,
  login
}