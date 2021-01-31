import connection from '../../app/database'
import { User } from '../../interface/index'

// 创建用户
const create = async (user: User) => {
  const { name, password } = user
  const statement = 'INSERT INTO user (name, password) VALUES (?, ?)'
  try {
    await connection.execute(statement, [ name, password ])
    return '用户创建成功'
  } catch(err) {
    console.log(err)
  }
}

// 通过名称获取用户
const getUserByName = async (name: string) => {
  try {
    const statement = 'select * FROM user WHERE name = ?;'
    const res = await connection.execute(statement, [name])
    return res[0]
  } catch(err) {
    console.log('查询用户时出错')
  }
}

export default {
  create,
  getUserByName
}