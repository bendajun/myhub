import { Context } from 'koa'
import labelService from '../service/label'

// 创建标签
const create = async (ctx: Context) => {
  const { name } = ctx.request.body

  const res = await labelService.create(name)
  ctx.body = res
}

export default {
  create,
}