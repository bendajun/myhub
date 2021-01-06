import dotenv from 'dotenv'
// 会自动读取跟文件夹下的.env文件，调用这个方法即可将其的变量全部挂载到process.env上面
dotenv.config()

const {
  APP_PORT
} = process.env

export default {
  APP_PORT
}