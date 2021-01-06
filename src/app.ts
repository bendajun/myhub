const Koa = require('koa')

const app = new Koa()

app.listen(8989, () => {
  console.log('app is running port 8989 ~')
})