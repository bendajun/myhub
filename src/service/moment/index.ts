import connection from '../../app/database'

// 发布动态
const create = async (userId: string | number, content: string) => {
  try {
    const statement = 'INSERT INTO moment (user_id, content) VALUES(?, ?)'
    const res = await connection.execute(statement, [ userId, content ])
    return res[0]
  } catch (err) {
    console.log('插入动态出错')
  }
}

// 获取所有动态列表
const getMomentList = async (offset, size) => {
  try {
    const statement = `
      SELECT
        m.id id,
        m.content content,
        m.createAt createTime,
        m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name) user
      FROM moment m
      LEFT JOIN user u ON m.user_id = u.id
      LIMIT ?, ?;
    `
    const res = await connection.execute(statement, [ String(offset), String(size) ])
    return res[0]
  } catch (err) {
   console.log(err)
    console.log('获取动态列表出错')
  }
}


// 根据id获取单个动态详情
const getMomentById = async (momentId: string) => {
  try {
    const statement = `
      SELECT
        m.id id,
        m.content content,
        m.createAt createTime,
        m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name) user
      FROM moment m
      LEFT JOIN user u ON m.user_id = u.id
      WHERE m.id = ?;
    `
    const res = await connection.execute(statement, [ momentId ])
    return res[0][0]
  } catch (err) {
    console.log('获取动态出错')
  }
}

export default {
  create,
  getMomentById,
  getMomentList,
}