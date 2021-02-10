import Router from 'koa-router'
import commentController from '../controller/comment'
import {
  verifyAuth,
  verifyPermission,
} from '../middleware/index'

const commentRouter = new Router({ prefix: '/comment' })

// 发布评论
commentRouter.post('/', verifyAuth, commentController.create)

// 回复某条评论
commentRouter.post('/:commentId/reply', verifyAuth, commentController.reply)

// 修改自己的评论
commentRouter.post('/:commentId/update', verifyAuth, verifyPermission, commentController.update)

// 删除自己的评论
commentRouter.get('/:commentId/remove', verifyAuth, verifyPermission, commentController.remove)

export default commentRouter
