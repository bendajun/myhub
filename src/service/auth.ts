import connection from '../app/database'

// 检查是否具有操作某条数据的权限
const authCheck = async (tableName, id, userId) => {
  try {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?`
    const res = await connection.execute(statement, [ id, userId ])
    return (res[0] as Array<any>).length !== 0 // 不为0代表查找到对应的动态，则有权限修改
  } catch (err) {
    console.log('修改某条动态内容的权限操作出错')
  }
}


export default {
  authCheck
}