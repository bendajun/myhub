import { Context } from 'koa'
import commentService from '../service/comment'

// 发布评论
const create = async (ctx: Context) => {
  const { momentId, content } = ctx.request.body
  const { id: userId } = ctx.user

  const res = await commentService.create(momentId, content, userId)
  ctx.body = res
}

// 回复某条评论
const reply = async (ctx: Context) => {
  const { momentId, content } = ctx.request.body
  const { commentId } = ctx.params
  const { id: userId } = ctx.user

  const res = await commentService.reply(momentId, content, commentId, userId)
  ctx.body = res
}

// 修改自己的评论
const update = async (ctx: Context) => {
  const { content } = ctx.request.body
  const { commentId } = ctx.params

  const res = await commentService.update(content, commentId)
  ctx.body = res
}

// 删除自己的评论
const remove = async (ctx: Context) => {
  const { commentId } = ctx.params

  const res = await commentService.remove(commentId)
  ctx.body = res
}

export default { 
  create,
  reply,
  update,
  remove,
}