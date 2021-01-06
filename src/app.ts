import Koa from 'koa'
import { BaseContext } from 'koa'
const app = new Koa()

app.use((ctx: BaseContext) => {
  ctx.body = 'hello world'
})

app.listen(8989, () => {
  console.log('app is running port 8989 ~')
})