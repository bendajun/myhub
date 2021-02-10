import Router from 'koa-router'
import momentController from '../controller/moment'
import {
  verifyAuth,
  verifyPermission,
} from '../middleware/index'

const momentRouter = new Router({ prefix: '/moment' })

// 发布动态
momentRouter.post('/', verifyAuth, momentController.create)

// 获取所有动态
momentRouter.get('/', momentController.getList)

// 获取某条动态
momentRouter.get('/:momentId', momentController.getDetail)

// 修改某条动态
momentRouter.post('/update/:momentId',verifyAuth, verifyPermission, momentController.update)

// 删除某条动态
momentRouter.get('/delete/:momentId',verifyAuth, verifyPermission, momentController.remove)

export default momentRouter