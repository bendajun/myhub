import Router from 'koa-router'
import userController from '../../controller/login-reg/user'
import { verifyAuth } from '../../middleware/index'
import {
  verifyUser,
  handlePassword,
  verifyLogin,
} from '../../middleware/login-reg/index'

const userRouter = new Router({ prefix: '/user' })

// 创建用户: 验证用户 -> 创建用户
userRouter.post('/', verifyUser, handlePassword, userController.create)

// 登录
userRouter.post('/login', verifyLogin, userController.login)

userRouter.post('/test', verifyAuth)

export default userRouter
