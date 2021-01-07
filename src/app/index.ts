import path from 'path'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
/* import userRouter from '../router/user.router' */
import { handleAllRouters } from '../utils/index'

const app = new Koa()

const filePath = path.resolve(__dirname, '../router')

app.use(bodyParser())
handleAllRouters(filePath, app)
/* app.use(userRouter.routes())
app.use(userRouter.allowedMethods()) // 调用这个方法，如果没有符合条件的请求，会友好的返回响应 */

export default app