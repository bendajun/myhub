import connection from '../app/database'

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
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) user,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
        (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
      FROM moment m
      LEFT JOIN user u ON m.user_id = u.id
      LIMIT ?, ?;
    `
    const res = await connection.execute(statement, [ String(offset), String(size) ])
    return res[0]
  } catch (err) {
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

// 根据id修改单个动态
const updateContentById = async (momentId: string, content) => {
  try {
    const statement = 'UPDATE moment SET content = ? WHERE id = ?'
    await connection.execute(statement, [ content, momentId ])
  } catch (err) {
    console.log('根据id修改单个动态出错')
  }
}

// 根据id删除单个动态
const remove = async (momentId: string) => {
  try {
    const statement = 'DELETE FROM moment WHERE id = ?'
    await connection.execute(statement, [ momentId ])
  } catch (err) {
    console.log('根据id删除单个动态出错')
  }
}

// 判断动态是否具有该标签
const hasLabel = async (momentId, labelId): Promise<boolean> => {
  try {
    const statement = 'SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?'
    const [ res ] = await connection.execute(statement, [momentId, labelId])
    return res[0] ? true : false
  } catch (err) {
    console.log('查询动态是否具有某个标签出错')
  }
}

// 向某条动态中添加label
const addLabel = async (momentId, labelId) => {
  try {
    const statement = 'INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?)'
    await connection.execute(statement, [momentId, labelId])
  } catch (err) {
    console.log('向某条动态中添加label出错')
  }
}

export default {
  create,
  getMomentById,
  getMomentList,
  updateContentById,
  remove,
  hasLabel,
  addLabel,
}