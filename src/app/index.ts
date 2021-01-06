import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import userRouter from '../router/user.router'

const app = new Koa()

app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods()) // 调用这个方法，如果没有符合条件的请求，会友好的返回响应

export default app