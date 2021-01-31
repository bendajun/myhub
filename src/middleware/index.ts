import { Context, Next } from 'koa'
import jwt from 'jsonwebtoken'
import config from '../app/config'
import { LoginRegister } from '../constant/error-types'

// 验证token授权
export const verifyAuth = async (ctx: Context, next: Next) => {
  const authorization = ctx.headers.authorization
  if (!authorization) {
    const error = new Error(LoginRegister.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace('Bearer ', '')
  try {
    // 验证token
    const res = jwt.verify(token, config.PUBLIC_KEY, {
      algorithms: [ 'RS256' ]
    })
    ctx.user = res // id, name
    await next()
  } catch (err) {
    const error = new Error(LoginRegister.UNAUTHORIZATION)
    ctx.app.emit('error', error, ctx)
  }
}
