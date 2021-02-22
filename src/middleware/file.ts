import Multer from 'koa-multer'
import { AVATAR_PATH } from '../constant'
const avatarUpload = Multer({
  dest: AVATAR_PATH // file存放路径
})

const avatarHandler = avatarUpload.single('avatar') // 找到上传信息中的名为avatar的字段

export default {
  avatarHandler
}