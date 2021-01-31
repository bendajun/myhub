import Router from 'koa-router'
import momentController from '../../controller/moment'
import {
  verifyAuth,
} from '../../middleware/index'

const momentRouter = new Router({ prefix: '/moment' })

// 发布动态
momentRouter.post('/', verifyAuth, momentController.create)

// 获取所有动态
momentRouter.get('/', momentController.getList)

// 获取某条动态
momentRouter.get('/:momentId', momentController.getDetail)



export default momentRouter
