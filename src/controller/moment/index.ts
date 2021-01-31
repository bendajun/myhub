import { Context } from 'koa'
import momentService from '../../service/moment'

// 发布动态
const create = async(ctx: Context) => {
  const userId: string | number = ctx.user.id
  const content: string = ctx.request.body.content
  await momentService.create(userId, content)
  ctx.body = '插入动态成功'
}

// 获取所有动态
const getList = async(ctx: Context) => {
  const page = Number(ctx.query.page)
  const size = Number(ctx.query.size)
  const offset = page > 0 ? page * size : 0
  const res = await momentService.getMomentList(offset, size)
  ctx.body = res
}

// 根据id获取某条动态
const getDetail = async(ctx: Context) => {
  const momentId: string = ctx.params.momentId
  const res = await momentService.getMomentById(momentId)
  ctx.body = res
}

export default {
  create,
  getDetail,
  getList,
}