import Router from 'koa-router'
import avatarController from '../controller/avatar'
import { verifyAuth } from '../middleware'
import fileHandler from '../middleware/file'

const avatarRouter = new Router({ prefix: '/upload' })

// 新增头像
avatarRouter.post('/avatar', verifyAuth, fileHandler.avatarHandler, avatarController.saveAvatarInfo)

export default avatarRouter