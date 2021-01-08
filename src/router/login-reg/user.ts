import Router from 'koa-router'
import userController from '../../controller/login-reg/user'

const userRouter = new Router({ prefix: '/users' })

// 创建用户
userRouter.post('/', userController.create)

export default userRouter
