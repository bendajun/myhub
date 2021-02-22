import { Context } from 'koa'
import avatarService from '../service/avatar'
import userService from '../service/user'
import { KoaMulterFileInfo } from '../interface'
import config from '../app/config'

// 保存用户头像的信息
const saveAvatarInfo = async (ctx: Context) => {
  const userId: number = ctx.user.id
  const fileInfo: KoaMulterFileInfo = (ctx.req as any).file
  const { originalname, filename, mimetype, size } = fileInfo
  // 将图像信息保存到数据库中
  await avatarService.saveAvatarInfo(originalname, filename, mimetype, size, userId)

  // 将图片地址保存到user表中
  const avatarUrl = `${config.APP_HOST}:${config.APP_PORT}/user/${userId}/avatar?${originalname}`
  await userService.updateAvatarById(avatarUrl, userId)
  ctx.body = '保存成功'
}

export default {
  saveAvatarInfo,
}