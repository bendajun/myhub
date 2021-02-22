import connection from '../app/database'

// 创建标签
const create = async (labelName: string): Promise<Record<string, any>> => {
  try {
    const statement = 'INSERT INTO label (name) VALUES(?)'
    const res = await connection.execute(statement, [labelName])
    return (res as Array<any>)[0]
  } catch (err) {
    console.log('创建标签失败...')
  }
}

// 获取某条标签
const getLabelByName = async (labelName: string): Promise<Array<any>> => {
  try {
    const statement = 'SELECT * FROM label WHERE name = ?'
    const res = await connection.execute(statement, [labelName])
    return (res as Array<any>)[0]
  } catch (err) {
    console.log('查询失败...')
  }
}

export default {
  create,
  getLabelByName
}