import { Context, Next } from 'koa'
import jwt from 'jsonwebtoken'
import config from '../app/config'
import { LoginRegister, AppErrorTypes } from '../constant/error-types'
import authService from '../service/auth'

// 验证token授权
export const verifyAuth = async (ctx: Context, next: Next) => {
  const authorization = ctx.headers.authorization
  if (!authorization) {
    const error = new Error(LoginRegister.UN_AUTHORIZATION)
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
    const error = new Error(LoginRegister.UN_AUTHORIZATION)
    ctx.app.emit('error', error, ctx)
  }
}

// 验证是否具有权限
export const verifyPermission = async (ctx: Context, next: Next) => {
  const [ resourceKey ] = Object.keys(ctx.params)
  const tableName = resourceKey.replace('Id', '')
  const resourceId = ctx.params[resourceKey]
  const { id: userId } = ctx.user
  // 检查是否具有操作某条数据的权限
  const isPermission = await authService.authCheck(tableName, resourceId, userId)
  if (!isPermission) {
    const error = new Error(AppErrorTypes.UN_PERMISSION)
    ctx.app.emit('error', error, ctx)
  } else {
    await next()
  }
}