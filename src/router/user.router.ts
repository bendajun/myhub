import Router from 'koa-router'
import userController from '../controller/user.controller'

const userRouter = new Router({ prefix: '/users' })

userRouter.post('/', userController.create)

export default userRouter
