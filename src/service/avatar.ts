import connection from '../app/database'

// 保存用户头像信息
const saveAvatarInfo = async(originalname: string, filename: string, mimetype: string, size: number, userId: number): Promise<Record<string, any>> => {
  try {
    const statement = 'INSERT INTO avatar (originalname, filename, mimetype, size, user_id) VALUES (?, ?, ?, ?, ?)'
    const [ res ] = await connection.execute(statement, [originalname, filename, mimetype, size, userId])
    return res[0]
  } catch (err) {
    console.log(err)
    console.log('保存头像信息失败')
  }
}

// 获取用户头像
const getUserAvatar = async(userId): Promise<Record<string, any>> => {
  try {
    const statement = 'SELECT * FROM avatar WHERE user_id = ?'
    const [ res ] = await connection.execute(statement, [ userId ])
    return res[0]
  } catch (err) {
    console.log('查询头像信息失败...')
  }
}
export default {
  saveAvatarInfo,
  getUserAvatar
}