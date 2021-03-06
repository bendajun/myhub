import { Context } from 'koa'
import {
  LoginRegister,
  AppErrorTypes
} from '../constant/error-types'

const handleError = (error, ctx: Context) => {
  let statusCode: number
  let message: string
  switch(error.message) {
    case LoginRegister.NAME_OR_PASSWORD_IS_REQUIRED:
      statusCode = 400 // 参数错误，Bad Request 就直接给400
      message = '用户名或密码不能为空'
      break
    case LoginRegister.USER_ALREADY_EXISTS:
      statusCode = 409 //  Conflict 冲突的意思 返回409
      message = '用户已经存在'
      break
    case LoginRegister.USER_NOT_EXISTS:
      statusCode = 400 //  参数错误，Bad Request 就直接给400
      message = '用户不存在'
      break
    case LoginRegister.PASSWORD_IS_WRONG:
      statusCode = 400 //  参数错误，Bad Request 就直接给400
      message = '用户密码不对'
      break
    case LoginRegister.UN_AUTHORIZATION:
      statusCode = 401 //  token过期或者无效，401
      message = '无效的token'
      break
    case AppErrorTypes.UN_PERMISSION:
      statusCode = 401 //  未授权
      message = '暂无权限'
      break
    default:
      statusCode = 404
      message = 'NOT FOUND'
  }
  ctx.statusCode = statusCode
  ctx.body = message
}

export default handleError