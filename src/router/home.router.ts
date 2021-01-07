import Router from 'koa-router'


const userRouter = new Router({ prefix: '/home' })

userRouter.get('/', () => {
  console.log(123)
})

export default userRouter