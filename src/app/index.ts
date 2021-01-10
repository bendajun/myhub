import path from 'path'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'

import { handleAllRouters } from '../utils/index'
import handleError from './handleError'

const app = new Koa()

app.use(bodyParser())
handleAllRouters(path.resolve(__dirname, '../router'), app)

app.on('error', handleError)

export default app