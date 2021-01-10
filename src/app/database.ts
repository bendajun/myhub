import mysql from 'mysql2'
import config from './config'

const connections = mysql.createPool({
  host: config.MYSQL_HOST,
  port: Number(config.MYSQL_PORT),
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD
})

// 测试连接是否成功
connections.getConnection((error, conn) => {
  if (error) {
    console.log('数据库连接失败...', error)
  }
  conn.connect(err => {
    if (err) {
      console.warn('连接失败: ', err)
    } else {
      console.log('数据库连接成功~')
    }
  })
})

export default connections.promise() // 导出promise版