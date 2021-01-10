import connection from '../../app/database'
import { User } from '../../interface/index'

// 创建用户
const create = async (user: User) => {
  const { name, password } = user
  const statement = 'INSERT INTO users (name, password) VALUES (?, ?)'
  try {
    await connection.execute(statement, [ name, password ])
    return '用户创建成功'
  } catch(err) {
    console.log(err)
  }
}

// 通过名称获取用户
const getUserByName = async (name: string) => {
  const statement = 'select * FROM users WHERE name = ?;'
  const res = await connection.execute(statement, [name])
  return res[0]
}

export default {
  create,
  getUserByName
}