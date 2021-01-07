import Router from 'koa-router'


const userRouter = new Router({ prefix: '/login' })

userRouter.get('/', () => {
  console.log(123)
})

export = userRouter