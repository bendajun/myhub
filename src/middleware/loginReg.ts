import { Context, Next } from 'koa'
import { LoginRegister } from '../constant/error-types'
import userService from '../service/user'
import {
  md5password
} from '../utils/index'
import { User } from '../interface/index'

// 验证参数
export const verifyUser = async (ctx: Context, next: Next) => {
  const { name, password } = ctx.request.body
  // 1.判断用户名和密码是否为空
  if (!name || !password) {
    const error = new Error(LoginRegister.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }
  // 2.判断用户是否注册过
  const res = await userService.getUserByName(name)
  if ((res as Array<any>).length > 0) {
    const error = new Error(LoginRegister.USER_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

// 对密码进行加密处理
export const handlePassword = async (ctx: Context, next: Next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = md5password(password) // 对参数密码进行加密后重新覆盖
  await next()
}

// 验证用户登录
export const verifyLogin = async (ctx: Context, next: Next) => {
  const { name, password } = ctx.request.body
  // 1.判断用户名和密码是否为空
  if (!name || !password) {
    const error = new Error(LoginRegister.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }
  // 2.判断用户是否存在
  const res = await userService.getUserByName(name)
  if ((res as Array<any>).length === 0) { // 用户不存在
    const error = new Error(LoginRegister.USER_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  const user: User = res[0]
  if (md5password(password) !== user.password) { // 密码不对
    const error = new Error(LoginRegister.PASSWORD_IS_WRONG)
    return ctx.app.emit('error', error, ctx)
  }
  ctx.user = user
  await next()
}
