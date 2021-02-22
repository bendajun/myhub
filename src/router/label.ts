import Router from 'koa-router'
import labelController from '../controller/label'
import { verifyAuth } from '../middleware'

const labelRouter = new Router({ prefix: '/label' })

// 创建标签
labelRouter.post('/', verifyAuth, labelController.create)

export default labelRouter
