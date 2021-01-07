import fs from 'fs'
import path from 'path'
import Application = require('koa')

//解析需要遍历的文件夹


/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
export const handleAllRouters = (filePath: string, app: Application) =>{
  // fs.readdir 根据文件路径读取文件，返回文件列表,包含文件夹和文件
  fs.readdir(filePath, (err, files) => {
    if (err) {
      console.warn(err)
    } else {
      // 遍历读取到的文件列表
      files.forEach(filename => {
        // 获取当前文件的绝对路径
        const filedir = path.join(filePath, filename)
        // 根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir,(err, stats) => {
          if (err) {
            console.warn('获取文件stats失败')
          } else {
            const isFile = stats.isFile() // 是文件
            const isDir = stats.isDirectory() // 是文件夹
            if (isFile) {
              // console.log(filedir)
              const Router = require(filedir)
              console.log(Router, 1444)
              app.use(Router.routes())
              app.use(Router.allowedMethods())
            }
            if (isDir) {
              handleAllRouters(filedir, app) // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        })
      })
    }
  })
}
