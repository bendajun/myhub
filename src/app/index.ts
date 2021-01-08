import path from 'path'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'

import { handleAllRouters } from '../utils/index'

const app = new Koa()

app.use(bodyParser())
handleAllRouters(path.resolve(__dirname, '../router'), app)


export default app