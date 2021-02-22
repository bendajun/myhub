import fs from 'fs'
import jwt from 'jsonwebtoken'
import { Context } from 'koa'
import userService from '../service/user'
import avatarService from '../service/avatar'
import { User } from '../interface/index'
import config from '../app/config'
import { TOKEN_TIME } from '../constant'
import { AVATAR_PATH } from '../constant'

// 创建用户的中间件
const create = async (ctx: Context) => {
  const user: User = ctx.request.body
  // 创建用户
  const res = await userService.create(user)
  ctx.body = res
}

// 登录成功颁发token，采用非对称加密，使用privateKey加密颁发token, publicKey进行解密token
/**
 * privateKey genrsa -out private.key 1024 生成rsa私钥，长度为1024，输出文件为private.key
 * publicKey 
 */
const login = async (ctx: Context) => {
  const { id, name } = ctx.user // ctx.user是在登录验证成功之后挂载的
  const token = jwt.sign({ id, name }, config.PRIVATE_KEY, {
    expiresIn: TOKEN_TIME,
    algorithm: 'RS256', // 采用的算法
  })
  ctx.body = {
    token,
    id,
    name,
  }
}

// 获取用户头像
const getUserAvatar = async (ctx: Context) => {
  const { userId } = ctx.params
  const avatarInfo = await avatarService.getUserAvatar(userId)
  ctx.response.set('content-type', avatarInfo.mimetype) // 不设置这个的话，浏览器会直接下载文件，而不是打开
  ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
}

export default {
  create,
  login,
  getUserAvatar,
}