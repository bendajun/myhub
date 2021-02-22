import { Context, Next } from 'koa'
import labelService from '../service/label'

export interface IaddLabel {
  name: string;
  id?: number;
}

// 验证标签是否存在，不存在就添加标签
export const verifyLabelExists = async (ctx: Context, next: Next) => {
  const labels: Array<string> = ctx.request.body.labels

  const newLabels: IaddLabel[] = []

  for (const labelName of labels) {
    const res = await labelService.getLabelByName(labelName)
    const label: IaddLabel = { name: labelName }
    if (res.length === 0) { // 为0代表没有此标签
      const createRes = await labelService.create(labelName)
      label.id = createRes.insertId as number
    } else {
      label.id = res[0].id
    }
    newLabels.push(label)
  }
  ctx.labels = newLabels
  await next()
}
