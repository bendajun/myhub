import connection from '../app/database'

// 发布评论
const create = async (momentId, content, userId) => {
  try {
    const statement = 'INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?)'
    const res = await connection.execute(statement, [ content, momentId, userId ])
    return res
  } catch (err) {
    console.log('评论失败')
  }
}

// 回复某条评论
const reply = async (momentId, content, commentId, userId) => {
  try {
    const statement = 'INSERT INTO comment (content, moment_id, comment_id, user_id) VALUES (?, ?, ?, ?)'
    const res = await connection.execute(statement, [ content, momentId, commentId, userId ])
    return res
  } catch (err) {
    console.log('评论失败')
  }
}

// 修改自己的评论
const update = async (content, commentId) => {
  try {
    const statement = 'UPDATE FROM comment SET content = ? WHERE id = ?'
    const res = await connection.execute(statement, [ content, commentId ])
    return res
  } catch (err) {
    console.log('修改自己的评论失败')
  }
}

// 删除自己的评论
const remove = async (commentId) => {
  try {
    const statement = 'DELETE FROM comment WHERE id = ?'
    const res = await connection.execute(statement, [ commentId ])
    return res
  } catch (err) {
    console.log('删除自己的评论失败')
  }
}

export default {
  create,
  reply,
  update,
  remove,
}