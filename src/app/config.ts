import dotenv from 'dotenv'
// 会自动读取跟文件夹下的.env文件，调用这个方法即可将其的变量全部挂载到process.env上面
dotenv.config()

const {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD
} = process.env

export default {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
}