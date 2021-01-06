import app from './app/index'
import envConfig from './app/config'

app.listen(envConfig.APP_PORT, () => {
  console.log(`app is running port ${envConfig.APP_PORT} ~`)
})